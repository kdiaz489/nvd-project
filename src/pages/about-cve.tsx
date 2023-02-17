import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";
import { Flex, Heading, Text } from "@chakra-ui/react";

type Props = {};

const AboutCve = (props: Props) => {
  return (
    <Sidebar>
      <Flex p="20" flexDir="column" gap={4}>
        <Heading as="h2" size="xl">
          About CVE and NVD
        </Heading>
        <Flex gap={3}>
          <Card w="49%">
            <Text fontSize="xl" mb="5">
              What is CVE?
            </Text>
            <Text>
              A list of records—each containing an identification number, a
              description, and at least one public reference—for publicly known
              cybersecurity vulnerabilities. CVE Records are used in numerous
              cybersecurity products and services from around the world,
              including NVD.
            </Text>
          </Card>
          <Card w="49%">
            <Text fontSize="xl" mb="5">
              What is NVD?
            </Text>
            <Text>
              A vulnerability database built upon and fully synchronized with
              the CVE List so that any updates to CVE appear immediately in NVD.
            </Text>
          </Card>
        </Flex>
        <Card w="100%">
          <Text fontSize="xl" mb="5">
            What is the relationship between CVE and NVD?
          </Text>
          <Text>
            The CVE List feeds NVD, which then builds upon the information
            included in CVE Records to provide enhanced information for each
            record such as fix information, severity scores, and impact ratings.
            As part of its enhanced information, NVD also provides advanced
            searching features such as by OS; by vendor name, product name,
            and/or version number; and by vulnerability type, severity, related
            exploit range, and impact.
          </Text>
        </Card>
      </Flex>
    </Sidebar>
  );
};

export default AboutCve;
