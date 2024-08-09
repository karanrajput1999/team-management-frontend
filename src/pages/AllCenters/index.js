import React, { useEffect, useState } from "react";
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
import AddCenterModal from "./AddCenterModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import CenterRemoveModal from "./CenterRemoveModal";
import {
  getCenters,
  createCenter,
  removeCenter,
  updateCenter,
} from "../../slices/Centers/thunk";

import {
  getUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../slices/Users/thunk";

import { searchCenters } from "../../slices/Centers/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRoles } from "../../slices/Mapping/thunk";

const AllCenters = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [isEditingCenter, setIsEditingCenter] = useState(false);

  const [listCenterId, setListCenterId] = useState(null);

  const [selectedSingleRoleType, setSelectedSingleRoleType] = useState(null);

  const dispatch = useDispatch();

  const { centers, filteredCenters } = useSelector((state) => state.Centers);
  const { roles } = useSelector((state) => state.Mapping);

  const roleOptions = roles.map((role) => {
    return { value: role.id, label: role.name };
  });

  function handleSelectSingleRole(userType) {
    setSelectedSingleRoleType(userType);
  }

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    dispatch(getCenters());
    dispatch(getRoles());
  }, [dispatch]);

  function handleSearchCenter(e) {
    dispatch(searchCenters(e.target.value));
  }

  const validation = useFormik({
    initialValues: {
      centerName: "",
      ownerName: "",
      mobileNumber: "",
      emailId: "",
      location: "",
      branchId: "",
      userType: "",
      password: "",
    },
    validationSchema: Yup.object({
      centerName: Yup.string().required("Please enter center name"),
      ownerName: Yup.string().required("Please enter owner name"),
      mobileNumber: Yup.string()
        .length(10, "Mobile no should be of 10 digit only")
        .required("Please enter mobile number"),
      emailId: Yup.string().email().required("Please enter email id"),
      location: Yup.string().required("Please enter location"),
      branchId: Yup.string().required("Please enter branch id"),
      userType: Yup.string(),
      password: Yup.string().required("Please enter password id"),
    }),
    onSubmit: (values) => {
      if (isEditingCenter) {
        dispatch(updateCenter({ values, centerId: listCenterId }));

        dispatch(
          updateUser({
            name: values.centerName,
            email: values.emailId,
            password: values.password,
            roleId: values.userType,
          })
        );
      } else {
        dispatch(createCenter(values));
        dispatch(
          createUser({
            name: values.centerName,
            email: values.emailId,
            password: values.password,
            roleId: values.userType,
          })
        );
      }

      // isEditingCenter
      //   ? dispatch(updateCenter({ values, centerId: listCenterId }))
      //   : dispatch(createCenter(values));
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    setmodal_list(false);
    return false;
  }

  //   function handleEditUser(userData) {
  function handleEditCenter(centerData) {
    setIsEditingCenter(true);
    setmodal_list(!modal_list);
    setListCenterId(centerData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    validation.setValues({
      centerName: centerData.centerName,
      ownerName: centerData.ownerName,
      mobileNumber: centerData.mobileNumber,
      location: centerData.location,
      branchId: centerData.branchId,
      status: centerData.status,
      emailId: centerData.emailId,
      password: centerData.password,
      userType: centerData.userType,
    });

    handleSelectSingleRole(
      roleOptions.find((role) => role.value === centerData.userType)
    );
  }

  document.title = "All Centers";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Centers" pageTitle="Centers" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a center</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={handleSearchCenter}
                            placeholder="Search center"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Center
                        </Button>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Center Name</th>
                            <th>Owner Name</th>
                            <th>Phone Number</th>
                            <th>Email ID</th>
                            <th>Password</th>
                            <th>Branch Id</th>
                            <th>Status</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(filteredCenters.length > 0
                            ? filteredCenters
                            : centers
                          )?.map((center) => (
                            <tr key={center?.id}>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {center?.id}
                                </Link>
                              </td>
                              <td className="center_name">
                                {center?.centerName}
                              </td>
                              <td className="owner_name">
                                {center?.ownerName}
                              </td>
                              <td className="phone_number">
                                {center?.mobileNumber}
                              </td>
                              <td className="email_id">{center?.emailId}</td>
                              <td className="password">{center?.password}</td>
                              <td className="branchId">{center?.branchId}</td>
                              <td className="status">
                                {center?.status === 1 ? (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-success waves-effect waves-light"
                                  >
                                    {" "}
                                    Activate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-danger waves-effect waves-light"
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
                                        handleEditCenter(center);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListCenterId(center.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
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
      <ToastContainer />

      <AddCenterModal
        validation={validation}
        isEditingCenter={isEditingCenter}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        roles={roles}
        roleOptions={roleOptions}
        handleSelectSingleRole={handleSelectSingleRole}
        selectedSingleRoleType={selectedSingleRoleType}
      />

      <CenterRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        tog_delete={tog_delete}
        handleDeleteCenter={() => {
          // dispatch(removeCenter({ centerId: listCenterId }));
          dispatch(updateCenter({ centerId: listCenterId, status: 0 }));

          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default AllCenters;
