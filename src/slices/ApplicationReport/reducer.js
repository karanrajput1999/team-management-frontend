import { createSlice } from "@reduxjs/toolkit";
import { getApplicatinReport, filterApplicationReport } from "./thunk";

export const initialState = {
  applicationReports: [],
  filteredApplicationReports: [],
  error: "",
};

const applicationReportSlice = createSlice({
  name: "ApplicationReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicatinReport.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.applicationReports = action.payload?.data.applicationReports;
        state.error = "";
      }
    });
    builder.addCase(filterApplicationReport.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.filteredApplicationReports =
          action.payload?.data.applicationReports;
        state.error = "";
      }
    });
  },
});

export default applicationReportSlice.reducer;
