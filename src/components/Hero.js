"use client";
import SearchHomeFilter from "./SearchHomeFilter";
import { Stack, Flex, VStack, useBreakpointValue, Box } from "@chakra-ui/react";
import HeroBanner from "../assets/car.jpg";

export default function Hero() {
  return (
    <Flex
      w={"full"}
      h={{ md: "60vh", base: "75vh" }}
      position="relative"
      backgroundImage={HeroBanner}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
      />
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 2, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack align={"flex-start"}>
          <SearchHomeFilter />
        </Stack>
      </VStack>
    </Flex>
  );
}
