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

const BankReport = () => {
  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);

  const [selectedSingleStatus1, setSelectedSingleStatus1] = useState(null);

  const [selectedSingleStatus2, setSelectedSingleStatus2] = useState(null);

  const dispatch = useDispatch();

  const { centers } = useSelector((state) => state.Centers);

  function handleSelectSingleCenter(centerName) {
    setSelectedSingleCenterName(centerName);
  }

  function handleSelectSingleStatus1(status1) {
    setSelectedSingleStatus1(status1);
  }

  function handleSelectSingleStatus2(status2) {
    setSelectedSingleStatus2(status2);
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

  useEffect(() => {
    dispatch(getCenters());
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

  document.title = "Bank Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Bank Report" pageTitle="Applications" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Bank Report</h4>
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
                            <th className="sort" data-sort="id">
                              S.NO
                            </th>
                            <th className="sort" data-sort="application_id">
                              Application Id
                            </th>
                            <th className="sort" data-sort="customer_name">
                              Customer Name
                            </th>
                            <th className="sort" data-sort="phone">
                              Phone
                            </th>

                            <th className="sort" data-sort="pan_card">
                              Pan Card
                            </th>

                            <th className="sort" data-sort="client_of">
                              Client of
                            </th>

                            <th className="sort" data-sort="status_1">
                              Status 1
                            </th>
                            <th className="sort" data-sort="status_2">
                              Status 2
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {bankReportData?.map((bankReport) => (
                            <tr key={bankReport?.id}>
                              <td className="id">{bankReport?.id}</td>
                              <td className="id">
                                {bankReport?.applicationId}
                              </td>
                              <td className="center_name">
                                {bankReport?.customerName}
                              </td>
                              <td className="owner_name">
                                {bankReport?.phone}
                              </td>
                              <td className="phone_number">
                                {bankReport?.panCard}
                              </td>
                              <td className="password">
                                {bankReport?.clientOf}
                              </td>
                              <td className="status1">
                                <span className="badge bg-success-subtle text-success">
                                  {bankReport?.status1}
                                </span>
                              </td>
                              <td className="status2">
                                <span className="badge bg-primary-subtle text-primary">
                                  {bankReport?.status2}
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

export default BankReport;
