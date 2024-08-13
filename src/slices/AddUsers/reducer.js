import { createSlice } from "@reduxjs/toolkit";
// import { getUsers, createUser, removeUser, updateUser } from "./thunk";
import {
  getCenterUsers,
  createCenterUser,
  removeCenterUser,
  updateCenterUser,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  centerUsers: [],
  allCenterUsers: [],
  alreadyRegisteredError: null,
  error: "",
};

const usersSlice = createSlice({
  name: "addUsers",
  initialState,
  reducers: {
    clearAlreadyRegisteredError: (state) => {
      state.alreadyRegisteredError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCenterUsers.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.centerUsers = action.payload?.data.users;
        state.allCenterUsers = action.payload?.data.centerUsers; // these users are going to be used on the form page
        state.error = "";
      }
    });

    builder.addCase(createCenterUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.centerUsers = [...state.centerUsers, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Center user has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCenterUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedCenterUser = action.payload?.data?.updatedCenterUser;

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
        state.centerUsers = state.centerUsers.map((user) => {
          if (user.id == updatedCenterUser.id) {
            user = action.payload.data.updatedCenterUser;
            return user;
          } else {
            return user;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Center User details updated !", {
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
export const { clearAlreadyRegisteredError } = usersSlice.actions;

export default usersSlice.reducer;
