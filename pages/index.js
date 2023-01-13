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
import keys from "../secrets.json";

import { Formik, Field } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  //Auth
  // const auth = await google.auth.getClient({
  //   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  // });
  const sheets = google.sheets({ version: "v4", auth: client });

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

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // console.log("hello");

  const handleSubmit = (e) => {
    // console.log("visited here");
    e.preventDefault();
    // localStorage.setItem("isAuthenticated", false);

    let userExists = false;
    let count = 0;

    user.forEach(function (userV, i) {
      if (formData.username == userV[0]) {
        count = i;
        userExists = true;
        console.log("Data retrived username: " + userV[0]);
        console.log("Form data username: " + formData.username);
        // console.log(userExists);
        console.log(count);
        // i++;
      }
    });

    if (userExists == true && pass[count] == formData.password) {
      //authenticated
      localStorage.setItem("isAuthenticated", "true");
      router.push(`/${count + 12}`);
    } else {
      setError("Invalid username or password");
      alert("Incorrect username or password");
      console.log("Data retrieved pass:" + pass[count]);
      console.log("Form data pass:" + formData.password);
    }
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
            <Formik onSubmit={handleSubmit}>
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
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    {/* isInvalid={!!errors.password && touched.password}> */}
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      // validate={(value) => {
                      //   if (value.length <= 6) {
                      //     return "Password should be over 6 characters";
                      //   }
                      // }}
                    />
                    {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                  </FormControl>
                  <Button
                    type="submit"
                    bg="blue.600"
                    color="white"
                    w="full"
                    mt={8}>
                    LOGIN
                  </Button>
                </VStack>
              </form>
            </Formik>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
