import React from "react";
import {Col, Row, Space, Typography} from "antd";
import "../../common/css/blocks.css";

const {Title} = Typography;

export default function HomePage({student: {name, id, classs, section, address, email, guardian, phone, gender}}) {
  console.log("name", name);
  const personalInfo = (
    <div className="block">
      <div className="header">Personal Information</div>
      <Space direction="vertical" size="large" className="data">
        <Row justify="space-between">
          <Col span={10}>
            <b>Address: </b>
            {address}
          </Col>
          <Col span={10}>
            <b>Phone: </b>
            {phone}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={10}>
            <b>Email: </b>
            {email}
          </Col>
          <Col span={10}>
            <b>Gender: </b>
            {gender ? "Male" : "Female"}
          </Col>
        </Row>
      </Space>
    </div>
  );
  const schoolInfo = (
    <div className="block">
      <div className="header">School Information</div>
      <Space direction="vertical" size="large" className="data">
        <Row justify="space-between">
          <Col span={10}>
            <b>Name: </b>
            {name}
          </Col>
          <Col span={10}>
            <b>Id: </b>
            {id}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={10}>
            <b>Class: </b>
            {classs}
          </Col>
          <Col span={10}>
            <b>Section: </b>
            {section}
          </Col>
        </Row>
      </Space>
    </div>
  );
  const guardianInfo = (
    <div className="block">
      <div className="header">Guardian Information</div>
      {1 && (
        <Space direction="vertical" size="large" className="data">
          <Row justify="space-between">
            <Col span={10}>
              <b>Name: </b>
              {guardian.name}
            </Col>
            <Col span={10}>
              <b>Relation: </b>
              {guardian.relation}
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={10}>
              <b>Email: </b>
              {guardian.email}
            </Col>
            <Col span={10}>
              <b>Phone: </b>
              {guardian.phone}
            </Col>
          </Row>
        </Space>
      )}
    </div>
  );
  return (
    <div>
      <Title level={3} style={{color: "black"}}>
        Profile
      </Title>
      <Space direction="vertical" style={{width: "100%"}}>
        {schoolInfo}
        {personalInfo}
        {guardianInfo}
      </Space>
    </div>
  );
}
