import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCreditCardForms as getCreditCardFormsApi,
  createCreditCardForm as createCreditCardFormApi,
} from "../../helpers/fakebackend_helper";

export const getCreditCardForms = createAsyncThunk(
  "credit-card-forms/getCreditCardForms",
  async () => {
    try {
      const response = await getCreditCardFormsApi();
      return response;
    } catch (error) {
      console.log("error inside get credit card forms thunk", error);
    }
  }
);

export const createCreditCardForm = createAsyncThunk(
  "credit-card-forms/createCreditCardForm",
  async (values) => {
    try {
      const response = await createCreditCardFormApi(values);

      return response;
    } catch (error) {
      console.log("error inside create credit card form thunk", error);
    }
  }
);
