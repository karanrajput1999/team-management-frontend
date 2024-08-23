import React from "react";

const FormRow = () => {
  return (
    <>
      <tr>
        <td className="id">1</td>
        <td className="name">someone</td>
        <td className="mobileNo">9879847644</td>
        <td className="mobileNo">Mogambo</td>
        <td className="applicationNo">--Not Generated--</td>
        <td className="status">
          <span className="badge bg-primary-subtle text-primary">Approved</span>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary edit-item-btn"
            data-bs-toggle="modal"
            data-bs-target="#showModal"
          >
            Edit
          </button>
        </td>
      </tr>
      <tr>
        <td className="id">1</td>
        <td className="name">someone</td>
        <td className="mobileNo">9879847644</td>
        <td className="mobileNo">Bheem</td>
        <td className="applicationNo">--Not Generated--</td>
        <td className="status">
          <span className="badge bg-success-subtle text-success">
            VKYC Done
          </span>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary edit-item-btn"
            data-bs-toggle="modal"
            data-bs-target="#showModal"
          >
            Edit
          </button>
        </td>
      </tr>
    </>
  );
};

export default FormRow;
