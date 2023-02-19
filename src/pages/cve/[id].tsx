import { Flex, Link, Box, Text, Heading } from "@chakra-ui/react";
import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";

const CveId = ({ data }) => {
  return (
    <Sidebar>
      <Flex p="20" flexWrap="wrap" gap={4}>
        <Heading as="h2" size="xl">
          {data.vulnerabilities[0].cve.id}
        </Heading>

        <Card w="100%">
          <Text fontSize="xl" mb="5">
            Vulnerability Description
          </Text>
          <Text>{data.vulnerabilities[0].cve.descriptions[0].value}</Text>
        </Card>
        <Card w="49%">
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
        <Card w="49%">
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
              href="https://cwe.mitre.org/top25/archive/2022/2022_cwe_top25.html"
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

export async function getServerSideProps(context) {
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
}

export default CveId;
