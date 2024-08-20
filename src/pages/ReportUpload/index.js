import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { getCenters } from "../../slices/Centers/thunk";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import {
  getApplicatinReport,
  filterApplicationReport,
} from "../../slices/ApplicationReport/thunk";
import {
  getReportUpload,
  filterReportUpload,
  updateReportUploadStatus,
  updateReportUploadStatusWithFile,
  deleteReportUpload,
} from "../../slices/ReportUpload/thunk";
import moment from "moment-timezone";
import ReportFormModal from "./ReportUploadModal";
import BankStatusUpdateModal from "./BankStatusUpdateModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import BankStatusRemoveModal from "./BankStatusRemoveModal";
import BankStatusCommentModal from "./BankStatusCommentModal";
import { getBankDropdown } from "../../helpers/fakebackend_helper";

const ReportUpload = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [modal_comment, setmodal_comment] = useState(false);

  const [selectedForm, setSelectedForm] = useState(null);

  const [status_modal_list, setstatus_modal_list] = useState(false);

  const [selectedSingleBankStatus, setSelectedSingleBankStatus] =
    useState(null);

  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);

  const [selectedSingleDateType, setSelectedSingleDateType] = useState(null);

  const [selectedSingleBank, setSelectedSingleBank] = useState(null);

  const [selectedSingleFormType, setSelectedSingleFormType] = useState(null);

  const [selectedBankStatus, setSelectedBankStatus] = useState(null);

  const [bankDropdowns, setBankDropdowns] = useState(null);

  const [file, setFile] = useState([]);

  const [filters, setFilters] = useState({
    center: "",
    dateRange: "",
    selfStatus: "",
    formType: "",
  });

  const dispatch = useDispatch();

  const { centers } = useSelector((state) => state.Centers);

  const { reportUploads, filteredReportUploads } = useSelector(
    (state) => state.ReportUpload
  );

  useEffect(() => {
    getBankDropdown().then((res) => {
      setBankDropdowns(res.data.bankDropdowns);
    });
  }, []);

  useEffect(() => {
    dispatch(getCenters());
    dispatch(getApplicatinReport());
    dispatch(getReportUpload());
  }, [dispatch]);

  function tog_list() {
    setmodal_list(!modal_list);
  }
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function status_tog_list() {
    setstatus_modal_list(!status_modal_list);
  }

  function tog_comment() {
    setmodal_comment(!modal_comment);
  }

  function handleDeleteStatus() {
    dispatch(deleteReportUpload(selectedBankStatus)).then((res) => {
      const deletedBankStatus = res.payload?.data?.deletedBankStatus;
      const updatedBankStatusList = selectedForm.previousBankStatuses.filter(
        (bankStatus) => bankStatus.id !== deletedBankStatus.id
      );

      setSelectedForm({
        ...selectedForm,
        previousBankStatuses: updatedBankStatusList,
      });
    });
    setmodal_delete(false);
  }

  function handleSelectSingleBankStatus(bankStatus) {
    setSelectedSingleBankStatus(bankStatus);
  }

  function handleSelectSingleCenter(centerName) {
    setSelectedSingleCenterName(centerName);
  }

  function handleSelectSingleDateType(dateType) {
    setSelectedSingleDateType(dateType);
  }

  function handleSelectSingleBank(bank) {
    setSelectedSingleBank(bank);
  }

  function handleSelectSingleFormType(formType) {
    setSelectedSingleFormType(formType);
  }

  function handleFilters() {
    dispatch(filterApplicationReport({ filters }));
  }

  let CenterOptions = centers?.map((center) => {
    return { value: center.centerName, label: center.centerName };
  });

  const dateTypeOptions = [
    {
      value: "By Decision Date",
      label: "By Decision Date",
    },
    {
      value: "By Punching Date",
      label: "By Punching Date",
    },
  ];

  // const bankOptions = [
  //   {
  //     value: "AU Bank",
  //     label: "AU Bank",
  //   },
  //   {
  //     value: "ICICI Bank",
  //     label: "ICICI Bank",
  //   },
  //   {
  //     value: "HDFC Bank",
  //     label: "HDFC Bank",
  //   },
  //   {
  //     value: "Axis Bank",
  //     label: "Axis Bank",
  //   },
  // ];

  const bankOptions = bankDropdowns?.map((bank) => {
    return { value: bank.name, label: bank.name, id: bank.id };
  });

  const formTypeOptions = [
    {
      value: "Credit Card",
      label: "Credit Card",
    },
    {
      value: "Loan",
      label: "Loan",
    },
    {
      value: "Insurance",
      label: "Insurance",
    },
    {
      value: "Demat Account",
      label: "Demat Account",
    },
  ];

  const bankStatusOptions = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
      value: "Declined",
      label: "Declined",
    },
    {
      value: "Add Comment",
      label: "Add Comment",
    },
  ];

  const bankStatusUpdateValidation = useFormik({
    initialValues: {
      bankStatus: "",
      comment: "",
    },
    validationSchema: Yup.object({
      bankStatus: Yup.string().required("Please select bank status"),
      comment: Yup.string().required("Please enter comment"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updateReportUploadStatus({
          formId: selectedForm.formId,
          formType: selectedForm.formType,
          bankId: selectedForm.bankId,
          applicationNo: selectedForm.applicationNo,
          ...values,
        })
      );

      setSelectedSingleBankStatus(null);
      resetForm();
    },
  });

  function bankStatusFormHandleSubmit(e) {
    e.preventDefault();

    bankStatusUpdateValidation.handleSubmit();

    setstatus_modal_list(false);
    return false;
  }

  const bankStatusUpdateWitFileValidation = useFormik({
    initialValues: {
      bankName: "",
      bankId: "",
    },
    validationSchema: Yup.object({
      bankName: Yup.string().required("Please select bank name"),
      bankId: Yup.string().required("Please select bank"),
    }),
    onSubmit: (values) => {
      dispatch(
        updateReportUploadStatusWithFile({ ...values, data: file.file })
      );
    },
  });

  function bankStatusUpdateWitFileHandleSubmit(e) {
    e.preventDefault();

    if (file?.file) {
      bankStatusUpdateWitFileValidation.handleSubmit();
    }

    setmodal_list(false);
    return false;
  }

  // function handleEditStatus(form) {
  //   const bankStatus = bankStatusOptions.find(
  //     (el) => el.value === form.bankStatus
  //   );

  //   bankStatusUpdateValidation.setFieldValue("comment", form.comment);
  //   bankStatusUpdateValidation.setFieldValue("bankStatus", bankStatus.value);
  //   handleSelectSingleBankStatus(bankStatus);
  // }

  function handleDelete(statusId) {
    setSelectedBankStatus(statusId);
    tog_delete();
  }

  document.title = "Report Upload";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report Upload" pageTitle="Uploads" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report Upload</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            placeholder="Search Name, Mob No, Pan No"
                            onChange={(e) => {
                              dispatch(
                                filterReportUpload({
                                  searchQuery: e.target.value,
                                })
                              );
                            }}
                            style={{ width: "280px" }}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>

                      <Col>
                        <div
                          className="d-flex"
                          style={{ gap: "10px", flexWrap: "wrap" }}
                        >
                          <div className="d-flex">
                            <Flatpickr
                              className="form-control border dash-filter-picker"
                              placeholder="Date Range"
                              options={{
                                mode: "range",
                                dateFormat: "d M, Y",
                              }}
                              onChange={(date) => {
                                setFilters({ ...filters, dateRange: date });
                              }}
                            />
                          </div>

                          <div>
                            <Select
                              id="dateType"
                              name="dateType"
                              value={selectedSingleDateType}
                              onChange={(dateType) => {
                                handleSelectSingleDateType(dateType);
                              }}
                              options={dateTypeOptions}
                              placeholder="Date Type"
                            />
                          </div>
                          <div>
                            <Select
                              id="centerName"
                              name="centerName"
                              value={selectedSingleCenterName}
                              onChange={(centerName) => {
                                handleSelectSingleCenter(centerName);

                                setFilters({
                                  ...filters,
                                  center: centerName.value,
                                });
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...CenterOptions,
                              ]}
                              placeholder="Choose Center"
                            />
                          </div>
                          <div>
                            <Select
                              id="formType"
                              name="formType"
                              value={selectedSingleFormType}
                              onChange={(formType) => {
                                handleSelectSingleFormType(formType);

                                setFilters({
                                  ...filters,
                                  formType: formType.value,
                                });
                              }}
                              options={[
                                { value: "", label: "Choose All" },
                                ...formTypeOptions,
                              ]}
                              placeholder="Choose Form Type"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light"
                            onClick={handleFilters}
                          >
                            <i className="ri-equalizer-fill label-icon align-middle fs-16 me-2"></i>
                            Apply Filters
                          </button>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light"
                          onClick={tog_list}
                        >
                          <i
                            className="ri-file-upload-line"
                            style={{ marginRight: "5px" }}
                          ></i>
                          Upload Report
                        </button>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th data-sort="s-no">S.No</th>
                            <th data-sort="application_no">Application No</th>
                            <th data-sort="customer_name">Customer Name</th>
                            <th data-sort="phone">Phone</th>
                            <th data-sort="pan_card">Pan Card</th>
                            <th data-sort="client_of">Form Type</th>
                            <th data-sort="client_of">Bank Name</th>
                            <th data-sort="client_of">Client of</th>
                            <th data-sort="status_2">Bank Status</th>
                            <th data-sort="status_2">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(filteredReportUploads?.length !== 0
                            ? filteredReportUploads
                            : reportUploads
                          )?.map((reportUpload, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {reportUpload?.applicationNo ? (
                                  reportUpload?.applicationNo
                                ) : (
                                  <span className="text-muted">
                                    {" "}
                                    ---Not Generated---{" "}
                                  </span>
                                )}
                              </td>
                              <td>{reportUpload?.fullName}</td>
                              <td>{reportUpload?.mobileNo}</td>
                              <td>{reportUpload?.panNo}</td>
                              <td>
                                <span
                                  className={`badge border ${
                                    reportUpload?.formType === "Credit Card"
                                      ? "border-success text-success"
                                      : reportUpload?.formType === "Loan"
                                      ? "border-primary text-primary"
                                      : reportUpload?.formType === "Insurance"
                                      ? "border-warning text-warning"
                                      : reportUpload?.formType ===
                                        "Demat Account"
                                      ? "border-danger text-danger"
                                      : ""
                                  } fs-12`}
                                >
                                  {reportUpload?.formType}
                                </span>
                              </td>
                              <td>
                                {reportUpload.bankName
                                  ? reportUpload.bankName
                                  : "-----"}
                              </td>
                              <td>
                                {Object.keys(reportUpload?.user).length !==
                                  0 && (
                                  <div>
                                    <div>
                                      <span
                                        className="fs-13"
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {reportUpload?.user?.centerName}
                                      </span>
                                      <span> By </span>
                                      <span
                                        className="fs-13"
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        {reportUpload?.user?.name}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="fs-13">
                                        {" "}
                                        On{" "}
                                        {moment
                                          .utc(reportUpload?.createdAt)
                                          .tz("Asia/Kolkata")
                                          .format("DD MMM, YY")}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td>
                                {reportUpload.previousBankStatuses?.length !==
                                  0 && (
                                  <div className="d-flex align-items-center gap-2">
                                    <span
                                      className={`badge ${
                                        reportUpload.previousBankStatuses[
                                          reportUpload.previousBankStatuses
                                            ?.length - 1
                                        ].bankStatus === "Approved" &&
                                        "bg-success-subtle text-success"
                                      }
                                      ${
                                        reportUpload.previousBankStatuses[
                                          reportUpload.previousBankStatuses
                                            .length - 1
                                        ].bankStatus === "Declined" &&
                                        "bg-danger-subtle text-danger"
                                      }
                                      ${
                                        reportUpload.previousBankStatuses[
                                          reportUpload.previousBankStatuses
                                            .length - 1
                                        ].bankStatus === "Add Comment" &&
                                        "bg-primary-subtle text-primary"
                                      }
                                      `}
                                    >
                                      {
                                        reportUpload.previousBankStatuses[
                                          reportUpload.previousBankStatuses
                                            .length - 1
                                        ].bankStatus
                                      }
                                    </span>
                                  </div>
                                )}
                              </td>

                              <td>
                                {reportUpload.previousBankStatuses.length !==
                                0 ? (
                                  <div className="d-flex align-items-center gap-2">
                                    <button
                                      className="btn btn-sm btn-soft-primary edit-list"
                                      onClick={() => {
                                        status_tog_list();
                                        setSelectedForm(reportUpload);
                                      }}
                                    >
                                      <i className="ri-add-fill align-bottom"></i>
                                    </button>

                                    <button
                                      className="btn btn-sm btn-soft-secondary"
                                      onClick={() => {
                                        tog_comment();
                                        setSelectedForm(reportUpload);
                                      }}
                                    >
                                      <i className="ri-eye-fill align-bottom"></i>
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary waves-effect waves-light"
                                    onClick={() => {
                                      status_tog_list();
                                      setSelectedForm(reportUpload);
                                    }}
                                  >
                                    Add Bank Status
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
      <ReportFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        selectedSingleBank={selectedSingleBank}
        handleSelectSingleBank={handleSelectSingleBank}
        bankOptions={bankOptions}
        file={file}
        setFile={setFile}
        bankStatusUpdateWitFileHandleSubmit={
          bankStatusUpdateWitFileHandleSubmit
        }
        bankStatusUpdateWitFileValidation={bankStatusUpdateWitFileValidation}
      />
      <BankStatusUpdateModal
        status_modal_list={status_modal_list}
        status_tog_list={status_tog_list}
        selectedSingleBankStatus={selectedSingleBankStatus}
        handleSelectSingleBankStatus={handleSelectSingleBankStatus}
        bankStatusOptions={bankStatusOptions}
        bankStatusUpdateValidation={bankStatusUpdateValidation}
        bankStatusFormHandleSubmit={bankStatusFormHandleSubmit}
      />

      <BankStatusRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteStatus={handleDeleteStatus}
      />
      <BankStatusCommentModal
        modal_comment={modal_comment}
        setmodal_comment={setmodal_comment}
        form={selectedForm}
        handleDelete={handleDelete}
      />
    </React.Fragment>
  );
};

export default ReportUpload;
