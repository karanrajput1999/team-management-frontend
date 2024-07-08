import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import AddBankCodeModal from "./AddBankCodeModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import BankCodeRemoveModal from "./BankCodeRemoveModal";
import { getCenters } from "../../slices/Centers/thunk";
import {
  getBankCodes,
  createBankCode,
  removeBankCode,
  updateBankCode,
} from "../../slices/BankCode/thunk";
import { searchBankCodes } from "../../slices/BankCode/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BankCode = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  // const [isEditingCenter, setIsEditingCenter] = useState(false);

  const [isEditingBankCode, setIsEditingBankCode] = useState(false);

  // const [listCenterId, setListCenterId] = useState(null);

  const [listBankCodeId, setListBankCodeId] = useState(null);

  const dispatch = useDispatch();

  const { bankCodes, filteredBankCodes } = useSelector(
    (state) => state.BankCodes
  );
  const { centers } = useSelector((state) => state.Centers);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    dispatch(getBankCodes());
    dispatch(getCenters());
  }, [dispatch]);

  function handleSearchCenter(e) {
    dispatch(searchBankCodes(e.target.value));
  }

  const validation = useFormik({
    initialValues: {
      centerName: "",
      bankName: "",
      userNameCode: "",
      password: "",
    },
    validationSchema: Yup.object({
      centerName: Yup.string().required("Please enter center name"),
      bankName: Yup.string().required("Please enter bank name"),
      userNameCode: Yup.string().required("Please enter user name / code"),
      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: (values) => {
      isEditingBankCode
        ? dispatch(updateBankCode({ values, bankCodeId: listBankCodeId }))
        : dispatch(createBankCode(values));
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    setmodal_list(false);
    return false;
  }

  //   function handleEditUser(userData) {
  function handleEditBankCode(bankCodeData) {
    setIsEditingBankCode(true);
    setmodal_list(!modal_list);
    setListBankCodeId(bankCodeData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    validation.setValues({
      centerName: bankCodeData.centerName,
      bankName: bankCodeData.bankName,
      userNameCode: bankCodeData.userNameCode,
      password: bankCodeData.password,
    });
  }

  const bankCodeData = [
    {
      id: 1,
      centerName: "Credit Rupay",
      bankName: "Indusind Bank	",
      userNameCode: "ASEND1",
      password: "123456",
      userStatus: "2022-12-20 19:36:09",
    },
    {
      id: 2,
      centerName: "Credit Rupay",
      bankName: "Yes Bank",
      userNameCode: "ABDS07",
      password: "123123",
      userStatus: "2022-12-20 19:37:33",
    },
  ];

  document.title = "Bank Code";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Bank Code" pageTitle="Centers" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create Bank Code</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            onChange={handleSearchCenter}
                            placeholder="Search Bank Code"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Bank Code
                        </Button>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>S.NO</th>
                            <th>Center Name</th>
                            <th>Bank Name</th>
                            <th>User Name/Code</th>

                            <th>Password</th>

                            {/* <th  data-sort="user_status">
                              User Status
                            </th> */}

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {(filteredBankCodes.length > 0
                            ? filteredBankCodes
                            : bankCodes
                          )?.map((bankCode) => (
                            <tr key={bankCode?.id}>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {bankCode?.id}
                                </Link>
                              </td>
                              <td className="center_name">
                                {bankCode?.centerName}
                              </td>
                              <td className="owner_name">
                                {bankCode?.bankName}
                              </td>
                              <td className="phone_number">
                                {bankCode?.userNameCode}
                              </td>
                              <td className="password">{bankCode?.password}</td>
                              {/* <td className="userStatus">
                                {bankCode?.userStatus}
                              </td> */}

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditBankCode(bankCode);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListBankCodeId(bankCode.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
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
      </div>
      <ToastContainer />

      <AddBankCodeModal
        centers={centers}
        validation={validation}
        isEditingBankCode={isEditingBankCode}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
      />

      <BankCodeRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        tog_delete={tog_delete}
        handleDeleteCenter={() => {
          // dispatch(removeBankCode({ bankCodeId: listBankCodeId }));
          dispatch(updateBankCode({ bankCodeId: listBankCodeId, status: 0 }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default BankCode;
