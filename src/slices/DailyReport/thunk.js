import { createAsyncThunk } from "@reduxjs/toolkit";

import { dailyReportGet as dailyReportGetApi } from "../../helpers/fakebackend_helper";

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
