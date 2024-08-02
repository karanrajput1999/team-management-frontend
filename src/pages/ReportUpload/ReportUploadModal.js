import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Link } from "react-router-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function ReportFormModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  selectedSingleBank,
  handleSelectSingleBank,
  bankOptions,
  files,
  setFiles,
}) {
  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        Upload Report
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label className="form-label">Choose Bank</Label>
            <Select
              id="bankName"
              name="bankName"
              value={selectedSingleBank}
              onChange={(bankName) => {
                handleSelectSingleBank(bankName);
                // validation.setFieldValue(
                //   "centerName",
                //   centerName.value
                // );
              }}
              options={bankOptions}
              placeholder="Choose Bank"
            />
          </div>
          <div className="mb-2">
            <Label className="form-label">Choose File</Label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              maxFiles={1}
              name="files"
              className="filepond"
            />
          </div>

          <div className="d-flex justify-content-end" style={{ gap: "5px" }}>
            <button className="btn btn-primary ">
              {" "}
              <i
                className="ri-file-upload-line"
                style={{ marginRight: "5px" }}
              ></i>
              Upload
            </button>
            <button className="btn btn-success">
              <i
                className="ri-file-download-line"
                style={{ marginRight: "5px" }}
              ></i>
              Download Sample File
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default ReportFormModal;
