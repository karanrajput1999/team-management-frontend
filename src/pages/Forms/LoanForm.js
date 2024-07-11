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

function LoanForm({
  // validation,
  loanValidation,
  loanFormHandleSubmit,
  // employeeUserOptions,
  // selectedSingleEmployeeName,
  // handleSelectSingleEmployeeName,
  // bankOptions,
  // selectedSingleBank,
  // handleSelectSingleBankName,
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
              <Form onSubmit={loanFormHandleSubmit}>
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
                          loanValidation.setFieldValue(
                            "employeeType",
                            clientType.value
                          );
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
                          loanValidation.setFieldValue(
                            "loanType",
                            loanType.value
                          );
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
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.name || ""}
                        invalid={
                          loanValidation.touched.name &&
                          loanValidation.errors.name
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.name &&
                      loanValidation.errors.name ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label htmlFor="panNo" className="form-label text-muted">
                        Pan No
                      </Label>
                      <Input
                        id="panNo"
                        name="panNo"
                        className="form-control"
                        placeholder="Enter pan no"
                        type="text"
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.panNo || ""}
                        invalid={
                          loanValidation.touched.panNo &&
                          loanValidation.errors.panNo
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.panNo &&
                      loanValidation.errors.panNo ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.panNo}
                        </FormFeedback>
                      ) : null}
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
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.mobileNo || ""}
                        invalid={
                          loanValidation.touched.mobileNo &&
                          loanValidation.errors.mobileNo
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.mobileNo &&
                      loanValidation.errors.mobileNo ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.mobileNo}
                        </FormFeedback>
                      ) : null}
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
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.currentAddress || ""}
                        invalid={
                          loanValidation.touched.currentAddress &&
                          loanValidation.errors.currentAddress
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.currentAddress &&
                      loanValidation.errors.currentAddress ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.currentAddress}
                        </FormFeedback>
                      ) : null}
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
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.income || ""}
                        invalid={
                          loanValidation.touched.income &&
                          loanValidation.errors.income
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.income &&
                      loanValidation.errors.income ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.income}
                        </FormFeedback>
                      ) : null}
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
                        onChange={loanValidation.handleChange}
                        onBlur={loanValidation.handleBlur}
                        value={loanValidation.values.pinCode || ""}
                        invalid={
                          loanValidation.touched.pinCode &&
                          loanValidation.errors.pinCode
                            ? true
                            : false
                        }
                      />

                      {loanValidation.touched.pinCode &&
                      loanValidation.errors.pinCode ? (
                        <FormFeedback type="invalid">
                          {loanValidation.errors.pinCode}
                        </FormFeedback>
                      ) : null}
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

export default LoanForm;
