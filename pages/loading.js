import { Text, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
// import Link from "next/link";
import { useEffect, React } from "react";
import { useRouter } from "next/router";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import index from "./index";

function ScreenLoad() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 10000);
  }, []);

  return (
    <Flex
      bg="gray.100"
      direction="column"
      align="center"
      justify="center"
      h="100vh">
      <h1>Id:</h1>
      <CircularProgress
        isIndeterminate
        size={20}
        thickness={8}
        // color='green.300'
      />
    </Flex>
  );
}

export default ScreenLoad;
