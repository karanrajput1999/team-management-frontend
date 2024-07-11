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

function DematAccountForm({
  dematAccountValidation,
  dematAccountFormHandleSubmit,
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
              <Form onSubmit={dematAccountFormHandleSubmit}>
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
                          dematAccountValidation.setFieldValue(
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
                      <Label htmlFor="name" className="form-label text-muted">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Full Name"
                        type="text"
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={dematAccountValidation.values.name || ""}
                        invalid={
                          dematAccountValidation.touched.name &&
                          dematAccountValidation.errors.name
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.name &&
                      dematAccountValidation.errors.name ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.name}
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
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={dematAccountValidation.values.panNo || ""}
                        invalid={
                          dematAccountValidation.touched.panNo &&
                          dematAccountValidation.errors.panNo
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.panNo &&
                      dematAccountValidation.errors.panNo ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.panNo}
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
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={dematAccountValidation.values.mobileNo || ""}
                        invalid={
                          dematAccountValidation.touched.mobileNo &&
                          dematAccountValidation.errors.mobileNo
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.mobileNo &&
                      dematAccountValidation.errors.mobileNo ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.mobileNo}
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
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={
                          dematAccountValidation.values.currentAddress || ""
                        }
                        invalid={
                          dematAccountValidation.touched.currentAddress &&
                          dematAccountValidation.errors.currentAddress
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.currentAddress &&
                      dematAccountValidation.errors.currentAddress ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.currentAddress}
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
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={dematAccountValidation.values.income || ""}
                        invalid={
                          dematAccountValidation.touched.income &&
                          dematAccountValidation.errors.income
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.income &&
                      dematAccountValidation.errors.income ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.income}
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
                        onChange={dematAccountValidation.handleChange}
                        onBlur={dematAccountValidation.handleBlur}
                        value={dematAccountValidation.values.pinCode || ""}
                        invalid={
                          dematAccountValidation.touched.pinCode &&
                          dematAccountValidation.errors.pinCode
                            ? true
                            : false
                        }
                      />

                      {dematAccountValidation.touched.pinCode &&
                      dematAccountValidation.errors.pinCode ? (
                        <FormFeedback type="invalid">
                          {dematAccountValidation.errors.pinCode}
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

export default DematAccountForm;
