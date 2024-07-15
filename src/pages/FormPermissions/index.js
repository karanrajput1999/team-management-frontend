import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormPermissions,
  getFormPermissions,
} from "../../slices/FormPermissions/thunk";
import { getCenters } from "../../slices/Centers/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormPermissions = () => {
  const [selectedCenterId, setSelectedCenterId] = useState(null);

  const [checkedFormPermissions, setCheckedFormPermissions] = useState([]);

  const { centers } = useSelector((state) => state.Centers);
  const { formPermissions } = useSelector((state) => state.FormPermissions);

  console.log("FORM PERSMISSIONS ->", formPermissions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCenters());
  }, [dispatch]);

  function handleCenterChange(e) {
    setSelectedCenterId(e.target.value);

    dispatch(getFormPermissions(e.target.value)).then((res) => {
      setCheckedFormPermissions(
        res.payload.data.formPermissions?.map(
          (formPermission) => formPermission.formId
        )
      );
    });
  }

  function handleFormPermission(e, centerId, formId) {
    if (e.target.checked) {
      setCheckedFormPermissions((prev) => [...prev, formId]);
    } else {
      setCheckedFormPermissions(
        checkedFormPermissions.filter(
          (checkedFormId) => checkedFormId !== formId
        )
      );
    }

    dispatch(updateFormPermissions({ centerId, formId }));
  }

  document.title = "Roles";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Form Permissions" pageTitle="Settings" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Form Permissions</h4>
                </CardHeader>

                <CardBody>
                  <Col
                    className="col-sm-auto"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="me-1">
                      <Input
                        id="centerName"
                        name="centerName"
                        className="form-control"
                        type="select"
                        onChange={(e) => handleCenterChange(e)}
                        placeholder=""
                      >
                        <option value="">Select Center</option>

                        {centers?.map((center) => (
                          <option value={center.id} key={center.id}>
                            {center.centerName}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>

                  {selectedCenterId ? (
                    <div
                      className="listjs-table"
                      id="userList"
                      style={{ display: "flex", gap: "35px" }}
                    >
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="userTable"
                          style={{
                            borderTop: "1px solid #e9ebec",
                            borderRight: "1px solid #e9ebec",
                          }}
                        >
                          <thead className="table-light">
                            <tr>
                              <th>Form Permissions</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            <tr>
                              <td
                                style={{
                                  borderLeft: "1px solid #e9ebec",
                                  verticalAlign: "top",
                                }}
                              >
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Input
                                    id="credit-card"
                                    name="credit-card"
                                    type="checkbox"
                                    checked={checkedFormPermissions.includes(1)}
                                    onChange={(e) =>
                                      handleFormPermission(
                                        e,
                                        selectedCenterId,
                                        1
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor="credit-card"
                                    className="form-label"
                                  >
                                    Credit Card
                                  </Label>
                                </div>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Input
                                    id="loan"
                                    name="loan"
                                    type="checkbox"
                                    checked={checkedFormPermissions.includes(2)}
                                    onChange={(e) =>
                                      handleFormPermission(
                                        e,
                                        selectedCenterId,
                                        2
                                      )
                                    }
                                  />
                                  <Label htmlFor="loan" className="form-label">
                                    Loan
                                  </Label>
                                </div>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Input
                                    id="insurance"
                                    name="insurance"
                                    type="checkbox"
                                    checked={checkedFormPermissions.includes(3)}
                                    onChange={(e) =>
                                      handleFormPermission(
                                        e,
                                        selectedCenterId,
                                        3
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor="insurance"
                                    className="form-label"
                                  >
                                    Insurance
                                  </Label>
                                </div>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Input
                                    id="demat-account"
                                    name="demat-account"
                                    type="checkbox"
                                    checked={checkedFormPermissions.includes(4)}
                                    onChange={(e) =>
                                      handleFormPermission(
                                        e,
                                        selectedCenterId,
                                        4
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor="demat-account"
                                    className="form-label"
                                  >
                                    Demat Account
                                  </Label>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                        fontWeight: "bold",
                        height: "200px",
                        color: "#b5b5b5",
                      }}
                    >
                      <span> Please select a center!</span>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default FormPermissions;
