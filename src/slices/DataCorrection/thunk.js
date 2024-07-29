import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDataCorrection as getDataCorrectionApi,
  cityDataCorrection as cityDataCorrectionApi,
  salaryDataCorrection as salaryDataCorrectionApi,
  getSalaryInLacs as getSalaryInLacsApi,
  getSalaryInThousands as getSalaryInThousandsApi,
  getStates as getStatesApi,
  getCities as getCitiesApi,
  getPinCodes as getPinCodesApi,
} from "../../helpers/fakebackend_helper";

export const getDataCorrection = createAsyncThunk(
  "dataCorrection/getDataCorrection",
  async () => {
    try {
      const response = await getDataCorrectionApi();

      return response;
    } catch (error) {
      console.log("error inside get data correction thunk", error);
    }
  }
);

export const cityDataCorrection = createAsyncThunk(
  "dataCorrection/cityDataCorrectionApi",
  async (values) => {
    try {
      const response = await cityDataCorrectionApi(values);

      return response;
    } catch (error) {
      console.log("error inside update data correction thunk", error);
    }
  }
);
export const salaryDataCorrection = createAsyncThunk(
  "dataCorrection/salaryDataCorrection",
  async (values) => {
    try {
      const response = await salaryDataCorrectionApi(values);

      return response;
    } catch (error) {
      console.log("error inside salary data correction thunk", error);
    }
  }
);

export const getSalaryInLacs = createAsyncThunk(
  "dataCorrection/getSalaryInLacs",
  async () => {
    try {
      const response = await getSalaryInLacsApi();

      return response;
    } catch (error) {
      console.log(
        "error inside get salary in lacs data correction thunk",
        error
      );
    }
  }
);

export const getSalaryInThousands = createAsyncThunk(
  "dataCorrection/getSalaryInThousands",
  async () => {
    try {
      const response = await getSalaryInThousandsApi();

      return response;
    } catch (error) {
      console.log(
        "error inside get  salary in thousands data correction thunk",
        error
      );
    }
  }
);

export const getStates = createAsyncThunk(
  "dataCorrection/getStates",
  async () => {
    try {
      const response = await getStatesApi();

      return response;
    } catch (error) {
      console.log("error inside get states data correction thunk", error);
    }
  }
);
export const getCities = createAsyncThunk(
  "dataCorrection/getCities",
  async (stateId) => {
    try {
      const response = await getCitiesApi(stateId);

      return response;
    } catch (error) {
      console.log("error inside get cities data correction thunk", error);
    }
  }
);
export const getPinCodes = createAsyncThunk(
  "dataCorrection/getPinCodes",
  async (cityId) => {
    try {
      const response = await getPinCodesApi(cityId);

      return response;
    } catch (error) {
      console.log("error inside get pin codes data correction thunk", error);
    }
  }
);
