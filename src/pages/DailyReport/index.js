import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Row,
  ButtonGroup,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { getCenters } from "../../slices/Centers/thunk";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  filterDailyReport,
  getDailyReport,
} from "../../slices/DailyReport/thunk";
import { useSelector } from "react-redux";
import { getUsersByCenter } from "../../slices/Centers/reducer";
import { useFormik } from "formik";
import * as Yup from "yup";

const DailyReport = () => {
  const [selectedSingleCenter, setSelectedSingleCenter] = useState(null);

  const [centerUserIds, setCenterUserIds] = useState([]);
  const { data, userData, filteredDailyReports } = useSelector(
    (state) => state.DailyReport
  );
  const { centers, centerUsers } = useSelector((state) => state.Centers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDailyReport());
    dispatch(getCenters());
  }, [dispatch]);

  const centerOptions = centers?.map((center) => ({
    id: center.id,
    value: center.centerName,
    label: center.centerName,
  }));

  function handleSelectSingleCenter(center) {
    setSelectedSingleCenter(center);
  }

  const validation = useFormik({
    initialValues: {
      centerId: "",
      // dateRange: "",
    },
    validationSchema: Yup.object({
      centerId: Yup.string(),
      // dateRange: Yup.array(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(filterDailyReport({ ...values, centerUserIds }));
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    if (!validation.errors) {
      setmodal_list(false);
    }
    return false;
  }

  function handleCalculateVintage(data) {
    const createdAtDate = new Date(data);

    const currentDate = new Date();

    const differenceInTime = currentDate - createdAtDate;

    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  function handleCheckCenterUser(centerUserId) {
    const alreadyIncluded = centerUserIds.includes(centerUserId);

    if (alreadyIncluded) {
      const updatedCenterUserId = centerUserIds.filter(
        (selectedCenterUserId) => selectedCenterUserId !== centerUserId
      );
      setCenterUserIds(updatedCenterUserId);
    } else {
      setCenterUserIds((prev) => [...prev, centerUserId]);
    }
  }

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
                        <Form
                          className="d-flex"
                          style={{ gap: "10px" }}
                          onSubmit={formHandleSubmit}
                        >
                          {/* <div className="d-flex">
                            <Flatpickr
                              className="form-control border dash-filter-picker"
                              placeholder="Date Range"
                              options={{
                                mode: "range",
                                dateFormat: "d M, Y",
                              }}
                              onChange={(date) => {
                                validation.setFieldValue("dateRange", date);
                              }}
                            />
                          </div> */}

                          <div>
                            <Select
                              id="center"
                              name="center"
                              value={selectedSingleCenter}
                              onChange={(center) => {
                                handleSelectSingleCenter(center);
                                validation.setFieldValue("centerId", center.id);
                                dispatch(getUsersByCenter(center.id));
                              }}
                              options={centerOptions}
                              placeholder="Select Center"
                            />
                          </div>

                          <ButtonGroup>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                // tag="button"
                                className="btn btn-light"
                              >
                                Select Users{" "}
                                <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-sm p-2">
                                {centerUsers?.map((userOption) => (
                                  <div className="mb-2" key={userOption.id}>
                                    <div className="form-check custom-checkbox">
                                      <Input
                                        type="checkbox"
                                        checked={centerUserIds.includes(
                                          userOption.id
                                        )}
                                        className="form-check-input"
                                        id={userOption.name}
                                        name={userOption.name}
                                        onChange={() =>
                                          handleCheckCenterUser(userOption.id)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={userOption.name}
                                      >
                                        {userOption.name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </ButtonGroup>

                          {/* <div>
                            <Select
                              id="centerUser"
                              name="centerUser"
                              value={selectedSingleCenterUser}
                              onChange={(centerUser) => {
                                handleSelectSingleCenterUser(centerUser);
                                validation.setFieldValue(
                                  "centerUserId",
                                  centerUser.id
                                );
                              }}
                              options={centerUserOptions}
                              placeholder="Select Center User"
                            />
                          </div> */}

                          <button
                            type="submit"
                            className="btn btn-primary btn-label waves-effect waves-light"
                          >
                            <i className="ri-equalizer-fill label-icon align-middle fs-16 me-2"></i>
                            Apply Filters
                          </button>
                        </Form>
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
                            {/* <th data-sort="pending">Pending</th> */}
                            <th data-sort="vkyc">VKYC</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {/* {data?.length > 0 && */}
                          {(filteredDailyReports.length !== 0
                            ? filteredDailyReports
                            : data
                          )?.map((report, idx) => (
                            <tr key={idx}>
                              <td className="sno">{idx + 1}</td>
                              <td className="name">{report.agentName}</td>
                              {/* <td className="doj">12/07/2024</td> */}
                              <td className="doj">
                                {new Date(
                                  report.userData.createdAt
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td className="vintage">
                                {handleCalculateVintage(
                                  report.userData.createdAt
                                )}
                              </td>
                              <td className="talktime">
                                {report.totalTalkTime}
                              </td>
                              <td className="attempts">{report.attempts}</td>
                              <td className="unique_attempts">
                                {report.uniqueAttempts}
                              </td>
                              <td className="interested_count">
                                {report.interestedClients}
                              </td>
                              {/* <td className="pending">0</td> */}
                              <td className="vkyc">{report.vkycDoneCount}</td>
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

export default DailyReport;
