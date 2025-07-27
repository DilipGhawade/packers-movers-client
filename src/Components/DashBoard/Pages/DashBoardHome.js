import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const DashBoardHome = () => {
  return (
    <Container className="mt-2">
      <Row>
        {/* Left Fixed Width Sidebar */}
        <div style={{ width: "330px", backgroundColor: "#f0f0f0" }}>
          <h4 style={{ color: "white" }}>Latest News</h4>
        </div>

        {/* Right Flexible Content */}
        <Col>
          <div>
            <h4>Welcome to our company</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoardHome;
