import { createSlice } from "@reduxjs/toolkit";
import { getPendingForms, pendingFormsFilter } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  pendingForms: [],
  updatedForms: [],
  filteredPendingForms: [],
  filteredUpdatedForms: [],
  error: "",
};

const centersSlice = createSlice({
  name: "pendingForms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingForms.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.pendingForms = action.payload?.data.pendingForms;
        state.updatedForms = action.payload?.data.updatedForms;
        state.error = "";
      }
    });
    builder.addCase(pendingFormsFilter.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.filteredPendingForms = action.payload?.data.pendingForms;
        state.filteredUpdatedForms = action.payload?.data.updatedForms;
        state.error = "";
        toast.success("Status updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default centersSlice.reducer;
