import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Flex, Link, Text, Heading } from "@chakra-ui/react";
import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";
import ReactSpeedometer from "react-d3-speedometer";
const CveId = ({ data }) => {
  return (
    <Sidebar>
      <Flex p={{ base: "0", lg: "20" }} flexWrap="wrap" gap={4}>
        <Heading as="h2" size="xl">
          {data.vulnerabilities[0].cve.id}
        </Heading>

        <Card w="100%">
          <Text fontSize="xl" mb="5">
            Vulnerability Description
          </Text>
          <Text>{data.vulnerabilities[0].cve.descriptions[0].value}</Text>
        </Card>
        <Card w={{ base: "100%", lg: "49%" }}>
          <Text fontSize="xl" mb="5">
            Exploitability Score
          </Text>
          <Text>
            {
              data.vulnerabilities[0].cve.metrics.cvssMetricV31[0]
                .exploitabilityScore
            }
          </Text>
        </Card>
        <Card w={{ base: "100%", lg: "49%" }}>
          <Text fontSize="xl" mb="5">
            Impact Score
          </Text>
          <Text>
            {data.vulnerabilities[0].cve.metrics.cvssMetricV31[0].impactScore}
          </Text>
        </Card>
        <Card w="100%">
          <Text fontSize="xl" mb="5">
            Software Weaknesses{" "}
            <Link
              display="inline"
              color="blue.500"
              href={`https://cwe.mitre.org/data/definitions/${data.vulnerabilities[0].cve.weaknesses[0].description[0].value.slice(
                4
              )}.html`}
              isExternal
            >
              &#9432;
            </Link>
          </Text>

          {data.vulnerabilities[0].cve.weaknesses[0].description.map((item) => (
            <Text key={item.value}>{item.value}</Text>
          ))}
        </Card>
      </Flex>
    </Sidebar>
  );
};

// provides data to UI component via props. see below
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  let res = await fetch(
    `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${params.id}`,
    {
      method: "GET",
      headers: {
        apiKey: process.env.NVD_API_KEY,
      },
    }
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default CveId;
