import { google } from "googleapis";
import Head from "next/head";
import { React } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "./api/useAuth";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Divider,
  Image,
  Flex,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import keys from "../secrets.json";

export async function getServerSideProps({ query }) {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );
  // //Auth
  // const auth = await google.auth.getClient({
  //   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  // });
  // const sheets = google.sheets({ version: "v4", auth });
  const sheets = google.sheets({ version: "v4", auth: client });

  //Query
  const { id } = query;

  //Highest Possible Score
  const max_row = 10;
  const responseMaxWritten = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!H${max_row}:Q${max_row}`,
  });
  console.log(`SCIENCE Q1!H${max_row}:Q${max_row}`);
  const responseMaxPerform = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!U${max_row}:AD${max_row}`,
  });

  const responseMaxAssess = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!AH${max_row}`,
  });

  //User
  const responseWritten = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!H${id}:Q${id}`,
  });

  const responsePerform = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!U${id}:AD${id}`,
  });

  const responseAssess = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!AH${id}`,
  });

  const responseName = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!D${id}`,
  });

  const responseUsername = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SCIENCE Q1!B${id}`,
  });

  //ATTENDANCE
  //SUMMARY
  const minusId = id - 6;
  const responseSummary = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SUMMARY!C${minusId}:F${minusId}`,
  });

  //JANUARY
  const responseJanAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `JANUARY!C${minusId}:F${minusId}`,
  });

  //FEBRUARY
  const responseFebAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `FEBRUARY!C${minusId}:F${minusId}`,
  });

  //MARCH
  const responseMarAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `MARCH!C${minusId}:F${minusId}`,
  });

  //APRIL
  const responseAprAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `APRIL!C${minusId}:F${minusId}`,
  });

  //MAY
  const responseMayAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `MAY!C${minusId}:F${minusId}`,
  });

  //JUNE
  const responseJuneAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `JUNE!C${minusId}:F${minusId}`,
  });

  //JULY
  const responseJulyAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `JULY!C${minusId}:F${minusId}`,
  });

  //AUGUST
  const responseAugAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `AUGUST!C${minusId}:F${minusId}`,
  });

  //SEPTEMBER
  const responseSeptAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `SEPTEMBER!C${minusId}:F${minusId}`,
  });

  //OCTOBER
  const responseOctAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `OCTOBER!C${minusId}:F${minusId}`,
  });

  //NOVEMBER
  const responseNovAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `NOVEMBER!C${minusId}:F${minusId}`,
  });

  //DECEMBER
  const responseDecAttendance = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `DECEMBER!C${minusId}:F${minusId}`,
  });

  //Result
  const max_written_works = [];
  const max_performance_tasks = [];
  const max_quarterly_assessment = [];
  const written_works = [];
  const performance_tasks = [];
  const quarterly_assessment = [];
  const nameVal = [];
  const userNameVal = [];

  responseMaxWritten.data.values.forEach((value) =>
    max_written_works.push(value)
  );
  responseMaxPerform.data.values.forEach((value) =>
    max_performance_tasks.push(value)
  );
  responseMaxAssess.data.values.forEach((value) =>
    max_quarterly_assessment.push(value)
  );
  responseWritten.data.values.forEach((value) => written_works.push(value));
  responsePerform.data.values.forEach((value) => performance_tasks.push(value));
  responseAssess.data.values.forEach((value) =>
    quarterly_assessment.push(value)
  );
  responseName.data.values.forEach((value) => nameVal.push(value));
  responseUsername.data.values.forEach((value) => userNameVal.push(value));

  const attendanceSummary = [];
  const attendanceJan = [];
  const attendanceFeb = [];
  const attendanceMarch = [];
  const attendanceApril = [];
  const attendanceMay = [];
  const attendanceJune = [];
  const attendanceJuly = [];
  const attendanceAug = [];
  const attendanceSept = [];
  const attendanceOct = [];
  const attendanceNov = [];
  const attendanceDec = [];

  responseSummary.data.values.forEach((value) => attendanceSummary.push(value));
  responseJanAttendance.data.values.forEach((value) =>
    attendanceJan.push(value)
  );
  responseFebAttendance.data.values.forEach((value) =>
    attendanceFeb.push(value)
  );
  responseMarAttendance.data.values.forEach((value) =>
    attendanceMarch.push(value)
  );
  responseAprAttendance.data.values.forEach((value) =>
    attendanceApril.push(value)
  );
  responseMayAttendance.data.values.forEach((value) =>
    attendanceMay.push(value)
  );
  responseJuneAttendance.data.values.forEach((value) =>
    attendanceJune.push(value)
  );
  responseJulyAttendance.data.values.forEach((value) =>
    attendanceJuly.push(value)
  );
  responseAugAttendance.data.values.forEach((value) =>
    attendanceAug.push(value)
  );
  responseSeptAttendance.data.values.forEach((value) =>
    attendanceSept.push(value)
  );
  responseOctAttendance.data.values.forEach((value) =>
    attendanceOct.push(value)
  );
  responseNovAttendance.data.values.forEach((value) =>
    attendanceNov.push(value)
  );
  responseDecAttendance.data.values.forEach((value) =>
    attendanceDec.push(value)
  );

  return {
    props: {
      id,
      max_written_works,
      max_performance_tasks,
      max_quarterly_assessment,
      written_works,
      performance_tasks,
      quarterly_assessment,
      nameVal,
      userNameVal,
      attendanceSummary,
      attendanceJan,
      attendanceFeb,
      attendanceMarch,
      attendanceApril,
      attendanceMay,
      attendanceJune,
      attendanceJuly,
      attendanceAug,
      attendanceSept,
      attendanceOct,
      attendanceNov,
      attendanceDec,
      minusId,
    },
  };
}

const Post = ({
  id,
  max_written_works,
  max_performance_tasks,
  max_quarterly_assessment,
  written_works,
  performance_tasks,
  quarterly_assessment,
  nameVal,
  userNameVal,
  attendanceSummary,
  attendanceJan,
  attendanceFeb,
  attendanceMarch,
  attendanceApril,
  attendanceMay,
  attendanceJune,
  attendanceJuly,
  attendanceAug,
  attendanceSept,
  attendanceOct,
  attendanceNov,
  attendanceDec,
  minusId,
}) => {
  useAuth();
  const router = useRouter();
  // console.log(attendanceSummary[0][0]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", false);
    router.push(`https://grade-portal.vercel.app/`);
    // router.push(`/`);
  };

  let [display, setDisplay] = useState(attendanceSummary);

  let toDisplayAttendance = attendanceSummary;

  function handleChange(event) {
    // setSelectedValue(event.target.value);
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "January":
        setDisplay(attendanceJan);
        console.log("Jan");
        break;
      case "February":
        setDisplay(attendanceFeb);
        console.log("Feb");
        break;
      case "March":
        setDisplay(attendanceMarch);
        break;
      case "April":
        setDisplay(attendanceApril);
        break;
      case "May":
        setDisplay(attendanceMay);
        break;
      case "June":
        setDisplay(attendanceJune);
        break;
      case "July":
        setDisplay(attendanceJuly);
        break;
      case "August":
        setDisplay(attendanceAug);
        break;
      case "September":
        setDisplay(attendanceSept);
        break;
      case "October":
        setDisplay(attendanceOct);
        break;
      case "November":
        setDisplay(attendanceNov);
        break;
      case "December":
        setDisplay(attendanceDec);
        break;
      default:
        setDisplay(attendanceSummary);
    }
  }

  let buttonText;

  let sumMaxWrittenScore,
    sumMaxPerformanceScore,
    sumMaxQuarterlyScore,
    sumYourWrittenScore,
    sumYourPerformanceScore,
    sumYourQuarterlyScore,
    percentageWrittenScore,
    percentagePerformanceScore,
    percentageQuarterlyScore,
    weightedWrittenScore,
    weightedPerformanceScore,
    weightedQuarterlyScore,
    initialGrade,
    transmutedGrade,
    remarks_descrip;

  // Written Works
  sumMaxWrittenScore = max_written_works[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  sumYourWrittenScore = written_works[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  percentageWrittenScore = (
    (sumYourWrittenScore / sumMaxWrittenScore) *
    100
  ).toFixed(3);
  weightedWrittenScore = (percentageWrittenScore * 0.4).toFixed(3);

  // Performance Tasks
  sumMaxPerformanceScore = max_performance_tasks[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  sumYourPerformanceScore = performance_tasks[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  percentagePerformanceScore = (
    (sumYourPerformanceScore / sumMaxPerformanceScore) *
    100
  ).toFixed(3);
  weightedPerformanceScore = (percentagePerformanceScore * 0.4).toFixed(3);

  // Quarterly Assessment
  sumMaxQuarterlyScore = max_quarterly_assessment[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  sumYourQuarterlyScore = quarterly_assessment[0].reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });

  percentageQuarterlyScore = (
    (sumYourQuarterlyScore / sumMaxQuarterlyScore) *
    100
  ).toFixed(3);
  weightedQuarterlyScore = (percentageQuarterlyScore * 0.2).toFixed(3);

  initialGrade = (
    parseFloat(weightedPerformanceScore) +
    parseFloat(weightedWrittenScore) +
    parseFloat(weightedQuarterlyScore)
  ).toFixed(2);

  let lowestInitialGrade;
  let temp;
  let i;
  const toTransmuted = (initialGrade) => {
    if (initialGrade >= 59.99) {
      lowestInitialGrade = 61.59;
      temp = 60;
      for (i = 75; i <= 100; i++) {
        if (initialGrade >= temp && initialGrade <= lowestInitialGrade) {
          // transmutedGrade = i;
          return i;
        } else {
          temp = lowestInitialGrade + 0.01;
          lowestInitialGrade += 1.6;
        }
      }
    } else {
      lowestInitialGrade = 3.99;
      temp = 0;
      for (i = 60; i <= 74; i++) {
        if (initialGrade >= temp && initialGrade <= lowestInitialGrade) {
          return i;
        } else {
          temp = lowestInitialGrade + 0.01;
          lowestInitialGrade += 4;
        }
      }
    }
  };
  // console.log(initialGrade);

  transmutedGrade = toTransmuted(initialGrade);

  if (transmutedGrade >= 90 && transmutedGrade <= 100)
    remarks_descrip = "Outstanding";
  else if (transmutedGrade >= 85 && transmutedGrade <= 89)
    remarks_descrip = "Very Satisfactory";
  else if (transmutedGrade >= 80 && transmutedGrade <= 84)
    remarks_descrip = "Satisfactory";
  else if (transmutedGrade >= 75 && transmutedGrade <= 79)
    remarks_descrip = "Fairly Satisfactory";
  else remarks_descrip = "Did Not Meet Expectations";

  showBreakdown
    ? (buttonText = "Hide Breakdown")
    : (buttonText = "Show Breakdown");

  const dates = [
    "Total Summary",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const dt = new Date();
  // const day

  return (
    <>
      <Flex>
        <Head>
          <title>GradExpress | Dashboard</title>
        </Head>
        <Layout userId={id}>
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
                  <Text as="samp" onClick={handleClick}>
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
          <Flex mx={{ base: 5, md: 10, lg: 20, xl: 40 }}>
            <Tabs
              variant="enclosed"
              w="100%"
              align={{ base: "center", lg: "start" }}>
              <TabList>
                <Tab>
                  <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                    Science
                  </Text>
                </Tab>
                <Tab>
                  {" "}
                  <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                    Attendance
                  </Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* mt="-10" */}
                  {/* Graphs */}
                  <Flex
                    justify="space-around"
                    // mx={100}
                    direction={{ base: "column", lg: "row" }}>
                    {/* Two circles */}
                    <Flex
                      justify="center"
                      align="center"
                      direction={{ base: "row", lg: "column" }}
                      // w="50%"
                      gap={10}
                      pb={{ base: 10, lg: 0 }}>
                      <div>
                        <CircularProgress
                          value={transmutedGrade}
                          size={{ base: 90, sm: 120, md: 150, lg: 200 }}
                          thickness={8}>
                          <CircularProgressLabel>
                            <Text fontSize={{ base: "lg", lg: "4xl" }}>
                              {transmutedGrade}
                            </Text>
                          </CircularProgressLabel>
                        </CircularProgress>
                        <Flex direction="column" align="center">
                          <Text fontSize={{ base: "md", lg: "xl" }}>
                            Remarks:
                          </Text>
                          <Text
                            fontSize={{ base: "md", md: "lg", lg: "2xl" }}
                            as="b">
                            {remarks_descrip}
                          </Text>
                        </Flex>
                      </div>
                      <div>
                        <CircularProgress
                          value={initialGrade}
                          // size={{ base: 90, sm: 120, md: 150, lg: 200 }}

                          size={{ base: 50, sm: 65, md: 90, lg: 100 }}
                          // size={{ base: 90, lg: 100 }}
                          thickness={8}
                          color="yellow.300">
                          <CircularProgressLabel>
                            {initialGrade}
                          </CircularProgressLabel>
                        </CircularProgress>
                        <Flex direction="column" align="center">
                          <Text fontSize={{ base: "md", lg: "xl" }}>
                            Initial Grade
                          </Text>
                        </Flex>
                      </div>
                    </Flex>
                    <Flex
                      justify="center"
                      align="center"
                      // w="50%"
                      direction="column">
                      <Text fontSize={{ base: "xl", lg: "2xl" }} as="b">
                        Transmutation Table
                      </Text>
                      <Image
                        src="/transmutation-table"
                        alt="transmutation table"
                        objectFit="cover"
                        w={{ base: "70%", lg: "90%" }}></Image>
                    </Flex>
                  </Flex>
                  <Flex justify="flex-end">
                    <Button
                      // colorScheme='blue'
                      size={{ base: "sm", md: "md", lg: "lg" }}
                      fontSize={{ base: "xs", md: "md", lg: "lg" }}
                      bg="blue.600"
                      color="white"
                      my={5}
                      onClick={() => setShowBreakdown(!showBreakdown)}>
                      {/* {buttonText} */}
                      {buttonText}
                    </Button>
                  </Flex>
                  {showBreakdown ? (
                    <Tabs
                      align="center"
                      variant={"soft-rounded"}
                      // w="100%"
                      colorScheme="blue">
                      {/* <Flex align="center" justify="center"> */}
                      <TabList mb={3}>
                        <Tab>
                          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
                            Written Works
                          </Text>
                        </Tab>
                        <Tab>
                          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
                            Performance Tasks
                          </Text>
                        </Tab>
                        <Tab>
                          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
                            Quarterly Assessment
                          </Text>
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          {/* Written Works  */}
                          <TableContainer>
                            <Text
                              as="b"
                              fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                              Written Works (40%)
                            </Text>
                            <Table
                              variant="simple"
                              size={{ base: "sm", md: "md", lg: "lg" }}>
                              <Thead>
                                <Tr>
                                  <Th></Th>
                                  <Th>1</Th>
                                  <Th>2</Th>
                                  <Th>3</Th>
                                  <Th>4</Th>
                                  <Th>5</Th>
                                  <Th>6</Th>
                                  <Th>7</Th>
                                  <Th>8</Th>
                                  <Th>9</Th>
                                  <Th>10</Th>
                                  <Th isNumeric>Total</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {max_written_works.map((row) => (
                                  <Tr>
                                    <Th>Max Score</Th>
                                    {row.map((col) => (
                                      <Td key={col.toString()}>{col}</Td>
                                    ))}
                                    <Td isNumeric>{sumMaxWrittenScore}</Td>
                                  </Tr>
                                ))}
                                {written_works.map((row) => (
                                  <Tr>
                                    <Th>Your Score</Th>
                                    {row.map((col) => (
                                      <Td key={col.toString()}>{col}</Td>
                                    ))}
                                    <Td isNumeric>{sumYourWrittenScore}</Td>
                                  </Tr>
                                ))}
                                <Tr>
                                  <Th>Percentage Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`(Total Max Score / Total Your Score) * 100`}</Text>
                                      <br />
                                      <Text>
                                        {`= (${sumYourWrittenScore} / ${sumMaxWrittenScore}) * 100`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${percentageWrittenScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Th>Weighted Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`Percentage Score * 40%`}</Text>
                                      <br />
                                      <Text>
                                        {`= ${percentageWrittenScore} * 40%`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${weightedWrittenScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                        <TabPanel>
                          {/* Performance Tasks  */}
                          <TableContainer>
                            <Text
                              as="b"
                              fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                              Performance Tasks (40%)
                            </Text>
                            <Table
                              variant="simple"
                              size={{ base: "sm", md: "md", lg: "lg" }}>
                              <Thead>
                                <Tr>
                                  <Th></Th>
                                  <Th>1</Th>
                                  <Th>2</Th>
                                  <Th>3</Th>
                                  <Th>4</Th>
                                  <Th>5</Th>
                                  <Th>6</Th>
                                  <Th>7</Th>
                                  <Th>8</Th>
                                  <Th>9</Th>
                                  <Th>10</Th>
                                  <Th isNumeric>Total</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {max_performance_tasks.map((row) => (
                                  <Tr>
                                    <Th>Max Score</Th>
                                    {row.map((col) => (
                                      <Td key={col.toString()}>{col}</Td>
                                    ))}
                                    <Td isNumeric>{sumMaxPerformanceScore}</Td>
                                  </Tr>
                                ))}
                                {performance_tasks.map((row) => (
                                  <Tr>
                                    <Th>Your Score</Th>
                                    {row.map((col) => (
                                      <Td key={col.toString()}>{col}</Td>
                                    ))}
                                    <Td isNumeric>{sumYourPerformanceScore}</Td>
                                  </Tr>
                                ))}
                                <Tr>
                                  <Th>Percentage Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`(Total Max Score / Total Your Score) * 100`}</Text>
                                      <br />
                                      <Text>
                                        {`= (${sumYourPerformanceScore} / ${sumMaxPerformanceScore}) * 100`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${percentagePerformanceScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Th>Weighted Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`Percentage Score * 40%`}</Text>
                                      <br />
                                      <Text>
                                        {`= ${percentagePerformanceScore} * 40%`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${weightedPerformanceScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                        <TabPanel>
                          {/* Quarterly Assessment  */}
                          <TableContainer>
                            <Text
                              as="b"
                              fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                              Quarterly Assessment (20%)
                            </Text>
                            <Table
                              variant="simple"
                              size={{ base: "sm", md: "md", lg: "lg" }}>
                              <Thead>
                                <Tr>
                                  <Th></Th>
                                  {/* <Th>1</Th> */}
                                  <Th colSpan={11}>
                                    <div align="center">Total</div>
                                  </Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Th>Max Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{sumMaxQuarterlyScore}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                                {/* {max_quarterly_assessment.map((row) => (
                                  <Tr>
                                    <Th>Max Score</Th>
                                    {row.map((col) => (
                                      <Td key={`max_${col}_${iterate++}`}>
                                        {col}
                                      </Td>
                                    ))}
                                    <Td isNumeric>{sumMaxQuarterlyScore}</Td>
                                  </Tr>
                                ))} */}
                                <Tr>
                                  <Th>Your Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{sumYourQuarterlyScore}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                                {/* {quarterly_assessment.map((row) => (
                                  <Tr>
                                    <Th>Your Score</Th>
                                    {row.map((col) => (
                                      <Td key={`max_${col}_${iterate++}`}>
                                        {col}
                                      </Td>
                                    ))}
                                    <Td isNumeric>{sumYourQuarterlyScore}</Td>
                                  </Tr>
                                ))} */}
                                <Tr>
                                  <Th>Percentage Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`(Total Max Score / Total Your Score) * 100`}</Text>
                                      <br />
                                      <Text>
                                        {`= (${sumYourQuarterlyScore} / ${sumMaxQuarterlyScore}) * 100`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${percentageQuarterlyScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Th>Weighted Score</Th>
                                  <Td colSpan={11}>
                                    <div align="center">
                                      <Text>{`Percentage Score * 20%`}</Text>
                                      <br />
                                      <Text>
                                        {`= ${percentageQuarterlyScore} * 20%`}
                                      </Text>
                                      <br />
                                      <Text as="b">{`= ${weightedQuarterlyScore}`}</Text>
                                    </div>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  ) : (
                    <p> </p>
                  )}
                </TabPanel>
                <TabPanel>
                  <Flex
                    // h={"60vh"}
                    direction={"column"}
                    justify={"center"}
                    my={"50px"}>
                    <Flex justify={{ base: "center", md: "flex-end" }}>
                      <Select
                        mb={"5rem"}
                        w={{ base: "100%", md: "20%" }}
                        onChange={handleChange}
                        fontSize={{ base: "xs", md: "md", lg: "xl" }}
                        placeholder="-- Select Option --">
                        {dates.map((date) => (
                          <option key={date.toString()} value={date}>
                            {date}
                          </option>
                        ))}
                      </Select>
                    </Flex>

                    <Flex w={"100%"} align={"center"} justify={"center"}>
                      <TableContainer>
                        <Table
                          variant={"simple"}
                          // h="100vh"
                          size={{ base: "sm", md: "md", lg: "lg" }}>
                          <Thead>
                            <Tr>
                              <Th w={"250px"}>PRESENT</Th>
                              <Th w={"250px"}>LATE</Th>
                              <Th w={"250px"}>EXCUSED ABSENCE</Th>
                              <Th w={"250px"}>UNEXCUSED ABSENCE</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {display.map((month) => (
                              <Tr>
                                {month.map((mon) => (
                                  <Td>{mon}</Td>
                                ))}
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Flex>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Layout>
      </Flex>
    </>
  );
};

export default Post;
