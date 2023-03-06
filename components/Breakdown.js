import React, { useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function Breakdown({
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
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs align="center" variant={"soft-rounded"} colorScheme="blue">
      <TabList mb={3}>
        <Tab>
          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
            {writtenWorksLabel}
          </Text>
        </Tab>
        <Tab>
          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
            {performanceTasksLabel}
          </Text>
        </Tab>
        <Tab>
          <Text fontSize={{ base: "xs", md: "md", lg: "lg" }}>
            {quarterlyAssessmentLabel}
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* Written Works  */}
          <TableContainer>
            <Text as="b" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
              Written Works (40%)
            </Text>
            <Table variant="simple" size={{ base: "sm", md: "md", lg: "lg" }}>
              <Thead>
                <Tr>
                  {numOneToTen.map((num) => (
                    <Th>{num}</Th>
                  ))}
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
                      <Text>{`= ${percentageWrittenScore} * 40%`}</Text>
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
            <Text as="b" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
              Performance Tasks (40%)
            </Text>
            <Table variant="simple" size={{ base: "sm", md: "md", lg: "lg" }}>
              <Thead>
                <Tr>
                  {numOneToTen.map((num) => (
                    <Th>{num}</Th>
                  ))}
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
                      <Text>{`= ${percentagePerformanceScore} * 40%`}</Text>
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
            <Text as="b" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
              Quarterly Assessment (20%)
            </Text>
            <Table variant="simple" size={{ base: "sm", md: "md", lg: "lg" }}>
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
                <Tr>
                  <Th>Your Score</Th>
                  <Td colSpan={11}>
                    <div align="center">
                      <Text>{sumYourQuarterlyScore}</Text>
                    </div>
                  </Td>
                </Tr>
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
                      <Text>{`= ${percentageQuarterlyScore} * 20%`}</Text>
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
  );
}

export default Breakdown;
