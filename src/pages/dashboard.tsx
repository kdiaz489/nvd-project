import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "@/components/Sidebar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getLatestCriticalVulns } from "@/utils/nvd";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NvdData {
  resultsPerPage: number;
  startIndex: number;
  totalResults: number;
  format: string;
  version: string;
  timestamp: string;
  vulnerabilities: any[];
}

const Dashboard = ({ data }) => {
  const router = useRouter();
  const [localData, setLocalData] = useState<any | null>(null);
  const [localLoading, setLocalLoading] = useState<boolean>(true);

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

  return (
    <Sidebar>
      <Flex p="20" flexDir="column">
        <TableContainer
          border="1px"
          borderColor="#fafafa"
          bgColor="white"
          borderRadius="md"
          mt="10"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Vuln Status</Th>
                <Th>exploitability Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.vulnerabilities.map((item) => (
                <Tr
                  key={item.cve.id}
                  onClick={() => router.push(`/cve/${item.cve.id}`)}
                  _hover={{ bgColor: "#fafafa", cursor: "pointer" }}
                >
                  <Td>{item.cve.id}</Td>
                  <Td>{item.cve.vulnStatus}</Td>
                  <Td>
                    {JSON.stringify(
                      item.cve.metrics.cvssMetricV31[0].exploitabilityScore
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Sidebar>
  );
};

export async function getServerSideProps() {
  const getLatestCriticalVulns = async (
    yesterday: string,
    lastWeek: string
  ) => {
    let res = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${lastWeek}&pubEndDate=${yesterday}`,
      {
        method: "GET",
        headers: {
          apiKey: "bd849d4d-1d42-4898-a32c-039961ea1d4c",
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
}

export default Dashboard;
