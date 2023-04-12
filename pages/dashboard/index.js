import Head from "next/head";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useState, React } from "react";
import Router, { useRouter } from "next/router";
import ProfileCard from "../../components/ProfileCard";
import { getGoogleSheetsClient } from "../../api/googleSheetsClient";
import { useAuth } from "../../api/useAuth";

const Dashboard = (props) => {
  useAuth();
  const { name, sy } = props;
  // const { sheetName, currentID, username, password, lrn } = useRouter().query;
  const { sheetName, currentID, lrn } = useRouter().query;

  const [isClicked, setIsClicked] = useState(true);
  const handleClickView = () => {
    setIsClicked(!isClicked);
  };

  const handleClickText = () => {
    localStorage.setItem("isAuthenticated", "false");
    Router.push({
      pathname: "/",
    });
  };

  const [selectedSchoolOption, setSelectedSchoolOption] = useState("");
  const handleSchoolOption = (event) => {
    setSelectedSchoolOption(event.target.value);
  };

  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");
  const handleQuarterOption = (event) => {
    setSelectedQuarterOption(event.target.value);
  };

  const [selectedSubjectOption, setSelectedSubjectOption] = useState("");
  const handleSubjectOption = (event) => {
    setSelectedSubjectOption(event.target.value);
  };

  /***  Display data to pass ***/
  let nameDisplay = name[0]
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  let schoolYearDisplay = sy;

  let sheetNameDisplay = sheetName
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  let gradeDisplay = "";
  switch (sheetNameDisplay.toLowerCase()) {
    case "pasteur":
    case "thomson":
    case "schwann":
      gradeDisplay = "12";
      break;
    default:
      gradeDisplay = "";
      break;
  }

  let lrnDisplay = lrn;

  let id = currentID;
  const handleClickContinue = (e) => {
    e.preventDefault();

    Router.push({
      pathname: `/dashboard/${id}`,
      query: {
        id,
        selectedSchoolOption,
        selectedQuarterOption,
        selectedSubjectOption,
        nameDisplay,
        lrnDisplay,
        schoolYearDisplay,
        gradeDisplay,
        sheetNameDisplay,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Grade Portal | Dashboard</title>
      </Head>
      <Flex
        bg="gray.100"
        align="center"
        justify="center"
        h="100vh"
        userSelect={"none"}>
        {isClicked ? (
          <Card bg="white" px={4} py={7} rounded="xl" w={500} boxShadow="2xl">
            <Text
              fontSize={"sm"}
              mt={"-1rem"}
              cursor={"pointer"}
              onClick={handleClickText}>
              &lt; back
            </Text>
            <CardHeader mb={2} py={1} align="center">
              <Flex direction={"column"}>
                <Text as="b" fontSize="2xl" size="md">
                  GradExpress
                </Text>
                <Text as="i" fontSize="lg" size="md">
                  Quick Grade Feedbacking
                </Text>
              </Flex>
            </CardHeader>
            <CardBody direction={"column"} align={"center"} mt={"-1rem"}>
              <Button
                align={"center"}
                bg="blue.600"
                color="white"
                onClick={handleClickView}>
                View Grades
              </Button>
            </CardBody>
            <CardFooter>
              <Text as={"i"} fontSize={"xs"} textAlign={"center"}>
                Say goodbye to waiting days or even weeks for grades and hello
                to immediate feedback with GradExpress
              </Text>
            </CardFooter>
          </Card>
        ) : (
          <Card
            bg="white"
            px={4}
            py={7}
            rounded="xl"
            boxShadow="2xl"
            w={{ base: 500, md: 700 }}>
            <Text
              fontSize={"sm"}
              mt={"-1rem"}
              cursor={"pointer"}
              onClick={handleClickText}>
              &lt; back
            </Text>
            <CardHeader mb={{ md: 2 }} py={1} align="center">
              <Flex direction={"column"}>
                <Text
                  as="b"
                  fontSize={{ base: "xl", md: "2xl" }}
                  // size={{ base: "sm", md: "md" }}
                >
                  GradExpress
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex gap={"5%"} direction={{ base: "column", md: "row" }}>
                <Flex
                  justify={{ base: "center", md: "flex-start" }}
                  mb={{ base: "1rem", md: "unset" }}>
                  <ProfileCard
                    {...{
                      nameDisplay,
                      schoolYearDisplay,
                      sheetNameDisplay,
                      lrnDisplay,
                      gradeDisplay,
                    }}
                  />
                </Flex>
                <Formik onSubmit={handleClickContinue}>
                  <form onSubmit={handleClickContinue}>
                    <Flex direction={"column"}>
                      <VStack
                        spacing={5}
                        align="flex-end"
                        fontSize={{ base: "sm", md: "lg" }}>
                        <FormControl>
                          <Flex align={"flex-end"}>
                            <FormLabel
                              fontSize={{ base: "sm", md: "lg" }}
                              w={100}>
                              School:
                            </FormLabel>
                            <Select
                              fontSize={{ base: "sm", md: "lg" }}
                              border={"1px"}
                              borderColor={"blue.600"}
                              placeholder="-- Select school --"
                              onChange={handleSchoolOption}
                              value={selectedSchoolOption}
                              required>
                              <option value="bnchs">BNCHS</option>
                            </Select>
                          </Flex>
                        </FormControl>
                        <FormControl>
                          <Flex align={"flex-end"}>
                            <FormLabel
                              fontSize={{ base: "sm", md: "lg" }}
                              w={100}>
                              Quarter:{" "}
                            </FormLabel>
                            <Select
                              fontSize={{ base: "sm", md: "lg" }}
                              border={"1px"}
                              borderColor={"blue.600"}
                              placeholder="-- Select quarter --"
                              onChange={handleQuarterOption}
                              value={selectedQuarterOption}
                              required>
                              <option value="first" disabled>
                                1st Quarter
                              </option>
                              <option value="second" disabled>
                                2nd Quarter
                              </option>
                              <option value="third">3rd Quarter</option>
                              <option value="fourth" disabled>
                                4th Quarter
                              </option>
                            </Select>
                          </Flex>
                        </FormControl>
                        <FormControl>
                          <Flex align={"flex-end"}>
                            <FormLabel
                              fontSize={{ base: "sm", md: "lg" }}
                              w={100}>
                              Subject:{" "}
                            </FormLabel>
                            <Select
                              fontSize={{ base: "sm", md: "lg" }}
                              border={"1px"}
                              borderColor={"blue.600"}
                              placeholder="-- Select subject --"
                              onChange={handleSubjectOption}
                              value={selectedSubjectOption}
                              required>
                              <option value="General Physics 2">
                                General Physics 2
                              </option>
                            </Select>
                          </Flex>
                        </FormControl>
                      </VStack>
                    </Flex>
                    <Flex justify={"flex-end"} mt={{ base: "10%", md: "50%" }}>
                      <Button
                        type="submit"
                        fontSize={{ base: "xs", md: "sm" }}
                        bg="blue.600"
                        color="white">
                        CONTINUE
                      </Button>
                    </Flex>
                  </form>
                </Formik>
              </Flex>
            </CardBody>
          </Card>
        )}
      </Flex>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps({ query }) {
  const googleSheetsClient = await getGoogleSheetsClient();
  const { sheetName, currentID } = query;

  const nameUser = await googleSheetsClient.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName}!C${currentID}`,
  });

  const schoolYear = await googleSheetsClient.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${sheetName}!AH5`,
  });

  const name = nameUser.data.values.flat();
  const sy = schoolYear.data.values.flat();

  return {
    props: {
      name,
      sy,
    },
  };
}
