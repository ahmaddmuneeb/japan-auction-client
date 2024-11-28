import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

const DetailsModal = ({ isOpen, handleClose, vehicle, navigateToDetails }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={"2xl"}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.1)" />
        <ModalContent>
          <ModalHeader>Vehicle Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container maxW={"6xl"}>
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={`data:image/jpeg;base64,${vehicle?.processed_image}`}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    fontWeight={"bold"}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "4xl" }}
                    py={4}
                  >
                    {vehicle?.vehicle_title &&
                    vehicle.vehicle_title.includes("null")
                      ? `${vehicle?.vehicle_year} ${vehicle?.vehicle_title
                          .replace("null", "")
                          .trim()}`
                      : vehicle?.vehicle_title}
                  </Heading>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={"500"}
                    fontSize={"xl"}
                    p={0}
                  >
                    $
                    {`${formatNumberWithCommas(
                      (parseInt(vehicle?.vehicle_price) + 2000).toString()
                    )}`}
                    <Text
                      as={"span"}
                      color={useColorModeValue("gray.900", "gray.400")}
                      fontSize={"xs"}
                      ml={2}
                    >
                      + HST & Licensing
                    </Text>
                  </Text>
                  <Button
                    onClick={() => navigateToDetails(vehicle)}
                    rounded={"none"}
                    w={"full"}
                    my={8}
                    py={6}
                    bg={"blue.900"}
                    color={useColorModeValue("white", "gray.900")}
                    textTransform={"uppercase"}
                    _hover={{
                      bg: "#F9CD00",
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Stack>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailsModal;
