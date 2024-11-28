import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Stack,
  Input,
  Button,
  Flex,
  Text,
  Icon,
  Divider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { clearFilters, selectFilters } from "../redux/slices/counterSlice";
import axios from "axios";
import { FaBullseye, FaGalacticSenate } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_URL;

function CustomIcon(props) {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d = isIndeterminate
    ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
    : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z";

  return (
    <>
      {isChecked ? (
        <Icon viewBox="0 0 24 24" {...rest}>
          <path fill="currentColor" d={d} />
        </Icon>
      ) : null}
    </>
  );
}

const VehicleFilter = ({
  makes,
  models,
  fuel_type,
  setSelectedFuelTypes,
  selectedFuelType,
  onFuelChange,
  selectedMakes,
  selectedModels,
  bodyStyle,
  selectedBodyStyle,
  driveTrain,
  selectedDriveTrain,
  onMakeChange,
  onBodyChange,
  onDriveChange,
  // onTransmissionChange,
  onModelChange,
  onYearChange,
  onKeywordChange,
  onApplyFilters,
  onMileageChange,
  onPriceChange,
  YearRange,
  MileageRange,
  PriceRange,
  rangeLoading,
  setSelectedMakes,
  setSelectedModels,
  setSelectedDriveTrain,
  setSelectedBodyStyle,
  setYearRange,
  setMileageRange,
  setModels,
  setPriceRange,
}) => {
  const selectedFilters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [yearRange, setyearRange] = useState(YearRange);
  const [mileageRange, setmileageRange] = useState(MileageRange);
  const [priceRange, setpriceRange] = useState(PriceRange);
  const [tempYearRange, setTempYearRange] = useState(selectedFilters.yearRange);
  const [tempMileageRange, setTempMileageRange] = useState(
    selectedFilters.mileageRange
  );
  const [tempPriceRange, setTempPriceRange] = useState(
    selectedFilters.priceRange
  );
  const [reset, setReset] = useState(false);
  useEffect(() => {
    // console.log("useEffect called of filters" , priceRange, mileageRange, yearRange)
    axios
      .get(`${apiUrl}/vehicles/range-stats`)
      .then((response) => {
        const {
          lowestYear,
          highestYear,
          lowestMileage,
          highestMileage,
          lowestPrice,
          highestPrice,
        } = response.data;

        setyearRange([parseInt(lowestYear), parseInt(highestYear)]);
        setmileageRange([parseInt(lowestMileage), parseInt(highestMileage)]);
        setpriceRange([parseFloat(lowestPrice), parseFloat(highestPrice)]);
      })
      .catch((error) => console.error("Error fetching makes:", error));

    if (!selectedFilters.change) {
      setTempYearRange(yearRange);
      setTempMileageRange(mileageRange);
      setTempPriceRange(priceRange);
    }
    // else{
    //   setTempYearRange(YearRange);
    //   setTempMileageRange(MileageRange);
    //   setTempPriceRange(PriceRange);
    // }
    // setYearRange(YearRange);
    // setMileageRange(MileageRange);
    // setPriceRange(PriceRange);
  }, [rangeLoading, reset, setReset]);

  const [debouncedKeywordChange] = useState(() =>
    debounce(onKeywordChange, 1000)
  );
  const [debouncedYearChange] = useState(() =>
    debounce((newRange) => {
      onYearChange(newRange);
      // setYearRange(newRange);
    }, 1000)
  );
  const [debouncedMileageChange] = useState(() =>
    debounce((newRange) => {
      // setMileageRange(newRange);
      onMileageChange(newRange);
    }, 1000)
  );
  const [debouncedPriceChange] = useState(() =>
    debounce((newRange) => {
      // setPriceRange(newRange);
      onPriceChange(newRange);
    }, 1000)
  );

  // const debouncedYearChange = debounce(onYearChange, 1000);
  // const debouncedMileageChange = debounce(onMileageChange, 1000);
  // const debouncedPriceChange = debounce(onPriceChange, 1000);

  const handleKeywordChange = (event, page = 1) => {
    const { value } = event.target;
    debouncedKeywordChange(value, page);
  };

  const handleYearChange = (newRange) => {
    setTempYearRange(newRange); // Update local state immediately
    debouncedYearChange(newRange); // Apply debounced change after delay
  };

  const handleMileageRange = (newRange) => {
    setTempMileageRange(newRange); // Update local state immediately
    debouncedMileageChange(newRange); // Apply debounced change after delay
  };

  const handlePriceChange = (newRange) => {
    setTempPriceRange(newRange); // Update local state immediately
    debouncedPriceChange(newRange); // Apply debounced change after delay
  };

  // const handleYearChange = (newRange) => {
  //   debouncedYearChange(newRange);
  // };

  // const handleMileageRange = (newRange) => {
  //   debouncedMileageChange(newRange);
  // };

  // const handlePriceChange = (newRange) => {
  //   debouncedPriceChange(newRange);
  // };

  const resetFilters = () => {
    dispatch(clearFilters());
    setTempYearRange(yearRange);
    setTempMileageRange(mileageRange);
    setTempPriceRange(priceRange);
    setSelectedMakes([]);
    setSelectedModels([]);
    setSelectedDriveTrain([]);
    setSelectedBodyStyle([]);
    setYearRange(yearRange);
    setMileageRange(mileageRange);
    setPriceRange(priceRange);
    setModels([]);

    setReset(!reset);
    window.location.reload();
  };

  return (
    <Stack spacing={4} px={2} py={{ md: 16 }}>
      <Flex justifyContent={"center"} flexDirection={"column"} w={"100%"}>
        {/* <Input
          my={2}
          type="text"
          placeholder="Search vehicles ..."
          w={"100%"}
          py={4}
          onChange={handleKeywordChange}
        /> */}

        <Stack
          bgColor={"#f5f5f5"}
          color={"#1a365d"}
          borderRadius={"xl"}
          mt={6}
          px={2}
          py={4}
        >
          <Flex justifyContent={"center"} w={"100%"} flexDirection={"column"}>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
              Year Range
            </Text>
            <Stack direction="row" alignItems="center" p={3} w={"100%"}>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {YearRange[0]} */}
                {tempYearRange[0]}
              </Text>
              <Slider
                min={yearRange[0]}
                max={yearRange[1]}
                range
                defaultValue={yearRange}
                onChange={handleYearChange}
              />

              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {YearRange[1]} */}
                {tempYearRange[1]}
              </Text>
            </Stack>
          </Flex>

          <Flex justifyContent={"center"} w={"100%"} flexDirection={"column"}>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
              {" "}
              Mileage Range
            </Text>
            <Stack direction="row" alignItems="center" p={3} w={"100%"}>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {MileageRange[0]}Km */}
                {tempMileageRange[0]}Km
              </Text>
              <Slider
                min={mileageRange[0]}
                max={mileageRange[1]}
                step={5000}
                range
                defaultValue={mileageRange}
                onChange={handleMileageRange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize={6} />
              </Slider>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {MileageRange[1]}Km */}
                {tempMileageRange[1]}Km
              </Text>
            </Stack>
          </Flex>

          <Flex justifyContent={"center"} w={"100%"} flexDirection={"column"}>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
              Price Range
            </Text>
            <Stack direction="row" alignItems="center" p={3} w={"100%"}>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {PriceRange[0]} */}
                {tempPriceRange[0]}
              </Text>
              <Slider
                min={priceRange[0]}
                max={priceRange[1]}
                step={1000}
                range
                defaultValue={priceRange}
                onChange={handlePriceChange}
              />
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                m={1}
                fontWeight={"bold"}
              >
                {/* {PriceRange[1]} */}
                {tempPriceRange[1]}
              </Text>
            </Stack>
          </Flex>

          <Stack direction="row" px={4} borderRadius={"2%"}>
            <Flex>
              <Flex justifyContent="center" flexDirection="column">
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Makes
                </Text>
                {makes.map((make) => (
                  <Checkbox
                    key={make}
                    icon={<CustomIcon />}
                    colorScheme="cyan"
                    isChecked={selectedMakes.includes(make)}
                    onChange={() => onMakeChange(make)}
                  >
                    {make}
                  </Checkbox>
                ))}
              </Flex>

              <Divider orientation="vertical" m={2} />

              <Flex justifyContent="flex-start" flexDirection="column" mx={2}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Models
                </Text>
                {models.map((model) => (
                  <Checkbox
                    // color={"white"}
                    colorScheme="cyan"
                    key={model}
                    isChecked={selectedModels.includes(model)}
                    onChange={() => onModelChange(model)}
                  >
                    {model}
                  </Checkbox>
                ))}
              </Flex>
            </Flex>
          </Stack>

          {/* <Flex justifyContent="center" flexDirection="column" px={4}>
            <Text fontSize={"2xl"}>Transmission</Text>
            {transmissions.map((trans) => (
              <Checkbox
                key={trans}
                colorScheme="cyan"
                isChecked={selectedTransmissions.includes(trans)}
                onChange={() => onTransmissionChange(trans)}
              >
                {trans}
              </Checkbox>
            ))}
          </Flex> */}

          <Flex justifyContent="center" flexDirection="column" px={4}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Body Styles
            </Text>
            {bodyStyle.map((style) => (
              <Checkbox
                key={style}
                colorScheme="cyan"
                isChecked={selectedBodyStyle.includes(style)}
                onChange={() => onBodyChange(style)}
              >
                {style}
              </Checkbox>
            ))}
          </Flex>
          <Flex justifyContent="center" flexDirection="column" px={4}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Drive Train
            </Text>
            {driveTrain.slice(1).map((train) => (
              <Checkbox
                key={train}
                colorScheme="cyan"
                isChecked={selectedDriveTrain.includes(train)}
                onChange={() => onDriveChange(train)}
              >
                {train}
              </Checkbox>
            ))}
          </Flex>
          <Flex justifyContent="center" flexDirection="column" px={4}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Fuel Type
            </Text>
            {fuel_type.slice(1).map((fuel) => (
              <Checkbox
                key={fuel}
                colorScheme="cyan"
                isChecked={selectedFuelType.includes(fuel)}
                onChange={() => onFuelChange(fuel)}
              >
                {fuel}
              </Checkbox>
            ))}
          </Flex>
          <Stack>
            <Button
              color={"white"}
              bgColor={"gray.400"}
              _hover={{ bgColor: "gray.500" }}
              onClick={resetFilters}
              mt={4}
            >
              Reset Filters
            </Button>
            <Button
              color={"white"}
              bgColor={"green.700"}
              _hover={{ bgColor: "green.800" }}
              onClick={onApplyFilters}
              mt={1}
            >
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default VehicleFilter;
