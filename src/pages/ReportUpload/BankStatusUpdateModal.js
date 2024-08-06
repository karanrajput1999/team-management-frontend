import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
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
  bankStatusFormHandleSubmit,
  bankStatusUpdateValidation,
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
      <Form
        className="tablelist-form"
        onSubmit={(e) => bankStatusFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label className="form-label">Choose Bank Status</Label>
            <Select
              id="bankStatus"
              name="bankStatus"
              value={selectedSingleBankStatus}
              onChange={(bankStatus) => {
                handleSelectSingleBankStatus(bankStatus);
                bankStatusUpdateValidation.setFieldValue(
                  "bankStatus",
                  bankStatus.value
                );
              }}
              options={bankStatusOptions}
              placeholder="Choose Bank Status"
            />
            {bankStatusUpdateValidation.touched.bankStatus &&
            bankStatusUpdateValidation.errors.bankStatus ? (
              <FormFeedback type="invalid">
                {bankStatusUpdateValidation.errors.bankStatus}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label className="form-label">Comment</Label>
            <Input
              id="comment"
              name="comment"
              type="textarea"
              onChange={bankStatusUpdateValidation.handleChange}
              onBlur={bankStatusUpdateValidation.handleBlur}
              value={bankStatusUpdateValidation.values.comment || ""}
              invalid={
                bankStatusUpdateValidation.touched.comment &&
                bankStatusUpdateValidation.errors.comment
                  ? true
                  : false
              }
            />
            {bankStatusUpdateValidation.touched.comment &&
            bankStatusUpdateValidation.errors.comment ? (
              <FormFeedback type="invalid">
                {bankStatusUpdateValidation.errors.comment}
              </FormFeedback>
            ) : null}
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-success" type="submit">
              Update Status
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default BankStatusUpdateModal;
