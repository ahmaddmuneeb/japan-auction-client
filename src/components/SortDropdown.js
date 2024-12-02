import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, updateFilters } from "../redux/slices/counterSlice";

const SortDropdown = ({ onSelectSort }) => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector(selectFilters);

  // Generate the value based on sortBy and sortOrder
  const selectedValue = sortBy && sortOrder ? `${sortBy},${sortOrder}` : "";

  console.log({
    selectedValue: selectedValue,
  });

  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    // Check if the selected value matches any of the options
    const isValidOption = (value) => {
      const validOptions = [
        "vehicle_price,asc",
        "vehicle_price,desc",
        "vehicle_year,asc",
        "vehicle_year,desc",
        "vehicle_make,asc",
        "vehicle_make,desc",
        "vehicle_model,asc",
        "vehicle_model,desc",
        "total_price,asc",
        "total_price,desc",
        "distance,asc",
        "distance,desc",
        "created_at,asc",
        "created_at,desc",
      ];
      return validOptions.includes(value);
    };

    if (!isValidOption(selectedValue)) {
      setValue("");
    } else {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  const handleSelect = (e) => {
    const selectedSort = e.target.value;

    const [newSortBy, newSortOrder] = selectedSort.split(",");

    dispatch(
      updateFilters({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      })
    );

    setValue(selectedSort);
    onSelectSort(selectedSort);
  };

  return (
    <Select
      onChange={handleSelect}
      value={value || ""}
      fontWeight="semibold"
      color="blue.900"
      placeholder="Sort vehicles"
    >
      <optgroup label="Price">
        <option value="vehicle_price,asc">Price low to high</option>
        <option value="vehicle_price,desc">Price high to low</option>
        <option value="total_price,asc">Total Price low to high</option>
        <option value="total_price,desc">Total Price high to low</option>
      </optgroup>

      <optgroup label="Year">
        <option value="vehicle_year,asc">Year low to high</option>
        <option value="vehicle_year,desc">Year high to low</option>
      </optgroup>

      <optgroup label="Make & Model">
        <option value="vehicle_make,asc">Make A to Z</option>
        <option value="vehicle_make,desc">Make Z to A</option>
        <option value="vehicle_model,asc">Model A to Z</option>
        <option value="vehicle_model,desc">Model Z to A</option>
      </optgroup>

      <optgroup label="Other">
        <option value="distance,asc">Distance low to high</option>
        <option value="distance,desc">Distance high to low</option>
        <option value="created_at,asc">Date Added (Oldest First)</option>
        <option value="created_at,desc">Date Added (Newest First)</option>
      </optgroup>
    </Select>
  );
};

export default SortDropdown;
