import { Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  const date = new Date();
  let current_year = date.getFullYear();

  return (
    <Flex
      as="footer"
      bg="blue.900"
      boxShadow="dark-lg"
      borderTop="2px"
      borderColor="yellow"
      justify="center"
      w="100vw"
      py={{
        base: "2",
        lg: "3",
      }}>
      <Text fontSize="xs" color="white">
        &copy; {current_year} All Rights Reserved
      </Text>
    </Flex>
  );
};

export default Footer;
