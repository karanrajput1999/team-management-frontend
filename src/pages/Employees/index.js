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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import AddEmployeeModal from "./AddEmployeeModal";
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
import { getLoggedinUser } from "../../helpers/api_helper";

const Employees = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);

  const [selectedSingleTeamName, setSelectedSingleTeamName] = useState(null);
  //
  const [listEmployee, setListEmployee] = useState(null);

  // const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { employees, alreadyRegisteredError } = useSelector(
    (state) => state.Employees
  );
  const { teams } = useSelector((state) => state.Teams);

  const { data } = getLoggedinUser();

  const dispatch = useDispatch();

  let teamOptions = teams?.map((team) => {
    return { value: team.teamName, label: team.teamName, id: team.id };
  });

  function handleSelectSingleTeam(teamName) {
    setSelectedSingleTeamName(teamName);
  }

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
      teamName: "",
      employeeName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      teamName:
        data.roleId === 1
          ? Yup.string().required("Please team name")
          : Yup.string(),
      employeeName: Yup.string().required("Please enter employee"),
      email: Yup.string().email().required("Please enter email"),
      password: Yup.string().required("Please enter Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      const selectedTeam = teams?.find(
        (team) => team.teamName == values.teamName
      );

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
            teamId: selectedTeam?.id,
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

    const selectedTeam = teamOptions.find(
      (team) => team.id === employeeData.teamId
    );

    validation.setValues({
      teamName: selectedTeam.value,
      employeeName: employeeData.employeeName,
      email: employeeData.email,
      password: employeeData.password,
    });

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

  document.title = "All Employees";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Users" pageTitle="Centers" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">All Employees</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-between">
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
                            Add Employee
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}></th>
                            <th>S.No</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Status</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {employees?.map((employee) => (
                            <tr key={employee.id}>
                              <th scope="row"></th>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {employee.id}
                                </Link>
                              </td>
                              <td className="name">{employee.employeeName}</td>
                              <td className="email">{employee.email} </td>
                              <td className="password">{employee.password}</td>

                              <td className="user_status">
                                {employee?.status === 0 ? (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-success waves-effect waves-light"
                                    onClick={() =>
                                      handleActivateDeactivate(
                                        1,
                                        employee?.id,
                                        employee?.teamId
                                      )
                                    }
                                  >
                                    {" "}
                                    Activate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-danger waves-effect waves-light"
                                    onClick={() =>
                                      handleActivateDeactivate(
                                        0,
                                        employee?.id,
                                        employee?.teamId
                                      )
                                    }
                                  >
                                    {" "}
                                    Deactivate
                                  </button>
                                )}
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditEmployee(employee);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  {/* <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListUser(user);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
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
        <ToastContainer />
      </div>

      {/* Add Modal */}
      <AddEmployeeModal
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

export default Employees;
