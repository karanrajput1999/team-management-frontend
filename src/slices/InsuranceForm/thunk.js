import { createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   getLoanForms as getLoanFormsApi,
//   createLoanForm as createLoanFormApi,
// } from "../../helpers/fakebackend_helper";
import {
  getInsuranceForms as getInsuranceFormsApi,
  createInsuranceForm as createInsuranceFormApi,
} from "../../helpers/fakebackend_helper";

export const getInsuranceForms = createAsyncThunk(
  "insurance-forms/getInsuranceForms",
  async () => {
    try {
      const response = await getInsuranceFormsApi();
      return response;
    } catch (error) {
      console.log("error inside get insurance forms thunk", error);
    }
  }
);

export const createInsuranceForm = createAsyncThunk(
  "insurance-forms/createInsuranceForm",
  async (values) => {
    try {
      const response = await createInsuranceFormApi(values);

      return response;
    } catch (error) {
      console.log("error inside create insurance form thunk", error);
    }
  }
);
