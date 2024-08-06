import { createSlice } from "@reduxjs/toolkit";
import {
  getReportUpload,
  filterReportUpload,
  updateReportUploadStatus,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  reportUploads: [],
  filteredReportUploads: [],
  error: "",
};

const reportUploadSlice = createSlice({
  name: "ReportUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportUpload.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportUploads = action.payload?.data.reportUpload;
        state.error = "";
      }
    });
    builder.addCase(updateReportUploadStatus.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        toast.success("Status has been updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
        state.error = "";
      }
    });
    builder.addCase(filterReportUpload.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.filteredReportUploads = action.payload?.data.reportUpload;
        state.error = "";
      }
    });
  },
});

export default reportUploadSlice.reducer;
