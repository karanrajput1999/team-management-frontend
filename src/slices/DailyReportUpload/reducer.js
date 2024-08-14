import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { uploadDailyReport } from "./thunk";

export const initialState = {
  data: [],
};

const dailyReportUploadSlice = createSlice({
  name: "dailyReportUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
