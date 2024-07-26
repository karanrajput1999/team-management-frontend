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
  filterDownloadData,
  getCities,
  getPinCodes,
  getStates,
} from "../../slices/DownloadData/thunk";

const DownloadData = () => {
  const [selectedSingleVendor, setSelectedSingleVendor] = useState(null);

  const [selectedSingleState, setSelectedSingleState] = useState(null);

  const [selectedSingleCity, setSelectedSingleCity] = useState(null);

  const [selectedSinglePinCode, setSelectedSinglePinCode] = useState(null);

  const [selectedSingleEmail, setSelectedSingleEmail] = useState(null);

  const [selectedSingleSalary, setSelectedSingleSalary] = useState(null);

  const [selectedSingleRinging, setSelectedSingleRinging] = useState(null);

  const [selectedSingleTalked, setSelectedSingleTalked] = useState(null);

  const [selectedSingleKeyPress, setSelectedSingleKeyPress] = useState(null);

  const [filters, setFilters] = useState({
    vendor: "",
    cityId: "",
    stateId: "",
    pinCode: "",
    email: "",
    salary: "",
    ringing: "",
    talked: "",
    keyPress: "",
  });

  const dispatch = useDispatch();

  const { data, states, cities, pinCodes } = useSelector(
    (state) => state.DownloadData
  );

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  function handleSelectSingleVendor(vendor) {
    setSelectedSingleVendor(vendor);
  }

  function handleSelectSingleState(state) {
    setSelectedSingleState(state);
  }
  function handleSelectSingleCity(city) {
    setSelectedSingleCity(city);
  }

  function handleSelectSinglePinCode(pinCode) {
    setSelectedSinglePinCode(pinCode);
  }
  function handleSelectSingleEmail(email) {
    setSelectedSingleEmail(email);
  }
  function handleSelectSingleSalary(salary) {
    setSelectedSingleSalary(salary);
  }
  function handleSelectSingleRinging(ringing) {
    setSelectedSingleRinging(ringing);
  }
  function handleSelectSingleTalked(talked) {
    setSelectedSingleTalked(talked);
  }
  function handleSelectSingleKeyPress(keyPress) {
    setSelectedSingleKeyPress(keyPress);
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

  const stateOptions = states?.map((state) => {
    return { value: state.id, label: state.name };
  });

  const cityOptions = cities?.map((city) => {
    return { value: city.id, label: city.name };
  });

  const pinCodeOptions = pinCodes?.map((pinCode) => {
    return {
      value: pinCode.pinCode,
      label: pinCode.name + " - " + pinCode.pinCode,
    };
  });

  const emailOptions = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];
  const salaryOptions = [
    {
      value: "1 Lac",
      label: "1 Lac",
    },
    {
      value: "2 Lacs",
      label: "2 Lacs",
    },
    {
      value: "3 Lacs",
      label: "3 Lacs",
    },
    {
      value: "4 Lacs",
      label: "4 Lacs",
    },
    {
      value: "5 Lacs",
      label: "5 Lacs",
    },
  ];
  const ringingOptions = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];
  const talkedOptions = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];
  const keyPressOptions = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];

  function handleFilters() {
    dispatch(filterDownloadData(filters));
    // console.log("FILTERS ->", filters);
  }

  document.title = "Data Management";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Download Data" pageTitle="Data Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Download Data</h4>
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
                            placeholder="Search city"
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
                          <div>
                            <Select
                              id="vendor"
                              name="vendor"
                              value={selectedSingleVendor}
                              onChange={(vendor) => {
                                handleSelectSingleVendor(vendor);

                                setFilters((prev) => ({
                                  ...prev,
                                  vendor: vendor.value,
                                }));
                              }}
                              options={vendorOptions}
                              placeholder="Select Vendor"
                            />
                          </div>
                          <div>
                            <Select
                              id="states"
                              name="states"
                              value={selectedSingleState}
                              onChange={(state) => {
                                handleSelectSingleState(state);
                                dispatch(getCities(state.value));
                                setFilters((prev) => ({
                                  ...prev,
                                  stateId: state.value,
                                }));
                              }}
                              options={stateOptions}
                              placeholder="Select State"
                            />
                          </div>
                          <div>
                            <Select
                              id="cities"
                              name="cities"
                              value={selectedSingleCity}
                              onChange={(city) => {
                                handleSelectSingleCity(city);
                                dispatch(getPinCodes(city.value));
                                setFilters((prev) => ({
                                  ...prev,
                                  cityId: city.value,
                                }));
                              }}
                              options={cityOptions}
                              placeholder="Select City"
                            />
                          </div>
                          <div>
                            <Select
                              id="pinCodes"
                              name="pinCodes"
                              value={selectedSinglePinCode}
                              onChange={(pinCode) => {
                                handleSelectSinglePinCode(pinCode);

                                setFilters((prev) => ({
                                  ...prev,
                                  pinCode: pinCode.value,
                                }));
                              }}
                              options={pinCodeOptions}
                              placeholder="Select Pin Code"
                            />
                          </div>
                          <div>
                            <Select
                              id="email"
                              name="email"
                              value={selectedSingleEmail}
                              onChange={(email) => {
                                handleSelectSingleEmail(email);

                                setFilters((prev) => ({
                                  ...prev,
                                  email: email.value,
                                }));
                              }}
                              options={emailOptions}
                              placeholder="Select Email"
                            />
                          </div>
                          <div>
                            <Select
                              id="salary"
                              name="salary"
                              value={selectedSingleSalary}
                              onChange={(salary) => {
                                handleSelectSingleSalary(salary);

                                setFilters((prev) => ({
                                  ...prev,
                                  salary: salary.value,
                                }));
                              }}
                              options={salaryOptions}
                              placeholder="Select Salary"
                            />
                          </div>
                          <div>
                            <Select
                              id="ringing"
                              name="ringing"
                              value={selectedSingleRinging}
                              onChange={(ringing) => {
                                handleSelectSingleRinging(ringing);

                                setFilters((prev) => ({
                                  ...prev,
                                  ringing: ringing.value,
                                }));
                              }}
                              options={ringingOptions}
                              placeholder="Select Ringing"
                            />
                          </div>
                          <div>
                            <Select
                              id="talked"
                              name="talked"
                              value={selectedSingleTalked}
                              onChange={(talked) => {
                                handleSelectSingleTalked(talked);

                                setFilters((prev) => ({
                                  ...prev,
                                  talked: talked.value,
                                }));
                              }}
                              options={talkedOptions}
                              placeholder="Select Talked"
                            />
                          </div>

                          <div>
                            <Select
                              id="keyPress"
                              name="keyPress"
                              value={selectedSingleKeyPress}
                              onChange={(keyPress) => {
                                handleSelectSingleKeyPress(keyPress);

                                setFilters((prev) => ({
                                  ...prev,
                                  keyPress: keyPress.value,
                                }));
                              }}
                              options={keyPressOptions}
                              placeholder="Key Press"
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
                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light"
                          >
                            <i className="ri-list-check label-icon align-middle fs-16 me-2"></i>
                            Show All
                          </button>
                          <button
                            type="button"
                            className="btn btn-success btn-label waves-effect waves-light"
                          >
                            <i className="ri-download-fill label-icon align-middle fs-16 me-2"></i>
                            Download Data
                          </button>
                        </div>
                      </Col>
                    </Row>
                    {/* 
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
                                    ---Not Generated---{" "}
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
                                      ? "border-danger text-danger"
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
                    </div> */}

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

export default DownloadData;
