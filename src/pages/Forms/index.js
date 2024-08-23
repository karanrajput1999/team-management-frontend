import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import AddFormModal from "./AddFormModal";
import RemoveEmployeeModal from "./RemoveEmployeeModal";

import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../slices/Users/thunk";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
} from "../../slices/Employees/thunk";
import { clearAlreadyRegisteredError } from "../../slices/Employees/reducer";
import { getTeams } from "../../slices/Teams/thunk";
import FormRow from "./FormRow";

const Forms = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);

  const [selectedSingleTeamName, setSelectedSingleTeamName] = useState(null);
  //
  const [listEmployee, setListEmployee] = useState(null);

  const [activeTab, setactiveTab] = useState("1");

  // const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { employees, alreadyRegisteredError } = useSelector(
    (state) => state.Employees
  );
  const { teams } = useSelector((state) => state.Teams);

  const dispatch = useDispatch();

  let teamOptions = teams?.map((team) => {
    return { value: team.teamName, label: team.teamName };
  });

  function handleSelectSingleTeam(teamName) {
    setSelectedSingleTeamName(teamName);
  }

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingEmployee(false);
    dispatch(clearAlreadyRegisteredError());
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
    dispatch(getEmployees());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      clientName: "",
      mobileNo: "",
      applicationNo: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please team name"),
      mobileNo: Yup.string().required("Please enter employee"),
      applicationNo: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditingEmployee) {
        dispatch(
          updateEmployee({
            values,
            employeeId: listEmployee.id,
            teamId: selectedTeam.id,
          })
        );
      } else {
        dispatch(
          createEmployee({
            ...values,
            teamId: selectedTeam.id,
          })
        );
      }

      if (!isEditingEmployee) {
        resetForm();
        setSelectedSingleTeamName(null);
      }

      setmodal_list(false);
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

  // to update the values of register form when editing the user
  function handleEditEmployee(employeeData) {
    setIsEditingEmployee(true);
    setmodal_list(!modal_list);
    setListEmployee(employeeData);

    validation.setValues({
      employeeName: employeeData.employeeName,
      email: employeeData.email,
      password: employeeData.password,
    });

    const selectedTeam = teamOptions.find(
      (team) => team.value === employeeData.teamName
    );

    handleSelectSingleTeam(selectedTeam);
  }

  function handleActivateDeactivate(status, employeeId, teamId) {
    dispatch(
      updateEmployee({
        status,
        employeeId,
        teamId,
      })
    );
    // dispatch(
    //   updateUser({
    //     userId,
    //     status,
    //   })
    // );
  }

  document.title = "Forms";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Forms" pageTitle="Applications" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Forms</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-end">
                      {/* <Col className="col-sm-auto">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={() => {}}
                            placeholder="Search User"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col> */}

                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Form
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Col>
                      <Nav tabs className="nav-tabs mb-3">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            This Month
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            All Forms
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" id="pending">
                          {/* <div className="table-responsive table-card mt-3 mb-1"> */}
                          {/* will use this later for responsiveness */}
                          <div className="table-card mt-3 mb-1">
                            <table className="table align-middle table-nowrap">
                              <thead className="table-light">
                                <tr>
                                  <th data-sort="id">S.No</th>
                                  <th data-sort="client_name">Client Name</th>
                                  <th data-sort="mobile_no">Mobile No</th>
                                  <th data-sort="mobile_no">Added By</th>

                                  <th data-sort="application_no">
                                    Application No
                                  </th>

                                  <th data-sort="tools">Status</th>
                                  <th data-sort="tools">Tools</th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {/* {(filteredPendingForms.length !== 0
                                  ? filteredPendingForms
                                  : pendingForms
                                )?.map((form, idx) => (
                                  <FormRow
                                    key={idx}
                                    form={form}
                                    onUpdate={updateCreditCardForm}
                                  />
                                ))} */}

                                <FormRow />
                              </tbody>
                            </table>
                          </div>
                        </TabPane>

                        <TabPane tabId="2" id="updated">
                          {/* <div className="table-responsive table-card mt-3 mb-1"> */}
                          <div className="table-card mt-3 mb-1">
                            {" "}
                            {/* will use this later for responsiveness */}
                            <table className="table align-middle table-nowrap">
                              <thead className="table-light">
                                <tr>
                                  <th data-sort="id">S.No</th>
                                  <th data-sort="client_name">Client Name</th>
                                  <th data-sort="mobile_no">Mobile No</th>
                                  <th data-sort="mobile_no">Added By</th>
                                  <th data-sort="application_no">
                                    Application No
                                  </th>
                                  <th data-sort="tools">Status</th>

                                  <th data-sort="tools">Tools</th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {/* {(filteredUpdatedForms.length !== 0
                                  ? filteredUpdatedForms
                                  : updatedForms
                                )?.map((form, idx) => (
                                  <FormRow
                                    key={idx}
                                    form={form}
                                    onUpdate={updateCreditCardForm}
                                  />
                                ))} */}

                                <FormRow />
                              </tbody>
                            </table>
                          </div>
                        </TabPane>
                      </TabContent>
                    </Col>

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
        <ToastContainer />
      </div>

      {/* Add Modal */}
      <AddFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingEmployee={isEditingEmployee}
        alreadyRegisteredError={alreadyRegisteredError}
        teams={teams}
        selectedSingleTeamName={selectedSingleTeamName}
        handleSelectSingleTeam={handleSelectSingleTeam}
        teamOptions={teamOptions}
      />

      {/* Remove Modal */}
      <RemoveEmployeeModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteEmployee={() => {
          dispatch(
            updateEmployee({
              teamId: listEmployee.teamId,
              employeeId: listEmployee.id,
              status: 0,
            })
          );
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Forms;
