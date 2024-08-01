import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  // getDataCorrection,
  // updateDataCorrection,
  filterDownloadData,
  downloadAllData,
  downloadStateData,
  getStates,
  getCities,
  getPinCodes,
} from "./thunk";

export const initialState = {
  allData: null,
  stateData: null,
  filteredDownloadData: null,
  city: null,
  states: null,
  cities: null,
  pinCodes: null,
  error: null,
};

const downloadDataSlice = createSlice({
  name: "downloadData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterDownloadData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.filteredDownloadData = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(downloadAllData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.allData = action.payload?.data.allData;
        state.error = "";
      }
    });
    builder.addCase(downloadStateData.fulfilled, (state, action) => {
      // console.log("ACTION PAYLOAD IN THUNK ->", action.payload?.data);
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.stateData = action.payload?.data.stateData;
        state.error = "";
      }
    });

    builder.addCase(getStates.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.states = action.payload?.data.states;
      }
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.cities = action.payload?.data.cities;
      }
    });
    builder.addCase(getPinCodes.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.pinCodes = action.payload?.data.pinCodes;
      }
    });
  },
});

export default downloadDataSlice.reducer;
