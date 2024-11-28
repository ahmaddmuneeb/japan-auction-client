"use client";

import React, { useState, useEffect, useRef } from "react";
// import React ,  from "react";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import {
  Box,
  Flex,
  CircularProgress,
  Stack,
  Image,
  Icon,
  Heading,
  Container,
  Tooltip,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Previous, Paginator, Next, PageGroup } from "chakra-paginator";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  setSlideshowVehicle,
  clearSlideshowVehicle,
} from "../redux/slices/counterSlice";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import SortDropdown from "./SortDropdown";
// import DetailsModal from "./DetailsModal";

const itemsPerPage = 12;

const FilteredVehicleList = ({
  vehicles,
  currentPage,
  setCurrentPage,
  loading,
  handleSortSelect,
}) => {
  const topOfComponentRef = useRef(null);

  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const shadowColor = "rgba(26,54,93,0.3)";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (topOfComponentRef.current) {
      // Get the current scroll position
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      // Scroll to the target element's position minus 50 pixels
      window.scrollTo({
        top: topOfComponentRef.current.offsetTop - 200,
        behavior: "smooth",
      });
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigateToDetails = (vehicle) => {
    vehicle.processed_image = {};
    dispatch(clearSlideshowVehicle());
    dispatch(setSlideshowVehicle(vehicle));
    navigate(`/vehicle/${vehicle?._id}`);
  };

  // const handleOpen = (vehicleId) => {
  //   setSelectedVehicleId(vehicleId);
  //   setIsOpen(true);
  // };
  // const handleClose = () => {
  //   setIsOpen(false);
  //   setSelectedVehicleId(null);
  // };

  return (
    <div ref={topOfComponentRef}>
      <Box w={"100%"}>
        <Container
          maxW={"8xl"}
          py={{ md: 8, base: 16 }}
          as={Stack}
          spacing={10}
        >
          <Flex px={4} flexDirection={"column"}>
            <Text fontWeight={"bold"} fontSize={"4xl"} color={"blue.900"}>
              Vehicles
            </Text>
            <Box w={{ base: "100%", md: "15%" }} mt={4}>
              <SortDropdown onSelectSort={handleSortSelect} />
            </Box>
          </Flex>
          {loading ? (
            <Flex justifyContent="center" h={"50vh"} alignItems="center">
              <CircularProgress isIndeterminate color="blue.900" />
            </Flex>
          ) : (
            <>
              <Flex alignItems="center" flexWrap="wrap" w={"full"}>
                {vehicles?.data?.length > 0 &&
                  vehicles?.data?.map(
                    (vehicle) =>
                      vehicle?.vehicle_price != 0 && (
                        <Flex
                          px={4}
                          pb={8}
                          w={{ base: "100%", md: "calc(100% / 4)" }}
                          alignItems="center"
                          key={vehicle?._id}
                        >
                          {/* <DetailsModal
                          isOpen={selectedVehicleId === vehicle?._id}
                          setIsOpen={setIsOpen}
                          handleClose={handleClose}
                          vehicle={vehicle}
                          navigateToDetails={navigateToDetails}
                        /> */}
                          <Box
                            onClick={() => navigateToDetails(vehicle)}
                            cursor={"pointer"}
                            maxW="sm"
                            // maxW="lg" // Adjust this value to increase the maximum width of the image

                            borderWidth="1px"
                            rounded="lg"
                            shadow={`0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
                            position="relative"
                          >
                            <Box position="relative" maxH="400px">
                              <Image
                                src={`data:image/jpeg;base64,${vehicle?.processed_image}`}
                                alt="Main Featured Image"
                                // h={"180px"}
                                roundedTop="lg"
                              />
                              <Box position="absolute" bottom="1" right="3">
                                <Tooltip
                                  label="View details"
                                  bg="white"
                                  placement={"top"}
                                  fontSize={"sm"}
                                  color={"blue.900"}
                                >
                                  <Box>
                                    <Icon
                                      // onClick={() => handleOpen(vehicle?._id)}
                                      cursor={"pointer"}
                                      as={FiSearch}
                                      h={10}
                                      w={10}
                                      alignSelf={"center"}
                                      bg={"blue.900"}
                                      _hover={{
                                        bg: "yellow.400",
                                      }}
                                      p={2}
                                      borderRadius={"100%"}
                                      color={"white"}
                                    />
                                  </Box>
                                </Tooltip>
                              </Box>
                            </Box>

                            <Box px="4" py={4}>
                              <Flex
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Box>
                                  <Flex
                                    flexDirection={"column"}
                                    justifyContent={"center"}
                                  >
                                    <Box
                                      as="span"
                                      fontSize="lg"
                                      fontWeight={"semibold"}
                                      color="black"
                                    >
                                      Make
                                    </Box>{" "}
                                    <Text fontWeight={"semibold"} fontSize="xl">
                                      {" "}
                                      {vehicle?.vehicle_make}
                                    </Text>
                                  </Flex>
                                </Box>
                                <Divider
                                  flex={1}
                                  orientation="horizontal"
                                  mx={3}
                                />
                                <Box>
                                  <Flex
                                    flexDirection={"column"}
                                    justifyContent={"center"}
                                  >
                                    <Box
                                      as="span"
                                      fontSize="lg"
                                      fontWeight={"semibold"}
                                      color="black"
                                    >
                                      Model
                                    </Box>{" "}
                                    <Text fontWeight={"semibold"} fontSize="xl">
                                      {" "}
                                      {vehicle?.vehicle_model}
                                    </Text>
                                  </Flex>
                                </Box>
                              </Flex>
                              <Flex
                                mt="1"
                                justifyContent="space-between"
                                alignContent="center"
                              >
                                <Box
                                  fontSize="md"
                                  // fontWeight="bold"
                                  as="h4"
                                  cursor={"pointer"}
                                  textAlign={"left"}
                                  color={"black"}
                                  h={"76px"}
                                  my={2}
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                >
                                  <Tooltip
                                    label={
                                      vehicle?.vehicle_title &&
                                      vehicle.vehicle_title.includes("null")
                                        ? `${
                                            vehicle?.vehicle_year
                                          } ${vehicle?.vehicle_title
                                            .replace("null", "")
                                            .trim()}`
                                        : vehicle?.vehicle_title
                                    }
                                    bg="white"
                                    placement={"top"}
                                    fontSize={"sm"}
                                    color={"blue.900"}
                                  >
                                    {vehicle?.vehicle_title &&
                                    vehicle.vehicle_title.includes("null")
                                      ? `${
                                          vehicle?.vehicle_year
                                        } ${vehicle?.vehicle_title
                                          .replace("null", "")
                                          .trim()}`
                                      : vehicle?.vehicle_title}
                                  </Tooltip>
                                </Box>
                              </Flex>
                              {/* <Flex
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Box>
                                <Flex
                                  flexDirection={"column"}
                                  justifyContent={"center"}
                                >
                                  <Box
                                    as="span"
                                    fontSize="lg"
                                    fontWeight={"semibold"}
                                    color="black"
                                  >
                                    Model
                                  </Box>{" "}
                                  {vehicle?.vehicle_model}
                                </Flex>
                              </Box>
                              <Divider
                                flex={1}
                                orientation="horizontal"
                                mx={3}
                              />
                              <Box>
                                <Flex
                                  flexDirection={"column"}
                                  justifyContent={"center"}
                                >
                                  <Box
                                    as="span"
                                    fontSize="lg"
                                    fontWeight={"semibold"}
                                    color="black"
                                  >
                                    Year
                                  </Box>{" "}
                                  {vehicle?.vehicle_year}
                                </Flex>
                              </Box>
                            </Flex> */}
                              <Flex justifyContent="space-between">
                                <Flex
                                  alignContent="center"
                                  flexDirection={"column"}
                                  // mt={2}
                                  flex={3}
                                >
                                  {/* <Flex
                                  flexDirection={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  // mt={2}
                                  w={"100%"}
                                >
                                  <Box
                                    fontSize="lg"
                                    fontWeight={"semibold"}
                                    color="black"
                                    flex={1.5}
                                  >

                                    {vehicle?.vehicle_year}

                                  </Box>

                                  <Divider
                                    flex={1}
                                    orientation="horizontal"
                                    mx={3}
                                  />
                                  <Box
                                    as="span"
                                    fontSize={"15px"}
                                    flex={2}
                                    fontWeight={"normal"}
                                    textAlign={"right"}
                                  >
                                  Year
                                  </Box>
                                </Flex> */}

                                  <Flex
                                    flexDirection={"row"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    mt={2}
                                    w={"100%"}
                                  >
                                    <Box
                                      fontSize="2xl"
                                      fontWeight={"semibold"}
                                      color="black"
                                      flex={1.5}
                                    >
                                      <Box as="span" color={"black"}>
                                        $
                                      </Box>
                                      {`${formatNumberWithCommas(
                                        (
                                          parseInt(vehicle?.vehicle_price) +
                                          2000
                                        ).toString()
                                      )}`}
                                    </Box>

                                    <Divider
                                      flex={1}
                                      orientation="horizontal"
                                      mx={3}
                                    />
                                    <Box
                                      as="span"
                                      fontSize={"10px"}
                                      flex={2}
                                      fontWeight={"normal"}
                                      textAlign={"right"}
                                    >
                                      + HST & Licensing
                                    </Box>
                                  </Flex>

                                  <Flex
                                    flexDirection={"row"}
                                    mt={2}
                                    alignItems={"center"}
                                  >
                                    <Box
                                      fontSize="md"
                                      fontWeight={"semibold"}
                                      color="black"
                                      flex={2}
                                    >
                                      {`${
                                        vehicle?.vehicle_milage_value
                                      } ${"KM"}`}
                                    </Box>
                                    <Divider
                                      flex={1.5}
                                      orientation="horizontal"
                                      mx={3}
                                    />
                                    <Box
                                      as="span"
                                      fontSize={"10px"}
                                      fontWeight={"normal"}
                                      flex={2}
                                      textAlign={"right"}
                                    >
                                      Mileage
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Box>
                          </Box>
                        </Flex>
                      )
                  )}
              </Flex>
            </>
          )}
          {loading ? null : (
            <Box display={"flex"} justifyContent={"center"}>
              <Paginator
                outerLimit={2}
                innerLimit={2}
                activeStyles={{
                  bg: "blue.900",
                  width: 8,
                  height: 8,
                  color: "white",
                }}
                normalStyles={{
                  width: 8,
                  height: 8,
                }}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pagesQuantity={
                  Math.ceil(vehicles?.totalDocs / itemsPerPage)
                }
              >
                <Container
                  as={Flex}
                  flexDirection={"row"}
                  alignItems="center"
                  justify="space-between"
                  w={"full"}
                  p={4}
                >
                  <Previous mx={4}>
                    <FaArrowLeft />
                  </Previous>
                  <PageGroup />
                  <Next mx={4}>
                    <FaArrowRight />
                  </Next>
                </Container>
              </Paginator>
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default FilteredVehicleList;
