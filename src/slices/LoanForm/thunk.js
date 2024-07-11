import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLoanForms as getLoanFormsApi,
  createLoanForm as createLoanFormApi,
} from "../../helpers/fakebackend_helper";

export const getLoanForms = createAsyncThunk(
  "loan-forms/getLoanForms",
  async () => {
    try {
      const response = await getLoanFormsApi();
      return response;
    } catch (error) {
      console.log("error inside get loan forms thunk", error);
    }
  }
);

export const createLoanForm = createAsyncThunk(
  "loan-forms/createLoanForm",
  async (values) => {
    try {
      const response = await createLoanFormApi(values);

      return response;
    } catch (error) {
      console.log("error inside create loan form thunk", error);
    }
  }
);
