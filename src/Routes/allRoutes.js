import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

//APi Key
import AddUsers from "../pages/AddUsers";
import Mapping from "../pages/Mapping";
import AllCenters from "../pages/AllCenters";
import BankCode from "../pages/BankCode";
import BankReport from "../pages/BankReport";
import Home from "../pages/Home";
import DailyReport from "../pages/DailyReport";
import Forms from "../pages/Forms";
import ApplicationReport from "../pages/ApplicationReport";
import PendingForms from "../pages/PendingForms";
import ReportUpload from "../pages/ReportUpload";
import AssignData from "../pages/AssignData";
import TalktimeUpload from "../pages/TalktimeUpload";
import CallHistory from "../pages/CallHistory";
import AppData from "../pages/AppData";
import FormPermissions from "../pages/FormPermissions";

const authProtectedRoutes = [
  // { path: "/users", component: <Users /> },
  { path: "/home", component: <Home /> },
  { path: "/roles", component: <Mapping /> },
  { path: "/all-centers", component: <AllCenters /> },
  { path: "/add-users", component: <AddUsers /> },
  { path: "/bank-code", component: <BankCode /> },
  { path: "/bank-report", component: <BankReport /> },
  { path: "/daily-report", component: <DailyReport /> },
  { path: "/application-report", component: <ApplicationReport /> },
  { path: "/pending-forms", component: <PendingForms /> },
  { path: "/forms", component: <Forms /> },
  { path: "/report-upload", component: <ReportUpload /> },
  { path: "/assign-data", component: <AssignData /> },
  { path: "/talktime-upload", component: <TalktimeUpload /> },
  { path: "/call-history", component: <CallHistory /> },
  { path: "/app-data", component: <AppData /> },
  { path: "/form-permissions", component: <FormPermissions /> },
  // { path: "/calendar", component: <Calendar /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/home" />,
  },
  { path: "*", component: <Navigate to="/home" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
