import Head from "next/head";
import Layout from "../components/Layout";
import TableCell from "./table/[id]";
import {
  Image,
  Stack,
  Text,
  Flex,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react";

import Link from "next/link";

const Dashboard = () => {
  return (
    <Flex h="100vh">
      <Head>
        <title>GradExpress | Dashboard</title>
      </Head>
      <Layout>
        <Flex mx={40} my={5} justify={{ base: "center", lg: "flex-end" }}>
          <Stack direction="row" justify="center" align="center">
            <Box align="center">
              <VStack spacing={-1}>
                <Text fontSize="xl" as="b">
                  DAN ABRAMOV
                </Text>
                <Text fontSize="2xs" as="i">
                  dan_abramov@gmail.com
                </Text>
              </VStack>
              <Divider />
              <Box pt={1} fontSize="xs">
                <Link href="/">
                  <Text as="samp">LOGOUT</Text>
                </Link>
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
        <Flex
          mx={40}
          my={5}
          // justify='center'
          h="100vh">
          <TableCell />
        </Flex>
      </Layout>
    </Flex>
  );
};

export default Dashboard;
