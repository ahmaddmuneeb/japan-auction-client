// SideBar.jsx
import React, { useState, useEffect } from "react";
import {
  Flex,
  CircularProgress,
  Box,
  Heading,
  Container,
  Stack,
  Text,
  Image,
  Divider,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
// import SortDropdown from "./SortDropdown";

const apiUrl = process.env.REACT_APP_URL;

const SideBar = () => {
  const [carsData, setCarsData] = useState([]);
  const [carsLoading, setCarsLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    getCarsNow(apiUrl);
  }, []);

  const getCarsNow = async (page) => {
    setCarsLoading(true);
    // console.log("apiUrl", apiUrl);
    try {
      let response = await axios.get(page, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log({
      //   response: response?.data,
      // });
      setCarsData(response?.data);
      setNextUrl(response?.data?.next);
      setPrevUrl(response?.data?.previous);
      setCarsLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCarsLoading(false);
    }
  };

  // const setNextPage = () => {
  //   if (carsData && carsData.length > 0) {
  //     if (!carsData?.previous) {
  //       setPage((prev) => prev + 1);
  //     }
  //   }
  // };

  // const setPreviousPage = () => {
  //   if (carsData && carsData.length > 0) {
  //     if (!carsData?.previous) {
  //       setPage((prev) => prev - 1);
  //     }
  //   }
  // };

  return (
    <div>
      <Flex ml={{ base: "0", md: "7.5%" }} flexDirection={{ base: "column", md: "row" }}>
        {/* <VehicleFilter
          makes={makes}
          models={models}
          YearRange={yearRange}
          MileageRange={mileageRange}
          PriceRange={priceRange}
          bodyStyle={bodyStyle}
          selectedBodyStyle={selectedBodyStyle}
          driveTrain={driveTrain}
          fuel_type={fuel_type}
          selectedFuelType={selectedFuelType}
          selectedDriveTrain={selectedDriveTrain}
          setSelectedMakes={setSelectedMakes}
          setSelectedModels={setSelectedModels}
          setSelectedDriveTrain={setSelectedDriveTrain}
          setSelectedBodyStyle={setSelectedBodyStyle}
          setSelectedFuelTypes={setSelectedFuelType}
          setYearRange={setYearRange}
          setMileageRange={setMileageRange}
          setPriceRange={setPriceRange}
          setModels={setModels}
          // transmissions={transmissions}
          // selectedTransmissions={selectedTransmissions}
          selectedMakes={selectedMakes}
          selectedModels={selectedModels}
          onMakeChange={handleMakeChange}
          onModelChange={handleModelChange}
          onBodyChange={handleBodyChange}
          onDriveChange={handleDriveChange}
          onFuelChange={handleFuelTypes}
          // onTransmissionChange={handleTransmissionChange}
          onYearChange={handleYearChange}
          onMileageChange={handleMileageChange}
          onPriceChange={handlePriceChange}
          onKeywordChange={handleKeywordChange}
          onApplyFilters={() => handleApplyFilters()}
          rangeLoading={rangeLoading}
        /> */}
        {carsLoading ? (
          <>
            <Flex justifyContent="center" h={"80vh"} alignItems="center" w={"100%"}>
              <CircularProgress isIndeterminate color="blue.900" />
            </Flex>
          </>
        ) : (
          <>
            {carsData?.results?.length > 0 ? (
              <>
                <Box w={"100%"}>
                  <Container maxW={"8xl"} py={{ md: 8, base: 16 }} as={Stack} spacing={10}>
                    <Flex px={4} flexDirection={"column"}>
                      <Text fontWeight={"bold"} fontSize={"4xl"} color={"blue.900"}>
                        Vehicles
                      </Text>
                      {/* <Box w={{ base: "100%", md: "15%" }} mt={4}>
                        <SortDropdown onSelectSort={handleSortSelect} />
                      </Box> */}
                    </Flex>
                    <Flex alignItems="center" flexWrap="wrap" w={"full"}>
                      {carsData?.results?.map((car) => (
                        <Flex
                          px={4}
                          pb={8}
                          w={{ base: "100%", md: "calc(100% / 4)" }}
                          alignItems="center"
                          key={car?.id}
                        >
                          <Box
                            cursor={"pointer"}
                            maxW="sm"
                            borderWidth="1px"
                            rounded="lg"
                            shadow={`0 4px 6px -1px ${"#ddd"}, 0 2px 4px -1px ${"#ddd"}`}
                            position="relative"
                          >
                            <Box position="relative" maxH="400px">
                              <Image
                                src={`${car?.images[0].image_url}`}
                                alt="Main Featured Image"
                                roundedTop="lg"
                              />
                            </Box>

                            <Box px="4" py={4}>
                              <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Box>
                                  <Flex flexDirection={"column"} justifyContent={"center"}>
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
                                      {car?.car_brand_name}
                                    </Text>
                                  </Flex>
                                </Box>
                                <Divider flex={1} orientation="horizontal" mx={3} />
                                <Box>
                                  <Flex flexDirection={"column"} justifyContent={"center"}>
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
                                      {car?.car_year}
                                    </Text>
                                  </Flex>
                                </Box>
                              </Flex>
                              <Flex mt="1" justifyContent="space-between" alignContent="center">
                                <Box
                                  fontSize="md"
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
                                    label={car?.car_name}
                                    bg="white"
                                    placement={"top"}
                                    fontSize={"sm"}
                                    color={"blue.900"}
                                  >
                                    {car?.car_name}
                                  </Tooltip>
                                </Box>
                              </Flex>

                              <Flex justifyContent="space-between">
                                <Flex alignContent="center" flexDirection={"column"} flex={3}>
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
                                        ¥
                                      </Box>
                                      {`${formatNumberWithCommas(
                                        parseInt(car?.total_price).toString()
                                      )}`}
                                    </Box>

                                    <Divider flex={1} orientation="horizontal" mx={3} />
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

                                  <Flex flexDirection={"row"} mt={2} alignItems={"center"}>
                                    <Box
                                      fontSize="md"
                                      fontWeight={"semibold"}
                                      color="black"
                                      flex={2}
                                    >
                                      {`${car?.distance} ${"KM"}`}
                                    </Box>
                                    <Divider flex={1.5} orientation="horizontal" mx={3} />
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
                      ))}
                    </Flex>
                    <Flex align="center" justify={"center"} mt={4}>
                      <Button
                        color={"white"}
                        bgColor="blue.900"
                        _hover={{ bgColor: "blue.800" }}
                        onClick={() => prevUrl && getCarsNow(prevUrl)}
                        isDisabled={!prevUrl}
                        width={"16%"}
                        mx={4}
                      >
                        Previous
                      </Button>
                      {/* <div className="px-4"> View More </div> */}
                      <Button
                        color={"white"}
                        bgColor="blue.900"
                        _hover={{ bgColor: "blue.800" }}
                        onClick={() => nextUrl && getCarsNow(nextUrl)}
                        isDisabled={!nextUrl}
                        width={"16%"}
                        mx={2}
                      >
                        Next
                      </Button>
                    </Flex>
                  </Container>
                </Box>
              </>
            ) : (
              <>
                <Box textAlign="center" m={20} p={10}>
                  <Heading size="lg" color="blue.900">
                    No cars found!
                  </Heading>
                </Box>
              </>
            )}
          </>
        )}
      </Flex>
    </div>
  );
};

export default SideBar;
