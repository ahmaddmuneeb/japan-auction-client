// SideBar.jsx
import React, { useState, useEffect } from "react";
import { Flex, CircularProgress, Box, Heading } from "@chakra-ui/react";
import VehicleFilter from "./VehicleFilter";
import FilteredVehicleList from "./FilteredVehicleList";
import axios from "axios";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";
import {
  selectSearchBy,
  setSearchBy,
  clearSearchBy,
  selectFilters,
  setFilters,
  selectSearchFilter,
  clearSearchFilters,
} from "../redux/slices/counterSlice";
import SortDropdown from "./SortDropdown";

const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
const apiUrl = process.env.REACT_APP_URL;
const headers = {
  "api-key": apiSecretKey,
};

const SideBar = () => {
  const selectedFilters = useSelector(selectFilters);
  const selectedSearchFilter = useSelector(selectSearchFilter);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  // const [transmissions, setTransmissions] = useState([]);
  const [sortBy, setSortBy] = useState(selectedFilters.sortBy);
  const [sortOrder, setSortOrder] = useState(selectedFilters.sortOrder);

  const [driveTrain, setDriveTrain] = useState([]);
  const [bodyStyle, setBodyStyle] = useState([]);
  const [fuel_type, setFuelType] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(
    selectedFilters.fuel_type
  );
  const [selectedMakes, setSelectedMakes] = useState(selectedFilters.makes);
  const [selectedModels, setSelectedModels] = useState(selectedFilters.models);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState(
    selectedFilters.drive_train
  );
  const [selectedBodyStyle, setSelectedBodyStyle] = useState(
    selectedFilters.body_style
  );
  const [yearRange, setYearRange] = useState(selectedFilters.yearRange);
  const [mileageRange, setMileageRange] = useState(
    selectedFilters.mileageRange
  );
  const [priceRange, setPriceRange] = useState(selectedFilters.priceRange);
  const [vehicles, setVehicles] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [rangeLoading, setRangeLoading] = useState(false);
  const [vehicleComponentLoading, setVehicleComponentLoading] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [lock, setLock] = useState(false);
  // const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const dispatch = useDispatch();
  const selectedCarType = useSelector(selectSearchBy);

  // console.log("selectedFilters :::: ", selectedFilters);
  useEffect(() => {
    // // console.log("selectedSearchFilters :::: ", selectedSearchFilter);
    // if(selectedSearchFilter){
    //   if(selectedSearchFilter.makes.length != 0 && selectedSearchFilter.makes[0] != ""){
    //     // console.log("selcted makes called" ,selectedSearchFilter.makes )
    //     // setSelectedMakes(selectedSearchFilter.makes);
    //     handleMakeChange(selectedSearchFilter.makes[0])
    //   }
    //   if(selectedSearchFilter.body_style.length != 0 && selectedSearchFilter.body_style[0] != ""  ){
    //     // console.log("Bodystyles called" , selectedSearchFilter.body_style)
    //     // setSelectedBodyStyle(selectedSearchFilter.body_style);
    //     handleBodyChange(selectedSearchFilter.body_style[0])

    //   }
    //   if(selectedSearchFilter.drive_train.length != 0 && selectedSearchFilter.drive_train[0] != ""){
    //     // console.log("selcted drive train" , selectedSearchFilter.drive_train)
    //     // setSelectedDriveTrain(selectedSearchFilter.drive_train);
    //     handleDriveChange(selectedSearchFilter.drive_train[0])

    //   }
    //   if(selectedSearchFilter.model.length != 0 && selectedSearchFilter.model[0] != ""){
    //     // console.log("selcted models called",selectedSearchFilter.model)
    //     // setSelectedModels(selectedSearchFilter.model);
    //     handleModelChange(selectedSearchFilter.model[0]);
    //   }

    //   // if(selectedSearchFilter.priceRange != [0, 85000]){
    //   //   console.log("selcted prcerange called")

    //   //   setPriceRange(selectedSearchFilter.priceRange);
    //   // }

    // }

    axios
      .get(`${apiUrl}/vehicles/get-makes`)
      .then((response) => setMakes(response.data))
      .catch((error) => console.error("Error fetching makes:", error));

    axios
      .get(`${apiUrl}/vehicles/drive-train-body-style`)
      .then((response) => {
        setBodyStyle(response.data.bodyStyles);
        setDriveTrain(response.data.driveTrains);
        setFuelType(response.data.fuelTypes);
      })
      .catch((error) => console.error("Error fetching makes:", error));

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

        setYearRange([parseInt(lowestYear), parseInt(highestYear)]);
        setMileageRange([parseInt(lowestMileage), parseInt(highestMileage)]);
        setPriceRange([parseFloat(lowestPrice), parseFloat(highestPrice)]);
        setRangeLoading(!rangeLoading);
      })
      .catch((error) => console.error("Error fetching makes:", error));

    if (selectedMakes.length > 0) {
      axios
        .get(`${apiUrl}/vehicles/get-models`, {
          params: { makes: selectedMakes.join(",") },
        })
        .then((response) => {
          setModels(response.data);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
        });
    }

    if (!selectedCarType) {
      handleApplyFilters(currentPage);
      // runKeywordSearchAPI(keywords, currentPage);
    } else {
      setApplyFilters(true);
      axios
        .post(`${apiUrl}/vehicles/filter-vehicles`, {
          body_style: selectedCarType,
          page: 1,
        })
        .then((response) => {
          setFilterType("filter");
          setVehicles(response.data);
          setCurrentPage(1);
          setLoading(false);
          setVehicleComponentLoading(false);
          handleBodyChange(selectedCarType);
          dispatch(clearSearchBy());
        })
        .catch((error) => console.error("Error applying filters:", error));
    }
    console.log("SIDE BAR MOUNTS");
    dispatch(clearSearchFilters());

    return () => {
      setVehicles([]);
      console.log("SIDE BAR UNMOUNTS");
    };
  }, []);

  useEffect(() => {
    if (applyFilters) {
      setLoading(true);
      handleApplyFilters(currentPage);
    }
  }, [applyFilters, setApplyFilters]);

  // Use debounce for the keyword change
  const debouncedKeywordChange = debounce((value, currentPage) => {
    setKeywords(value);
    setLock(true);
    runKeywordSearchAPI(value, currentPage);
  }, 1000);

  useEffect(() => {
    if (selectedMakes.length == 0) {
      setSelectedModels([]);
    }
  }, [selectedMakes, setMakes]);

  useEffect(() => {
    if (filterType == "search") {
      setLoading(true);
      setLock(true);
      runKeywordSearchAPI(keywords, currentPage);
    } else if (filterType == "filter") {
      setLoading(true);
      handleApplyFilters(currentPage);
    }
  }, [currentPage, setCurrentPage]);

  const runKeywordSearchAPI = async (keywords, page = 1) => {
    try {
      if (!lock) {
        setVehicleComponentLoading(true);

        const response = await axios.get(`${apiUrl}/vehicles/search`, {
          params: { keywords, page },
        });

        setFilterType("search");
        setVehicles(response.data);
        setCurrentPage(page);
        setLoading(false);
        setVehicleComponentLoading(false);
        setLock(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMakeChange = async (make) => {
    // console.log("handlemakechangecalled")
    const updatedMakes = selectedMakes.includes(make)
      ? selectedMakes.filter((selectedMake) => selectedMake !== make)
      : [...selectedMakes, make];
    try {
      const response = await axios.get(`${apiUrl}/vehicles/get-models`, {
        params: { makes: updatedMakes.join(",") },
      });
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
    setSelectedMakes(updatedMakes);
    setApplyFilters(true);
  };

  const handleSortSelect = (selectedSort) => {
    // console.log("SELECTED SORT",selectedSort);
    const [sortField, sortDirection] = selectedSort.split(",");
    // console.log(sortField,sortDirection);
    setSortBy(sortField);
    setSortOrder(sortDirection);
    setApplyFilters(true);
  };

  const handleModelChange = (model) => {
    setSelectedModels((prevModels) =>
      prevModels.includes(model)
        ? prevModels.filter((selectedModel) => selectedModel !== model)
        : [...prevModels, model]
    );
    setApplyFilters(true);
  };

  // const handleTransmissionChange = (trans) => {
  //   setSelectedTransmissions((prevtrans) =>
  //     prevtrans.includes(trans)
  //       ? prevtrans.filter((selectedTransmissions) => selectedTransmissions !== trans)
  //       : [...prevtrans, trans]
  //   );
  //   setApplyFilters(true)

  // };

  const handleDriveChange = (trans) => {
    setSelectedDriveTrain((prevtrans) =>
      prevtrans.includes(trans)
        ? prevtrans.filter((selectedDriveTrain) => selectedDriveTrain !== trans)
        : [...prevtrans, trans]
    );
    setApplyFilters(true);
  };

  const handleFuelTypes = (fuel) => {
    setSelectedFuelType((prevFuel) =>
      prevFuel.includes(fuel)
        ? prevFuel.filter((selectedFuelType) => selectedFuelType !== fuel)
        : [...prevFuel, fuel]
    );
    setApplyFilters(true);
  };

  const handleBodyChange = (trans) => {
    setSelectedBodyStyle((prevtrans) =>
      prevtrans.includes(trans)
        ? prevtrans.filter((selectedBodyStyle) => selectedBodyStyle !== trans)
        : [...prevtrans, trans]
    );
    setApplyFilters(true);
  };

  const handleYearChange = (range) => {
    setYearRange(range);
    setApplyFilters(true);
  };

  const handleMileageChange = (range) => {
    setMileageRange(range);
    setApplyFilters(true);
  };
  const handlePriceChange = (range) => {
    setPriceRange(range);
    setApplyFilters(true);
  };

  const handleKeywordChange = (value) => {
    setVehicleComponentLoading(true);
    debouncedKeywordChange(value);
  };

  const handleApplyFilters = (page = 1) => {
    setVehicleComponentLoading(true);
    setLock(true);
    runFilterAPI(page);
  };

  const runFilterAPI = async (page) => {
    try {
      const savedFilters = {
        makes: selectedMakes,
        models: selectedModels,
        yearRange,
        mileageRange,
        priceRange,
        drive_train: selectedDriveTrain,
        body_style: selectedBodyStyle,
        fuel_type: selectedFuelType,
        sortBy,
        sortOrder,
        page,
        change: true,
      };
      // console.log(savedFilters ,"::::::: ")
      dispatch(setFilters(savedFilters));
      if (!lock) {
        const response = await axios.post(
          `${apiUrl}/vehicles/filter-vehicles`,
          {
            makes: selectedMakes,
            models: selectedModels,
            yearRange,
            mileageRange,
            priceRange,
            drive_train: selectedDriveTrain,
            body_style: selectedBodyStyle,
            fuel_type: selectedFuelType,
            keywords,
            sortBy,
            sortOrder,
            page,
          }
        );
        setFilterType("filter");
        setVehicles(response.data);
        setCurrentPage(page);
        setLoading(false);
        setVehicleComponentLoading(false);
        setApplyFilters(false);
        setLock(false);
        if (response.data.length == 0) {
          setCurrentPage(1);
        }
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };
  return (
    <div>
      <Flex
        ml={{ base: "0", md: "7.5%" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedDriveTrain, setSelectedDriveTrain] = useState([]);
  const [selectedBodyStyle, setSelectedBodyStyle] = useState([]); 
  const [yearRange, setYearRange] = useState([2007, 2023]); 
  const [mileageRange, setMileageRange] = useState([7000, 228000]);
  const [priceRange, setPriceRange] = useState([0, 85000]); */}
        <VehicleFilter
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
        />
        {vehicleComponentLoading ? (
          <>
            <Flex
              justifyContent="center"
              h={"80vh"}
              alignItems="center"
              w={"100%"}
            >
              <CircularProgress isIndeterminate color="blue.900" />
            </Flex>
          </>
        ) : (
          <>
            {vehicles?.data?.length > 0 ? (
              <>
                <FilteredVehicleList
                  vehicles={vehicles}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  filterType={filterType}
                  loading={loading}
                  setLoading={setLoading}
                  handleSortSelect={handleSortSelect}
                  vehicleComponentLoading={vehicleComponentLoading}
                />
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
