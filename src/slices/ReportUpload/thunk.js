import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getReportUpload as getReportUploadApi,
  filterReportUpload as filterReportUploadApi,
  updateReportUploadStatus as updateReportUploadStatusApi,
  updateReportUploadStatusWithFile as updateReportUploadStatusWithFileApi,
  deleteReportUpload as deleteReportUploadApi,
} from "../../helpers/fakebackend_helper";

export const getReportUpload = createAsyncThunk(
  "ReportUpload/getReportUpload",
  async () => {
    try {
      const response = await getReportUploadApi();
      return response;
    } catch (error) {
      console.log("error inside get report upload thunk", error);
    }
  }
);
export const updateReportUploadStatus = createAsyncThunk(
  "ReportUpload/updateReportUploadStatus",
  async (data) => {
    try {
      const response = await updateReportUploadStatusApi(data);
      return response;
    } catch (error) {
      console.log("error inside update report upload status thunk", error);
    }
  }
);
export const updateReportUploadStatusWithFile = createAsyncThunk(
  "ReportUpload/updateReportUploadStatusWithFile",
  async (data) => {
    try {
      const response = await updateReportUploadStatusWithFileApi(data);
      return response;
    } catch (error) {
      console.log(
        "error inside update report upload status with file thunk",
        error
      );
    }
  }
);
export const filterReportUpload = createAsyncThunk(
  "ReportUpload/filterReportUpload",
  async (data) => {
    try {
      const response = await filterReportUploadApi(data);
      return response;
    } catch (error) {
      console.log("error inside filter report upload thunk", error);
    }
  }
);
export const deleteReportUpload = createAsyncThunk(
  "ReportUpload/deleteReportUpload",
  async (bankStatusId) => {
    try {
      const response = await deleteReportUploadApi(bankStatusId);
      return response;
    } catch (error) {
      console.log("error inside delete report upload thunk", error);
    }
  }
);
