import { Box, Text, Flex } from "@chakra-ui/react";
import Router from "next/router";

const Header = () => {
  const handleClick = () => {
    localStorage.setItem("isAuthenticated", "false");

    Router.push({
      pathname: "/",
    });
  };

  return (
    <Flex
      as="nav"
      w="100%"
      bg="blue.900"
      boxShadow="xl"
      borderBottom="4px"
      borderColor="yellow"
      justify={{
        base: "center",
        lg: "flex-start",
      }}>
      <Box
        pl={{
          base: 0,
          lg: 40,
        }}
        py={{
          base: "4",
          lg: "5",
        }}>
        <Text
          as="b"
          fontSize="2xl"
          color="white"
          onClick={handleClick}
          cursor={"pointer"}>
          GradExpress
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
