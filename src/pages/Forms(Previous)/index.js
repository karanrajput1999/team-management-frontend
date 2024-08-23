import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import {
  bankOptions,
  clientTypeOptions,
  loanTypeOptions,
  insuranceTypeOptions,
} from "../../common/data/Forms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCreditCardForm } from "../../slices/CreditCardForm/thunk";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  getEmployees,
  createCenterUser,
  removeCenterUser,
  updateCenterUser,
} from "../../slices/Employees/thunk";
import CreditCardForm from "./CreditCardForm";
import LoanForm from "./LoanForm";
import InsuranceForm from "./InsuranceForm";
import DematAccountForm from "./DematAccountForm";
import { createLoanForm } from "../../slices/LoanForm/thunk";
import { createInsuranceForm } from "../../slices/InsuranceForm/thunk";
import { createDematAccountForm } from "../../slices/DematAccountForm/thunk";
import { getLoggedinUser } from "../../helpers/api_helper";
import { getAllowedFormPermissions } from "../../slices/FormPermissions/thunk";
import { getBankDropdown } from "../../helpers/fakebackend_helper";

const FormsPrevious = () => {
  const [selectedSingleEmployeeName, setSelectedSingleEmployeeName] =
    useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const [selectedSingleClientType, setSelectedSingleClientType] =
    useState(null);

  const [selectedSingleLoanType, setSelectedSingleLoanType] = useState(null);

  const [selectedSingleInsuranceType, setSelectedSingleInsuranceType] =
    useState(null);

  const [arrowNavTab, setarrowNavTab] = useState("1");

  const [bankDropdowns, setBankDropdowns] = useState(null);

  const { allCenterUsers } = useSelector((state) => state.AddUsers);

  const { allowedFormPermissions } = useSelector(
    (state) => state.FormPermissions
  );

  const dispatch = useDispatch();

  const loggedInUser = getLoggedinUser()?.data;

  const arrowNavToggle = (tab) => {
    if (arrowNavTab !== tab) {
      setarrowNavTab(tab);
    }
  };
  const allowedForms = allowedFormPermissions?.map((formPermission) => {
    return formPermission.formId;
  });

  const bankOptions = bankDropdowns?.map((bank) => {
    return { value: bank.name, label: bank.name, id: bank.id };
  });

  useEffect(() => {
    getBankDropdown().then((res) => {
      setBankDropdowns(res.data.bankDropdowns);
    });
  }, []);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllowedFormPermissions());
  }, [dispatch]);

  function handleSelectSingleEmployeeName(employeeName) {
    setSelectedSingleEmployeeName(employeeName);
  }
  function handleSelectSingleBankName(bankName) {
    setSelectedSingleBank(bankName);
  }
  function handleSelectSingleClientType(clientType) {
    setSelectedSingleClientType(clientType);
  }
  function handleSelectSingleLoanType(loanType) {
    setSelectedSingleLoanType(loanType);
  }
  function handleSelectSingleInsuranceType(insuranceType) {
    setSelectedSingleInsuranceType(insuranceType);
  }

  const employeeUserOptions = allCenterUsers.map((user) => {
    return {
      id: user.id,
      label: user.name,
      value: user.name,
    };
  });

  // Credit Card formik setup
  const validation = useFormik({
    initialValues: {
      fullName: "",
      mobileNo: "",
      email: "",
      dob: "",
      panNo: "",
      fatherName: "",
      motherName: "",
      employeeName: "",
      currentAddress: "",
      pinCode: "",
      companyName: "",
      income: "",
      bankName: "",
      clientType: "",
      bankId: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please enter full name"),
      mobileNo: Yup.string()
        .length(10, "Mobile no should be of 10 digit only")
        .required("Please enter mobile number"),
      email: Yup.string().required("Please enter email"),
      dob: Yup.string().required("Please enter date of birth"),
      panNo: Yup.string().required("Please enter pan no"),
      fatherName: Yup.string().required("Please enter father name"),
      motherName: Yup.string().required("Please enter mother name"),
      employeeName:
        loggedInUser.roleid === 1
          ? Yup.string().required("Please select employee")
          : Yup.string(),
      currentAddress: Yup.string().required("Please enter current address"),
      pinCode: Yup.number().required("Please enter pin code"),
      companyName: Yup.string().required("Please enter company name"),
      income: Yup.number().required("Please enter income"),
      bankName: Yup.string().required("Please enter bank name"),
      clientType: Yup.string().required("Please select client type"),
      bankId: Yup.string().required("Please enter bank id"),
    }),
    onSubmit: (values, { resetForm, setFieldValue }) => {
      dispatch(createCreditCardForm({ ...values, formType: "Credit Card" }));
      setSelectedSingleEmployeeName(null);
      setSelectedSingleBank(null);
      setSelectedSingleClientType(null);
      setFieldValue("dob", "");

      resetForm();
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    return false;
  }

  // Loan form formik setup
  const loanValidation = useFormik({
    initialValues: {
      employeeType: "",
      loanType: "",
      name: "",
      mobileNo: "",
      currentAddress: "",
      pinCode: "",
      panNo: "",
      income: "",
    },
    validationSchema: Yup.object({
      employeeType: Yup.string().required("Please select employee type"),
      loanType: Yup.string().required("Please select loan Type"),
      name: Yup.string().required("Please enter name"),
      mobileNo: Yup.string()
        .length(10, "Mobile no should be of 10 digit only")
        .required("Please enter mobile number"),
      currentAddress: Yup.string().required("Please enter current address"),
      pinCode: Yup.number().required("Please enter pin code"),
      panNo: Yup.string().required("Please enter pan no"),
      income: Yup.number().required("Please enter income"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createLoanForm({ ...values, formType: "Loan" }));
      setSelectedSingleClientType(null);
      setSelectedSingleLoanType(null);

      resetForm();
    },
  });

  function loanFormHandleSubmit(e) {
    e.preventDefault();

    loanValidation.handleSubmit();

    return false;
  }
  // Insurance form formik setup
  const insuranceValidation = useFormik({
    initialValues: {
      employeeType: "",
      insuranceType: "",
      name: "",
      mobileNo: "",
      currentAddress: "",
      pinCode: "",
      panNo: "",
      income: "",
    },
    validationSchema: Yup.object({
      employeeType: Yup.string().required("Please select employee type"),
      insuranceType: Yup.string().required("Please select insurance Type"),
      name: Yup.string().required("Please enter name"),
      mobileNo: Yup.string()
        .length(10, "Mobile no should be of 10 digit only")
        .required("Please enter mobile number"),
      currentAddress: Yup.string().required("Please enter current address"),
      pinCode: Yup.number().required("Please enter pin code"),
      panNo: Yup.string().required("Please enter pan no"),
      income: Yup.number().required("Please enter income"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createInsuranceForm({ ...values, formType: "Insurance" }));
      setSelectedSingleClientType(null);
      setSelectedSingleInsuranceType(null);

      resetForm();
    },
  });

  function insuranceFormHandleSubmit(e) {
    e.preventDefault();

    insuranceValidation.handleSubmit();

    return false;
  }
  // Demat Account form formik setup
  const dematAccountValidation = useFormik({
    initialValues: {
      employeeType: "",
      name: "",
      mobileNo: "",
      currentAddress: "",
      pinCode: "",
      panNo: "",
      income: "",
    },
    validationSchema: Yup.object({
      employeeType: Yup.string().required("Please select employee type"),
      name: Yup.string().required("Please enter name"),
      mobileNo: Yup.string()
        .length(10, "Mobile no should be of 10 digit only")
        .required("Please enter mobile number"),
      currentAddress: Yup.string().required("Please enter current address"),
      pinCode: Yup.number().required("Please enter pin code"),
      panNo: Yup.string().required("Please enter pan no"),
      income: Yup.number().required("Please enter income"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        createDematAccountForm({ ...values, formType: "Demat Account" })
      );
      setSelectedSingleClientType(null);

      resetForm();
    },
  });

  function dematAccountFormHandleSubmit(e) {
    e.preventDefault();

    dematAccountValidation.handleSubmit();

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
                      {allowedForms?.includes(1) ? (
                        <CreditCardForm
                          validation={validation}
                          formHandleSubmit={formHandleSubmit}
                          employeeUserOptions={employeeUserOptions}
                          selectedSingleEmployeeName={
                            selectedSingleEmployeeName
                          }
                          handleSelectSingleEmployeeName={
                            handleSelectSingleEmployeeName
                          }
                          bankOptions={bankOptions}
                          selectedSingleBank={selectedSingleBank}
                          handleSelectSingleBankName={
                            handleSelectSingleBankName
                          }
                          clientTypeOptions={clientTypeOptions}
                          selectedSingleClientType={selectedSingleClientType}
                          handleSelectSingleClientType={
                            handleSelectSingleClientType
                          }
                        />
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          You do not have permission to view this form!
                        </div>
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      {allowedForms?.includes(2) ? (
                        <LoanForm
                          loanValidation={loanValidation}
                          loanTypeOptions={loanTypeOptions}
                          loanFormHandleSubmit={loanFormHandleSubmit}
                          selectedSingleLoanType={selectedSingleLoanType}
                          handleSelectSingleLoanType={
                            handleSelectSingleLoanType
                          }
                          clientTypeOptions={clientTypeOptions}
                          selectedSingleClientType={selectedSingleClientType}
                          handleSelectSingleClientType={
                            handleSelectSingleClientType
                          }
                        />
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          You do not have permission to view this form!
                        </div>
                      )}
                    </TabPane>
                    <TabPane tabId="3">
                      {allowedForms?.includes(3) ? (
                        <InsuranceForm
                          insuranceValidation={insuranceValidation}
                          insuranceTypeOptions={insuranceTypeOptions}
                          selectedSingleInsuranceType={
                            selectedSingleInsuranceType
                          }
                          insuranceFormHandleSubmit={insuranceFormHandleSubmit}
                          handleSelectSingleInsuranceType={
                            handleSelectSingleInsuranceType
                          }
                          clientTypeOptions={clientTypeOptions}
                          selectedSingleClientType={selectedSingleClientType}
                          handleSelectSingleClientType={
                            handleSelectSingleClientType
                          }
                        />
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          You do not have permission to view this form!
                        </div>
                      )}
                    </TabPane>
                    <TabPane tabId="4">
                      {allowedForms?.includes(4) ? (
                        <DematAccountForm
                          dematAccountValidation={dematAccountValidation}
                          dematAccountFormHandleSubmit={
                            dematAccountFormHandleSubmit
                          }
                          clientTypeOptions={clientTypeOptions}
                          selectedSingleClientType={selectedSingleClientType}
                          handleSelectSingleClientType={
                            handleSelectSingleClientType
                          }
                        />
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          You do not have permission to view this form!
                        </div>
                      )}
                    </TabPane>
                  </TabContent>
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

export default FormsPrevious;
