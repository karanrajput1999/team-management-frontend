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
import FormRow from "./FormRow";
import axios from "axios";

const Home = () => {
  const [activeTab, setactiveTab] = useState("1");

  const [formData, setFormData] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  useEffect(() => {
    axios
      .post("https://indiagolive.in/api/blackboard.php", {
        "api-key": "QMYV4JPBPJ19033",
      })
      .then((res) => {
        setFormData(res.data);
      });
  }, []);

  const VKYCDoneData = formData?.filter((data) => {
    return data.app_status1 == "VKYC Done";
  });

  const ApprovedData = formData?.filter((data) => {
    return data.app_status1 !== "VKYC Done";
  });

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
                <tr>
                  <th>S.NO</th>
                  <th>Employee Name</th>
                  <th>Approved</th>
                  <th>VKYC Done</th>
                </tr>
              </thead>
              <tbody className="list form-check-all">
                <tr>
                  <td className="id">1</td>
                  <td className="center_name">Someone</td>
                  <td className="owner_name">23</td>
                  <td className="phone_number">45</td>
                </tr>
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
