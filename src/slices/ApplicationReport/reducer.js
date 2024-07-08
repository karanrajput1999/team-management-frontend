import { createSlice } from "@reduxjs/toolkit";
import { getApplicatinReport } from "./thunk";

export const initialState = {
  applicationReports: [],
  error: "",
};

const centersSlice = createSlice({
  name: "ApplicationReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicatinReport.fulfilled, (state, action) => {
      console.log("APPLICATION REPORT DATA IN REDUCER ->", action.payload);
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.applicationReports = action.payload?.data.applicationReports;
        state.error = "";
      }
    });
  },
});

export default centersSlice.reducer;
