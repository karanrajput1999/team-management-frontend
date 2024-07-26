import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { downloadDataForOBD } from "./thunk";

export const initialState = {
  data: [],
};

const downloadDataForOBD = createSlice({
  name: "obdData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(downloadDataForOBD.fulfilled, (state, action) => {
      console.log("PAYLOAD FROM OBD DATA ->", action.payload);
      toast.success("Data downloaded !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default downloadDataForOBD.reducer;
