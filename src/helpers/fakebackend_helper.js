import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Default Login Method
// export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Login Method
export const postLogin = (data) => {
  return api.create(url.POST_LOGIN, data);
};
// *****************************************************************
// *************************** USERS *******************************
// *****************************************************************
export const getUsers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/users`);
};

export const createUser = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/user/register`, data);
};
export const removeUser = (userId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/delete`
  );
};

export const updateUser = ({ userId, values }) => {
  console.log("USER ID ->", userId, "VALUES ->", values);

  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/edit`,
    values
  );
};
// *****************************************************************
// *************************** CAMPAIGNS ***************************
// *****************************************************************
export const getCampaigns = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/campaigns`);
};

export const createCampaign = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/campaign/create`,
    data
  );
};
export const removeCampaign = (campaignId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/delete`
  );
};

export const updateCampaign = (campaignId, data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/edit`,
    data
  );
};

// *****************************************************************
// *********************** CRM CONFIGURATION ***********************
// *****************************************************************

export const getCrmConfigurationData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/crm-configuration`);
};
export const createCrmField = (campaignId, values) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/crm-field/create`,
    values
  );
};

export const updateCrmField = (campaignId, crmFieldId, values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/crm-field/${crmFieldId}/edit`,
    values
  );
};

export const removeCrmField = (campaignId, crmFieldId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/crm-field/${crmFieldId}/delete`
  );
};

// *****************************************************************
// **************************** MAPPING ****************************
// *****************************************************************

export const getMenus = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/mapping`);
};
export const getMenusByRole = (roleId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`);
};
export const getRoles = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/roles`);
};
export const changePermission = ({ menuId, subMenuId, roleId }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`,
    { menuId, subMenuId, roleId }
  );
};

export const createRole = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/role/create`, values);
};

export const updateRole = (roleId, values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/edit`,
    values
  );
};

export const removeRole = (roleId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/delete`
  );
};

// *****************************************************************
// *********************** DISPOSITION *****************************
// *****************************************************************

export const getDispositions = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/dispositions/`);
};
export const createDisposition = ({ campaignId, options, dispositionName }) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/disposition/create`, {
    campaignId,
    options,
    dispositionName,
  });
};
export const updateDisposition = ({
  campaignId,
  dispositionId,
  dispositionName,
  options,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/disposition/${dispositionId}/edit`,
    {
      dispositionName,
      options,
    }
  );
};
export const removeDisposition = ({ campaignId, dispositionId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/campaign/${campaignId}/disposition/${dispositionId}/delete`
  );
};

// *****************************************************************
// ***************************** CRM *******************************
// *****************************************************************

export const getCRMData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/crm`);
};

export const createCrmFormData = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/crm/create`, values);
};

// *****************************************************************
// ************************* MONITORING ****************************
// *****************************************************************

export const monitoringGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/monitoring`);
};

export const getMonitoringData = (selectedCampaigns) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/monitoring`, {
    campaigns: selectedCampaigns,
  });
};

// *****************************************************************
// ****************** UPDATE SESSION (ACTIVE TIME) *****************
// *****************************************************************
export const updateSession = () => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/update-session`);
};

// *****************************************************************
// ************************* LOGIN HISTORY ************************
// *****************************************************************

export const loginHistoryGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/login-activity`);
};
export const loginHistoryData = ({ campaignIds: campaigns }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/login-activity`,
    campaigns
  );
};

// *****************************************************************
// *********************** IVR CAMPAIGNS ***************************
// *****************************************************************
export const getIVRCampaigns = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/ivr-campaign`);
};

export const createIVRCampaign = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/create`,
    data
  );
};
export const removeIVRCampaign = (ivrCampaignId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/delete`
  );
};

export const updateIVRCampaign = (ivrCampaignId, data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/edit`,
    data
  );
};

// *****************************************************************
// ************************ IVR NUMBER *****************************
// *****************************************************************

