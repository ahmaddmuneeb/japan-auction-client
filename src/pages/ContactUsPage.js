"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Stack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
const apiUrl = process.env.REACT_APP_URL;
const headers = {
  "api-key": apiSecretKey,
};
export default function ContactUS() {
  const shadowColor = "rgba(26,54,93,0.3)";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const isValidEmail = /^\S+@\S+\.\S+$/.test(formData.email);
      if (formData.name && isValidEmail && formData.message) {
        const response = await axios.post(
          `${apiUrl}/contact/add-contact-query`,
          formData,
          { headers }
        );

        if (response.status === 200) {
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          toast.success("Email sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.error("Error data:", response.data);
        }
      }
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };
  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <ToastContainer />
      <Stack>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          textAlign={"center"}
          mt={{ base: 4, md: 8 }}
          fontWeight={"bold"}
        >
          <Text as={"span"} position={"relative"} color={"blue.900"}>
            Contact us
          </Text>
        </Text>
      </Stack>
      <Flex>
        <Box
          bg="white"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          shadow={`0 4px 6px 2px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box color={"blue.900"}>
                  <Text
                    fontSize={{ base: "2xl", md: "4xl", lg: "4xl" }}
                    fontWeight={"bold"}
                  >
                    Contact
                  </Text>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box
                    py={{ base: 5, sm: 5, md: 8, lg: 10 }}
                    color={"blue.900"}
                  >
                    <VStack
                      pl={0}
                      spacing={3}
                      alignItems="flex-start"
                      justifyContent="center"
                    >
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={"#1a365d"}
                        cursor={"pointer"}
                        _hover={{ color: "blue.700" }}
                        leftIcon={<MdEmail color="#1a365d" size="20px" />}
                      >
                        makar.autoinc@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        _hover={{ color: "blue.700" }}
                        color={"#1a365d"}
                        cursor={"pointer"}
                        leftIcon={<MdPhone color="#1a365d" size="20px" />}
                      >
                        +1 (647) 694-9562
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#e7e7e7" }}
                      color="#1a365d"
                      bg="#f5f5f5"
                      icon={<FaFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      color="#1a365d"
                      bg="#f5f5f5"
                      _hover={{ bg: "#e7e7e7" }}
                      icon={<FaInstagram size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg" boxShadow={"2xl"}>
                  <Box m={8} color="blue.900">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            value={formData.email}
                            type="email"
                            required
                            size="md"
                            name="email"
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="Send us your details..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          w={"full"}
                          variant="solid"
                          bg="blue.900"
                          color="white"
                          _hover={{}}
                          onClick={handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
