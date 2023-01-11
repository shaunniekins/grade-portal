import Head from "next/head";
import { google } from "googleapis";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Formik, Field } from "formik";
import React from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  //Auth
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  //Query
  const responseUser = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!B12:B50`,
  });

  const responsePass = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!C12:C50`,
  });

  //Result
  const user = [];
  const pass = [];
  responseUser.data.values.forEach((value) => user.push(value));
  responsePass.data.values.forEach((value) => pass.push(value));

  return {
    props: {
      user,
      pass,
    },
  };
}

export default function Home({ user, pass }) {
  const router = useRouter();

  const handleSubmit = (values, { setSubmitting }) => {
    let userExists = false;
    let count = 0;
    user.forEach(function (value, i) {
      if (value == values.username) {
        count = i;
        userExists = true;
      }
    });
    userExists && pass[count] == values.password
      ? setTimeout(() => {
          router.push(`/table/${count + 12}`);
          setSubmitting(false);
        }, 100)
      : alert("Incorrect username or password");
  };

  return (
    <>
      <Head>
        <title>Grade Portal | Login</title>
      </Head>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Card
          as="b"
          bg="white"
          px={4}
          py={7}
          rounded="xl"
          w={450}
          boxShadow="2xl">
          <CardHeader mb={2} py={1} align="center">
            <Text fontSize="xl" size="md">
              GradExpress
            </Text>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={handleSubmit}>
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={5} align="flex-start">
                    <FormControl>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="text"
                        variant="filled"
                        placeholder="Username"
                        required
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        placeholder="Password"
                        required
                        validate={(value) => {
                          if (value.length <= 6) {
                            return "Password should be over 6 characters";
                          }
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  </VStack>
                  <Button
                    type="submit"
                    bg="blue.600"
                    color="white"
                    w="full"
                    mt={8}>
                    LOGIN
                  </Button>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
