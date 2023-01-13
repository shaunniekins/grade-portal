import Navbar from "./Navbar";
// import { useFlex } from "@chakra-ui/core";
import Footer from "./Footer";
import { Flex, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  // const { flex } = useFlex();
  return (
    <Flex flexDirection="column" minH={"100vh"} w="100%">
      <Navbar />
      <Flex flexDirection="column" mb={20}>
        {children}
      </Flex>
      {/* <Box {...flex}>{children}</Box> */}
      <Box position="absolute" bottom="0" w="100%">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
