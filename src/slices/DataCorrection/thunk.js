import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDataCorrection as getDataCorrectionApi,
  updateDataCorrection as updateDataCorrectionApi,
} from "../../helpers/fakebackend_helper";

export const getDataCorrection = createAsyncThunk(
  "dataCorrection/getDataCorrection",
  async () => {
    try {
      const response = await getDataCorrectionApi();

      return response;
    } catch (error) {
      console.log("error inside get data correction thunk", error);
    }
  }
);

export const updateDataCorrection = createAsyncThunk(
  "dataCorrection/updateDataCorrection",
  async (values) => {
    try {
      const response = await updateDataCorrectionApi(values);

      return response;
    } catch (error) {
      console.log("error inside update data correction thunk", error);
    }
  }
);
