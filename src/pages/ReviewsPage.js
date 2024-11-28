"use client";

import { Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Feedback from "../components/Feedback";

export default function Reviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Stack rounded={"xl"} m={{ base: 4, md: 8 }}>
      <Stack>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          textAlign={"center"}
          mt={{ base: 4, md: 8 }}
        >
          <Text as={"span"} position={"relative"} color={"blue.900"}>
            Our Customer Reviews
          </Text>
        </Heading>
      </Stack>
      <Feedback showTitle={true} />
    </Stack>
  );
}
