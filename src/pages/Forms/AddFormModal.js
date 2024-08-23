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

function AddFormModal({
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
        Add Form
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Client Name
            </Label>

            <Input
              id="clientName"
              name="clientName"
              className="form-control"
              placeholder="Enter Client Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.clientName || ""}
              invalid={
                validation.touched.clientName && validation.errors.clientName
                  ? true
                  : false
              }
            />

            {validation.touched.clientName && validation.errors.clientName ? (
              <FormFeedback type="invalid">
                {validation.errors.clientName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="employeeName" className="form-label">
              Mobile No
            </Label>

            <Input
              id="employeeName"
              name="employeeName"
              className="form-control"
              placeholder="Enter Employee Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.mobileNo || ""}
              invalid={
                validation.touched.mobileNo && validation.errors.mobileNo
                  ? true
                  : false
              }
            />

            {validation.touched.mobileNo && validation.errors.mobileNo ? (
              <FormFeedback type="invalid">
                {validation.errors.mobileNo}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="applicationNo" className="form-label">
              Application No
            </Label>

            <Input
              id="applicationNo"
              name="applicationNo"
              className="form-control"
              placeholder="Enter Application Name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.applicationNo || ""}
              invalid={
                validation.touched.applicationNo &&
                validation.errors.applicationNo
                  ? true
                  : false
              }
            />

            {validation.touched.applicationNo &&
            validation.errors.applicationNo ? (
              <FormFeedback type="invalid">
                {validation.errors.applicationNo}
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

export default AddFormModal;
