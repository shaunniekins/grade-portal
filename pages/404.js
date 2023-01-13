import { Text, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2500);
  }, []);

  return (
    <Flex
      bg="gray.100"
      direction="column"
      align="center"
      justify="center"
      h="100vh">
      <Text fontSize="5xl">Oooops....</Text>
      <Text fontSize="3xl">That page cannot be found.</Text>
      <Text pt={7} as="i">
        <Link color="blue.400" href="/">
          Go back to the Login Page
        </Link>
      </Text>
    </Flex>
  );
};

export default NotFound;
