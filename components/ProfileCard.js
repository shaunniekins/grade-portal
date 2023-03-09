import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const ProfileCard = ({
  nameDisplay,
  schoolYearDisplay,
  sheetNameDisplay,
  lrnDisplay,
  gradeDisplay,
}) => {
  return (
    <Box
      bg="white"
      px={4}
      py={7}
      rounded="xl"
      boxShadow="xl"
      w={{ base: 200, md: 300 }}
      border={"2px"}
      borderColor={"blue.600"}>
      <Flex
        direction={"column"}
        align={"center"}
        mb={{ base: "1rem", md: "2rem" }}>
        <Image
          borderRadius="full"
          boxSize={{ base: "60px", md: "90px" }}
          objectFit="cover"
          src="https://www.ccair.org/wp-content/uploads/2015/04/wallpaper-for-facebook-profile-photo-e1440624505574.jpg"
          alt="Dan Abramov"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Flex>
      <VStack
        spacing={2}
        align="flex-start"
        fontSize={{ base: "sm", md: "lg" }}>
        <Text>{`Name: ${nameDisplay}`}</Text>
        <Text>{`LRN: ${lrnDisplay}`}</Text>
        <Text>{`School Year: ${schoolYearDisplay}`}</Text>
        <Text>{`Grade: ${gradeDisplay}`}</Text>
        <Text>{`Section: ${sheetNameDisplay}`}</Text>
      </VStack>
    </Box>
  );
};

export default ProfileCard;

export const ProfileCard2 = ({
  nameDisplay,
  schoolYearDisplay,
  sheetNameDisplay,
  lrnDisplay,
  gradeDisplay,
  selectedSchoolOption,
  selectedQuarterOption,
  selectedSubjectOption,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  // Array of texts
  const texts = [
    `Name: ${nameDisplay}`,
    `LRN: ${lrnDisplay}`,
    `School Year: ${schoolYearDisplay}`,
    <Box h="1rem" />,
    <Divider orientation="horizontal" />,
    `Grade: ${gradeDisplay}`,
    `Section: ${sheetNameDisplay}`,
    `School: ${selectedSchoolOption.toUpperCase()}`,
    `Quarter: ${
      selectedQuarterOption.charAt(0).toUpperCase() +
      selectedQuarterOption.slice(1)
    } Quarter`,
    `Subject: ${selectedSubjectOption}`,
  ];

  return (
    <Box
      bg="white"
      p={3}
      rounded="xl"
      // boxShadow="xl"
      w={{ base: 200, md: 400 }}
      border={"4px"}
      borderColor={"blue.600"}
      overflow={showMore ? "visible" : "hidden"}
      position={showMore ? "absolute" : "static"}
      zIndex={showMore ? "1" : "0"}>
      <Flex
        direction={"column"}
        align={"center"}
        mb={{ base: "unset", md: "1rem" }}>
        <Image
          borderRadius="full"
          boxSize={{ base: "60px", md: "90px" }}
          objectFit="cover"
          src="https://www.ccair.org/wp-content/uploads/2015/04/wallpaper-for-facebook-profile-photo-e1440624505574.jpg"
          alt="Dan Abramov"
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Flex>
      <VStack spacing={2} fontSize={{ base: "sm", md: "lg" }}>
        <Flex direction={"column"} align="flex-start">
          {texts.slice(0, 2).map((text, i) => (
            <Text key={text + i}>{text}</Text>
          ))}
          {showMore ? (
            texts.slice(2).map((text, i) => <Text key={text + i}>{text}</Text>)
          ) : (
            <></>
          )}
        </Flex>
        <Text
          as="kbd"
          fontSize={{ base: "xs", md: "sm" }}
          cursor={"pointer"}
          onClick={handleClick}>
          {showMore ? "Less ↑" : `More ↓`}
        </Text>
      </VStack>
    </Box>
  );
};
