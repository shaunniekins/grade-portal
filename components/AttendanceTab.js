import {
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function Attendance({ dates, handleChange, display }) {
  return (
    <Flex direction={"column"} justify={"center"} my={"50px"}>
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
          <Table variant={"simple"} size={{ base: "sm", md: "md", lg: "lg" }}>
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
  );
}

export default Attendance;
