import { createAsyncThunk } from "@reduxjs/toolkit";

import { dailyReportUpload as dailyReportUploadApi } from "../../helpers/fakebackend_helper";

export const uploadDailyReport = createAsyncThunk(
  "dailyReportUpload/uploadDailyReport",
  async (data) => {
    try {
      const response = await dailyReportUploadApi(data);

      return response;
    } catch (error) {
      console.log("error daily report upload thunk", error);
    }
  }
);
