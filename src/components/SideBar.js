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
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SortDropdown from "./SortDropdown";
import ImageModal from "./ImageModal";
import { GrLocation } from "react-icons/gr";
import moment from "moment/moment";

// import SortDropdown from "./SortDropdown";

const apiUrl = "http://54.153.48.69:8000/api/cars/?page=1";

const SideBar = () => {
  const [carsData, setCarsData] = useState([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [currentSort, setCurrentSort] = useState("");
  const [carSearch, setCarSearch] = useState("");
  const [carYear, setCarYear] = useState("");
  const [disRange, setDisRange] = useState([10, 600000]);
  const [priceRange, setPriceRange] = useState([50000, 100000000]);
  const [fuelType, setFuelType] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getCarsNow(apiUrl);
  }, [carSearch, carYear]);

  const getCarsNow = async (
    page,
    sortParam = "",
    priceMin = null,
    priceMax = null,
    disMin = null,
    disMax = null,
    fuel = ""
  ) => {
    setCarsLoading(true);
    try {
      let urlWithSort = new URL(page);
      const params = urlWithSort.searchParams;

      // Add or update the query parameters
      if (sortParam) {
        params.set("ordering", sortParam);
      }
      if (carSearch) {
        params.set("car_brand_name", carSearch);
      }
      if (carYear) {
        params.set("car_year", carYear);
      }
      if (priceMin !== null) {
        params.set("price__gte", priceMin);
      }
      if (priceMax !== null) {
        params.set("price__lte", priceMax);
      }
      if (disMin !== null) {
        params.set("distance__gte", disMin);
      }
      if (disMax !== null) {
        params.set("distance__lte", disMax);
      }
      if (fuel) {
        params.set("fuel", fuel);
      }

      urlWithSort.search = params.toString();

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

  const handleClearFilters = () => {
    setCurrentSort("");
    setPriceRange([1000, 500000]);
    setDisRange([1000, 500000]);
    setFuelType("");
    getCarsNow(
      "http://54.153.48.69:8000/api/cars/?page=1",
      "", // Empty string for price range (no filter applied)
      null, // No price filter (min)
      null, // No price filter (max)
      null, // No mileage filter (min)
      null, // No mileage filter (max)
      "" // No fuel type filter
    );
  };

  return (
    <div>
      <Container maxW={"8xl"} py={{ md: 8, base: 4 }} as={Stack} spacing={10}>
        <Flex px={4} flexDirection={{ md: "row", base: "column" }} justify={"space-between"}>
          <Text fontWeight={"bold"} fontSize={"4xl"} color={"blue.900"}>
            Vehicles by GooNet
          </Text>
          <Text fontWeight={"bold"} fontSize={"xl"} color={"blue.900"} mt={4}>
            Total Car Count: {carsData?.count || 0}
          </Text>
        </Flex>
        <Box w={{ base: "100%", md: "100%" }} px={0}>
          <Flex px={4} flexDirection={{ md: "row", base: "column" }} justify={"space-between"}>
            <Box mr={{ base: 0, md: 2 }} my={{ base: 2, md: 0 }} w={"full"}>
              <SortDropdown onSelectSort={handleSortSelect} />
            </Box>
            <Input
              placeholder="Car Name"
              value={carSearch}
              onChange={(e) => setCarSearch(e.target.value)}
              mx={{ base: 0, md: 2 }}
              my={{ base: 2, md: 0 }}
            />
            <Input
              placeholder="Car Year"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              ml={{ base: 0, md: 2 }}
              my={{ base: 2, md: 0 }}
            />
          </Flex>
        </Box>
        <Box w={{ base: "100%", md: "100%" }} px={0}>
          <Flex px={4} flexDirection={{ md: "row", base: "column" }} justify={"space-between"}>
            <Box mr={{ base: 0, md: 2 }} my={{ base: 2, md: 0 }}>
              <Select
                placeholder="Select fuel type"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="gasoline">Gasoline</option>
                <option value="hybrid">Hybrid</option>
                <option value="diesel">Diesel</option>
              </Select>
            </Box>
            <Box
              flexDirection={"column"}
              w={{ md: "40%", base: "full" }}
              mx={{ base: 0, md: 2 }}
              my={{ base: 2, md: 0 }}
            >
              <Box>
                <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                  Mileage
                </Text>
                <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                    {`${formatNumberWithCommas(disRange[0])} KM`}
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                    {`${formatNumberWithCommas(disRange[1])} KM`}
                  </Text>
                </Flex>
              </Box>
              <RangeSlider
                // defaultValue={[20000, 500000]}
                // 10, 600000
                min={10}
                max={600000}
                step={500}
                value={disRange}
                onChange={(val) => setDisRange(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack bg="blue.800" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} bg={"white"} boxSize={6} />
                <RangeSliderThumb index={1} bg={"white"} boxSize={6} />
              </RangeSlider>
            </Box>
            <Box
              flexDirection={"column"}
              w={{ md: "40%", base: "full" }}
              ml={{ base: 0, md: 2 }}
              my={{ base: 2, md: 0 }}
            >
              <Box>
                <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                  Price Range
                </Text>
                <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                    {`¥${formatNumberWithCommas(priceRange[0])}`}
                  </Text>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"blue.800"}>
                    {`¥${formatNumberWithCommas(priceRange[1])}`}
                  </Text>
                </Flex>
              </Box>
              <RangeSlider
                // defaultValue={[20000, 500000]}
                min={50000}
                max={100000000}
                step={10000}
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack bg="blue.800" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} bg={"white"} boxSize={6} />
                <RangeSliderThumb index={1} bg={"white"} boxSize={6} />
              </RangeSlider>
            </Box>
          </Flex>
        </Box>
        <Box w={{ base: "100%", md: "100%" }} px={0}>
          <Flex
            px={4}
            flexDirection={{ md: "row", base: "column" }}
            justify={"flex-end"}
            align={"center"}
          >
            <Button
              colorScheme="blue"
              w={{ md: "20%", base: "full" }}
              mr={{ base: 0, md: 2 }}
              mb={{ base: 2, md: 0 }}
              onClick={() =>
                getCarsNow(
                  "http://54.153.48.69:8000/api/cars/?page=1",
                  "",
                  priceRange[0],
                  priceRange[1],
                  disRange[0],
                  disRange[1],
                  fuelType
                )
              }
            >
              Apply Price Filter
            </Button>
            <Button
              colorScheme="red"
              w={{ md: "20%", base: "full" }}
              ml={{ base: 0, md: 2 }}
              onClick={handleClearFilters}
            >
              Clear All Filters
            </Button>
          </Flex>
        </Box>
      </Container>
      <Flex>
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
                  <Container maxW={"8xl"} py={{ md: 8, base: 4 }} as={Stack} spacing={10}>
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
                            onClick={() => openModal(car)}
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
                              <Flex justifyContent="space-between" alignItems="center">
                                <Box
                                  cursor={"pointer"}
                                  color={"black"}
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  fontSize="xl"
                                  fontWeight={"semibold"}
                                >
                                  {car?.car_name}
                                </Box>
                              </Flex>
                              <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Box>
                                  <Flex flexDirection={"column"} justifyContent={"center"}>
                                    <Box
                                      as="span"
                                      fontSize="md"
                                      fontWeight={"semibold"}
                                      color="black"
                                    >
                                      Make
                                    </Box>
                                    <Text fontWeight={"semibold"} fontSize="md">
                                      {car?.car_brand_name}
                                    </Text>
                                  </Flex>
                                </Box>
                                <Divider flex={1} orientation="horizontal" mx={3} />
                                <Box>
                                  <Flex flexDirection={"column"} justifyContent={"center"}>
                                    <Box
                                      as="span"
                                      fontSize="md"
                                      fontWeight={"semibold"}
                                      color="black"
                                    >
                                      Model
                                    </Box>
                                    <Text fontWeight={"semibold"} fontSize="md">
                                      {car?.car_year}
                                    </Text>
                                  </Flex>
                                </Box>
                              </Flex>

                              <Box
                                cursor={"pointer"}
                                color={"black"}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize="md"
                                fontWeight={"semibold"}
                              >
                                <Flex flexDirection={"row"} align={"center"}>
                                  <GrLocation />
                                  <Text fontWeight={"normal"} ml={2} fontSize="md">
                                    {car?.location}
                                  </Text>
                                </Flex>
                              </Box>

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
                                      {`${formatNumberWithCommas(parseInt(car?.price).toString())}`}
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

                                  <Flex flexDirection={"row"} mt={2} alignItems={"center"}>
                                    <Box
                                      fontSize={"10px"}
                                      fontWeight={"semibold"}
                                      color="black"
                                      flex={2}
                                    >
                                      {moment(car?.create_at).format("MMM DD, YYYY - HH:MM:SS")}
                                    </Box>
                                    <Divider flex={1.5} orientation="horizontal" mx={3} />
                                    <Box
                                      as="span"
                                      fontSize={"10px"}
                                      fontWeight={"normal"}
                                      flex={2}
                                      textAlign={"right"}
                                    >
                                      Added
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
                <Box textAlign="center" m={20} p={10} width={"100%"}>
                  <Heading size="lg" color="blue.900">
                    No cars found!
                  </Heading>
                </Box>
              </>
            )}
          </>
        )}

        {selectedCar && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageData={selectedCar?.images}
            selectedIndex={selectedImageIndex}
          />
        )}
      </Flex>
    </div>
  );
};

export default SideBar;
