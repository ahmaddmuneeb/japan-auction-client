"use client";

import {
  Box,
  Container,
  Heading,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import disclaimerData from "../../constants/DisclaimerData";

export default function Disclaimers() {
  return (
    <Box py={10}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Text
          fontWeight={"bold"}
          fontSize={"4xl"}
          textTransform={"uppercase"}
          color={"blue.900"}
        >
          Disclaimers
        </Text>
      </Stack>
      <Container maxW={"8xl"} mt={10}>
        <Box columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {disclaimerData.map((feature, index) => (
            <HStack key={index} align={"top"}>
              <Box color={"blue.900"} px={{ md: 2, base: 0 }} py={4}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text
                  fontWeight={"bold"}
                  color={"blue.900"}
                  fontSize={"2xl"}
                  pt={2}
                >
                  {feature.heading}
                </Text>
                <Text color={"gray.700"} fontSize={"md"} textAlign={"justify"}>
                  {feature.description}
                </Text>
              </VStack>
            </HStack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
