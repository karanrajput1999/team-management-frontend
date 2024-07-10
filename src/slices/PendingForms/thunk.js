import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPendingForms as getPendingFormsApi,
  pendingFormsFilter as pendingFormsFilterApi,
} from "../../helpers/fakebackend_helper";

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
export const pendingFormsFilter = createAsyncThunk(
  "pendingForms/pendingFormsFilter",
  async (data) => {
    try {
      const response = await pendingFormsFilterApi(data);
      return response;
    } catch (error) {
      console.log("error inside get pending forms filter thunk", error);
    }
  }
);
