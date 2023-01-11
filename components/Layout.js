import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column" minH="100%">
      <Navbar />
      <Flex
        flexDirection="column"
        flexGrow="1"
        flexShrink="1"
        flexBasis="1"
        mb={20}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
