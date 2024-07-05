import React from "react";
import { Col, Container, Row } from "reactstrap";

const Home = () => {
  document.title = "Home";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={8} sm={10}>
              <div className="text-center mt-lg-5 pt-5">
                <h1 className="display-6 fw-semibold mb-3 lh-base">
                  Welcome to{" "}
                  <span className="text-success">Credit Card CRM </span>
                </h1>
                <p className="lead lh-base">BY WebWers</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
