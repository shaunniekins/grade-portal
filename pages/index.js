import Head from "next/head";
import keys from "../secrets.json";
import { google } from "googleapis";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useState, React } from "react";
import Router from "next/router";

export async function getServerSideProps() {
  //Auth
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );
  const sheets = google.sheets({ version: "v4", auth: client });

  //Query
  const responseUser = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `KEPLER!C11:C78`,
  });

  const responsePass = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `KEPLER!B11:B78`,
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
  const formattedUser = user.map((nameArr) => {
    const [lastName, firstName, middleInitial] = nameArr[0].split(", ");
    let formattedName = "";

    if (typeof lastName === "string" && typeof firstName === "string") {
      formattedName = `${lastName.toLowerCase()}.${firstName
        .toLowerCase()
        .replace(/\s/g, "")}`;

      if (formattedName.slice(-1) === ".") {
        formattedName = formattedName.slice(0, -2);
      }
    }

    return formattedName;
  });

  user = formattedUser;
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let userExists = false;
    let count = 0;

    user.forEach(function (userV, i) {
      if (formData.username === userV) {
        count = i;
        userExists = true;
      }
    });

    //authenticated
    if (userExists && pass[count] == formData.password) {
      localStorage.setItem("isAuthenticated", "true");
      Router.push(`/${count + 11}`);
    } else if (userExists && pass[0][count] != formData.password) {
      setError("Invalid password");
      alert("Incorrect password");
    } else if (!userExists && pass[0][count] == formData.password) {
      setError("Invalid username");
      alert("Incorrect username");
    } else {
      setError("Invalid username and password");
      alert("Incorrect username and password");
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
                    />
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
