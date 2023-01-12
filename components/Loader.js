import { Flex } from "@chakra-ui/react";
import { useEffect, React } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@chakra-ui/react";

function ScreenLoad() {
  const router = useRouter();
  return (
    <Flex
      bg="gray.100"
      direction="column"
      align="center"
      justify="center"
      h="100vh">
      <CircularProgress isIndeterminate size={70} thickness={8} />
    </Flex>
  );
}

export default ScreenLoad;
