import { createSlice, current } from "@reduxjs/toolkit";
import {
  getReportUpload,
  filterReportUpload,
  updateReportUploadStatus,
  updateReportUploadStatusWithFile,
  deleteReportUpload,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  reportUploads: [],
  filteredReportUploads: [],
  error: "",
};

const reportUploadSlice = createSlice({
  name: "ReportUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportUpload.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportUploads = action.payload?.data.reportUpload;
        state.error = "";
      }
    });
    builder.addCase(updateReportUploadStatus.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        const updatedBankStatus = action.payload?.data.updatedBankStatus;

        state.reportUploads = state.reportUploads.map((report) => {
          if (
            report.formId === updatedBankStatus.formId &&
            report.formType === updatedBankStatus.formType
          ) {
            return {
              ...report,
              previousBankStatuses: [
                ...report.previousBankStatuses,
                updatedBankStatus,
              ],
            };
          } else {
            return report;
          }
        });

        toast.success("Status has been updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
        state.error = "";
      }
    });
    builder.addCase(
      updateReportUploadStatusWithFile.fulfilled,
      (state, action) => {
        if (action.payload.status === "failure") {
          state.error = action.payload.message;
        } else {
          const allBankStatusUpdate = action.payload?.data.allBankStatusUpdate;

          allBankStatusUpdate.forEach((updatedBankStatus) => {
            state.reportUploads = state.reportUploads.map((report) => {
              if (
                report.formId === updatedBankStatus.formId &&
                report.bankId === updatedBankStatus.bankId
              ) {
                return {
                  ...report,
                  previousBankStatuses: [
                    ...report.previousBankStatuses,
                    updatedBankStatus,
                  ],
                };
              } else {
                return report;
              }
            });
          });

          state.error = "";
          toast.success("Status updated!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    );
    builder.addCase(filterReportUpload.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.filteredReportUploads = action.payload?.data.reportUpload;
        state.error = "";
      }
    });

    builder.addCase(deleteReportUpload.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        const deletedBankStatus = action.payload?.data.deletedBankStatus;

        state.reportUploads = state.reportUploads.map((report) => {
          if (report.id === deletedBankStatus.formId) {
            const filteredStatus = report.previousBankStatuses.filter(
              (status) => status.id !== deletedBankStatus.id
            );

            return { ...report, previousBankStatuses: filteredStatus };
          } else {
            return report;
          }
        });
        toast.error("Status removed!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
        state.error = "";
      }
    });
  },
});

export default reportUploadSlice.reducer;
