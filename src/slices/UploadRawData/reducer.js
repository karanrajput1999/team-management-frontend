import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { uploadData } from "./thunk";

export const initialState = {
  data: [],
};

const uploadRawDataSlice = createSlice({
  name: "uploadRawData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadData.fulfilled, (state, action) => {
      console.log("PAYLOAD FROM FILE THUNK ->", action.payload);
      toast.success("Data has been uploaded !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default uploadRawDataSlice.reducer;
