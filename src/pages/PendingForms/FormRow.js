import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import Select from "react-select";
import { StatusOptions } from "../../common/data/pendingForms";
import moment from "moment/moment";

const FormRow = ({ form, onUpdate }) => {
  const [applicationNo, setApplicationNo] = useState("");

  const [formStatus, setFormStatus] = useState(form.formStatus || "");

  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  useEffect(() => {
    const defaultStatus = StatusOptions.find(
      (option) => option.value === form.formStatus
    );
    setSelectedSingleStatus(defaultStatus || null);
  }, [form.formStatus]);

  function handleSelectSingleStatus(status) {
    setSelectedSingleStatus(status);
    setFormStatus(status.value);
  }

  function formHandleSubmit(e) {
    e.preventDefault();

    if (selectedSingleStatus?.value === "VKYC Done" && !applicationNo) {
      return;
    }

    onUpdate(form.id, applicationNo, formStatus, form.formType);

    setApplicationNo("");
    setSelectedSingleStatus(null);
    setFormStatus("");
  }

  // we do not need time only needed date
  const [formattedDate, formattedTime] = new Date(form?.createdAt)
    .toLocaleString()
    .split(",");

  // Split the formatted date to add the leading zero if necessary
  const [month, day, year] = formattedDate?.split("/");

  const formattedDateWithZeroPadding = `${day?.padStart(
    2,
    "0"
  )}/${month?.padStart(2, "0")}/${year}`;

  const now = moment();
  const daysDifference = now.diff(form.createdAt, "days");

  return (
    <tr style={daysDifference > 7 ? { backgroundColor: "#FCE3DE" } : {}}>
      <td className="id">{form.id}</td>
      <td className="name">{form.fullName}</td>
      <td className="punch_date">{formattedDateWithZeroPadding}</td>
      <td className="number">{form.mobileNo}</td>
      <td className="panNumber">{form.panNo}</td>
      <td className="bank">{form.bankName ? form.bankName : "-----"}</td>
      <td className="formType">
        <span className="badge border border-primary text-primary fs-12">
          {form.formType}
        </span>
      </td>
      <td>
        <form onSubmit={formHandleSubmit}>
          <div className="tools d-flex" style={{ gap: "10px" }}>
            <Input
              type="text"
              placeholder="Application number"
              style={{ width: "auto" }}
              value={applicationNo}
              onChange={(e) => setApplicationNo(e.target.value)}
            />
            <Select
              id="formStatus"
              name="formStatus"
              value={selectedSingleStatus}
              onChange={handleSelectSingleStatus}
              options={StatusOptions}
              placeholder="Choose Card Status"
              style={{ width: "150px" }}
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default FormRow;
