import { createAsyncThunk } from "@reduxjs/toolkit";

import { uploadRawData as uploadRawDataApi } from "../../helpers/fakebackend_helper";

export const uploadData = createAsyncThunk(
  "uploadRawData/uploadData",
  async (values) => {
    try {
      const response = await uploadRawDataApi(values);

      return response;
    } catch (error) {
      console.log("error inside upload raw data thunk", error);
    }
  }
);