export const getNumbers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/number`);
};
export const createNumber = ({ name, number, department, ivrCampaignId }) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/number/create`, {
    name,
    number,
    department,
    ivrCampaignId,
  });
};
export const updateNumber = ({
  ivrCampaignId,
  numberId,
  name,
  number,
  department,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/number/${numberId}/edit`,
    {
      name,
      number,
      department,
    }
  );
};
export const removeNumber = ({ ivrCampaignId, numberId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/number/${numberId}/delete`
  );
};

// *****************************************************************
// ************************ IVR SPEECH *****************************
// *****************************************************************

export const getSpeeches = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/speech`);
};
export const createSpeech = ({
  title,
  speechText,
  speechAudio,
  speechAudioName,
  ivrCampaignId,
}) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/speech/create`, {
    title,
    speechText,
    speechAudio,
    speechAudioName,
    ivrCampaignId,
  });
};
export const updateSpeech = ({
  ivrCampaignId,
  speechId,
  title,
  speechText,
  speechAudio,
  speechAudioName,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/speech/${speechId}/edit`,
    {
      title,
      speechText,
      speechAudio,
      speechAudioName,
    }
  );
};
export const removeSpeech = ({ ivrCampaignId, speechId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/speech/${speechId}/delete`
  );
};

// *****************************************************************
// *************************** DESIGN ******************************
// *****************************************************************

export const getDesign = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/ivr-design`);
};
export const createDesign = (
  audioText,
  ivrCampaignId,
  key,
  parentId,
  number
) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/ivr-design/create`, {
    audioText,
    ivrCampaignId,
    key,
    parentId,
    number,
  });
};
export const updateDesign = ({ designId, audioText }) => {
  console.log("FRONTEND API CALL ->", designId, audioText);
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-design/${designId}/edit`,
    {
      audioText,
    }
  );
};

export const removeDesign = ({ designId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-design/${designId}/delete`
  );
};

// *****************************************************************
// **************************** ADD LEAD ***************************
// *****************************************************************
export const getLeads = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/leads`);
};

export const createLead = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/lead/create`, data);
};

export const updateLead = (leadId, data, status) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/lead/${leadId}/edit`, {
    ...data,
    status,
  });
};

// export const removeLead = (leadId) => {
//   return api.delete(
//     `${process.env.REACT_APP_SERVER_URL}/lead/${leadId}/delete`
//   );
// };

// *****************************************************************
// ************************ PROJECT DROPDOWN ***********************
// *****************************************************************

export const createDropdown = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/dropdown/create`,
    data
  );
};

// *****************************************************************
// ***************************** INVOICE ***************************
// *****************************************************************
export const getInvoices = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/invoices`);
};

export const createInvoice = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/invoice/create`, data);
};

export const updateInvoice = (invoiceId, data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/edit`,
    data
  );
};

export const removeInvoice = (invoiceId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/delete`
  );
};
// *****************************************************************
// ***************************** PAYMENT ***************************
// *****************************************************************

export const getPayments = (invoiceId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/${invoiceId}/payments`);
};

export const createPayment = ({
  listInvoiceId: invoiceId,
  paymentAmount,
  paymentDate,
}) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/create`,
    {
      paymentAmount,
      paymentDate,
    }
  );
};

export const updatePayment = ({
  paymentAmount,
  paymentDate,
  listInvoiceId: invoiceId,
  listPaymentId: paymentId,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/${paymentId}/edit`,
    {
      paymentAmount,
      paymentDate,
    }
  );
};

export const removePayment = ({ invoiceId, paymentId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/${paymentId}/delete`
  );
};

// *****************************************************************
// ***************************** EVENTS ****************************
// *****************************************************************

export const getEvents = (leadMobileNo) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/${leadMobileNo}/events`);
};

export const createEvent = (events) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/event/create`, {
    events,
  });
};

export const updateEvent = ({ eventName, eventDate, eventId, status }) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/event/${eventId}/edit`,
    {
      eventName,
      eventDate,
      status,
    }
  );
};

export const removeEvent = (eventId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/event/${eventId}/delete`
  );
};

// *****************************************************************
// ************************** TEAMS  *******************************
// *****************************************************************
export const getTeams = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/teams`);
};

export const createTeam = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/team/create`, data);
};

