import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDematAccountForms as getDematAccountFormsApi,
  createDematAccountForm as createDematAccountFormApi,
} from "../../helpers/fakebackend_helper";

export const getDematAccountForms = createAsyncThunk(
  "demat-account-forms/getDematAccountForms",
  async () => {
    try {
      const response = await getDematAccountFormsApi();
      return response;
    } catch (error) {
      console.log("error inside get demat account forms thunk", error);
    }
  }
);

export const createDematAccountForm = createAsyncThunk(
  "demat-account-forms/createDematAccountForm",
  async (values) => {
    try {
      const response = await createDematAccountFormApi(values);

      return response;
    } catch (error) {
      console.log("error inside demat account form thunk", error);
    }
  }
);
