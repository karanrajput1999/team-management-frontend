import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCenters as getCentersApi,
  createCenter as createCenterApi,
  updateCenter as updateCenterApi,
  removeCenter as removeCenterApi,
} from "../../helpers/fakebackend_helper";

export const getCenters = createAsyncThunk("centers/getCenters", async () => {
  try {
    const response = await getCentersApi();
    return response;
  } catch (error) {
    console.log("error inside get centers thunk", error);
  }
});

export const createCenter = createAsyncThunk(
  "centers/createCenter",
  async (values) => {
    console.log("ADD CENTER VALUES ->", values);

    try {
      const response = await createCenterApi(values);

      return response;
    } catch (error) {
      console.log("error inside create center thunk", error);
    }
  }
);

export const updateCenter = createAsyncThunk(
  "centers/updateCenter",
  async ({ centerId, values, status }) => {
    try {
      const response = await updateCenterApi(centerId, values, status);
      return response;
    } catch (error) {
      console.log("error inside update center thunk", error);
    }
  }
);

// export const removeCenter = createAsyncThunk(
//   "centers/removeCenter",
//   async ({ centerId }) => {
//     try {
//       const response = await removeCenterApi(centerId);

//       return response.data;
//     } catch (error) {
//       console.log("error inside remove center thunk", error);
//     }
//   }
// );
