import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getLoanForms, createLoanForm } from "./thunk";

export const initialState = {
  forms: [],
  error: "",
};

const loanFormSlice = createSlice({
  name: "loan-forms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoanForms.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.forms = action.payload?.data.forms;
        state.error = "";
      }
    });

    builder.addCase(createLoanForm.fulfilled, (state, action) => {
      console.log("LOAN FORM SUBMITTED ->", action.payload);
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

export default loanFormSlice.reducer;
