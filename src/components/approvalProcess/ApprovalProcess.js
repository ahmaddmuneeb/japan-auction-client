import React from "react";
import { Box, Flex, Image, Text, Center } from "@chakra-ui/react";
import headingImage from "../../assets/heading.png";
import imageSrc1 from "../../assets/card1.png";
import imageSrc2 from "../../assets/card2.png";
import imageSrc3 from "../../assets/card3.png";

function ApprovalProcess() {
  return (
    <Box>
      <Flex align="center" justify="center" bg="#f9cd00" h="200px">
        <Image src={headingImage} alt="Logo" h={{ base: "40%", md: "70%" }} />
      </Flex>

      <Flex
        justifyContent="space-around"
        py={{ base: 8, md: 16 }}
        flexDirection={{ base: "column", md: "row" }}
        w={"85%"}
        mx={"auto"}
        maxWidth="100%"
        color={"#1a365d"}
      >
        <Center
          flexDir="column"
          textAlign="center"
          mb={{ base: 4, md: 0 }}
          flex={1}
        >
          <Image src={imageSrc1} alt="Image 1" borderRadius="md" maxW="60%" />
          <Text fontWeight={800} fontSize={{ base: "2xl", md: "3xl" }} mt={2}>
            SUBMIT APPLICATION
          </Text>
          <Text maxW="64%" fontSize={{ base: "md", md: "lg" }}>
            The entire process begins as soon as you fill out and submit the our
            online application. We will review your details and then immediately
            reach out through your preferred communication method.
          </Text>
        </Center>

        {/* Box 2 */}
        <Center
          flexDir="column"
          textAlign="center"
          mb={{ base: 4, md: 0 }}
          flex={1}
        >
          <Image src={imageSrc2} alt="Image 2" borderRadius="md" maxW="60%" />
          <Text fontWeight={800} fontSize={{ base: "2xl", md: "3xl" }} mt={2}>
            SELECT YOUR VEHICLE
          </Text>
          <Text maxW="64%" fontSize={{ base: "md", md: "lg" }}>
            Now for the fun part! With your pre-approved loan in-hand, you can
            now explore our massive indoor showroom where you will find an
            incredible selection of high-quality used cars, trucks, and SUVs.
          </Text>
        </Center>

        {/* Box 3 */}
        <Center
          flexDir="column"
          justifyContent={"flex-start"}
          textAlign="center"
          mb={{ base: 4, md: 0 }}
          flex={1}
        >
          <Image src={imageSrc3} alt="Image 3" borderRadius="md" maxW="60%" />
          <Text fontWeight={800} fontSize={{ base: "2xl", md: "3xl" }} mt={2}>
            ENJOY THE DRIVE
          </Text>
          <Text maxW="64%" fontSize={{ base: "md", md: "lg" }}>
            After purchasing a vehicle from us we'll arrange a day and time to
            pickup your new ride.{" "}
          </Text>
        </Center>
      </Flex>
    </Box>
  );
}

export default ApprovalProcess;
