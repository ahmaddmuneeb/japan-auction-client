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
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SortDropdown from "./SortDropdown";
import ImageModal from "./ImageModal";

// import SortDropdown from "./SortDropdown";

const apiUrl = "http://54.153.48.69:8000/api/cars/?page=1";

const SideBar = () => {
  const [carsData, setCarsData] = useState([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

  useEffect(() => {
    getCarsNow(apiUrl);
  }, []);

  const getCarsNow = async (page, sortParam = "") => {
    setCarsLoading(true);
    let urlWithSort = page;
    try {
      if (sortParam) {
        urlWithSort = `${page}${page.includes("?") ? "&" : "?"}ordering=${sortParam}`;
      }

      let response = await axios.get(urlWithSort, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setCarsData(response?.data);
      setNextUrl(response?.data?.next);
      setPrevUrl(response?.data?.previous);

      const totalItems = response?.data?.count || 0;
      const itemsPerPage = 50;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      let currentPage = 1;
      if (response?.data?.previous) {
        const prevPageParam = new URL(response?.data?.previous).searchParams.get("page");
        currentPage = prevPageParam ? parseInt(prevPageParam) + 1 : 1;
      } else if (response?.data?.next) {
        const nextPageParam = new URL(response?.data?.next).searchParams.get("page");
        currentPage = nextPageParam ? parseInt(nextPageParam) - 1 : 1;
      }

      setCurrentPage(currentPage);
      setCarsLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCarsLoading(false);
    }
  };

  const handleSortSelect = (sortValue) => {
    setCurrentSort(sortValue);
    getCarsNow(apiUrl, sortValue);
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Flex ml={{ base: "0", md: "7.5%" }} flexDirection={{ base: "column", md: "row" }}>
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
                    <Flex
                      px={4}
                      flexDirection={{ md: "row", base: "column" }}
                      justify={"space-between"}
                    >
                      <Text fontWeight={"bold"} fontSize={"4xl"} color={"blue.900"}>
                        Vehicles by GooNet
                      </Text>
                      <Text fontWeight={"bold"} fontSize={"xl"} color={"blue.900"} mt={4}>
                        Total Car Count: {carsData?.count || 0}
                      </Text>
                    </Flex>
                    <Box w={{ base: "100%", md: "250px" }} px={4}>
                      <SortDropdown onSelectSort={handleSortSelect} />
                    </Box>
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
                            onClick={() => openModal(car)} // Open modal on car click
                          >
                            <Box position="relative" maxH="400px">
                              {car?.images && car?.images.length > 0 ? (
                                <Image
                                  src={`${car?.images[0].image_url}`}
                                  alt="Main Featured Image"
                                  roundedTop="lg"
                                />
                              ) : null}
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
                    <Flex align="center" justify={"space-between"} mt={4} mx={4}>
                      <Text fontWeight="bold">
                        Page {currentPage} of {totalPages}
                      </Text>
                      <Box align="center" justify={"space-between"}>
                        <IconButton
                          color={"white"}
                          bgColor="blue.900"
                          _hover={{ bgColor: "blue.800" }}
                          onClick={() => prevUrl && getCarsNow(prevUrl, currentSort)}
                          isDisabled={!prevUrl}
                          mx={4}
                        >
                          <FaChevronLeft />
                        </IconButton>
                        <IconButton
                          color={"white"}
                          bgColor="blue.900"
                          _hover={{ bgColor: "blue.800" }}
                          onClick={() => nextUrl && getCarsNow(nextUrl, currentSort)}
                          isDisabled={!nextUrl}
                          mx={2}
                        >
                          <FaChevronRight />
                        </IconButton>
                      </Box>
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

        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageData={selectedCar?.images}
          selectedIndex={selectedImageIndex}
        />
      </Flex>
    </div>
  );
};

export default SideBar;
