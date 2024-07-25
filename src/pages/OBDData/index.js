import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Label,
  Row,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { uploadData } from "../../slices/UploadRawData/thunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const OBDData = () => {
  const [selectedSingleVendor, setSelectedSingleVendor] = useState(null);
  const [selectedSingleDataType, setSelectedSingleDataType] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  function handleSelectSingleVendor(vendor) {
    setSelectedSingleVendor(vendor);
  }
  function handleSelectSingleDataType(dataType) {
    setSelectedSingleDataType(dataType);
  }
  const vendorOptions = [
    {
      value: "Ramesh",
      label: "Ramesh",
    },
    {
      value: "Suresh",
      label: "Suresh",
    },
  ];
  const dataTypeOptions = [
    {
      value: "Mixed",
      label: "Mixed",
    },
    {
      value: "Medical",
      label: "Medical",
    },
    {
      value: "B2B",
      label: "B2B",
    },
    {
      value: "IT Professional",
      label: "IT Professional",
    },
    {
      value: "Students",
      label: "Students",
    },
  ];

  const validation = useFormik({
    initialValues: {
      vendorName: "",
      dataType: "",
      purchaseDate: "",
    },
    validationSchema: Yup.object({
      vendorName: Yup.string().required("Please select vendor name"),
      dataType: Yup.string().required("Please select data type"),
      purchaseDate: Yup.array().required("Please select purchase date"),
    }),
    onSubmit: (values, { setFieldValue }) => {
      dispatch(uploadData({ ...values, data: file.file }));

      setSelectedSingleVendor(null);
      setSelectedSingleDataType(null);
      setFieldValue("purchaseDate", "");
      setFile(null);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    return false;
  }

  document.title = "OBD Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="OBD Data" pageTitle="Data Management" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Upload OBD Result</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <Form onSubmit={formHandleSubmit}>
                        <div className="mb-2">
                          <Label className="form-label">Choose File</Label>
                          <FilePond
                            files={file}
                            onupdatefiles={(file) => setFile(file[0])}
                            maxFiles={1}
                            name="data"
                            className="filepond"
                            required={true}
                          />
                        </div>
                        <div
                          className="d-flex justify-content-end"
                          style={{ gap: "5px" }}
                        >
                          <button type="submit" className="btn btn-primary">
                            {" "}
                            <i
                              className="ri-file-upload-line"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Upload
                          </button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Data For OBD</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <button className="btn btn-success">
                        <i
                          className="ri-download-2-line"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Download Data
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Data Information</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th>Id</th>
                              <th>Data Code</th>
                              <th>Total Leads</th>
                              <th>Ringing</th>
                              <th>Tools</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            <tr>
                              <td className="id">1</td>
                              <td className="data-code">177238488</td>
                              <td className="total-leads">10</td>
                              <td className="ringing">23434</td>
                              <td className="download_btn">
                                <button className="btn btn-success btn-sm">
                                  <i
                                    className="ri-download-2-line"
                                    style={{ marginRight: "5px" }}
                                  ></i>
                                  Download Data
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default OBDData;
