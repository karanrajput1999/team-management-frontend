import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import Select from "react-select";
import { StatusOptions } from "../../common/data/pendingForms";

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
    onUpdate(form.id, applicationNo, formStatus);
  }

  return (
    <tr key={form.id}>
      <td className="id">{form.id}</td>
      <td className="name">{form.fullName}</td>
      <td className="punch_date">2023/01/08</td>
      <td className="number">{form.mobileNo}</td>
      <td className="panNumber">{form.panNo}</td>
      <td className="bank">{form.bankName}</td>
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
