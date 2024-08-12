import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

function AddCenterModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingCenter,
  alreadyRegisteredError,
  roles,
  roleOptions,
  handleSelectSingleRole,
  selectedSingleRoleType,
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
        {isEditingCenter ? "Update Center" : "Add Center"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <div className="mb-2">
            <Label htmlFor="centerName" className="form-label">
              Center Name
            </Label>

            <Input
              id="centerName"
              name="centerName"
              className="form-control"
              placeholder="Enter Center Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.centerName || ""}
              invalid={
                validation.touched.centerName && validation.errors.centerName
                  ? true
                  : false
              }
            />

            {validation.touched.centerName && validation.errors.centerName ? (
              <FormFeedback type="invalid">
                {validation.errors.centerName}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="ownerName" className="form-label">
              Owner Name
            </Label>

            <Input
              id="ownerName"
              name="ownerName"
              className="form-control"
              placeholder="Enter Owner Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.ownerName || ""}
              invalid={
                validation.touched.ownerName && validation.errors.ownerName
                  ? true
                  : false
              }
            />

            {validation.touched.ownerName && validation.errors.ownerName ? (
              <FormFeedback type="invalid">
                {validation.errors.ownerName}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </Label>

            <Input
              id="mobileNumber"
              name="mobileNumber"
              className="form-control"
              placeholder="Enter Mobile Number"
              type="text"
              maxLength="10"
              minLength="10"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.mobileNumber || ""}
              invalid={
                validation.touched.mobileNumber &&
                validation.errors.mobileNumber
                  ? true
                  : false
              }
            />

            {validation.touched.mobileNumber &&
            validation.errors.mobileNumber ? (
              <FormFeedback type="invalid">
                {validation.errors.mobileNumber}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="emailId" className="form-label">
              Email
            </Label>

            <Input
              id="emailId"
              name="emailId"
              className="form-control"
              placeholder="Enter Email Id"
              type="email"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.emailId || ""}
              invalid={
                validation.touched.emailId && validation.errors.emailId
                  ? true
                  : false
              }
            />

            {validation.touched.emailId && validation.errors.emailId ? (
              <FormFeedback type="invalid">
                {validation.errors.emailId}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="location" className="form-label">
              Location
            </Label>

            <Input
              id="location"
              name="location"
              className="form-control"
              placeholder="Enter Location"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.location || ""}
              invalid={
                validation.touched.location && validation.errors.location
                  ? true
                  : false
              }
            />

            {validation.touched.location && validation.errors.location ? (
              <FormFeedback type="invalid">
                {validation.errors.location}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="branchId" className="form-label">
              Branch ID
            </Label>

            <Input
              id="branchId"
              name="branchId"
              className="form-control"
              placeholder="Enter Branch Id"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.branchId || ""}
              invalid={
                validation.touched.branchId && validation.errors.branchId
                  ? true
                  : false
              }
            />

            {validation.touched.branchId && validation.errors.branchId ? (
              <FormFeedback type="invalid">
                {validation.errors.branchId}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="userType" className="form-label">
              User Type
            </Label>
            <Select
              id="userType"
              name="userType"
              value={selectedSingleRoleType}
              onChange={(userType) => {
                handleSelectSingleRole(userType);
                validation.setFieldValue("userType", userType.value);
              }}
              options={roleOptions}
              placeholder="Select User Type"
            />
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
              {isEditingCenter ? "Update Center" : "Save Center"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddCenterModal;
