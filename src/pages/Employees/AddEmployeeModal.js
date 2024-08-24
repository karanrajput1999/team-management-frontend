import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { getLoggedinUser } from "../../helpers/api_helper";

function AddEmployeeModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingEmployee, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyRegisteredError, // gives error if user already registered with same - id, email, agentMobile
  selectedSingleTeamName,
  handleSelectSingleTeam,
  teamOptions,
}) {
  const { data } = getLoggedinUser();

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        Add Employee
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          {data.roleId === 1 && (
            <div className="mb-2">
              <Label htmlFor="teamName" className="form-label">
                Team Name
              </Label>
              <Select
                id="teamName"
                name="teamName"
                value={selectedSingleTeamName}
                onChange={(teamName) => {
                  handleSelectSingleTeam(teamName);
                  validation.setFieldValue("teamName", teamName.value);
                }}
                options={teamOptions}
                placeholder="Select Team Name"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isFocused ? "#a8d9f3" : "#ced4da",
                    "&:hover": {
                      borderColor: "#ced4da",
                    },
                  }),
                }}
              />
            </div>
          )}

          <div className="mb-2">
            <Label htmlFor="name" className="form-label">
              Employee Name
            </Label>

            <Input
              id="employeeName"
              name="employeeName"
              className="form-control"
              placeholder="Enter Employee Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.employeeName || ""}
              invalid={
                validation.touched.employeeName &&
                validation.errors.employeeName
                  ? true
                  : false
              }
            />

            {validation.touched.employeeName &&
            validation.errors.employeeName ? (
              <FormFeedback type="invalid">
                {validation.errors.employeeName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="email" className="form-label">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              type="email"
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

          <div className="mb-2">
            <Label htmlFor="password" className="form-label">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.password || ""}
              invalid={
                validation.touched.password && validation.errors.password
                  ? true
                  : false
              }
            />

            {validation.touched.password && validation.errors.password ? (
              <FormFeedback type="invalid">
                {validation.errors.password}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingEmployee ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddEmployeeModal;
