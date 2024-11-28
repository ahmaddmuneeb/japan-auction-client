import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, chakra, Flex, Select, Text } from "@chakra-ui/react";
import {
  setFilters,
  clearSearchFilters,
  clearFilters,
} from "../redux/slices/counterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

const apiUrl = process.env.REACT_APP_URL;

export default function BasicStatistics() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodyStyles, setBodyStyles] = useState([]);
  const [driveTrains, setDriveTrains] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBodyStyle, setSelectedBodyStyle] = useState("");
  const [selectedDriveTrain, setSelectedDriveTrain] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [keywords, setKeywords] = useState("");
  const [filteredCount, setFilteredCount] = useState(0);
  const debounceTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch makes
    dispatch(clearSearchFilters());
    axios
      .get(`${apiUrl}/vehicles/get-makes`)
      .then((response) => setMakes(response.data))
      .catch((error) => console.error("Error fetching makes:", error));
    // Fetch body styles and drive trains
    axios
      .get(`${apiUrl}/vehicles/drive-train-body-style`)
      .then((response) => {
        setBodyStyles(response.data.bodyStyles);
        setDriveTrains(response.data.driveTrains);
      })
      .catch((error) =>
        console.error("Error fetching body styles and drive trains:", error)
      );

    // Fetch price ranges
    // axios
    //   .get(`${apiUrl}/vehicles/range-stats`)
    //   .then((response) => {
    //     const { lowestPrice, highestPrice } = response.data;
    //     // Adjusting the lowest and highest prices by adding 2000
    //     const adjustedLowestPrice = lowestPrice + 2000;
    //     const adjustedHighestPrice = highestPrice + 2000;

    //     // console.log("ADJUSTEDPRICES : " , adjustedLowestPrice, adjustedHighestPrice);
    //     // Divide the adjusted price range into 10 equal parts
    //     const rangeStep = (adjustedHighestPrice - adjustedLowestPrice) / 7;
    //     const ranges = [];
    //     // console.log("rangeSteps : " , rangeStep)
    //     for (let i = 0; i < 7; i++) {
    //       const rangeStart = adjustedLowestPrice + i * rangeStep;
    //       const rangeEnd = adjustedLowestPrice + (i + 1) * rangeStep;
    //       ranges.push(`${rangeStart.toFixed(2)} - ${rangeEnd.toFixed(2)}`);
    //     }

    //     setPriceRanges(ranges);
    //   })
    //   .catch((error) => console.error("Error fetching price ranges:", error));
    const ranges = [
      "0 - 10000",
      "10000 - 20000",
      "20000 - 30000",
      "30000 - 40000",
      "40000 - 50000",
      "50000 - 60000",
      "60000 - 70000",
      "70000 - 80000",
      "80000 - 90000",
    ];

    setPriceRanges(ranges);
  }, []);

  // Function to handle search input change
  // const handleSearchInputChange = (event) => {
  //   const { value } = event.target;
  //   setKeywords(value);

  //   // Clear previous debounce timeout
  //   clearTimeout(debounceTimeoutRef.current);

  //   // Set new debounce timeout
  //   debounceTimeoutRef.current = setTimeout(() => {
  //     // Call function to count filtered vehicles
  //     countedVehicleFilters();
  //   }, 1000); // Adjust the debounce delay as needed
  // };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setKeywords(value);

    debounce(
      () =>
        countedVehicleFilters(
          selectedMake,
          selectedBodyStyle,
          selectedDriveTrain,
          selectedPriceRange,
          value,
          selectedModel
        ),
      500
    ); // Debounce for 500ms
  };

  const handleModelChange = (value) => {
    setSelectedModel(value);
    debounce(
      () =>
        countedVehicleFilters(
          selectedMake,
          selectedBodyStyle,
          selectedDriveTrain,
          selectedPriceRange,
          keywords,
          value
        ),
      500
    ); // Debounce for 500ms
  };

  // Debounced function to handle make selection change
  const handleMakeChange = async (make) => {
    setSelectedMake(make); // Update the selected make
    setSelectedModel("");
    try {
      const response = await axios.get(`${apiUrl}/vehicles/get-models`, {
        params: { makes: make }, // Pass the selected make to the API
      });
      // console.log("MODELS: ",response)
      setModels(response.data); // Update the models state with the fetched models
    } catch (error) {
      console.error("Error fetching models:", error);
    }
    debounce(
      () =>
        countedVehicleFilters(
          make,
          selectedBodyStyle,
          selectedDriveTrain,
          selectedPriceRange,
          keywords,
          ""
        ),
      500
    ); // Debounce for 500ms
  };

  // Debounced function to handle body style selection change
  const handleBodyStyleChange = (value) => {
    setSelectedBodyStyle(value);
    debounce(
      () =>
        countedVehicleFilters(
          selectedMake,
          value,
          selectedDriveTrain,
          selectedPriceRange,
          keywords,
          selectedModel
        ),
      500
    ); // Debounce for 500ms
  };

  // Debounced function to handle drive train selection change
  const handleDriveTrainChange = (value) => {
    setSelectedDriveTrain(value);
    debounce(
      () =>
        countedVehicleFilters(
          selectedMake,
          selectedBodyStyle,
          value,
          selectedPriceRange,
          keywords,
          selectedModel
        ),
      500
    ); // Debounce for 500ms
  };

  // Debounced function to handle price range selection change
  const handlePriceRangeChange = (value) => {
    const [start, end] = value.split(" - ").map(parseFloat);
    // setSelectedPriceRange([start, end]);
    // console.log(start, end)
    if ((start || end) == undefined) {
      setSelectedPriceRange("");
      debounce(
        () =>
          countedVehicleFilters(
            selectedMake,
            selectedBodyStyle,
            selectedDriveTrain,
            "",
            keywords,
            selectedModel
          ),
        500
      );
    } else {
      setSelectedPriceRange([start, end]);
      debounce(
        () =>
          countedVehicleFilters(
            selectedMake,
            selectedBodyStyle,
            selectedDriveTrain,
            [start, end],
            keywords,
            selectedModel
          ),
        500
      );
    }
  };

  // Function to count filtered vehicles

  // Implement counting logic here
  const countedVehicleFilters = (
    make,
    bodyStyle,
    driveTrain,
    priceRange,
    keywords,
    model
  ) => {
    axios
      .post(`${apiUrl}/vehicles/count-filter-vehicles`, {
        make: make,
        model: model,
        bodyStyle: bodyStyle,
        driveTrain: driveTrain,
        priceRange: priceRange,
        keywords: keywords,
      })
      .then((response) => {
        setFilteredCount(response.data.count);
      })
      .catch((error) =>
        console.error("Error counting filtered vehicles:", error)
      );
  };

  const SearchButtonCalled = () => {
    dispatch(clearFilters());

    const payload = {};

    // Check each filter in your payload and add it to the payload object if it's not empty
    if (selectedMake) payload.makes = [selectedMake];
    if (selectedBodyStyle) payload.body_style = [selectedBodyStyle];
    if (selectedDriveTrain) payload.drive_train = [selectedDriveTrain];
    if (selectedPriceRange) payload.priceRange = selectedPriceRange;
    if (selectedModel) payload.models = [selectedModel];
    dispatch(setFilters(payload));

    navigate("/inventory");
  };

  const debounce = (func, delay) => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(func, delay);
  };

  return (
    <Flex pt={1} px={2} w="full" flexDirection="column">
      <chakra.h1
        textAlign="center"
        fontSize={{ base: "4xl", md: "6xl" }}
        py={2}
        fontWeight="bold"
        color="#f9cd00"
        zIndex={99}
      >
        Welcome to Makarauto
      </chakra.h1>

      <Text
        textAlign="center"
        zIndex={99}
        fontSize="2xl"
        fontWeight="semibold"
        py={2}
        color="#f9cd00"
      >
        Find Your Ride!
      </Text>
      <Flex flexDirection={{ md: "row", base: "column" }} py={2}>
        <Select
          placeholder="All Prices"
          size="lg"
          mx={1}
          fontSize="md"
          color="white"   
         flex={{ base: "1", md: "1.5" }}
          my={{ base: 1, md: 0 }}
          onChange={(e) => handlePriceRangeChange(e.target.value)}
        >
          {priceRanges.map((range, index) => (
            <option
              key={index}
              value={range}
              style={{ backgroundColor: "#000" }}
            >
              ${formatNumberWithCommas(range)}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Makes"
          size="lg"
          mx={1}
          flex={1.5}
          fontSize="md"
          my={{ base: 1, md: 0 }}
          color="white"
          onChange={(e) => handleMakeChange(e.target.value)}
        >
          {makes.map((make) => (
            <option key={make} value={make} style={{ backgroundColor: "#000" }}>
              {make}
            </option>
          ))}
        </Select>

        {selectedMake && ( // Render the model dropdown only if a make is selected
          <Select
            placeholder="Model"
            size="lg"
            mx={1}
            flex={1.5}
            fontSize="md"
            color="white"
            my={{ base: 1, md: 0 }}
            onChange={(e) => handleModelChange(e.target.value)}
          >
            {models?.map((model) => (
              <option
                key={model}
                value={model}
                style={{ backgroundColor: "#000" }}
              >
                {model}
              </option>
            ))}
          </Select>
        )}

        <Select
          placeholder="Body Style"
          size="lg"
          mx={1}
          flex={1.5}
          my={{ base: 1, md: 0 }}
          fontSize="md"
          color="white"
          onChange={(e) => handleBodyStyleChange(e.target.value)}
        >
          {bodyStyles.map((style) => (
            <option
              key={style}
              value={style}
              style={{ backgroundColor: "#000" }}
            >
              {style}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Drive Train"
          size="lg"
          mx={1}
          my={{ base: 1, md: 0 }}
          fontSize="md"
          color="white"
          flex={1.5}
          onChange={(e) => handleDriveTrainChange(e.target.value)}
        >
          {driveTrains.slice(1).map((train) => (
            <option
              key={train}
              value={train}
              style={{ backgroundColor: "#000" }}
            >
              {train}
            </option>
          ))}
        </Select>

        <Button
          px={10}
          mx={1}
          leftIcon={<IoSearchOutline />}
          flex={0.5}
          w={{ base: "full" }}
          fontSize="md"
          variant="solid"
          size="lg"
          backgroundColor={"#f9cd00"}
          color="white"
          py={3}
          my={{ base: 3, md: 0 }}
          onClick={SearchButtonCalled}
        >
          Search [{filteredCount}]
        </Button>
      </Flex>
    </Flex>
  );
}
