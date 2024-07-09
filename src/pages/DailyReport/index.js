import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { getCenters } from "../../slices/Centers/thunk";
import Select from "react-select";

const DailyReport = () => {
  const [selectedSingleEmployee, setSelectedSingleEmployee] = useState(null);

  function handleSelectSingleEmployee(employee) {
    setSelectedSingleEmployee(employee);
  }

  const AllEmployeeOptions = [
    {
      value: "Someone",
      label: "Someone",
    },
    {
      value: "Anyone",
      label: "Anyone",
    },
  ];

  const bankReportData = [
    {
      id: 1,
      applicationId: 73838,
      customerName: "Lokesh Kumar",
      phone: "7691090901",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: 85,
    },
    {
      id: 2,
      applicationId: 638348,
      customerName: "Surjit singh	",
      phone: "8590466998",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: 83,
    },
  ];

  document.title = "Daily Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daily Report" pageTitle="Applications" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Daily Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex align-items-center ">
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <div className="d-flex">
                            <Flatpickr
                              className="form-control border dash-filter-picker"
                              placeholder="Date Range"
                              options={{
                                mode: "range",
                                dateFormat: "d M, Y",
                              }}
                            />
                          </div>

                          <div>
                            <Select
                              id="status1"
                              name="status1"
                              value={selectedSingleEmployee}
                              onChange={(employee) => {
                                handleSelectSingleEmployee(employee);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={AllEmployeeOptions}
                              placeholder="Select Employee"
                            />
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light"
                          >
                            <i className="ri-equalizer-fill label-icon align-middle fs-16 me-2"></i>
                            Apply Filters
                          </button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th data-sort="sno">S.NO</th>
                            <th data-sort="name">Name</th>
                            <th data-sort="DOJ">DOJ</th>
                            <th data-sort="vintage">Vintage</th>

                            <th data-sort="talktime">Talktime</th>

                            <th data-sort="attempts">Attempts</th>

                            <th data-sort="unique_attempts">Unique Attempts</th>
                            <th data-sort="interested_client">
                              Interested Client
                            </th>
                            <th data-sort="pending">Pending</th>
                            <th data-sort="vkyc">VKYC</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <td className="sno">1</td>
                            <td className="name">Someone</td>
                            <td className="doj">12/07/2024</td>
                            <td className="vintage">0</td>
                            <td className="talktime">0</td>
                            <td className="attempts">0</td>
                            <td className="unique_attempts">0</td>
                            <td className="interested_count">0</td>
                            <td className="pending">0</td>
                            <td className="vkyc">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
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

export default DailyReport;
