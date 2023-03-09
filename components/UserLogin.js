import {
  Flex,
  Stack,
  Box,
  VStack,
  Text,
  Divider,
  Image,
} from "@chakra-ui/react";

const UserLogin = ({ userNameVal, nameVal, handleClick }) => {
  return (
    <Flex
      mx={{ base: 10, md: 40 }}
      mt={8}
      justify={{ base: "center", lg: "flex-end" }}>
      <Stack direction="row" justify="center" align="center">
        <Box align="center">
          <VStack spacing={-1}>
            <Text fontSize="xl" as="b">
              {userNameVal[0][0]}
            </Text>
            <Text fontSize="2xs" as="i">
              {nameVal[0][0]}
            </Text>
          </VStack>
          <Divider />
          <Box pt={1} fontSize="xs">
            <Text as="samp" onClick={handleClick} cursor={"pointer"}>
              LOGOUT
            </Text>
          </Box>
        </Box>
        <Image
          borderRadius="full"
          boxSize="90px"
          objectFit="cover"
          src="https://www.ccair.org/wp-content/uploads/2015/04/wallpaper-for-facebook-profile-photo-e1440624505574.jpg"
          alt="Dan Abramov"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Stack>
    </Flex>
  );
};

export default UserLogin;
