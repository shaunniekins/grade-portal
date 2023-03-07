import Head from "next/head";
import Router from "next/router";
import { React, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./api/useAuth";
import Layout from "../components/Layout";
import T_Table from "../components/TransmutationTable";
import {
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  CircularProgress,
  CircularProgressLabel,
  useBreakpointValue,
} from "@chakra-ui/react";
import Breakdown from "../components/Breakdown";
import UserLogin from "../components/UserLogin";
import getRemarks from "./tools/remarks";
import { getGoogleSheetsClient } from "../pages/api/googleSheetsClient";

export async function getServerSideProps({ query }) {
  const googleSheetsClient = await getGoogleSheetsClient();

  //Query
  const { id } = query;
  const sheetName = "SCIENCE Q1";

  //Highest Possible Score
  const row = 10;
  const responseMax = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!H${row}:Q${row}`,
      `${sheetName}!U${row}:AD${row}`,
      `${sheetName}!AH${row}`,
    ],
  });

  //HPS Result
  const max_written_works = responseMax.data.valueRanges[0].values[0]
    .slice(0, 10)
    .map((val) => {
      if (val === null || val === undefined) {
        return " ";
      } else {
        return val;
      }
    });
  max_written_works.length = 10;
  for (let i = 0; i < max_written_works.length; i++) {
    if (max_written_works[i] === null || max_written_works[i] === undefined) {
      max_written_works[i] = "";
    }
  }
  const max_performance_tasks = responseMax.data.valueRanges[1].values;
  const max_quarterly_assessment = responseMax.data.valueRanges[2].values;

  //User
  const responseWPANU = await googleSheetsClient.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: [
      `${sheetName}!H${id}:Q${id}`,
      `${sheetName}!U${id}:AD${id}`,
      `${sheetName}!AH${id}`,
      `${sheetName}!D${id}`,
      `${sheetName}!B${id}`,
    ],
  });

  // User Result
  const written_works = responseWPANU.data.valueRanges[0].values[0]
    .slice(0, 10)
    .map((val) => {
      if (!(val === null || val === undefined)) return val;
    });
  written_works.length = 10;
  for (let i = 0; i < written_works.length; i++) {
    if (!written_works[i]) written_works[i] = "";
  }

  const performance_tasks = responseWPANU.data.valueRanges[1].values.map(
    (row) => row.map((val) => val || "")
  );
  const quarterly_assessment = responseWPANU.data.valueRanges[2].values.map(
    (row) => row.map((val) => val || "")
  );
  const nameVal = responseWPANU.data.valueRanges[3].values.map((row) =>
    row.map((val) => val || "")
  );
  const userNameVal = responseWPANU.data.valueRanges[4].values.map((row) =>
    row.map((val) => val || "")
  );

  return {
    props: {
      max_written_works,
      max_performance_tasks,
      max_quarterly_assessment,
      written_works,
      performance_tasks,
      quarterly_assessment,
      nameVal,
      userNameVal,
    },
  };
}

const Post = (props) => {
  const {
    id,
    max_written_works,
    max_performance_tasks,
    max_quarterly_assessment,
    written_works,
    performance_tasks,
    quarterly_assessment,
    nameVal,
    userNameVal,
  } = props;

  useAuth();
  const { query } = useRouter();
  const [showBreakdown, setShowBreakdown] = useState(false);
  // console.log(written_works);
  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.setItem("isAuthenticated", false);
    Router.push("/");
    // router.push("https://grade-portal.vercel.app/");
  };

  // Helper functions
  const sumArray = (arr) => {
    if (!Array.isArray(arr)) {
      return 0;
    }
    return arr.reduce((a, b) => {
      if (isNaN(parseInt(b))) {
        return a;
      } else {
        return a + parseInt(b);
      }
    }, 0);
  };

  const calculatePercentage = (score, maxScore) =>
    ((score / maxScore) * 100).toFixed(3);
  const calculateWeightedScore = (percentage) => (percentage * 0.4).toFixed(3);

  // Written Works
  const sumMaxWrittenScore = sumArray(max_written_works);
  const sumYourWrittenScore = sumArray(written_works);
  const percentageWrittenScore = calculatePercentage(
    sumYourWrittenScore,
    sumMaxWrittenScore
  );
  const weightedWrittenScore = calculateWeightedScore(percentageWrittenScore);

  // Performance Tasks
  const sumMaxPerformanceScore = sumArray(max_performance_tasks[0]);
  const sumYourPerformanceScore = sumArray(performance_tasks[0]);
  const percentagePerformanceScore = calculatePercentage(
    sumYourPerformanceScore,
    sumMaxPerformanceScore
  );
  const weightedPerformanceScore = calculateWeightedScore(
    percentagePerformanceScore
  );

  // Quarterly Assessment
  const sumMaxQuarterlyScore = sumArray(max_quarterly_assessment[0]);
  const sumYourQuarterlyScore = sumArray(quarterly_assessment[0]);
  const percentageQuarterlyScore = calculatePercentage(
    sumYourQuarterlyScore,
    sumMaxQuarterlyScore
  );
  const weightedQuarterlyScore = (percentageQuarterlyScore * 0.2).toFixed(3);

  // Calculate initial grade and transmuted grade
  const initialGrade = (
    parseFloat(weightedPerformanceScore) +
    parseFloat(weightedWrittenScore) +
    parseFloat(weightedQuarterlyScore)
  ).toFixed(2);

  let transmutedGrade;
  if (initialGrade >= 59.99) {
    let lowestInitialGrade = 61.59;
    let temp = 60;
    for (let i = 75; i <= 100; i++) {
      if (initialGrade >= temp && initialGrade <= lowestInitialGrade) {
        transmutedGrade = i;
        break;
      } else {
        temp = lowestInitialGrade + 0.01;
        lowestInitialGrade += 1.6;
      }
    }
  } else {
    let lowestInitialGrade = 3.99;
    let temp = 0;
    for (let i = 60; i <= 74; i++) {
      if (initialGrade >= temp && initialGrade <= lowestInitialGrade) {
        transmutedGrade = i;
        break;
      } else {
        temp = lowestInitialGrade + 0.01;
        lowestInitialGrade += 4;
      }
    }
  }

  // Determine remarks based on transmuted grade
  let remarks = getRemarks(transmutedGrade);

  // Button text for show/hide breakdown
  const buttonText = showBreakdown ? "Hide Breakdown" : "Show Breakdown";

  // Array of numbers 1 to 10
  const numOneToTen = [
    " ",
    ...Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
  ];

  // Labels for different types of assessments: Used to change the 'name' with screen resolution
  const writtenWorksLabel = useBreakpointValue({
    base: "Written",
    md: "Written Works",
  });
  const performanceTasksLabel = useBreakpointValue({
    base: "Performance",
    md: "Performance Tasks",
  });
  const quarterlyAssessmentLabel = useBreakpointValue({
    base: "Assessment",
    md: "Quarterly Assessment",
  });

  return (
    <Flex>
      <Head title="GradExpress | Dashboard" />
      <Layout>
        <UserLogin {...{ userNameVal, nameVal, handleClick }} />
        <Flex mx={{ base: 5, md: 10, lg: 20, xl: 40 }}>
          <Tabs
            variant="enclosed-colored"
            w="100%"
            align={{ base: "center", lg: "start" }}>
            <TabList>
              <Tab>
                <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                  Science
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex
                  justify="space-around"
                  direction={{ base: "column", lg: "row" }}>
                  <Flex
                    justify="center"
                    align="center"
                    direction={{ base: "row", lg: "column" }}
                    gap={10}
                    pb={{ base: 10, lg: 0 }}>
                    <Flex direction={"column"} align={"center"}>
                      <CircularProgress
                        value={transmutedGrade}
                        size={{ base: 90, sm: 120, md: 150, lg: 200 }}
                        thickness={8}
                        color="yellow.300">
                        <CircularProgressLabel>
                          <Text fontSize={{ base: "lg", lg: "4xl" }}>
                            {transmutedGrade}
                          </Text>
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Flex direction="column" align="center">
                        <Text fontSize={{ base: "md", lg: "xl" }}>
                          Final Grade
                        </Text>
                        <Flex align={"center"}>
                          {/* <Text fontSize={{ base: "md", lg: "xl" }}>
                            {`Remarks: \u00A0\u00A0\u00A0\u00A0`}
                          </Text> */}

                          <Text
                            fontSize={{ base: "md", md: "lg", lg: "2xl" }}
                            as="b">
                            {remarks}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex direction={"column"} align={"center"}>
                      <CircularProgress
                        value={initialGrade}
                        size={{ base: 50, sm: 65, md: 90, lg: 100 }}
                        thickness={8}>
                        <CircularProgressLabel>
                          {initialGrade}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Flex
                        direction="column"
                        align="center"
                        justify={"center"}>
                        <Text fontSize={{ base: "md", lg: "xl" }}>
                          Initial Grade
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex justify="center" align="center" direction="column">
                    <Text fontSize={{ base: "xl", lg: "2xl" }} as="b">
                      Transmutation Table
                    </Text>
                    <T_Table />
                  </Flex>
                </Flex>
                <Flex justify="flex-end">
                  <Button
                    size={{ base: "sm", md: "md", lg: "lg" }}
                    fontSize={{ base: "xs", md: "md", lg: "lg" }}
                    bg="blue.600"
                    color="white"
                    my={5}
                    onClick={() => setShowBreakdown(!showBreakdown)}>
                    {buttonText}
                  </Button>
                </Flex>
                {showBreakdown ? (
                  <Breakdown
                    {...{
                      writtenWorksLabel,
                      performanceTasksLabel,
                      quarterlyAssessmentLabel,
                      numOneToTen,
                      max_written_works,
                      written_works,
                      max_performance_tasks,
                      performance_tasks,
                      sumMaxWrittenScore,
                      sumYourWrittenScore,
                      percentageWrittenScore,
                      weightedWrittenScore,
                      sumMaxPerformanceScore,
                      sumYourPerformanceScore,
                      percentagePerformanceScore,
                      weightedPerformanceScore,
                      sumMaxQuarterlyScore,
                      sumYourQuarterlyScore,
                      percentageQuarterlyScore,
                      weightedQuarterlyScore,
                    }}
                  />
                ) : (
                  // <p></p>
                  <p> </p>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Layout>
    </Flex>
  );
};

export default Post;
