import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { downloadDataForOBD } from "../../slices/OBDData/thunk";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useDispatch } from "react-redux";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const OBDData = () => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(downloadDataForOBD()).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.payload], {
          type: "text/csv",
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data-for-obd.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }, []);

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
                      {/* <Form onSubmit={formHandleSubmit}> */}
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
                      {/* </Form> */}
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
