import React from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";

const Headline = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={2}
      px={8}
      bg="blue.900"
      color="white"
      flexDirection={{ md: "row", base: "column" }}
    >
      <Box>
        <Text
          fontSize="sm"
          textAlign={{ base: "center" }}
          fontWeight={"semibold"}
        >
          « Welcome to Makar Auto! We specialize in helping you to drive the
          vehicle you want at payments you can afford »
        </Text>
      </Box>
      <Flex alignItems="center">
        <IconButton
          aria-label="Facebook"
          icon={<FaFacebook />}
          colorScheme="white"
          mr={2}
          as={"a"}
          href="https://www.facebook.com/people/MakarAuto/100092001133498/"
          target="_blank"
        />
        <IconButton
          aria-label="Instagram"
          icon={<FaInstagram />}
          colorScheme="white"
          as={"a"}
          href="https://www.instagram.com/makarauto.ca/"
          target="_blank"
        />
        <IconButton aria-label="Phone" icon={<BiPhone />} colorScheme="white" />
        <Text fontSize="sm" color="white" mr={4}>
          +1 (647) 694-9562
        </Text>
      </Flex>
    </Flex>
  );
};

export default Headline;
