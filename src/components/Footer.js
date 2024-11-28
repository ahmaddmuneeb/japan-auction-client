"use client";
import { useState } from "react";
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
// import LOGO from "../assets/makar-logo-official.png";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      target="_blank"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
const apiUrl = process.env.REACT_APP_URL;
const headers = {
  "api-key": apiSecretKey,
};

export default function Footer() {
  const [email, setEmail] = useState("");

  // const sendNewsLetter = async () => {
  //   try {
  //     await axios.post(
  //       `${apiUrl}/subscribers/add-subscriber`,
  //       {
  //         email: email,
  //       },
  //       { headers }
  //     );
  //     toast.success("Subscription successful!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //     // console.log("Subscription successful", response.data);
  //     setEmail("");
  //   } catch (error) {
  //     console.error("Subscription failed", error.message);
  //     toast.error(error.response.data.message || "Already Subscribed", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  return (
    <Box bg={useColorModeValue("white")} color={"blue.900"} boxShadow={"2xl"}>
      <ToastContainer />
      <Container as={Stack} maxW={"8xl"} px={8} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
          spacing={2}
          // justify-items="end"
        >
          <Stack spacing={6}>
            {/* <Box>
              <Image
                objectFit="contain"
                src={LOGO}
                alt="Dan Abramov"
                w={{ md: "34%", base: "60%" }}
              />
            </Box> */}
            <Text fontSize={"lg"} color="blue.900" fontWeight={"bold"}>
              © {moment().format("YYYY")} JA. All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Facebook"}
                href={
                  "https://www.facebook.com/"
                }
              >
                <FaFacebook size={"20px"} />
              </SocialButton>
              <SocialButton
                label={"Instagram"}
                href={"https://www.instagram.com/"}
              >
                <FaInstagram size={"20px"} />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize={"2xl"}>
              Company
            </Text>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/about-us"}
            >
              About us
            </Box>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/contact-us"}
            >
              Contact us
            </Box>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/inventory"}
            >
              Inventory 🚗
            </Box>
            {/* <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              href={"#/inventory"}
            >
              Services
            </Box> */}
            {/* <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              href={"#/finance"}
            >
              Finance
            </Box> */}
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize={"2xl"}>
              Support
            </Text>
            <Box
              as="a"
              // href={"#/contact-us"}
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
            >
              Help Center
            </Box>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/termsandconditions"}
            >
              Terms of Service
            </Box>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/privacypolicy"}
            >
              Privacy Policy
            </Box>
            <Box
              as="a"
              _hover={{
                color: "blue.700",
              }}
              fontWeight={"400"}
              color={"blue.900"}
              // href={"#/reviews"}
            >
              Reviews
            </Box>
          </Stack>
          {/* <Stack align={{ md: "flex-start", sm: "center" }}>
            <Heading fontWeight="bold" fontSize={"xl"}>
              Stay up to date
            </Heading>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("whitesmoke")}
                border={0}
                className="text-white"
                _focus={{
                  bg: "whiteAlpha.300",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <IconButton
                bg={useColorModeValue("blue.900")}
                color={useColorModeValue("white")}
                onClick={sendNewsLetter}
                _hover={{
                  bg: "green.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack> */}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
