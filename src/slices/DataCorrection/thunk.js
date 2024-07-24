import { createAsyncThunk } from "@reduxjs/toolkit";

import { getDataCorrection as getDataCorrectionApi } from "../../helpers/fakebackend_helper";

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