export const updateTeam = (teamId, data, status) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/team/${teamId}/edit`, {
    ...data,
    status,
  });
};

// export const removeCenter = (centerId) => {
//   return api.delete(
//     `${process.env.REACT_APP_SERVER_URL}/center/${centerId}/delete`
//   );
// };

// *****************************************************************
// *********************** BANK CODE *******************************
// *****************************************************************
export const getBankCodes = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/bank-codes`);
};

export const createBankCode = (data) => {
  console.log("BANK CODE CREATE API CALL ->", data);
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/bank-code/create`,
    data
  );
};

export const updateBankCode = (bankCodeId, data, status) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/bank-code/${bankCodeId}/edit`,
    { ...data, status }
  );
};

// export const removeBankCode = (bankCodeId) => {
//   return api.delete(
//     `${process.env.REACT_APP_SERVER_URL}/bank-code/${bankCodeId}/delete`
//   );
// };

// *****************************************************************
// *********************** EMPLOYEES ****************************
// *****************************************************************
export const getEmployees = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/employees`);
};

export const createEmployee = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/employee/create`,
    data
  );
};

export const updateEmployee = ({ teamId, employeeId, status, values }) => {
  console.log(
    "EMPLOYEE UPDATE BACKEND HELPER CALLED",
    teamId,
    employeeId,
    status,
    values
  );

  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/team/${teamId}/employee/${employeeId}/edit`,
    {
      ...values,
      status,
    }
  );
};

// export const removeCenterUser = (centerId, centerUserId) => {
//   return api.delete(
//     `${process.env.REACT_APP_SERVER_URL}/center/${centerId}/center-user/${centerUserId}/delete`
//   );
// };

// *****************************************************************
// *********************** CREDIT CARD FORM ************************
// *****************************************************************
export const getCreditCardForms = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/credit-card-forms`);
};

export const createCreditCardForm = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/credit-card-form/create`,
    data
  );
};
// *****************************************************************
// ************************** LOAN FORM ****************************
// *****************************************************************
export const getLoanForms = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/loan-forms`);
};

export const createLoanForm = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/loan-form/create`,
    data
  );
};
// *****************************************************************
// ************************ INSURANCE FORM *************************
// *****************************************************************
export const getInsuranceForms = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/insurance-forms`);
};

export const createInsuranceForm = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/insurance-form/create`,
    data
  );
};
// *****************************************************************
// ********************** DEMAT ACCOUNT FORM ***********************
// *****************************************************************
export const getDematAccountForms = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/demat-account-forms`);
};

export const createDematAccountForm = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/demat-account-form/create`,
    data
  );
};

// *****************************************************************
// ****************** CREDIT CARD FORM STATUS **********************
// *****************************************************************
export const updateFormStatus = (data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/form/status-update`,
    data
  );
};

// *****************************************************************
// ********************* APPLICATION REPORT ************************
// *****************************************************************
export const getApplicationReport = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/application-report`);
};
export const filterApplicationReport = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/application-report/filter`,
    data
  );
};

// *****************************************************************
// ************************* PENDING FORMS *************************
// *****************************************************************

export const getPendingForms = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/pending-forms`);
};

export const pendingFormsFilter = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/pending-forms/filter`,
    data
  );
};
// *****************************************************************
// ************************ FORM PERMISSIONS ***********************
// *****************************************************************

export const getFormPermissions = (centerId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/form-permissions/${centerId}`
  );
};

export const getAllowedFormPermissions = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/form-permissions`);
};

export const updateFormPermissions = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/form-permissions/update`,
    data
  );
};

// *****************************************************************
// ************************ UPLOAD RAW DATA ************************
// *****************************************************************

export const uploadRawData = (values) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/upload-raw-data`,
    values,
    {
      "Content-Type": "multipart/form-data",
    }
  );
};
// *****************************************************************
// ************************ DATA CORRECTION ************************
// *****************************************************************

export const getDataCorrection = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/data-correction`);
};
export const cityDataCorrection = (values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/city`,
    values
  );
};
export const salaryDataCorrection = (values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/salary`,
    values
  );
};
export const getSalaryInLacs = () => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/salary-lacs`
  );
};
export const getSalaryInThousands = () => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/salary-thousands`
  );
};
export const getStates = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/data-correction/states`);
};
export const getCities = (stateId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/states/${stateId}/cities`
  );
};
export const getPinCodes = (cityId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/data-correction/cities/${cityId}/pin-codes`
  );
};

