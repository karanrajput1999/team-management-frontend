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

function CreditCardForm({
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
}) {
  return (
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
                        htmlFor="employeeName"
                        className="form-label text-muted"
                      >
                        Employee Name
                      </Label>
                      <Select
                        id="employeeName"
                        name="employeeName"
                        value={selectedSingleEmployeeName}
                        onChange={(employeeName) => {
                          handleSelectSingleEmployeeName(employeeName);
                          validation.setFieldValue(
                            "employeeName",
                            employeeName.value
                          );
                        }}
                        options={employeeUserOptions}
                        placeholder="Employee Name"
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
                          handleSelectSingleBankName(bankName);
                          validation.setFieldValue("bankName", bankName.value);
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
                          handleSelectSingleClientType(clientType);
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
                        value={validation.values.fullName || ""}
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
                        value={validation.values.mobileNo || ""}
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
                        value={validation.values.currentAddress || ""}
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
                        value={validation.values.pinCode || ""}
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
                      <Label htmlFor="dob" className="form-label text-muted">
                        Client DOB
                      </Label>
                      <Flatpickr
                        id="dob"
                        name="dob"
                        value={validation.values.dob || ""}
                        className="form-control border dash-filter-picker"
                        placeholder="Choose DOB"
                        options={{
                          dateFormat: "d/m/Y",
                          defaultDate: validation.values.dob || "",
                        }}
                        onChange={(date) => {
                          const formattedDate = new Date(
                            date
                          ).toLocaleDateString("en-GB");
                          validation.setFieldValue("dob", formattedDate);
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
                        value={validation.values.motherName || ""}
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
                        value={validation.values.fatherName || ""}
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
                        value={validation.values.companyName || ""}
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
                        value={validation.values.companyAddress || ""}
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
                      <Label htmlFor="income" className="form-label text-muted">
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
                          validation.touched.income && validation.errors.income
                            ? true
                            : false
                        }
                      />

                      {validation.touched.income && validation.errors.income ? (
                        <FormFeedback type="invalid">
                          {validation.errors.income}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label text-muted">
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
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />

                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Label htmlFor="panNo" className="form-label text-muted">
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
                          validation.touched.panNo && validation.errors.panNo
                            ? true
                            : false
                        }
                      />

                      {validation.touched.panNo && validation.errors.panNo ? (
                        <FormFeedback type="invalid">
                          {validation.errors.panNo}
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

export default CreditCardForm;
