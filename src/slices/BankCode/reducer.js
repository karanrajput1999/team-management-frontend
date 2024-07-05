import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCenters, createCenter, removeCenter, updateCenter } from "./thunk";
import {
  getBankCodes,
  createBankCode,
  removeBankCode,
  updateBankCode,
} from "./thunk";

export const initialState = {
  bankCodes: [],
  filteredBankCodes: [], // bankCodes that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
};

const bankCodesSlice = createSlice({
  name: "bankCode",
  initialState,
  reducers: {
    searchBankCodes(state, action) {
      const inputValue = action.payload.toLowerCase();

      if (inputValue === "") {
        state.filteredBankCodes = [];
      } else {
        state.filteredBankCodes = state.bankCodes.filter((bankCode) => {
          return Object.values(bankCode).some((bankCodeVal) => {
            return String(bankCodeVal).toLowerCase().includes(inputValue);
          });
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBankCodes.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.bankCodes = action.payload?.data.bankCodes;
        state.error = "";
      }
    });

    builder.addCase(createBankCode.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.bankCodes = [...state.bankCodes, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Bank Code has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateBankCode.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedBankCode = action.payload.data.updatedBankCode;

        if (updatedBankCode.status === 0) {
          state.bankCodes = state.bankCodes.filter(
            (bankCode) => bankCode.id !== updatedBankCode.id
          );
          state.error = "";
          toast.error("Bank Code has been removed !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          state.bankCodes = state.bankCodes.map((bankCode) => {
            if (bankCode.id == updatedBankCode.id) {
              bankCode = updatedBankCode;
              return bankCode;
            } else {
              return bankCode;
            }
          });

          state.alreadyRegisteredError = null;
          state.error = "";

          toast.success("Bank code details updated !", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });

    // builder.addCase(removeBankCode.fulfilled, (state, action) => {
    //   const deletedBankCodeId = action.payload.deletedBankCode.id;
    //   state.bankCodes = state.bankCodes.filter(
    //     (bankCode) => bankCode.id !== deletedBankCodeId
    //   );
    //   state.error = "";
    //   toast.error("Bank Code has been removed !", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    // });
  },
});

export const { searchBankCodes } = bankCodesSlice.actions;
export default bankCodesSlice.reducer;
