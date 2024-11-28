"use client";

import { Flex, Heading, Stack, Text, Button, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HeroImage = () => {
  const shadowColor = "rgba(26,54,93,0.3)";

  return (
    <Img
      borderRadius={{ md: "2xl" }}
      shadow={`0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
      src={
        "https://assets.cdn.filesafe.space/0ywmvQJ5n6EPQzas2upg/media/6480bd3ba2b3b1276909e322.jpeg"
      }
    />
  );
};

export default function HeroSection() {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "center" }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 8, md: 16 }}
      w={{ base: "100%", md: "90%" }}
      px={{ base: 0, md: 20 }}
      m={"auto"}
      justifyContent={"center"}
    >
      <Stack w={{ base: "100%", md: "40%" }} px={{ base: 3 }}>
        <Text
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={"blue.900"}
        >
          APPLY TODAY <br />
          <Text as={"span"} color={"#f9cd00"}>
            DRIVE TOMORROW
          </Text>
        </Text>
        <Text color={"gray.500"} maxW={"xl"}>
          We specialize in helping Families and Friends throughout GTA drive the
          vehicle they want at payments they can afford.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            px={16}
            py={6}
            color={"white"}
            bg={"#1a365d"}
            _hover={{ bg: "yellow.400" }}
            as={Link}
            to="/get-car-loan"
          >
            Get Your Car Loan
          </Button>
        </Stack>
      </Stack>
      <Flex w={{ base: "100%", md: "55%" }}>
        <HeroImage
          height={{ base: "24rem", md: "28rem" }}
          mt={{ base: 14, sm: 16 }}
        />
      </Flex>
    </Stack>
  );
}
