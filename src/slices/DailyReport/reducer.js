import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getDailyReport } from "./thunk";

export const initialState = {
  data: null,
  userData: null,
  error: "",
};

const dailyReportslice = createSlice({
  name: "dailyReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyReport.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.data = action.payload?.data.dailyReport;
        state.userData = action.payload?.data;
        state.error = "";
      }
    });
  },
});

export default dailyReportslice.reducer;
