import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  dailyReportUpload as dailyReportUploadApi,
  getDailyReportData as getDailyReportDataApi,
} from "../../helpers/fakebackend_helper";

export const getDailyReportData = createAsyncThunk(
  "dailyReportUpload/getDailyReportData",
  async () => {
    try {
      const response = await getDailyReportDataApi();

      return response;
    } catch (error) {
      console.log("error get daily report upload thunk", error);
    }
  }
);
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
