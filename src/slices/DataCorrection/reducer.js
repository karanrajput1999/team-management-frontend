import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getDataCorrection,
  updateDataCorrection,
  getStates,
  getCities,
  getPinCodes,
  getSalaryInLacs,
  getSalaryInThousands,
} from "./thunk";

export const initialState = {
  city: null,
  salary: null,
  states: null,
  cities: null,
  pinCodes: null,
  salaryInLacs: null,
  salaryInThousands: null,
  error: null,
};

const dataCorrectionSlice = createSlice({
  name: "dataCorrection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataCorrection.fulfilled, (state, action) => {
      state.city = action.payload?.data.currentCity;
      state.salary = action.payload?.data.currentSalary;
    });
    builder.addCase(updateDataCorrection.fulfilled, (state, action) => {
      toast.success("Data has been corrected !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
    builder.addCase(getSalaryInLacs.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.salaryInLacs = action.payload?.data.salaryInLacs;
      }
    });
    builder.addCase(getSalaryInThousands.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.salaryInThousands = action.payload?.data.salaryInThousands;
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

export default dataCorrectionSlice.reducer;
