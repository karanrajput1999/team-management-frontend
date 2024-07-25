import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getDataCorrection, updateDataCorrection } from "./thunk";

export const initialState = {
  city: null,
};

const dataCorrectionSlice = createSlice({
  name: "dataCorrection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataCorrection.fulfilled, (state, action) => {
      state.city = action.payload?.data.currentCity;
      // toast.success("Data has been corrected !", {
      //   position: "bottom-center",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
    });
    builder.addCase(updateDataCorrection.fulfilled, (state, action) => {
      toast.success("Data has been corrected !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default dataCorrectionSlice.reducer;
