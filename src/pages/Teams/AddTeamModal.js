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

function AddTeamModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingTeam,
  alreadyRegisteredError,
}) {
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
        {isEditingTeam ? "Update Team" : "Add Team"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <div className="mb-2">
            <Label htmlFor="teamName" className="form-label">
              Team Name
            </Label>

            <Input
              id="teamName"
              name="teamName"
              className="form-control"
              placeholder="Enter Team Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.teamName || ""}
              invalid={
                validation.touched.teamName && validation.errors.teamName
                  ? true
                  : false
              }
            />

            {validation.touched.teamName && validation.errors.teamName ? (
              <FormFeedback type="invalid">
                {validation.errors.teamName}
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
              placeholder="Enter Email Id"
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

          {/* <div className="mb-2">
            <Label htmlFor="userType" className="form-label">
              User Type
            </Label>
            <Input
              id="userType"
              name="userType"
              className="form-control"
              type="select"
              // onChange={(value) => {
              //   console.log("ROLE NAME WHILE CREATING CENTER ->", value);
              // }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.userType || ""}
              invalid={
                validation.touched.userType && validation.errors.userType
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select User Type
              </option>

              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Input>

            {validation.touched.role && validation.errors.role ? (
              <FormFeedback type="invalid">
                {validation.errors.role}
              </FormFeedback>
            ) : null}
          </div> */}

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
              {isEditingTeam ? "Update Team" : "Save Team"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddTeamModal;
