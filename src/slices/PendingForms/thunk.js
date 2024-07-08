import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPendingForms as getPendingFormsApi } from "../../helpers/fakebackend_helper";

export const getPendingForms = createAsyncThunk(
  "pendingForms/getPendingForms",
  async () => {
    try {
      const response = await getPendingFormsApi();
      return response;
    } catch (error) {
      console.log("error inside get pending forms thunk", error);
    }
  }
);
