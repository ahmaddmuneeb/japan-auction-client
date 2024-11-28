"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import carImage from "../../assets/2.jpeg";
import backgroundImage from "../../assets/backgroundImage.png";
import { Link } from "react-router-dom";
export default function PreApproval() {
  return (
    <Box
      bgImage={backgroundImage}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      boxShadow="inset 0 0 0 2000px rgba(0,0,0,0.5)"
    >
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Box
              position={"relative"}
              height={"600px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={carImage}
                border="2px solid white"
              />
            </Box>
          </Flex>

          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Text
              fontWeight={"bold"}
              color={"white"}
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                color={"white"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}
              >
                Apply for Your Car Loan Online & Start Your Pre-Approval Process
                Today!
              </Text>
            </Text>
            <Text color={"white"} lineHeight={2.5} fontSize={"lg"}>
              Are you worried about your credit score?
              <br />
              Do you feel like you’ll never be able to get a loan for a car?
              <br />
              We’re here to help! At Makar Auto, we understand that life can
              sometimes get in the way of having perfect credit.
              <br />
              That’s why we work with you to find the best loan for your
              situation.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                size={"lg"}
                px={6}
                colorScheme={"#f9cd00"}
                bg={"#1a365d"}
                _hover={{ bg: "yellow.400" }}
                as={Link}
                to="/get-car-loan"
              >
                Get Pre-Approved Now!
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const Blob = () => {
  return <></>;
};
