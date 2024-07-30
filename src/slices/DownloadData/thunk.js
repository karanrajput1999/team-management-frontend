import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  filterDownloadData as filterDownloadDataApi,
  downloadAllData as downloadAllDataApi,
  getStates as getStatesApi,
  getCities as getCitiesApi,
  getPinCodes as getPinCodesApi,
} from "../../helpers/fakebackend_helper";

export const filterDownloadData = createAsyncThunk(
  "downloadData/filterDownloadData",
  async (data) => {
    try {
      const response = await filterDownloadDataApi(data);
      return response;
    } catch (error) {
      console.log("error inside get forms thunk", error);
    }
  }
);
export const downloadAllData = createAsyncThunk(
  "downloadData/downloadAllData",
  async () => {
    try {
      const response = await downloadAllDataApi();
      return response;
    } catch (error) {
      console.log("error inside get forms thunk", error);
    }
  }
);

export const getStates = createAsyncThunk(
  "downloadData/getStates",
  async () => {
    try {
      const response = await getStatesApi();
      return response;
    } catch (error) {
      console.log("error inside get states data download thunk", error);
    }
  }
);
export const getCities = createAsyncThunk(
  "downloadData/getCities",
  async (stateId) => {
    try {
      const response = await getCitiesApi(stateId);

      return response;
    } catch (error) {
      console.log("error inside get cities data download thunk", error);
    }
  }
);
export const getPinCodes = createAsyncThunk(
  "downloadData/getPinCodes",
  async (cityId) => {
    try {
      const response = await getPinCodesApi(cityId);

      return response;
    } catch (error) {
      console.log("error inside get pin codes data download thunk", error);
    }
  }
);
