import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getForms, createForm } from "./thunk";

export const initialState = {
  forms: [],
  error: "",
};

const centersSlice = createSlice({
  name: "Forms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForms.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.forms = action.payload?.data.forms;
        state.error = "";
      }
    });

    builder.addCase(createForm.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.forms = [...state.forms, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Form has been submitted !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default centersSlice.reducer;
