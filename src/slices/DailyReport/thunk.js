import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  dailyReportGet as dailyReportGetApi,
  filterDailyReport as filterDailyReportApi,
} from "../../helpers/fakebackend_helper";

export const getDailyReport = createAsyncThunk(
  "dailyReport/getDailyReport",
  async () => {
    try {
      const response = await dailyReportGetApi();
      return response;
    } catch (error) {
      console.log("error inside get daily report thunk", error);
    }
  }
);

export const filterDailyReport = createAsyncThunk(
  "dailyReport/filterDailyReport",
  async (data) => {
    try {
      const response = await filterDailyReportApi(data);
      return response;
    } catch (error) {
      console.log("error inside filter daily report thunk", error);
    }
  }
);
