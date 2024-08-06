import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getApplicationReport as getApplicationReportApi,
  filterApplicationReport as filterApplicationReportApi,
} from "../../helpers/fakebackend_helper";

export const getApplicatinReport = createAsyncThunk(
  "ApplicationReport/getApplicationReport",
  async () => {
    try {
      const response = await getApplicationReportApi();
      return response;
    } catch (error) {
      console.log("error inside get forms thunk", error);
    }
  }
);
export const filterApplicationReport = createAsyncThunk(
  "ApplicationReport/filterApplicationReport",
  async (data) => {
    try {
      const response = await filterApplicationReportApi(data);
      return response;
    } catch (error) {
      console.log("error inside get forms thunk", error);
    }
  }
);
