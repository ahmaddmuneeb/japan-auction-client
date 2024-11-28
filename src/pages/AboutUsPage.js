"use client";

import { Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Stack rounded={"xl"} m={{ base: 4, md: 8 }} h={{ md: "100%" }}>
      <Stack>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          textAlign={"center"}
          mt={{ base: 4, md: 8 }}
          fontWeight={"bold"}
        >
          <Text as={"span"} position={"relative"} color={"blue.900"}>
            About us
          </Text>
        </Text>
      </Stack>

      <Stack display={"flex"} alignItems={"center"}>
        <Flex py={4} px={16} flex={1} align={"center"}>
          <Stack spacing={6} w={"full"} maxW={"8xl"}>
            <Text
              color={"blue.900"}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"justify"}
            >
              At MakarAuto, Our establishment specializes in providing
              top-quality preowned vehicles to meet the diverse needs of our
              valued customers. With a dedicated sales team and highly skilled
              technicians, we strive to make every auto shopping experience not
              just satisfactory, but enjoyable, easy, and financially
              advantageous.
            </Text>
          </Stack>
        </Flex>
      </Stack>

      <Stack display={"flex"} alignItems={"center"}>
        <Flex py={8} px={16} flex={1} align={"center"}>
          <Stack spacing={6} w={"full"} maxW={"8xl"}>
            <Text
              color={"blue.900"}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"justify"}
            >
              At MakarAuto, we prioritize the individual needs of each customer
              with the utmost care and attention. We understand that every car
              buyer has unique preferences and expectations, and we are
              committed to surpassing those standards with every interaction.
              Our goal is not just to sell vehicles, but to build lasting
              relationships based on trust, integrity, and excellence in
              service.
            </Text>
            <Text
              color={"blue.900"}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"justify"}
            >
              Our commitment to excellence extends beyond just sales; MakarAuto
              is dedicated to maintaining long-term relationships with our
              customers. From the moment you step onto our lot to long after
              you've driven off in your ideal car, truck, or SUV, you can trust
              that our team will be there to support you every step of the way.
            </Text>
            <Text
              color={"blue.900"}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={"justify"}
            >
              MakarAuto stands as a beacon of reliability, trustworthiness, and
              customer-centric service in the automotive industry. Whether
              you're in search of your next vehicle or require expert
              maintenance and repairs, we invite you to experience the MakarAuto
              difference today. Let our excellent network of professionals guide
              you towards finding the perfect automotive solution for your
              needs.
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
}
