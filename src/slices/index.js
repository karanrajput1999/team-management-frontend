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
import FormReducer from "./Form/reducer";
import ApplicationReportReducer from "./ApplicationReport/reducer";
import PendingFormsReducer from "./PendingForms/reducer";

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
  Forms: FormReducer,
  PendingForms: PendingFormsReducer,
  ApplicationReport: ApplicationReportReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
