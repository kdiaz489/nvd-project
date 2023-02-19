import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import { Button, Center } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <Center h="100vh" w="100vw">
      <Button colorScheme="blue" onClick={handleClick}>
        Go to Dashboard
      </Button>
    </Center>
  );
}
