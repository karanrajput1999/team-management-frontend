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

const UploadRawData = () => {
  const [selectedSingleVendor, setSelectedSingleVendor] = useState(null);
  const [selectedSingleDataType, setSelectedSingleDataType] = useState(null);
  const [file, setFile] = useState([]);

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
    onSubmit: (values) => {
      dispatch(uploadData({ ...values, data: file.file }));

      console.log("FORM VALUES ->", values, file.file);

      setSelectedSingleVendor(null);
      setSelectedSingleDataType(null);
    },
  });

  console.log("VALUES ->", validation.values);

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    return false;
  }

  document.title = "Uploa Raw Data";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Upload Raw Data" pageTitle="Data Management" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Upload Raw Data</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <Form onSubmit={formHandleSubmit}>
                        <div className="mb-2">
                          <Label className="form-label">Choose Vendor</Label>
                          <Select
                            id="vendor"
                            name="vendor"
                            value={selectedSingleVendor}
                            onChange={(vendor) => {
                              handleSelectSingleVendor(vendor);
                              validation.setFieldValue(
                                "vendorName",
                                vendor.value
                              );
                            }}
                            options={vendorOptions}
                            placeholder="Choose Vendor"
                          />
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">Choose Data Type</Label>
                          <Select
                            id="data-type"
                            name="data-type"
                            value={selectedSingleDataType}
                            onChange={(dataType) => {
                              handleSelectSingleDataType(dataType);
                              validation.setFieldValue(
                                "dataType",
                                dataType.value
                              );
                            }}
                            options={dataTypeOptions}
                            placeholder="Choose Data Type"
                          />
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">Purchase Date</Label>
                          <Flatpickr
                            className="form-control border dash-filter-picker"
                            placeholder="Choose Date"
                            value={validation.values.purchaseDate || ""}
                            options={{
                              mode: "single",
                              dateFormat: "d M, Y",
                              defaultDate: validation.values.purchaseDate || "",
                            }}
                            onChange={(date) => {
                              validation.setFieldValue("purchaseDate", date);
                            }}
                          />
                        </div>
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
                          <button className="btn btn-success">
                            <i
                              className="ri-file-download-line"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Download Sample File
                          </button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {/* <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Download Data</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <div className="mb-2">
                        <Label className="form-label">Select Employee</Label>
                        <Select
                          id="employee"
                          name="employee"
                          value={selectedSingleEmployee}
                          onChange={(employee) => {
                            handleSelectSingleEmployee(employee);
                            // validation.setFieldValue(
                            //   "centerName",
                            //   centerName.value
                            // );
                          }}
                          options={employeeOptions}
                          placeholder="Choose Employee"
                        />
                      </div>

                      <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th className="sort" data-sort="id">
                                Id
                              </th>
                              <th className="sort" data-sort="given_date">
                                Given Date
                              </th>
                              <th className="sort" data-sort="customer_name">
                                Data
                              </th>
                              <th className="sort" data-sort="phone">
                                Download
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {downloadData?.map((data) => (
                              <tr key={data.id}>
                                <td className="id">{data.id}</td>
                                <td className="given_date">{data.givenDate}</td>
                                <td className="data">{data.data}</td>
                                <td className="download_btn">
                                  <button className="btn btn-success btn-sm">
                                    <i
                                      className="ri-download-2-line"
                                      style={{ marginRight: "5px" }}
                                    ></i>
                                    Download data
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default UploadRawData;
