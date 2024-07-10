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
import Select from "react-select";
import Flatpickr from "react-flatpickr";

function InsuranceForm({
  formHandleSubmit,
  validation,
  employeeUserOptions,
  selectedSingleEmployeeName,
  handleSelectSingleEmployeeName,
  bankOptions,
  selectedSingleBank,
  handleSelectSingleBankName,
  clientTypeOptions,
  selectedSingleClientType,
  handleSelectSingleClientType,
  loanTypeOptions,
  selectedSingleLoanType,
  handleSelectSingleLoanType,
}) {
  return (
    <Row>
      <Col xxl={6}>
        <Card>
          <CardBody>
            <div className="live-preview">
              <Form onSubmit={formHandleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="employeeType"
                        className="form-label text-muted"
                      >
                        Employee Type
                      </Label>
                      <Select
                        id="employeeType"
                        name="employeeType"
                        value={selectedSingleClientType}
                        onChange={(clientType) => {
                          handleSelectSingleClientType(clientType);
                          // validation.setFieldValue(
                          //   "clientType",
                          //   clientType.value
                          // );
                        }}
                        options={clientTypeOptions}
                        placeholder="Employee Type"
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label
                        htmlFor="loanType"
                        className="form-label text-muted"
                      >
                        Loan Type
                      </Label>
                      <Select
                        id="loanType"
                        name="loanType"
                        value={selectedSingleLoanType}
                        onChange={(loanType) => {
                          handleSelectSingleLoanType(loanType);
                          // validation.setFieldValue("bankName", bankName.value);
                        }}
                        options={loanTypeOptions}
                        placeholder="Loan Type"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label htmlFor="name" className="form-label text-muted">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Full Name"
                        type="text"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.fullName || ""}
                        // invalid={
                        //   validation.touched.fullName &&
                        //   validation.errors.fullName
                        //     ? true
                        //     : false
                        // }
                      />

                      {/* {validation.touched.fullName &&
                      validation.errors.fullName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.fullName}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>

                  <Col md={6}>
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
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.mobileNo || ""}
                        // invalid={
                        //   validation.touched.mobileNo &&
                        //   validation.errors.mobileNo
                        //     ? true
                        //     : false
                        // }
                      />

                      {/* {validation.touched.mobileNo &&
                      validation.errors.mobileNo ? (
                        <FormFeedback type="invalid">
                          {validation.errors.mobileNo}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>
                  <Col md={6}>
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
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.currentAddress || ""}
                        // invalid={
                        //   validation.touched.currentAddress &&
                        //   validation.errors.currentAddress
                        //     ? true
                        //     : false
                        // }
                      />

                      {/* {validation.touched.currentAddress &&
                      validation.errors.currentAddress ? (
                        <FormFeedback type="invalid">
                          {validation.errors.currentAddress}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <Label htmlFor="income" className="form-label text-muted">
                        Salary/Gross Income
                      </Label>
                      <Input
                        id="income"
                        name="income"
                        className="form-control"
                        placeholder="Enter Income"
                        type="number"
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.income || ""}
                        // invalid={
                        //   validation.touched.income && validation.errors.income
                        //     ? true
                        //     : false
                        // }
                      />

                      {/* {validation.touched.income && validation.errors.income ? (
                        <FormFeedback type="invalid">
                          {validation.errors.income}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>
                  <Col md={6}>
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
                        // onChange={validation.handleChange}
                        // onBlur={validation.handleBlur}
                        // value={validation.values.pinCode || ""}
                        // invalid={
                        //   validation.touched.pinCode &&
                        //   validation.errors.pinCode
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* 
                      {validation.touched.pinCode &&
                      validation.errors.pinCode ? (
                        <FormFeedback type="invalid">
                          {validation.errors.pinCode}
                        </FormFeedback>
                      ) : null} */}
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">
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
  );
}

export default InsuranceForm;
