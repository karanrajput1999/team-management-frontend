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
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getApplicatinReport } from "../../slices/ApplicationReport/thunk";

const ApplicationReport = () => {
  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);

  const [selectedSingleStatus1, setSelectedSingleStatus1] = useState(null);

  const [selectedSingleStatus2, setSelectedSingleStatus2] = useState(null);

  const [selectedSingleDateType, setSelectedSingleDateType] = useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const dispatch = useDispatch();

  const { centers } = useSelector((state) => state.Centers);
  const { applicationReports } = useSelector(
    (state) => state.ApplicationReport
  );

  console.log("APPLICATION REPORTS DATA ->", applicationReports);

  function handleSelectSingleCenter(centerName) {
    setSelectedSingleCenterName(centerName);
  }

  function handleSelectSingleStatus1(status1) {
    setSelectedSingleStatus1(status1);
  }

  function handleSelectSingleStatus2(status2) {
    setSelectedSingleStatus2(status2);
  }

  function handleSelectSingleDateType(dateType) {
    setSelectedSingleDateType(dateType);
  }

  function handleSelectSingleBank(bank) {
    setSelectedSingleBank(bank);
  }

  let CenterOptions = centers?.map((center) => {
    return { value: center.centerName, label: center.centerName };
  });

  const status1Options = [
    {
      value: "Already Applied",
      label: "Already Applied",
    },
    {
      value: "Client Denied",
      label: "Client Denied",
    },
    {
      value: "Link Sent",
      label: "Link Sent",
    },
  ];

  const status2Options = [
    {
      value: "Card Approved",
      label: "Card Approved",
    },
    {
      value: "Card Declined",
      label: "Card Declined",
    },
    {
      value: "WIP",
      label: "WIP",
    },
  ];

  const dateTypeOptions = [
    {
      value: "By Decision Date",
      label: "By Decision Date",
    },
    {
      value: "By Punching Date",
      label: "By Punching Date",
    },
  ];
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

  useEffect(() => {
    dispatch(getCenters());
    dispatch(getApplicatinReport());
  }, [dispatch]);

  const bankReportData = [
    {
      id: 1,
      applicationId: 73838,
      customerName: "Lokesh Kumar",
      phone: "7691090901",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: "PENDING",
    },
    {
      id: 2,
      applicationId: 638348,
      customerName: "Surjit singh	",
      phone: "8590466998",
      panCard: "AHXPJ388D",
      clientOf: "Credit Rupay of Qadir on 17 Dec, 22",
      status1: "VKYC Done",
      status2: "APPROVED",
    },
  ];

  document.title = "Application Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Application Report" pageTitle="Applications" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Application Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto d-flex align-items-center justify-content-between">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            placeholder="Search report"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>

                      <Col>
                        <div
                          className="d-flex"
                          style={{ gap: "10px", flexWrap: "wrap" }}
                        >
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
                              id="dateType"
                              name="dateType"
                              value={selectedSingleDateType}
                              onChange={(dateType) => {
                                handleSelectSingleDateType(dateType);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={dateTypeOptions}
                              placeholder="Date Type"
                            />
                          </div>
                          <div>
                            <Select
                              id="centerName"
                              name="centerName"
                              value={selectedSingleCenterName}
                              onChange={(centerName) => {
                                handleSelectSingleCenter(centerName);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={CenterOptions}
                              placeholder="Centers"
                            />
                          </div>
                          <div>
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
                              placeholder="Banks"
                            />
                          </div>
                          <div>
                            <Select
                              id="status1"
                              name="status1"
                              value={selectedSingleStatus1}
                              onChange={(status1) => {
                                handleSelectSingleStatus1(status1);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={status1Options}
                              placeholder="Self Status"
                            />
                          </div>
                          <div>
                            <Select
                              id="status2"
                              name="status2"
                              value={selectedSingleStatus2}
                              onChange={(status2) => {
                                handleSelectSingleStatus2(status2);
                                // validation.setFieldValue(
                                //   "centerName",
                                //   centerName.value
                                // );
                              }}
                              options={status2Options}
                              placeholder="Bank Status"
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
                            <th data-sort="id">S.NO</th>
                            <th data-sort="application_no">Application No</th>
                            <th data-sort="customer_name">Customer Name</th>
                            <th data-sort="phone">Phone</th>

                            <th data-sort="pan_card">Pan Card</th>

                            <th data-sort="client_of">Client of</th>

                            <th data-sort="status_1">Status 1</th>
                            <th data-sort="status_2">Status 2</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {applicationReports?.map((bankReport) => (
                            <tr key={bankReport?.id}>
                              <td>{bankReport?.id}</td>
                              <td>{bankReport?.applicationNo}</td>
                              <td>{bankReport?.fullName}</td>
                              <td>{bankReport?.mobileNo}</td>
                              <td>{bankReport?.panNo}</td>
                              <td>
                                {" "}
                                {Object.keys(bankReport?.user).length !== 0 &&
                                  bankReport?.user?.centerName +
                                    " By " +
                                    bankReport?.user?.name}
                              </td>
                              <td>
                                <span className="badge bg-success-subtle text-success">
                                  {bankReport?.formStatus
                                    ? bankReport?.formStatus
                                    : "Pending"}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-primary-subtle text-primary">
                                  Pending
                                </span>
                              </td>
                            </tr>
                          ))}
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

export default ApplicationReport;
