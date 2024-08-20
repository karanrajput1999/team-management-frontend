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
import AddUserFormModal from "./AddUserFormModal";
import AddUserRemoveModal from "./AddUserRemoveModal";

import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../slices/Users/thunk";

import {
  getCenterUsers,
  createCenterUser,
  removeCenterUser,
  updateCenterUser,
} from "../../slices/AddUsers/thunk";
import { clearAlreadyRegisteredError } from "../../slices/AddUsers/reducer";
import { getCenters } from "../../slices/Centers/thunk";

const AddUsers = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingUser, setIsEditingUser] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  // const [listUserId, setListUserId] = useState(null);
  const [selectedSingleRoleType, setSelectedSingleRoleType] = useState(null);

  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);
  //
  const [listUser, setListUser] = useState(null);
  // fetching all the roles
  const [roles, setRoles] = useState([]);

  // const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { centerUsers, alreadyRegisteredError } = useSelector(
    (state) => state.AddUsers
  );
  const { centers } = useSelector((state) => state.Centers);

  const dispatch = useDispatch();

  const roleOptions = roles.map((role) => {
    return { value: role.id, label: role.name };
  });

  let centerOptions = centers?.map((center) => {
    return { value: center.centerName, label: center.centerName };
  });

  function handleSelectSingleRole(userType) {
    setSelectedSingleRoleType(userType);
  }

  function handleSelectSingleCenter(centerName) {
    setSelectedSingleCenterName(centerName);
  }

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
    dispatch(clearAlreadyRegisteredError());
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roles`, {
        withCredentials: true,
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.log("error while fetching roles ->", error);
      });
  }, []);

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCenters());
    dispatch(getCenterUsers());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      name: "",
      agentId: "",
      email: "",
      password: "",
      centerName: "",
      userType: "",
      mobileNumber: "",
      location: "",
      age: "",
      aadharNumber: "",
      panNo: "",
    },
    validationSchema: Yup.object({
      centerName: Yup.string().required("Please center name"),
      userType: Yup.string().required("Please select user role"),
      name: Yup.string().required("Please enter Name"),
      agentId: Yup.string().required("Please end agent Id"),
      mobileNumber: Yup.string()
        .length(10, "Mobile No length should be of 10 digit only")
        .required("Please enter mobile number"),
      email: Yup.string().email().required("Please enter email"),
      location: Yup.string().required("Please enter select location"),
      age: Yup.number().required("Please enter age"),
      aadharNumber: Yup.string().required("Please enter aadhar card"),
      panNo: Yup.string().required("Please enter pan card"),
      password: Yup.string().required("Please enter Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("NEW VALUES FOR ADD USERS ->", values);

      const selectedCenter = centers?.find(
        (center) => center.centerName == values.centerName
      );

      if (isEditingUser) {
        dispatch(
          updateCenterUser({
            values,
            centerUserId: listUser.id,
            centerId: selectedCenter.id,
            branchId: selectedCenter.branchId,
          })
        );

        // dispatch(
        //   updateUser({
        //     values: {
        //       name: values.name,
        //       email: values.email,
        //       password: values.password,
        //       roleId: values.userType,
        //       userId: listUser.id,
        //     },
        //   })
        // );
      } else {
        dispatch(
          createCenterUser({
            ...values,
            centerId: selectedCenter.id,
            branchId: selectedCenter.branchId,
          })
        );

        // dispatch(
        //   createUser({
        //     name: values.name,
        //     email: values.email,
        //     password: values.password,
        //     roleId: values.userType,
        //   })
        // );
      }

      if (!isEditingUser) {
        resetForm();
        setSelectedSingleRoleType(null);
        setSelectedSingleCenterName(null);
      }

      setmodal_list(false);
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    if (!validation.errors) {
      setmodal_list(false);
    }
    return false;
  }

  function handleRoleChange(e) {
    validation.setFieldValue("roleId", e.target.value);
  }

  // to update the values of register form when editing the user
  function handleEditUser(userData) {
    setIsEditingUser(true);
    setmodal_list(!modal_list);
    setListUser(userData);

    validation.setValues({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      agentId: userData.agentId,
      userType: userData.userType,
      mobileNumber: userData.mobileNumber,
      location: userData.location,
      age: userData.age,
      aadharNumber: userData.aadharNumber,
      panNo: userData.panNo,
      centerName: userData.centerName,
    });

    const selectedRole = roleOptions.find(
      (role) => role.value === userData.userType
    );
    const selectedCenter = centerOptions.find(
      (role) => role.value === userData.centerName
    );

    handleSelectSingleRole(selectedRole);
    handleSelectSingleCenter(selectedCenter);
  }

  function handleActivateDeactivate(status, centerUserId, centerId) {
    dispatch(
      updateCenterUser({
        status,
        centerUserId,
        centerId,
      })
    );
    // dispatch(
    //   updateUser({
    //     userId,
    //     status,
    //   })
    // );
  }

  document.title = "All Users";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Users" pageTitle="Centers" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">All Users</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3 d-flex justify-content-between">
                      <Col className="col-sm-auto">
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
                      </Col>

                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add User
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
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Location</th>
                            <th>Branch ID</th>
                            <th>Type</th>
                            <th>User Status</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {centerUsers?.map((user) => (
                            <tr key={user.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {user.id}
                                </Link>
                              </td>
                              <td className="name">{user.name}</td>
                              <td className="email">{user.email} </td>
                              <td className="password">{user.password}</td>
                              <td className="location">{user.location}</td>
                              <td className="branch_id">{user.branchId}</td>
                              <td className="type">
                                {
                                  roles?.find(
                                    (role) => role.id === user.userType
                                  )?.name
                                }
                              </td>
                              <td className="user_status">
                                {user?.status === 0 ? (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-success waves-effect waves-light"
                                    onClick={() =>
                                      handleActivateDeactivate(
                                        1,
                                        user?.id,
                                        user?.centerId
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
                                        user?.id,
                                        user?.centerId
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
                                        handleEditUser(user);
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
      <AddUserFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingUser={isEditingUser}
        alreadyRegisteredError={alreadyRegisteredError}
        handleRoleChange={handleRoleChange}
        roles={roles}
        centers={centers}
        roleOptions={roleOptions}
        selectedSingleRoleType={selectedSingleRoleType}
        handleSelectSingleRole={handleSelectSingleRole}
        selectedSingleCenterName={selectedSingleCenterName}
        handleSelectSingleCenter={handleSelectSingleCenter}
        centerOptions={centerOptions}
      />

      {/* Remove Modal */}
      <AddUserRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteUser={() => {
          dispatch(
            updateCenterUser({
              centerId: listUser.centerId,
              centerUserId: listUser.id,
              status: 0,
            })
          );
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default AddUsers;
