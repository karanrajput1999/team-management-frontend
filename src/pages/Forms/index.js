import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import {
  employeeOptions,
  bankOptions,
  clientTypeOptions,
} from "../../common/data/Forms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createForm } from "../../slices/Form/thunk";
import { useDispatch } from "react-redux";

const Forms = () => {
  const [selectedSingleEmployeeName, setSelectedSingleEmployeeName] =
    useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const [selectedSingleClientType, setSelectedSingleClientType] =
    useState(null);

  const [arrowNavTab, setarrowNavTab] = useState("1");

  const dispatch = useDispatch();

  const arrowNavToggle = (tab) => {
    if (arrowNavTab !== tab) {
      setarrowNavTab(tab);
    }
  };

  function handleSelectSingleEmployeeName(employeeName) {
    setSelectedSingleEmployeeName(employeeName);
  }
  function handleSelectSingleBankName(bankName) {
    setSelectedSingleBank(bankName);
  }
  function handleSelectSingleClientType(clientType) {
    setSelectedSingleClientType(clientType);
  }

  // formik setup
  const validation = useFormik({
    initialValues: {
      fullName: "",
      mobileNo: "",
      email: "",
      dob: "",
      panNo: "",
      fatherName: "",
      motherName: "",
      disposition: "",
      currentAddress: "",
      pinCode: "",
      companyName: "",
      income: "",
      bankName: "",
      clientType: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please enter full name"),
      mobileNo: Yup.string().required("Please enter mobile no"),
      email: Yup.string().required("Please enter email"),
      dob: Yup.string().required("Please enter date of birth"),
      panNo: Yup.string().required("Please enter pan no"),
      fatherName: Yup.string().required("Please enter father name"),
      motherName: Yup.string().required("Please enter mother name"),
      disposition: Yup.string().required("Please select disposition"),
      currentAddress: Yup.string().required("Please enter current address"),
      pinCode: Yup.number().required("Please enter pin code"),
      companyName: Yup.string().required("Please enter company name"),
      income: Yup.number().required("Please enter income"),
      bankName: Yup.string().required("Please enter bank name"),
      clientType: Yup.string().required("Please select client type"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createForm(values));

      setSelectedSingleEmployeeName(null);
      setSelectedSingleBank(null);
      setSelectedSingleClientType(null);

      resetForm();
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    return false;
  }

  document.title = "Forms";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Forms" pageTitle="Applications" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Nav
                    pills
                    className="nav nav-pills arrow-navtabs nav-primary bg-light mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "1",
                        })}
                        onClick={() => {
                          arrowNavToggle("1");
                        }}
                      >
                        Credit Card
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "2",
                        })}
                        onClick={() => {
                          arrowNavToggle("2");
                        }}
                      >
                        Loan
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "3",
                        })}
                        onClick={() => {
                          arrowNavToggle("3");
                        }}
                      >
                        Insurance
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: arrowNavTab === "4",
                        })}
                        onClick={() => {
                          arrowNavToggle("4");
                        }}
                      >
                        Demat Account
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={arrowNavTab} className="text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col xxl={6}>
                          <Card>
                            <CardBody>
                              <div className="live-preview">
                                <Form onSubmit={formHandleSubmit}>
                                  <Row>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="disposition"
                                          className="form-label text-muted"
                                        >
                                          Disposition
                                        </Label>
                                        <Select
                                          id="disposition"
                                          name="disposition"
                                          value={selectedSingleEmployeeName}
                                          onChange={(employeeName) => {
                                            handleSelectSingleEmployeeName(
                                              employeeName
                                            );
                                            validation.setFieldValue(
                                              "disposition",
                                              employeeName.value
                                            );
                                          }}
                                          options={employeeOptions}
                                          placeholder="Disposition"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="bankName"
                                          className="form-label text-muted"
                                        >
                                          Bank Name
                                        </Label>
                                        <Select
                                          id="bankName"
                                          name="bankName"
                                          value={selectedSingleBank}
                                          onChange={(bankName) => {
                                            handleSelectSingleBankName(
                                              bankName
                                            );
                                            validation.setFieldValue(
                                              "bankName",
                                              bankName.value
                                            );
                                          }}
                                          options={bankOptions}
                                          placeholder="Bank Name"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="clientType"
                                          className="form-label text-muted"
                                        >
                                          Client Type
                                        </Label>
                                        <Select
                                          id="clientType"
                                          name="clientType"
                                          value={selectedSingleClientType}
                                          onChange={(clientType) => {
                                            handleSelectSingleClientType(
                                              clientType
                                            );
                                            validation.setFieldValue(
                                              "clientType",
                                              clientType.value
                                            );
                                          }}
                                          options={clientTypeOptions}
                                          placeholder="Client Type"
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="fullName"
                                          className="form-label text-muted"
                                        >
                                          Full Name
                                        </Label>
                                        <Input
                                          id="fullName"
                                          name="fullName"
                                          className="form-control"
                                          placeholder="Enter Full Name"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.fullName || ""
                                          }
                                          invalid={
                                            validation.touched.fullName &&
                                            validation.errors.fullName
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.fullName &&
                                        validation.errors.fullName ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.fullName}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="mobileNo"
                                          className="form-label text-muted"
                                        >
                                          Mobile Number
                                        </Label>
                                        <Input
                                          id="mobileNo"
                                          name="mobileNo"
                                          className="form-control"
                                          placeholder="Enter Mobile No"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.mobileNo || ""
                                          }
                                          invalid={
                                            validation.touched.mobileNo &&
                                            validation.errors.mobileNo
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.mobileNo &&
                                        validation.errors.mobileNo ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.mobileNo}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="currentAddress"
                                          className="form-label text-muted"
                                        >
                                          Current Address
                                        </Label>
                                        <Input
                                          id="currentAddress"
                                          name="currentAddress"
                                          className="form-control"
                                          placeholder="Enter Current Address"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.currentAddress ||
                                            ""
                                          }
                                          invalid={
                                            validation.touched.currentAddress &&
                                            validation.errors.currentAddress
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.currentAddress &&
                                        validation.errors.currentAddress ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.currentAddress}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="pinCode"
                                          className="form-label text-muted"
                                        >
                                          Pin Code
                                        </Label>
                                        <Input
                                          id="pinCode"
                                          name="pinCode"
                                          className="form-control"
                                          placeholder="Enter Pin Code"
                                          type="number"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.pinCode || ""
                                          }
                                          invalid={
                                            validation.touched.pinCode &&
                                            validation.errors.pinCode
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.pinCode &&
                                        validation.errors.pinCode ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.pinCode}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="dob"
                                          className="form-label text-muted"
                                        >
                                          Client DOB
                                        </Label>
                                        <Flatpickr
                                          id="dob"
                                          name="dob"
                                          className="form-control border dash-filter-picker"
                                          placeholder="Choose DOB"
                                          options={{
                                            dateFormat: "d/m/Y",
                                            defaultDate:
                                              validation.values.dob || "",
                                          }}
                                          onChange={(date) => {
                                            const formattedDate = new Date(
                                              date
                                            ).toLocaleDateString("en-GB");
                                            validation.setFieldValue(
                                              "dob",
                                              formattedDate
                                            );
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="motherName"
                                          className="form-label text-muted"
                                        >
                                          Mother Name
                                        </Label>
                                        <Input
                                          id="motherName"
                                          name="motherName"
                                          className="form-control"
                                          placeholder="Enter Mother Name"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.motherName || ""
                                          }
                                          invalid={
                                            validation.touched.motherName &&
                                            validation.errors.motherName
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.motherName &&
                                        validation.errors.motherName ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.motherName}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="fatherName"
                                          className="form-label text-muted"
                                        >
                                          Father Name
                                        </Label>
                                        <Input
                                          id="fatherName"
                                          name="fatherName"
                                          className="form-control"
                                          placeholder="Enter Father Name"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.fatherName || ""
                                          }
                                          invalid={
                                            validation.touched.fatherName &&
                                            validation.errors.fatherName
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.fatherName &&
                                        validation.errors.fatherName ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.fatherName}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="companyName"
                                          className="form-label text-muted"
                                        >
                                          Company Name
                                        </Label>
                                        <Input
                                          id="companyName"
                                          name="companyName"
                                          className="form-control"
                                          placeholder="Enter Company Name"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.companyName || ""
                                          }
                                          invalid={
                                            validation.touched.companyName &&
                                            validation.errors.companyName
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.companyName &&
                                        validation.errors.companyName ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.companyName}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="companyAddress"
                                          className="form-label text-muted"
                                        >
                                          Company Address
                                        </Label>
                                        <Input
                                          id="companyAddress"
                                          name="companyAddress"
                                          className="form-control"
                                          placeholder="Enter Company Address"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={
                                            validation.values.companyAddress ||
                                            ""
                                          }
                                          invalid={
                                            validation.touched.companyAddress &&
                                            validation.errors.companyAddress
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.companyAddress &&
                                        validation.errors.companyAddress ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.companyAddress}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="income"
                                          className="form-label text-muted"
                                        >
                                          Salary/Gross Income
                                        </Label>
                                        <Input
                                          id="income"
                                          name="income"
                                          className="form-control"
                                          placeholder="Enter Income"
                                          type="number"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={validation.values.income || ""}
                                          invalid={
                                            validation.touched.income &&
                                            validation.errors.income
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.income &&
                                        validation.errors.income ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.income}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="email"
                                          className="form-label text-muted"
                                        >
                                          Official Email Id
                                        </Label>
                                        <Input
                                          id="email"
                                          name="email"
                                          className="form-control"
                                          placeholder="Enter Income"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={validation.values.email || ""}
                                          invalid={
                                            validation.touched.email &&
                                            validation.errors.email
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.email &&
                                        validation.errors.email ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.email}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={4}>
                                      <div className="mb-3">
                                        <Label
                                          htmlFor="panNo"
                                          className="form-label text-muted"
                                        >
                                          Pan Card Number
                                        </Label>
                                        <Input
                                          id="panNo"
                                          name="panNo"
                                          className="form-control"
                                          placeholder="Enter Pan No"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={validation.values.panNo || ""}
                                          invalid={
                                            validation.touched.panNo &&
                                            validation.errors.panNo
                                              ? true
                                              : false
                                          }
                                        />

                                        {validation.touched.panNo &&
                                        validation.errors.panNo ? (
                                          <FormFeedback type="invalid">
                                            {validation.errors.panNo}
                                          </FormFeedback>
                                        ) : null}
                                      </div>
                                    </Col>
                                    <Col md={12}>
                                      <div className="text-end">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                    <TabPane tabId="3">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                    <TabPane tabId="4">
                      <h5>Coming Soon!</h5>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Forms;
