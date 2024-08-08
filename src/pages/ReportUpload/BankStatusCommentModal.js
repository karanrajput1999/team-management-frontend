import { Button, Modal, ModalBody } from "reactstrap";

function BankStatusCommentModal({
  modal_comment,
  setmodal_comment,
  form,
  handleDelete,
}) {
  return (
    <Modal
      isOpen={modal_comment}
      toggle={() => {
        setmodal_comment(!modal_comment);
      }}
      className="modal zoomIn mt-0 mb-0"
      id="deleteRecordModal"
      centered
    >
      <div className="modal-header p-2">
        <Button
          type="button"
          onClick={() => setmodal_comment(false)}
          className="btn-close"
          aria-label="Close"
        ></Button>
      </div>
      <ModalBody>
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#25a0e2,secondary:#00bd9d"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="fs-15 ">
            <div className="d-flex justify-content-left">
              <h4>Status History</h4>
            </div>

            <div className="table-responsive mt-2">
              <table className="table table-bordered table-nowrap align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {form?.previousBankStatuses.length !== 0 &&
                    form?.previousBankStatuses.map((status, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <span
                            className={`badge ${
                              status?.bankStatus === "Approved" &&
                              "bg-success-subtle text-success"
                            }
                    ${
                      status?.bankStatus === "Declined" &&
                      "bg-danger-subtle text-danger"
                    }
                    ${
                      status?.bankStatus === "Add Comment" &&
                      "bg-primary-subtle text-primary"
                    }
                    `}
                          >
                            {status?.bankStatus}
                          </span>
                        </td>
                        <td
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {status?.comment}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-soft-danger remove-list"
                            onClick={() => {
                              handleDelete(status.id);
                            }}
                          >
                            <i className="ri-delete-bin-5-fill align-bottom" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-ghost"
            onClick={() => setmodal_comment(false)}
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default BankStatusCommentModal;
