import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getUsers as getUsersApi,
//   createUser as createUserApi,
//   removeUser as removeUserApi,
//   updateUser as updateUserApi,
// } from "../../helpers/fakebackend_helper";
import {
  getEmployees as getEmployeesApi,
  createEmployee as createEmployeeApi,
  updateEmployee as updateEmployeeApi,
} from "../../helpers/fakebackend_helper";

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    try {
      const response = await getEmployeesApi();
      return response;
    } catch (error) {
      console.log("error inside get employees thunk", error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (values) => {
    try {
      const response = await createEmployeeApi(values);

      return response;
    } catch (error) {
      console.log("error inside create employee thunk", error);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (data) => {
    try {
      const response = await updateEmployeeApi(data);
      return response;
    } catch (error) {
      console.log("error inside update employee thunk", error);
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
