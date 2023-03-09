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
  const sheetName1 = "KEPLER";
  const sheetName2 = "PASTEUR";
  const sheetName3 = "SCHWANN";

  //Query
  const responseUser1 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName1}!C11:C78`,
  });

  const responsePass1 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName1}!B11:B78`,
  });

  const responseUser2 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName2}!C11:C78`,
  });

  const responsePass2 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName2}!B11:B78`,
  });

  const responseUser3 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName3}!C11:C78`,
  });

  const responsePass3 = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName3}!B11:B78`,
  });

  //Result
  const user1 = [];
  const pass1 = [];
  responseUser1.data.values.forEach((value) => user1.push(value));
  responsePass1.data.values.forEach((value) => pass1.push(value));

  const user2 = [];
  const pass2 = [];
  responseUser2.data.values.forEach((value) => user2.push(value));
  responsePass2.data.values.forEach((value) => pass2.push(value));

  const user3 = [];
  const pass3 = [];
  responseUser3.data.values.forEach((value) => user3.push(value));
  responsePass3.data.values.forEach((value) => pass3.push(value));

  return {
    props: {
      user1,
      pass1,
      user2,
      pass2,
      user3,
      pass3,
      sheetName1,
      sheetName2,
      sheetName3,
    },
  };
}

export default function Home({
  user1,
  pass1,
  user2,
  pass2,
  user3,
  pass3,
  sheetName1,
  sheetName2,
  sheetName3,
}) {
  const formattedUser1 = user1.map((nameArr) => {
    if (nameArr.length < 1 || !nameArr[0]) {
      return ""; // or some default value if nameArr is invalid
    }
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

  const formattedUser2 = user2.map((nameArr) => {
    if (nameArr.length < 1 || !nameArr[0]) {
      return ""; // or some default value if nameArr is invalid
    }
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

  const formattedUser3 = user3.map((nameArr) => {
    if (nameArr.length < 1 || !nameArr[0]) {
      return ""; // or some default value if nameArr is invalid
    }
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

  user1 = formattedUser1;
  user2 = formattedUser2;
  user3 = formattedUser3;

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let userExists = false;
    let count = 0;
    let sheetName;

    user1.forEach(function (userV, i) {
      if (formData.username === userV) {
        count = i;
        userExists = true;
        sheetName = sheetName1;
      }
    });

    user2.forEach(function (userV, i) {
      if (formData.username === userV) {
        count = i;
        userExists = true;
        sheetName = sheetName2;
      }
    });

    user3.forEach(function (userV, i) {
      if (formData.username === userV) {
        count = i;
        userExists = true;
        sheetName = sheetName3;
      }
    });

    let username = formData.username;
    let password = formData.password;
    let currentID = count + 11;
    let lrn = password; //LRN was used as the password, so basically the same lrn === password

    //authentication
    if (
      (userExists && pass1[count] == formData.password) ||
      (userExists && pass2[count] == formData.password) ||
      (userExists && pass3[count] == formData.password)
    ) {
      localStorage.setItem("isAuthenticated", "true");
      Router.push({
        pathname: "/dashboard",
        // query: { sheetName, currentID, username, password, lrn },
        query: { sheetName, currentID, lrn },
      });
    } else if (
      (userExists && pass1[0][count] != formData.password) ||
      (userExists && pass2[0][count] != formData.password) ||
      (userExists && pass3[0][count] != formData.password)
    ) {
      setError("Invalid password");
      alert("Incorrect password");
    } else if (
      (!userExists && pass1[0][count] == formData.password) ||
      (!userExists && pass2[0][count] == formData.password) ||
      (!userExists && pass3[0][count] == formData.password)
    ) {
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
      <Flex
        bg="gray.100"
        align="center"
        justify="center"
        h="100vh"
        userSelect={"none"}>
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
