import { GetServerSideProps } from "next";
import { Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FiInfo } from "react-icons/fi";
import moment from "moment";
import Sidebar from "@/components/Sidebar";
import { DataTable } from "@/components/DataTable";
import { NvdData } from "@/types";

const Dashboard = ({ data }: { data: NvdData }) => {
  // fetching data this way was too slow. using getServerSideProps instead
  // const fetchNvdData = async () => {
  //   try {
  //     const res = await fetch("/api/nvd", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();

  //     setLocalData(data.data.vulnerabilities);
  //     setLocalLoading(false);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   fetchNvdData();
  // }, []);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "To convert",
    }),
    columnHelper.accessor("vulnStatus", {
      cell: (info) => info.getValue(),
      header: "Vulnerability Status",
    }),
    columnHelper.accessor("exploitabilityScore", {
      cell: (info) => info.getValue(),
      header: "Exploitability Score",
      meta: {
        isNumeric: true,
      },
    }),
  ];

  const tabledata = data.vulnerabilities.map((item) => {
    return {
      id: item.cve.id,
      vulnStatus: item.cve.vulnStatus,
      exploitabilityScore:
        item.cve.metrics.cvssMetricV31[0].exploitabilityScore,
    };
  });

  return (
    <Sidebar>
      <Flex p="20" flexDir="column">
        <Flex>
          <Heading as="h2" size="xl">
            Vulnerabilities List
          </Heading>
          <Tooltip
            label=" This dashboard fetches data from the CVE API provided by the NVD; The api is used to easily retrieve information on a single CVE or a collection of CVE. Note: Click on a column header to sort."
            hasArrow
            fontSize="md"
            aria-label="A tooltip"
            placement="top"
          >
            <Button w="20px">&#9432;</Button>
          </Tooltip>
        </Flex>

        <DataTable data={tabledata} columns={columns} />
      </Flex>
    </Sidebar>
  );
};

// provides data to UI component via props. see below
export const getServerSideProps: GetServerSideProps = async () => {
  const getLatestCriticalVulns = async (
    yesterday: string,
    lastWeek: string
  ) => {
    let res = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${lastWeek}&pubEndDate=${yesterday}`,
      {
        method: "GET",
        headers: {
          apiKey: process.env.NVD_API_KEY,
        },
      }
    );

    const nvdData = await res.json();

    return nvdData;
  };

  const lastWeekDay = moment().subtract(21, "days").toISOString();
  const recentDay = moment().subtract(1, "days").toISOString();

  let data = await getLatestCriticalVulns(recentDay, lastWeekDay);

  // Pass data to the page via props
  return { props: { data } };
};

export default Dashboard;
