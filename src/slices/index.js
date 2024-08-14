import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import MappingReducer from "./Mapping/reducer";
import ReportReducer from "./Report/reducer";
import CenterReducer from "./Centers/reducer";
import BankCodeReducer from "./BankCode/reducer";
import AddUsersReducer from "./AddUsers/reducer";
import CreditCardFormReducer from "./CreditCardForm/reducer";
import LoanFormReducer from "./LoanForm/reducer";
import ApplicationReportReducer from "./ApplicationReport/reducer";
import PendingFormsReducer from "./PendingForms/reducer";
import InsuranceFormsReducer from "./InsuranceForm/reducer";
import DematAccountFormsReducer from "./DematAccountForm/reducer";
import FormPermissionsReducer from "./FormPermissions/reducer";
import UploadRawDataReducer from "./UploadRawData/reducer";
import DataCorrectionReducer from "./DataCorrection/reducer";
import DownloadDataReducer from "./DownloadData/reducer";
import ReportUploadReducer from "./ReportUpload/reducer";
import DailyReportUploadReducer from "./DailyReportUpload/reducer";
import DailyReportReducer from "./DailyReport/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Report: ReportReducer,
  Centers: CenterReducer,
  BankCodes: BankCodeReducer,
  AddUsers: AddUsersReducer,
  CreditCardForms: CreditCardFormReducer,
  LoanForms: LoanFormReducer,
  PendingForms: PendingFormsReducer,
  InsuranceForms: InsuranceFormsReducer,
  DematAccountForms: DematAccountFormsReducer,
  ApplicationReport: ApplicationReportReducer,
  FormPermissions: FormPermissionsReducer,
  UploadRawData: UploadRawDataReducer,
  DataCorrection: DataCorrectionReducer,
  DownloadData: DownloadDataReducer,
  ReportUpload: ReportUploadReducer,
  DailyReport: DailyReportReducer,
  DailyReportUpload: DailyReportUploadReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
