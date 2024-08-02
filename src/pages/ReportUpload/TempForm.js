import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
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

const ReportUpload = () => {
  const [selectedSingleBank, setSelectedSingleBank] = useState(null);
  const [files, setFiles] = useState([]);

  function handleSelectSingleBank(bank) {
    setSelectedSingleBank(bank);
  }
  const bankOptions = [
    {
      value: "AU Bank",
      label: "AU Bank",
    },
    {
      value: "ICICI Bank",
      label: "ICICI Bank",
    },
    {
      value: "HDFC Bank",
      label: "HDFC Bank",
    },
    {
      value: "Axis Bank",
      label: "Axis Bank",
    },
  ];
  document.title = "Report Upload";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report Upload" pageTitle="Uploads" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report Upload</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
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
                  </div>
                  <div
                    className="d-flex justify-content-end"
                    style={{ gap: "5px" }}
                  >
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReportUpload;
