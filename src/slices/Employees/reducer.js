import { createSlice } from "@reduxjs/toolkit";
// import { getUsers, createUser, removeUser, updateUser } from "./thunk";
import { getEmployees, createEmployee, updateEmployee } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  employees: [],
  alreadyRegisteredError: null,
  error: "",
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearAlreadyRegisteredError: (state) => {
      state.alreadyRegisteredError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.employees = action.payload?.data.employees;
        state.error = "";
      }
    });

    builder.addCase(createEmployee.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.employees = [...state.employees, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Employee has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedEmployee = action.payload?.data?.updatedEmployee;

        // if (updatedCenterUser.status === 0) {
        //   state.centerUsers = state.centerUsers.filter(
        //     (user) => user.id !== updatedCenterUser.id
        //   );
        //   state.error = "";
        //   toast.error("Center user has been removed !", {
        //     position: "bottom-center",
        //     autoClose: 3000,
        //     theme: "colored",
        //   });

        //   state.alreadyRegisteredError = null;
        // } else {
        state.employees = state.employees.map((user) => {
          if (user.id == updatedEmployee.id) {
            user = action.payload.data.updatedEmployee;
            return user;
          } else {
            return user;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Employee details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
      // }
    });

    // builder.addCase(removeCenterUser.fulfilled, (state, action) => {
    //   const deletedCenterUserId = action.payload.id;
    //   state.centerUsers = state.centerUsers.filter(
    //     (user) => user.id !== deletedCenterUserId
    //   );
    //   state.error = "";
    //   toast.error("Center user has been removed !", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    // });
  },
});
export const { clearAlreadyRegisteredError } = employeesSlice.actions;

export default employeesSlice.reducer;
