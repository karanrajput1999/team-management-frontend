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
import { useDispatch } from "react-redux";
import {
  getDailyReportData,
  uploadDailyReport,
} from "../../slices/DailyReportUpload/thunk";
import { useSelector } from "react-redux";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const DailyReportUpload = () => {
  const [file, setFile] = useState([]);

  const dispatch = useDispatch();

  const { groupedDataByDate } = useSelector((state) => state.DailyReportUpload);

  useEffect(() => {
    dispatch(getDailyReportData());
  }, [dispatch]);

  const dummyData = [
    {
      id: 1,
      givenDate: "2023/07/07",
      data: 2245,
    },
    {
      id: 2,
      givenDate: "2024/04/17",
      data: 132,
    },
    {
      id: 3,
      givenDate: "2023/11/09",
      data: 53,
    },
  ];

  function handleUploadDailyReport() {
    dispatch(uploadDailyReport({ data: file.file })).then((res) =>
      console.log(res)
    );
  }

  document.title = "Daily Report Upload";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daily Report Upload" pageTitle="Uploads" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Upload Data</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <div className="mb-2">
                        <Label className="form-label">Choose File</Label>
                        <FilePond
                          files={file}
                          onupdatefiles={(file) => setFile(file[0])}
                          maxFiles={1}
                          name="data"
                          className="filepond"
                        />
                      </div>
                      <div
                        className="d-flex justify-content-end"
                        style={{ gap: "5px" }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={handleUploadDailyReport}
                        >
                          {" "}
                          <i
                            className="ri-file-upload-line"
                            style={{ marginRight: "5px" }}
                          ></i>
                          Upload
                        </button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Information</h4>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col>
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th data-sort="s_no">S.No.</th>
                              <th data-sort="given_date">Date</th>
                              <th data-sort="customer_name">Data</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {groupedDataByDate?.map((data, idx) => (
                              <tr key={idx}>
                                <td className="s_no">{idx + 1}</td>
                                <td className="given_date">
                                  {new Date(data.createdAt).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </td>
                                <td className="data">{data._count}</td>
                              </tr>
                            ))}
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
    </React.Fragment>
  );
};

export default DailyReportUpload;
