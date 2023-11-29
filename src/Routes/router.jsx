import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AllContest from "../Pages/AllContest/AllContest";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import ManageContest from "../Pages/Dashboard/ManageContest/ManageContest";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyParticipated from "../Pages/Dashboard/myParticipated/myParticipated";
import MyWining from "../Pages/Dashboard/MyWining/MyWining";
import AdminRoute from "./AdminRoute";
import AddContest from "../Pages/Dashboard/AddContest/AddContest";
import CreatorRoute from "./CreatorRoute";
import MyContest from "../Pages/Dashboard/MyContest/MyContest";
import UpdateMyContest from "../Pages/Dashboard/UpdateMyContest/UpdateMyContest";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Submission from "../Pages/Dashboard/Submission/Submission";
import ContestSubmit from "../Pages/Dashboard/ContestSubmit/ContestSubmit";
import SubmissionDetails from "../Pages/Dashboard/SubmissionDetails/SubmissionDetails";
import DashboardPage from "../Pages/Dashboard/DashboardPage/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "contests",
        element: <AllContest></AllContest>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",

    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //   admin routes
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "manageContest",
        element: (
          <AdminRoute>
            <ManageContest></ManageContest>
          </AdminRoute>
        ),
      },
      // creator/editor  routes
      {
        path: "addContest",
        element: (
          <CreatorRoute>
            <AddContest></AddContest>
          </CreatorRoute>
        ),
      },
      {
        path: "myContest",
        element: (
          <CreatorRoute>
            <MyContest></MyContest>
          </CreatorRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <CreatorRoute>
            <UpdateMyContest></UpdateMyContest>
          </CreatorRoute>
        ),
      },
      {
        path: "contestSubmit",
        element: (
          <CreatorRoute>
            <ContestSubmit></ContestSubmit>
          </CreatorRoute>
        ),
      },
      {
        path: "submissionDetails/:id",
        element: (
          <CreatorRoute>
            <SubmissionDetails></SubmissionDetails>
          </CreatorRoute>
        ),
      },
      //   user routes
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "myParticipated",
        element: <MyParticipated></MyParticipated>,
      },
      {
        path: "myWining",
        element: <MyWining></MyWining>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "submisson/:id",
        element: (
          <PrivateRoute>
            <Submission></Submission>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
