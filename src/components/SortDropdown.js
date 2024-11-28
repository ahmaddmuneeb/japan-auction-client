import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectFilters } from "../redux/slices/counterSlice";

const SortDropdown = ({ onSelectSort }) => {
  const selectedFilters = useSelector(selectFilters);

  // Extract sortBy and sortOrder from selectedFilters
  const { sortBy, sortOrder } = selectedFilters;

  // Generate the value based on sortBy and sortOrder
  const selectedValue = `${sortBy},${sortOrder}`;

  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    // Check if the selected value matches any of the options
    const isValidOption = (value) => {
      return value.includes("vehicle_price") ||
             value.includes("vehicle_year") ||
             value.includes("vehicle_make") ||
             value.includes("vehicle_model");
    };

    // If the selected value doesn't match any options, set the value to an empty string
    if (!isValidOption(selectedValue)) {
      setValue("");
    } else {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  const handleSelect = (e) => {
    const selectedSort = e.target.value;
    setValue(selectedSort);
    onSelectSort(selectedSort);
  };

  return (
    <Select onChange={handleSelect} value={value} fontWeight={"semibold"} color={"blue.900"}>
      {!value && (
        <option disabled  value="">
          Sort vehicles
        </option>
      )}
      <option value="vehicle_price,asc">Price low to high</option>
      <option value="vehicle_price,desc">Price high to low</option>
      <option value="vehicle_year,asc">Year low to high</option>
      <option value="vehicle_year,desc">Year high to low</option>
    </Select>
  );
};

export default SortDropdown;

{/* <option value="vehicle_make,asc">Make sort A to Z</option>
<option value="vehicle_make,desc">Make sort Z to A</option>
<option value="vehicle_model,asc">Model sort A to Z</option>
<option value="vehicle_model,desc">Model sort Z to A</option> */}