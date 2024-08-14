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
import { useEffect, useState } from "react";

function AddUserFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingUser, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyRegisteredError, // gives error if user already registered with same - id, email, agentMobile
  handleRoleChange,
  roles,
  centers,
  roleOptions,
  selectedSingleRoleType,
  handleSelectSingleRole,
  selectedSingleCenterName,
  handleSelectSingleCenter,
  centerOptions,
}) {
  // useEffect(() => {
  //   if (isEditingUser) {
  //     const centerName = CenterOptions.find(
  //       (option) => option.value === validation.values.centerName
  //     );

  //     setSelectedSingleCenterName(centerName);
  //   }
  // }, [isEditingUser]);

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
        Add User
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
            <Select
              id="centerName"
              name="centerName"
              value={selectedSingleCenterName}
              onChange={(centerName) => {
                handleSelectSingleCenter(centerName);
                validation.setFieldValue("centerName", centerName.value);
              }}
              options={centerOptions}
              placeholder="Select Center Name"
            />
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
              Select Role
            </Label>
            <Input
              id="userType"
              name="userType"
              className="form-control"
              type="select"
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
                <option value={role.id} key={role.id}>
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
            <Label htmlFor="name" className="form-label">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />

            {validation.touched.name && validation.errors.name ? (
              <FormFeedback type="invalid">
                {validation.errors.name}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="agentId" className="form-label">
              Agent Id
            </Label>

            <Input
              id="agentId"
              name="agentId"
              className="form-control"
              placeholder="Enter Agent Id"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.agentId || ""}
              invalid={
                validation.touched.agentId && validation.errors.agentId
                  ? true
                  : false
              }
            />

            {validation.touched.agentId && validation.errors.agentId ? (
              <FormFeedback type="invalid">
                {validation.errors.agentId}
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
            <Label htmlFor="age" className="form-label">
              Age
            </Label>

            <Input
              id="age"
              name="age"
              className="form-control"
              placeholder="Enter age"
              type="number"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.age || ""}
              invalid={
                validation.touched.age && validation.errors.age ? true : false
              }
            />

            {validation.touched.age && validation.errors.age ? (
              <FormFeedback type="invalid">
                {validation.errors.age}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="aadharNumber" className="form-label">
              Aadhar No
            </Label>

            <Input
              id="aadharNumber"
              name="aadharNumber"
              className="form-control"
              placeholder="Enter aadhar no"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.aadharNumber || ""}
              invalid={
                validation.touched.aadharNumber &&
                validation.errors.aadharNumber
                  ? true
                  : false
              }
            />

            {validation.touched.aadharNumber &&
            validation.errors.aadharNumber ? (
              <FormFeedback type="invalid">
                {validation.errors.aadharNumber}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="panNo" className="form-label">
              Pan No
            </Label>

            <Input
              id="panNo"
              name="panNo"
              className="form-control"
              placeholder="Enter pan no"
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
              {isEditingUser ? "Update User" : "Save User"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddUserFormModal;
