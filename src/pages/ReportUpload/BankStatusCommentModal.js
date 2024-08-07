import { Button, Modal, ModalBody } from "reactstrap";

function BankStatusCommentModal({ modal_comment, setmodal_comment, comment }) {
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
            <h4>Comment</h4>
            <p className="mx-4 mb-0">{comment}</p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            onClick={() => setmodal_delete(false)}
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default BankStatusCommentModal;
