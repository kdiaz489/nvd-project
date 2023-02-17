import { Inter } from "@next/font/google";
import { Button, Center } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Center h="100vh" w="100vw">
      <Button colorScheme="blue">Sign In</Button>
    </Center>
  );
}
