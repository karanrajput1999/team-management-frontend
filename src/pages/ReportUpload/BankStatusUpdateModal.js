import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";

function BankStatusUpdateModal({
  status_modal_list,
  status_tog_list,
  formHandleSubmit,
  validation,
  selectedSingleBankStatus,
  handleSelectSingleBankStatus,
  bankStatusOptions,
}) {
  return (
    <Modal
      isOpen={status_modal_list}
      toggle={() => {
        status_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          status_tog_list();
        }}
      >
        Update Bank Status
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label className="form-label">Choose Bank Status</Label>
            <Select
              id="bankStatus"
              name="bankStatus"
              value={selectedSingleBankStatus}
              onChange={(bankStatus) => {
                handleSelectSingleBankStatus(bankStatus);
                // validation.setFieldValue(
                //   "centerName",
                //   centerName.value
                // );
              }}
              options={bankStatusOptions}
              placeholder="Choose Bank Status"
            />
          </div>
          <div className="mb-2">
            <Label className="form-label">Remarks</Label>
            <Input id="remarks" name="remarks" type="textarea" />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-success">Update Status</button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default BankStatusUpdateModal;
