import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getInsuranceForms, createInsuranceForm } from "./thunk";

export const initialState = {
  forms: [],
  error: "",
};

const dematAccountFormSlice = createSlice({
  name: "demat-account-forms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInsuranceForms.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.forms = action.payload?.data.forms;
        state.error = "";
      }
    });

    builder.addCase(createInsuranceForm.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.error = "";
      } else {
        state.forms = [...state.forms, action.payload.data];
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

export default dematAccountFormSlice.reducer;
