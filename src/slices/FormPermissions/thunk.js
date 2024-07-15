import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getFormPermissions as getFormPermissionsApi,
  updateFormPermissions as updateFormPermissionsApi,
  getAllowedFormPermissions as getAllowedFormPermissionsApi,
} from "../../helpers/fakebackend_helper";

export const getFormPermissions = createAsyncThunk(
  "form-permissions/getFormPermissions",
  async (centerId) => {
    try {
      const response = await getFormPermissionsApi(centerId);
      return response;
    } catch (error) {
      console.log("error inside get form permissions thunk", error);
    }
  }
);

export const getAllowedFormPermissions = createAsyncThunk(
  "form-permissions/getAllowedFormPermissions",
  async (values) => {
    try {
      const response = await getAllowedFormPermissionsApi(values);

      return response;
    } catch (error) {
      console.log("error inside allowed form permissions thunk", error);
    }
  }
);
export const updateFormPermissions = createAsyncThunk(
  "form-permissions/updateFormPermissions",
  async (values) => {
    try {
      const response = await updateFormPermissionsApi(values);

      return response;
    } catch (error) {
      console.log("error inside update form permissions thunk", error);
    }
  }
);