// *****************************************************************
// *************************** OBD DATA ****************************
// *****************************************************************

export const downloadDataForOBD = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/obd-data/download`);
};

// *****************************************************************
// *********************** DOWNLOAD DATA ***************************
// *****************************************************************

export const filterDownloadData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/download-data/filter`,
    data
  );
};
export const downloadAllData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/download-data/all-data`);
};

export const downloadStateData = (stateId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/download-data/state-data/${stateId}`
  );
};

// *****************************************************************
// ************************* REPORT UPLOAD *************************
// *****************************************************************
export const getReportUpload = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/report-upload`);
};

export const updateReportUploadStatus = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/report-upload/update-status`,
    data
  );
};
export const updateReportUploadStatusWithFile = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/report-upload/update-status/file`,
    data,
    {
      "Content-Type": "multipart/form-data",
    }
  );
};

export const filterReportUpload = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/report-upload/filter`,
    data
  );
};
export const deleteReportUpload = (bankStatusId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/report-upload/bank-status/${bankStatusId}/delete`
  );
};

// *****************************************************************
// ************************ DROPDOWN UPLOAD ************************
// *****************************************************************
export const getBankDropdown = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/dropdown/bank`);
};

// *****************************************************************
// ********************** DAILY REPORT UPLOAD **********************
// *****************************************************************

export const getDailyReportData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/daily-report-upload`);
};
export const dailyReportUpload = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/daily-report-upload`,
    data,
    {
      "Content-Type": "multipart/form-data",
    }
  );
};

// *****************************************************************
// ************************* DAILY REPORT **************************
// *****************************************************************

export const dailyReportGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/daily-report`);
};

export const filterDailyReport = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/daily-report/filter`,
    data
  );
};

// *****************************************************************
// **************************** HOME *******************************
// *****************************************************************

