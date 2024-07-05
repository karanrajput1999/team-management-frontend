import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getBankCodes as getBankCodesApi,
  createBankCode as createBankCodeApi,
  updateBankCode as updateBankCodeApi,
  removeBankCode as removeBankCodeApi,
} from "../../helpers/fakebackend_helper";

export const getBankCodes = createAsyncThunk(
  "bankCode/getBankCodes",
  async () => {
    try {
      const response = await getBankCodesApi();
      return response;
    } catch (error) {
      console.log("error inside get bank code thunk", error);
    }
  }
);

export const createBankCode = createAsyncThunk(
  "bankCode/createBankCode",
  async (values) => {
    try {
      const response = await createBankCodeApi(values);

      return response;
    } catch (error) {
      console.log("error inside create bank code thunk", error);
    }
  }
);

export const updateBankCode = createAsyncThunk(
  "bankCode/updateBankCode",
  async ({ bankCodeId, values, status }) => {
    try {
      const response = await updateBankCodeApi(bankCodeId, values, status);
      return response;
    } catch (error) {
      console.log("error inside update bank code thunk", error);
    }
  }
);

// export const removeBankCode = createAsyncThunk(
//   "bankCode/removeBankCode",
//   async ({ bankCodeId }) => {
//     try {
//       const response = await removeBankCodeApi(bankCodeId);

//       return response.data;
//     } catch (error) {
//       console.log("error inside remove bank code thunk", error);
//     }
//   }
// );
