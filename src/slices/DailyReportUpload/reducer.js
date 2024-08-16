import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { uploadDailyReport, getDailyReportData } from "./thunk";

export const initialState = {
  groupedDataByDate: null,
  error: "",
};

const dailyReportUploadSlice = createSlice({
  name: "dailyReportUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyReportData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.groupedDataByDate = action.payload?.data.groupedDataByDate;
      }
    });
    builder.addCase(uploadDailyReport.fulfilled, (state, action) => {
      toast.success("Report has been uploaded !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default dailyReportUploadSlice.reducer;
