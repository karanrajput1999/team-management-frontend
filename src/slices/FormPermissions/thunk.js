import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getFormPermissions as getFormPermissionsApi,
  updateFormPermissions as updateFormPermissionsApi,
} from "../../helpers/fakebackend_helper";

export const getFormPermissions = createAsyncThunk(
  "form-permissions/getFormPermissions",
  async (roleId) => {
    try {
      console.log("GET PERMISSION THUNK ROLE ID ->", roleId);
      const response = await getFormPermissionsApi(roleId);
      return response;
    } catch (error) {
      console.log("error inside get form permissions thunk", error);
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
