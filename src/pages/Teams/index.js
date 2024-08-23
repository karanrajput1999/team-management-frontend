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
import AddTeamModal from "./AddTeamModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import TeamRemoveModal from "./TeamRemoveModal";
import { getTeams, createTeam, updateTeam } from "../../slices/Teams/thunk";

import { clearAlreadyRegisteredError } from "../../slices/Teams/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teams = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [isEditingTeam, setIsEditingTeam] = useState(false);

  const [listTeamId, setListTeamId] = useState(null);

  const dispatch = useDispatch();

  const { teams, filteredTeams, alreadyRegisteredError } = useSelector(
    (state) => state.Teams
  );

  function tog_list() {
    setmodal_list(!modal_list);
    dispatch(clearAlreadyRegisteredError());
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const validation = useFormik({
    initialValues: {
      teamName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      teamName: Yup.string().required("Please enter team name"),
      email: Yup.string().email().required("Please enter email id"),
      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isEditingTeam) {
        dispatch(updateTeam({ values, teamId: listTeamId }));
      } else {
        dispatch(createTeam(values));
      }

      if (!isEditingTeam) {
        resetForm();
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

  function handleEditTeam(teamData) {
    setIsEditingTeam(true);
    setmodal_list(!modal_list);
    setListTeamId(teamData.id);

    validation.setValues({
      teamName: teamData.teamName,
      status: teamData.status,
      email: teamData.email,
      password: teamData.password,
    });
  }

  function handleActivateDeactivate(status, teamId) {
    dispatch(
      updateTeam({
        status,
        teamId,
      })
    );
  }

  document.title = "Teams";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Teams" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a Team</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        {/* <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={handleSearchCenter}
                            placeholder="Search Team"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div> */}
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Team
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
                            <th>S.No</th>
                            <th>Team Name</th>
                            {/* <th>Owner Name</th> */}
                            {/* <th>Phone Number</th> */}
                            <th>Email ID</th>
                            <th>Password</th>
                            {/* <th>Branch Id</th> */}
                            <th>Status</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(filteredTeams.length > 0
                            ? filteredTeams
                            : teams
                          )?.map((team) => (
                            <tr key={team?.id}>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {team?.id}
                                </Link>
                              </td>
                              <td className="team_name">{team?.teamName}</td>
                              {/* <td className="owner_name">
                                {center?.ownerName}
                              </td> */}
                              {/* <td className="phone_number">
                                {center?.mobileNumber}
                              </td> */}
                              <td className="email_id">{team?.email}</td>
                              <td className="password">{team?.password}</td>
                              {/* <td className="branchId">{center?.branchId}</td> */}
                              <td className="status">
                                {team?.status === 0 ? (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-success waves-effect waves-light"
                                    onClick={() =>
                                      handleActivateDeactivate(1, team?.id)
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
                                      handleActivateDeactivate(0, team?.id)
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
                                        handleEditTeam(team);
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
                                        setListCenterId(center.id);
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

      <AddTeamModal
        validation={validation}
        isEditingTeam={isEditingTeam}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        alreadyRegisteredError={alreadyRegisteredError}
      />

      <TeamRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        tog_delete={tog_delete}
        handleDeleteTeam={() => {
          // dispatch(removeCenter({ centerId: listCenterId }));
          dispatch(updateTeam({ teamId: listTeamId, status: 0 }));

          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Teams;
