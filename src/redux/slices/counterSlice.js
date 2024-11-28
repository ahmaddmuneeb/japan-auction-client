// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    count: 0,
    searchBy:null,
    csvData: [],
    slideshowVehicle: {},
    filters:{
      makes: [],
      models: [],
      body_style: [],
      drive_train: [],
      yearRange: [2007, 2023],
      mileageRange: [7000, 228000],
      priceRange: [0, 85000],
      fuel_type: [],
      sortBy:"",
      sortOrder:"",
      change: false
    },
    searchFilter:{
      makes: [],
      body_style: [],
      drive_train: [],
      priceRange: [0, 85000],
      model: []
    }
  },
  reducers: {
    setCsvData: (state, action) => {
      state.csvData = action.payload;
    },
    clearCsvData: (state) => {
      state.csvData = [];
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    clearCount: (state) => {
      state.count = 0;
    },
    setSlideshowVehicle: (state, action) => {
      state.slideshowVehicle = action.payload;
    },
    clearSlideshowVehicle: (state) => {
      state.slideshowVehicle = {};
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    clearSearchBy: (state) => {
      state.searchBy = null;
    },
    // setFilters : (state, action) => {
    //   state.filters = action.payload;
    // },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters : (state) => {
      state.filters = {
        makes: [],
        models: [],
        body_style: [],
        drive_train: [],
        yearRange: [2007, 2023],
        mileageRange: [7000, 228000],
        priceRange: [0, 85000],
        fuel_type: [],
        sortBy:"",
        sortOrder:"",
        change: false
    }
  },
  setSearchFilter : (state, action) => {
    state.searchFilter = action.payload;
  },
  clearSearchFilters : (state) => {
    state.searchFilter = {
      makes: [],
      body_style: [],
      drive_train: [],
      priceRange: [0, 85000],
      model:[]
  }
},
}
});

export const { setCsvData, setCount, clearCsvData, clearCount,setFilters , setSearchFilter , clearSearchFilters , clearFilters , setSearchBy , clearSearchBy ,setSlideshowVehicle, clearSlideshowVehicle } = counterSlice.actions;
export const selectCount = (state) => state.counter.count;
export const selectCsvData = (state) => state.counter.csvData;
export const selectSlideshowVehicle = (state) => state.counter.slideshowVehicle;
export const selectSearchBy = (state) => state.counter.searchBy;
export const selectFilters = (state) => state.counter.filters;
export const selectSearchFilter = (state) => state.counter.searchFilter;
export default counterSlice.reducer;
