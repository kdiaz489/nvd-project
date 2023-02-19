// 3rd party libs
import { Flex, Heading, Text } from "@chakra-ui/react";

// custom components
import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";

const AboutCve = () => {
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
              An acronym for Common Vulnerabilities and Exposures. A list of
              records—each containing an identification number, a description,
              and at least one public reference—for publicly known cybersecurity
              vulnerabilities. CVE Records are used in numerous cybersecurity
              products and services from around the world, including NVD.
            </Text>
          </Card>
          <Card w="49%">
            <Text fontSize="xl" mb="5">
              What is NVD?
            </Text>
            <Text>
              NVD is an acronym for the National Vulnerability Database. The
              vulnerability database is built upon and fully synchronized with
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
        <Card w="100%">
          <Text fontSize="xl" mb="5">
            Other important terms
          </Text>
          <Text>
            SBOM: A “software bill of materials” (SBOM) is “a formal record
            containing the details and supply chain relationships of various
            components used in building software,” according to the National
            Telecommunications and Information Administration (NTIA). The
            Cybersecurity and Infrastructure Security Agency (CISA) also
            characterizes it as a key building block in software security and
            software supply chain risk management. Most SBOMs include these key
            elements: component name, publisher name, component version, file
            name, software license, and dependencies.
          </Text>
        </Card>
      </Flex>
    </Sidebar>
  );
};

export default AboutCve;
