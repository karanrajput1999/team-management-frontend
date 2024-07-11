import {
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";

function InsuranceForm({
  insuranceValidation,
  insuranceFormHandleSubmit,
  clientTypeOptions,
  selectedSingleClientType,
  handleSelectSingleClientType,
  insuranceTypeOptions,
  selectedSingleInsuranceType,
  handleSelectSingleInsuranceType,
}) {
  return (
    <Row>
      <Col xxl={6}>
        <Card>
          <CardBody>
            <div className="live-preview">
              <Form onSubmit={insuranceFormHandleSubmit}>
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
                          insuranceValidation.setFieldValue(
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
                        htmlFor="insuranceType"
                        className="form-label text-muted"
                      >
                        Insurance Type
                      </Label>
                      <Select
                        id="insuranceType"
                        name="insuranceType"
                        value={selectedSingleInsuranceType}
                        onChange={(insuranceType) => {
                          handleSelectSingleInsuranceType(insuranceType);
                          insuranceValidation.setFieldValue(
                            "insuranceType",
                            insuranceType.value
                          );
                        }}
                        options={insuranceTypeOptions}
                        placeholder="Insurance Type"
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.name || ""}
                        invalid={
                          insuranceValidation.touched.name &&
                          insuranceValidation.errors.name
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.name &&
                      insuranceValidation.errors.name ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.name}
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.panNo || ""}
                        invalid={
                          insuranceValidation.touched.panNo &&
                          insuranceValidation.errors.panNo
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.panNo &&
                      insuranceValidation.errors.panNo ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.panNo}
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.mobileNo || ""}
                        invalid={
                          insuranceValidation.touched.mobileNo &&
                          insuranceValidation.errors.mobileNo
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.mobileNo &&
                      insuranceValidation.errors.mobileNo ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.mobileNo}
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.currentAddress || ""}
                        invalid={
                          insuranceValidation.touched.currentAddress &&
                          insuranceValidation.errors.currentAddress
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.currentAddress &&
                      insuranceValidation.errors.currentAddress ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.currentAddress}
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.income || ""}
                        invalid={
                          insuranceValidation.touched.income &&
                          insuranceValidation.errors.income
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.income &&
                      insuranceValidation.errors.income ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.income}
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
                        onChange={insuranceValidation.handleChange}
                        onBlur={insuranceValidation.handleBlur}
                        value={insuranceValidation.values.pinCode || ""}
                        invalid={
                          insuranceValidation.touched.pinCode &&
                          insuranceValidation.errors.pinCode
                            ? true
                            : false
                        }
                      />

                      {insuranceValidation.touched.pinCode &&
                      insuranceValidation.errors.pinCode ? (
                        <FormFeedback type="invalid">
                          {insuranceValidation.errors.pinCode}
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

export default InsuranceForm;
