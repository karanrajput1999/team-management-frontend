import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Link } from "react-router-dom";
import avatar from "./user-icon.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getHomeData } from "../../slices/Home/thunk";
import { getLoggedinUser } from "../../helpers/api_helper";

const Home = () => {
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();

  const { data } = getLoggedinUser();

  const { teamMembers, teams, employee } = useSelector((state) => state.Home);

  useEffect(() => {
    axios
      .post("https://indiagolive.in/api/blackboard.php", {
        "api-key": "QMYV4JPBPJ19033",
      })
      .then((res) => {
        setFormData(res.data);
        console.log("FORM DATA ->", res.data);
      });
  }, []);

  useEffect(() => {
    dispatch(getHomeData());
  }, []);

  const memberObjects = teamMembers?.map((member) => ({
    name: member.employeeName,
    email: member.email,
    vkyc: 0,
    approved: 0,
  }));

  formData?.forEach((item2) => {
    memberObjects?.forEach((item1) => {
      if (item1.email === item2.emailid.toLowerCase()) {
        if (item2.app_status1 === "VKYC Done") {
          item1.vkyc += 1;
        } else if (item2.app_status1 === null) {
          item1.approved += 1;
        }
      }
    });
  });

  const teamObjects = teams?.map((team) => ({
    teamName: team.teamName,
    email: team.email,
    vkyc: 0,
    approved: 0,
    employees: team.employees,
  }));

  teamObjects?.forEach((team) => {
    team.employees?.forEach((employee) => {
      formData?.forEach((data) => {
        if (data.emailid.toLowerCase() === employee.email) {
          if (data.app_status1 === "VKYC Done") {
            team.vkyc += 1;
          } else if (data.app_status1 === null) {
            team.approved += 1;
          }
        }
      });
    });
  });

  let VKYCDoneData;
  let ApprovedData;

  if (data.roleId === 1) {
    VKYCDoneData = formData?.filter((data) => {
      return data.app_status1 == "VKYC Done";
    });

    ApprovedData = formData?.filter((data) => {
      return data.app_status1 !== "VKYC Done";
    });
  } else if (data.roleId === 2) {
    VKYCDoneData = memberObjects?.reduce((acc, curr) => {
      if (curr.vkyc) {
        acc += curr.vkyc;
      }

      return acc;
    }, 0);

    ApprovedData = memberObjects?.reduce((acc, curr) => {
      if (curr.approved) {
        acc += curr.approved;
      }

      return acc;
    }, 0);
  } else if (data.roleId === 3) {
    VKYCDoneData = formData?.reduce((acc, curr) => {
      if (curr.emailid.toLowerCase() === data.email) {
        if (curr.app_status1 === "VKYC Done") {
          acc += 1;
        }
      }

      return acc;
    }, 0);
    ApprovedData = formData?.reduce((acc, curr) => {
      if (curr.emailid.toLowerCase() === data.email) {
        if (curr.app_status1 === null) {
          acc += 1;
        }
      }

      return acc;
    }, 0);

    console.log("VKYC DONE FOR EMPLOYEE ->", VKYCDoneData);
    console.log("APPROVED FOR EMPLOYEE ->", ApprovedData);
  }

  document.title = "Home";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Home" pageTitle="Dashboard" />
          <Row>
            <Col xs={12}>
              <Widgets
                VKYCDoneData={VKYCDoneData}
                ApprovedData={ApprovedData}
              />
            </Col>
          </Row>

          <div className="table-responsive table-card mt-3 mb-1">
            <table className="table align-middle table-nowrap" id="userTable">
              <thead className="table-light">
                {data.roleId === 1 && (
                  <tr>
                    <th>S.NO</th>
                    <th>Team Name</th>
                    <th>Email</th>
                    <th>VKYC Done</th>
                    <th>Approved</th>
                  </tr>
                )}
                {data.roleId === 2 && (
                  <tr>
                    <th>S.NO</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>VKYC Done</th>
                    <th>Approved</th>
                  </tr>
                )}
              </thead>
              <tbody className="list form-check-all">
                {data.roleId === 1 &&
                  teamObjects?.map((team, idx) => (
                    <tr key={idx}>
                      <td className="id">{idx + 1}</td>
                      <td className="center_name">{team.teamName}</td>
                      <td className="owner_name">{team.email}</td>
                      <td className="owner_name">{team.vkyc}</td>
                      <td className="phone_number">{team.approved}</td>
                    </tr>
                  ))}
                {data.roleId === 2 &&
                  memberObjects?.map((memberData, idx) => (
                    <tr key={idx}>
                      <td className="id">{idx + 1}</td>
                      <td className="center_name">{memberData.name}</td>
                      <td className="center_name">{memberData.email}</td>
                      <td className="owner_name">{memberData.vkyc}</td>
                      <td className="phone_number">{memberData.approved}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Home</h4>
                </CardHeader>

                <CardBody></CardBody>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
