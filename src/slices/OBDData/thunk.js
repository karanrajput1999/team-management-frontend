import { createAsyncThunk } from "@reduxjs/toolkit";

import { downloadDataForOBD as downloadDataForOBDApi } from "../../helpers/fakebackend_helper";

export const downloadDataForOBD = createAsyncThunk(
  "obdData/downloadDataForOBD",
  async () => {
    try {
      const response = await downloadDataForOBDApi();

      return response;
    } catch (error) {
      console.log("error inside downloada data for OBD Data thunk", error);
    }
  }
);