export const getHomeData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/home`);
};

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// Chat
// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId) =>
  api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message) =>
  api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

// MailBox
//get Mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

// delete Mail
export const deleteMail = (forId) =>
  api.delete(url.DELETE_MAIL, { headers: { forId } });

// Ecommerce
// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);

// delete Product
export const deleteProducts = (product) =>
  api.delete(url.DELETE_PRODUCT + "/" + product);

// add Products
export const addNewProduct = (product) =>
  api.create(url.ADD_NEW_PRODUCT, product);

// update Products
export const updateProduct = (product) =>
  api.update(url.UPDATE_PRODUCT + "/" + product._id, product);

// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);

// add Order
export const addNewOrder = (order) => api.create(url.ADD_NEW_ORDER, order);

// update Order
export const updateOrder = (order) =>
  api.update(url.UPDATE_ORDER + "/" + order._id, order);

// delete Order
export const deleteOrder = (order) =>
  api.delete(url.DELETE_ORDER + "/" + order);

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addNewCustomer = (customer) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer) =>
  api.update(url.UPDATE_CUSTOMER + "/" + customer._id, customer);

// delete Customers
export const deleteCustomer = (customer) =>
  api.delete(url.DELETE_CUSTOMER + "/" + customer);

// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);

// Project
// get Project list
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);

// Tasks
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = (task) => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = (task) =>
  api.update(url.UPDATE_TASK + "/" + task._id, task);

// delete Task
export const deleteTask = (task) => api.delete(url.DELETE_TASK + "/" + task);

// CRM
// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);

// add Contact
export const addNewContact = (contact) =>
  api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact) =>
  api.update(url.UPDATE_CONTACT + "/" + contact._id, contact);

// delete Contact
export const deleteContact = (contact) =>
  api.delete(url.DELETE_CONTACT + "/" + contact);

// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);

// add Companies
export const addNewCompanies = (company) =>
  api.create(url.ADD_NEW_COMPANIES, company);

// update Companies
export const updateCompanies = (company) =>
  api.update(url.UPDATE_COMPANIES + "/" + company._id, company);

// delete Companies
export const deleteCompanies = (company) =>
  api.delete(url.DELETE_COMPANIES + "/" + company);

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Leads
// export const getLeads = () => api.get(url.GET_LEADS);

// add Lead
export const addNewLead = (lead) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
// export const updateLead = (lead) =>
//   api.update(url.UPDATE_LEAD + "/" + lead._id, lead);

// delete Lead
export const deleteLead = (lead) => api.delete(url.DELETE_LEAD + "/" + lead);

// Crypto
// Transation
export const getTransationList = () => api.get(url.GET_TRANSACTION_LIST);

// Order List
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

// Invoice
//get Invoice
// export const getInvoices = () => api.get(url.GET_INVOICES);

// add Invoice
export const addNewInvoice = (invoice) =>
  api.create(url.ADD_NEW_INVOICE, invoice);

// update Invoice
// export const updateInvoice = (invoice) =>
//   api.update(url.UPDATE_INVOICE + "/" + invoice._id, invoice);

// delete Invoice
export const deleteInvoice = (invoice) =>
  api.delete(url.DELETE_INVOICE + "/" + invoice);

// Support Tickets
// Tickets
export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);

// add Tickets
export const addNewTicket = (ticket) => api.create(url.ADD_NEW_TICKET, ticket);

// update Tickets
export const updateTicket = (ticket) =>
  api.update(url.UPDATE_TICKET + "/" + ticket._id, ticket);

// delete Tickets
export const deleteTicket = (ticket) =>
  api.delete(url.DELETE_TICKET + "/" + ticket);

// Dashboard Analytics

// Sessions by Countries
export const getAllData = () => api.get(url.GET_ALL_DATA);
export const getHalfYearlyData = () => api.get(url.GET_HALFYEARLY_DATA);
export const getMonthlyData = () => api.get(url.GET_MONTHLY_DATA);

// Audiences Metrics
export const getAllAudiencesMetricsData = () =>
  api.get(url.GET_ALLAUDIENCESMETRICS_DATA);
export const getMonthlyAudiencesMetricsData = () =>
  api.get(url.GET_MONTHLYAUDIENCESMETRICS_DATA);
export const getHalfYearlyAudiencesMetricsData = () =>
  api.get(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA);
export const getYearlyAudiencesMetricsData = () =>
  api.get(url.GET_YEARLYAUDIENCESMETRICS_DATA);

// Users by Device
export const getTodayDeviceData = () => api.get(url.GET_TODAYDEVICE_DATA);
export const getLastWeekDeviceData = () => api.get(url.GET_LASTWEEKDEVICE_DATA);
export const getLastMonthDeviceData = () =>
  api.get(url.GET_LASTMONTHDEVICE_DATA);
export const getCurrentYearDeviceData = () =>
  api.get(url.GET_CURRENTYEARDEVICE_DATA);

// Audiences Sessions by Country
export const getTodaySessionData = () => api.get(url.GET_TODAYSESSION_DATA);
export const getLastWeekSessionData = () =>
  api.get(url.GET_LASTWEEKSESSION_DATA);
export const getLastMonthSessionData = () =>
  api.get(url.GET_LASTMONTHSESSION_DATA);
export const getCurrentYearSessionData = () =>
  api.get(url.GET_CURRENTYEARSESSION_DATA);

// Dashboard CRM

// Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () =>
  api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () =>
  api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () =>
  api.get(url.GET_CURRENTYEARBALANCE_DATA);

// Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () =>
  api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);

// Dashboard Crypto
// Portfolio
export const getBtcPortfolioData = () => api.get(url.GET_BTCPORTFOLIO_DATA);
export const getUsdPortfolioData = () => api.get(url.GET_USDPORTFOLIO_DATA);
export const getEuroPortfolioData = () => api.get(url.GET_EUROPORTFOLIO_DATA);

// Market Graph
export const getAllMarketData = () => api.get(url.GET_ALLMARKETDATA_DATA);
export const getYearMarketData = () => api.get(url.GET_YEARMARKET_DATA);
export const getMonthMarketData = () => api.get(url.GET_MONTHMARKET_DATA);
export const getWeekMarketData = () => api.get(url.GET_WEEKMARKET_DATA);
export const getHourMarketData = () => api.get(url.GET_HOURMARKET_DATA);

// Dashboard Project
// Project Overview
export const getAllProjectData = () => api.get(url.GET_ALLPROJECT_DATA);
export const getMonthProjectData = () => api.get(url.GET_MONTHPROJECT_DATA);
export const gethalfYearProjectData = () =>
  api.get(url.GET_HALFYEARPROJECT_DATA);
export const getYearProjectData = () => api.get(url.GET_YEARPROJECT_DATA);

// Project Status
export const getAllProjectStatusData = () =>
  api.get(url.GET_ALLPROJECTSTATUS_DATA);
export const getWeekProjectStatusData = () =>
  api.get(url.GET_WEEKPROJECTSTATUS_DATA);
export const getMonthProjectStatusData = () =>
  api.get(url.GET_MONTHPROJECTSTATUS_DATA);
export const getQuarterProjectStatusData = () =>
  api.get(url.GET_QUARTERPROJECTSTATUS_DATA);

// Dashboard NFT
// Marketplace
export const getAllMarketplaceData = () => api.get(url.GET_ALLMARKETPLACE_DATA);
export const getMonthMarketplaceData = () =>
  api.get(url.GET_MONTHMARKETPLACE_DATA);
export const gethalfYearMarketplaceData = () =>
  api.get(url.GET_HALFYEARMARKETPLACE_DATA);
export const getYearMarketplaceData = () =>
  api.get(url.GET_YEARMARKETPLACE_DATA);

// Project
export const addProjectList = (project) =>
  api.create(url.ADD_NEW_PROJECT, project);
export const updateProjectList = (project) =>
  api.put(url.UPDATE_PROJECT, project);
export const deleteProjectList = (project) =>
  api.delete(url.DELETE_PROJECT, { headers: { project } });

// Pages > Team
export const getTeamData = (team) => api.get(url.GET_TEAMDATA, team);
export const deleteTeamData = (team) =>
  api.delete(url.DELETE_TEAMDATA, { headers: { team } });
export const addTeamData = (team) => api.create(url.ADD_NEW_TEAMDATA, team);
export const updateTeamData = (team) => api.put(url.UPDATE_TEAMDATA, team);

// File Manager

// Folder
export const getFolders = (folder) => api.get(url.GET_FOLDERS, folder);
export const deleteFolder = (folder) =>
  api.delete(url.DELETE_FOLDER, { headers: { folder } });
export const addNewFolder = (folder) => api.create(url.ADD_NEW_FOLDER, folder);
export const updateFolder = (folder) => api.put(url.UPDATE_FOLDER, folder);

// File
export const getFiles = (file) => api.get(url.GET_FILES, file);
export const deleteFile = (file) =>
  api.delete(url.DELETE_FILE, { headers: { file } });
export const addNewFile = (file) => api.create(url.ADD_NEW_FILE, file);
export const updateFile = (file) => api.put(url.UPDATE_FILE, file);

// To Do
export const getTodos = (todo) => api.get(url.GET_TODOS, todo);
export const deleteTodo = (todo) =>
  api.delete(url.DELETE_TODO, { headers: { todo } });
export const addNewTodo = (todo) => api.create(url.ADD_NEW_TODO, todo);
export const updateTodo = (todo) => api.put(url.UPDATE_TODO, todo);

// To do Project
export const getProjects = (project) => api.get(url.GET_PROJECTS, project);
export const addNewProject = (project) =>
  api.create(url.ADD_NEW_TODO_PROJECT, project);

//Job Application
export const getJobApplicationList = () => api.get(url.GET_APPLICATION_LIST);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);

// Kanban Board
export const getTasks = () => api.get(url.GET_TASKS);
export const addNewTasks = (card) => api.create(url.ADD_TASKS, card);
export const updateTasks = (card) => api.put(url.UPDATE_TASKS, card);
export const deleteTasks = (card) =>
  api.delete(url.DELETE_TASKS, { headers: { card } });
