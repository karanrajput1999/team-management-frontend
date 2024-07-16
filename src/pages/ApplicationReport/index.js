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
import {
  getApplicatinReport,
  filterApplicatinReport,
} from "../../slices/ApplicationReport/thunk";
import moment from "moment-timezone";
import { StatusOptions } from "../../common/data/pendingForms";

const ApplicationReport = () => {
  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);

  const [selectedSingleStatus1, setSelectedSingleStatus1] = useState(null);

  const [selectedSingleStatus2, setSelectedSingleStatus2] = useState(null);

  const [selectedSingleDateType, setSelectedSingleDateType] = useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const [selectedSingleFormType, setSelectedSingleFormType] = useState(null);

  const [filters, setFilters] = useState({
    center: "",
    dateRange: "",
    selfStatus: "",
    formType: "",
  });

  const dispatch = useDispatch();

  const { centers } = useSelector((state) => state.Centers);
  const { applicationReports, filteredApplicationReports } = useSelector(
    (state) => state.ApplicationReport
  );

  useEffect(() => {
    dispatch(getCenters());
    dispatch(getApplicatinReport());
  }, [dispatch]);

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

  function handleSelectSingleFormType(formType) {
    setSelectedSingleFormType(formType);
  }

  let CenterOptions = centers?.map((center) => {
    return { value: center.centerName, label: center.centerName };
  });

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
  const formTypeOptions = [
    {
      value: "Credit Card",
      label: "Credit Card",
    },
    {
      value: "Loan",
      label: "Loan",
    },
    {
      value: "Insurance",
      label: "Insurance",
    },
    {
      value: "Demat Account",
      label: "Demat Account",
    },
  ];

  function handleFilters() {
    dispatch(filterApplicatinReport({ filters }));
  }

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
                            placeholder="Search Name, Mob No, Pan No"
                            onChange={(e) => {
                              dispatch(
                                filterApplicatinReport({
                                  searchQuery: e.target.value,
                                })
                              );
                            }}
                            style={{ width: "280px" }}
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
                              onChange={(date) => {
                                setFilters({ ...filters, dateRange: date });
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

                                setFilters({
                                  ...filters,
                                  center: centerName.value,
                                });
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...CenterOptions,
                              ]}
                              placeholder="Choose Center"
                            />
                          </div>
                          <div>
                            <Select
                              id="formType"
                              name="formType"
                              value={selectedSingleFormType}
                              onChange={(formType) => {
                                handleSelectSingleFormType(formType);

                                setFilters({
                                  ...filters,
                                  formType: formType.value,
                                });
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...formTypeOptions,
                              ]}
                              placeholder="Choose Form Type"
                            />
                          </div>
                          <div>
                            <Select
                              id="bankName"
                              name="bankName"
                              value={selectedSingleBank}
                              onChange={(bankName) => {
                                handleSelectSingleBank(bankName);
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...bankOptions,
                              ]}
                              placeholder="Choose Bank"
                            />
                          </div>
                          <div>
                            <Select
                              id="status1"
                              name="status1"
                              value={selectedSingleStatus1}
                              onChange={(status1) => {
                                handleSelectSingleStatus1(status1);
                                setFilters({
                                  ...filters,
                                  selfStatus: status1.value,
                                });
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...StatusOptions,
                              ]}
                              placeholder="Choose Self Status"
                            />
                          </div>
                          <div>
                            <Select
                              id="status2"
                              name="status2"
                              value={selectedSingleStatus2}
                              onChange={(status2) => {
                                handleSelectSingleStatus2(status2);
                              }}
                              options={status2Options}
                              placeholder="Choose Bank Status"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light"
                            onClick={handleFilters}
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

                            <th data-sort="client_of">Form Type</th>
                            <th data-sort="client_of">Bank Name</th>
                            <th data-sort="client_of">Client of</th>

                            <th data-sort="status_1">Status 1</th>
                            <th data-sort="status_2">Status 2</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(filteredApplicationReports.length !== 0
                            ? filteredApplicationReports
                            : applicationReports
                          )?.map((bankReport, idx) => (
                            <tr key={idx}>
                              <td>{bankReport?.id}</td>
                              <td>
                                {bankReport?.applicationNo ? (
                                  bankReport?.applicationNo
                                ) : (
                                  <span className="text-muted">
                                    {" "}
                                    ---Not Assigned Yet---{" "}
                                  </span>
                                )}
                              </td>
                              <td>{bankReport?.fullName}</td>
                              <td>{bankReport?.mobileNo}</td>
                              <td>{bankReport?.panNo}</td>
                              <td>
                                <span
                                  className={`badge border ${
                                    bankReport?.formType === "Credit Card"
                                      ? "border-success text-success"
                                      : bankReport?.formType === "Loan"
                                      ? "border-primary text-primary"
                                      : bankReport?.formType === "Insurance"
                                      ? "border-warning text-warning"
                                      : bankReport?.formType === "Demat Account"
                                      ? "border-dark text-dark"
                                      : ""
                                  } fs-12`}
                                >
                                  {bankReport?.formType}
                                </span>
                              </td>
                              <td>
                                {bankReport.bankName
                                  ? bankReport.bankName
                                  : "-----"}
                              </td>
                              <td>
                                {Object.keys(bankReport?.user).length !== 0 && (
                                  <div>
                                    <div>
                                      <span
                                        className="fs-13"
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {bankReport?.user?.centerName}
                                      </span>
                                      <span> By </span>
                                      <span
                                        className="fs-13"
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {bankReport?.user?.name}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="fs-13">
                                        {" "}
                                        On{" "}
                                        {moment
                                          .utc(bankReport?.createdAt)
                                          .tz("Asia/Kolkata")
                                          .format("DD MMM, YY")}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </td>

                              <td>
                                <span
                                  className={`badge ${
                                    bankReport?.formStatus &&
                                    bankReport?.formStatus === "VKYC Done"
                                      ? "bg-success-subtle"
                                      : "bg-primary-subtle"
                                  }  ${
                                    bankReport?.formStatus &&
                                    bankReport?.formStatus === "VKYC Done"
                                      ? "text-success"
                                      : "text-primary"
                                  } `}
                                >
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
