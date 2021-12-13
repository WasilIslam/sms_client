import React from "react";
import {Col, Row, Space, Typography} from "antd";
import "../../common/css/blocks.css";
const {Title} = Typography;

const Homepage = ({teacher}) => {
    console.log("Teacher",teacher);
  const personalInfo = (
    <div className="block">
      <div className="header">Personal Information</div>
      <Space direction="vertical" size="large" className="data">
        <Row justify="space-between">
          <Col span={10}>
            <b>Name: </b>
            {teacher.name}
          </Col>
          <Col span={10}>
            <b>Phone: </b>
            {teacher.phone}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={10}>
            <b>Age: </b>
            {teacher.age}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={10}>
            <b>Education: </b>
            {teacher.education}
          </Col>
        </Row>
      </Space>
    </div>
  );
  const educationInfo = (
    <div className="block">
      <div className="header">School Information</div>
      <Space direction="vertical" size="large" className="data">
        <Row justify="space-between">
          <Col span={10}>
            <b>Id: </b>
            {teacher.id}
          </Col>
          <Col span={10}>
            <b>Subjects Teaching: </b>
            {teacher.subjects.length}
          </Col>
        </Row>
      </Space>
    </div>
  );
  return (
    <div>
      <Title level={3} style={{color: "black"}}>
        Profile
      </Title>
      <Space direction="vertical" style={{width: "100%"}}>
        {personalInfo}
        {educationInfo}
      </Space>
    </div>
  );
};

export default Homepage;
