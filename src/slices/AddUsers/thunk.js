import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getUsers as getUsersApi,
//   createUser as createUserApi,
//   removeUser as removeUserApi,
//   updateUser as updateUserApi,
// } from "../../helpers/fakebackend_helper";
import {
  getCenterUsers as getCenterUsersApi,
  createCenterUser as createCenterUserApi,
  updateCenterUser as updateCenterUserApi,
  removeCenterUser as removeCenterUserApi,
} from "../../helpers/fakebackend_helper";

export const getCenterUsers = createAsyncThunk(
  "addUsers/getCenterUsers",
  async () => {
    try {
      const response = await getCenterUsersApi();
      return response;
    } catch (error) {
      console.log("error inside getUsers thunk", error);
    }
  }
);

export const createCenterUser = createAsyncThunk(
  "addUsers/createCenterUser",
  async (values) => {
    try {
      const response = await createCenterUserApi(values);

      return response;
    } catch (error) {
      console.log("error inside createUser thunk", error);
    }
  }
);

export const updateCenterUser = createAsyncThunk(
  "addUsers/updateCenterUser",
  async (data) => {
    try {
      console.log("WHILE DELETING THE USER ->", data);
      const response = await updateCenterUserApi(data);
      return response;
    } catch (error) {
      console.log("error inside update center user thunk", error);
    }
  }
);

// export const removeCenterUser = createAsyncThunk(
//   "addUsers/removeCenterUser",
//   async ({ userId }) => {
//     try {
//       const response = await removeCenterUserApi(userId);

//       return response.data.deletedUser;
//     } catch (error) {
//       console.log("error inside remove user thunk", error);
//     }
//   }
// );
