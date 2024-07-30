import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  // getDataCorrection,
  // updateDataCorrection,
  filterDownloadData,
  downloadAllData,
  getStates,
  getCities,
  getPinCodes,
} from "./thunk";

export const initialState = {
  allData: null,
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
      console.log(
        "DOWNLOAD ALL DATA PAYLOAD IN REDUCER ->",
        action.payload?.data.allData
      );
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.allData = action.payload?.data.allData;
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
