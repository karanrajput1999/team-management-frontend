import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFormPermissions, updateFormPermissions } from "./thunk";

export const initialState = {
  formPermissions: [],
  error: "",
};

const formPermissionsSlice = createSlice({
  name: "form-permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormPermissions.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.formPermissions = action.payload?.data.formPermissions;
        state.error = "";
      }
    });

    builder.addCase(updateFormPermissions.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = "";
      } else {
        state.formPermissions = [...state.formPermissions, action.payload.data];
        state.error = "";
        toast.success("Form permissions has been updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default formPermissionsSlice.reducer;
