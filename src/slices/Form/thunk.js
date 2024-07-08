import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getForms as getFormsApi,
  createForm as createFormsApi,
} from "../../helpers/fakebackend_helper";

export const getForms = createAsyncThunk("forms/getForms", async () => {
  try {
    const response = await getFormsApi();
    return response;
  } catch (error) {
    console.log("error inside get forms thunk", error);
  }
});

export const createForm = createAsyncThunk(
  "forms/createForm",
  async (values) => {
    try {
      const response = await createFormsApi(values);

      return response;
    } catch (error) {
      console.log("error inside create form thunk", error);
    }
  }
);
