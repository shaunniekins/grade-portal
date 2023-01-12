import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column" minH="100%" w="100%">
      <Navbar />
      <Flex flexDirection="column" mb={20}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
