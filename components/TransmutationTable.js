import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from "@chakra-ui/react";

const TransmutationTable = () => {
  const initialGrade_1 = [
    "100",
    "98.40 - 99.99",
    "96.80 - 98.39",
    "95.20 - 96.79",
    "93.60 - 95.19",
    "92.00 - 93.59",
    "90.40 - 91.99",
    "88.80 - 90.39",
    "87.20 - 88.79",
    "85.60 - 87.19",
    "84.00 - 85.59",
    "82.40 - 83.99",
    "80.80 - 82.39",
    "79.20 - 80.79",
    "77.60 - 79.19",
    "76.00 - 77.59",
    "74.40 - 75.99",
    "72.80 - 74.39",
    "71.20 - 72.79",
    "69.60 - 71.19",
    "68.00 - 69.59",
  ];

  const initialGrade_2 = [
    "",
    "66.40 - 67.99",
    "64.80 - 66.39",
    "63.20 - 64.79",
    "61.60 - 63.19",
    "60.00 - 61.59",
    "56.00 - 59.99",
    "52.00 - 55.99",
    "48.00 - 51.99",
    "44.00 - 47.99",
    "40.00 - 43.99",
    "36.00 - 39.99",
    "32.00 - 35.99",
    "28.00 - 31.99",
    "24.00 - 27.99",
    "20.00 - 23.99",
    "16.00 - 19.99",
    "12.00 - 15.99",
    "8.00 - 11.99",
    "4.00 - 7.99",
    "0 - 3.99",
  ];

  const trans_grade1 = [];
  for (let i = 0; i <= 20; i++) {
    trans_grade1[i] = 100 - i;
  }

  const trans_grade2 = [""];
  for (let i = 1; i <= 20; i++) {
    trans_grade2[i] = 80 - i;
  }

  return (
    <TableContainer
      maxH={{ base: "50%", md: "90%" }}
      h={{ base: "40vh", md: "70vh" }}
      overflowY={{ base: "scroll" }}>
      <Table
        variant="striped"
        overflowX={"auto"}
        // overflowY={"auto"}
        fontSize={{ base: "xs", md: "md" }}>
        <Thead>
          <Tr>
            <Th width="15%" textAlign="center">
              INITIAL GRADE
            </Th>
            <Th width="15%" textAlign="center">
              TRANSMUTED GRADE
            </Th>
            <Th width="15%" textAlign="center">
              INITIAL GRADE
            </Th>
            <Th width="15%" textAlign="center">
              TRANSMUTED GRADE
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {initialGrade_1.map((ig1, index) => (
            <Tr key={index}>
              <Td textAlign="center">{ig1}</Td>
              <Td textAlign="center">{trans_grade1[index]}</Td>
              <Td textAlign="center">{initialGrade_2[index]}</Td>
              <Td textAlign="center">{trans_grade2[index]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransmutationTable;
