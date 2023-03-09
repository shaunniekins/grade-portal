import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column" minH={"100vh"} w="100%" userSelect={"none"}>
      <Navbar />
      <Flex flexDirection="column" mb={20}>
        {children}
      </Flex>
      <Box position="absolute" bottom="0" w="100%">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
