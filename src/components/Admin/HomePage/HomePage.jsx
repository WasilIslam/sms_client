import { Col, Row } from "antd";
import React from "react";

import "../../common/css/blocks.css"




export default function HomePage({admin}) {
  const personal = (
    <div className="block">
      <div className="header">Personal Information</div>
      <div className="data">
          <Row justify="space-between">
              <Col span={10}><b>Name: </b>{admin.name}</Col>
              <Col span={10}><b>Id: </b>{admin.id}</Col>
          </Row>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Admin Profile</h1>
      {personal}
    </div>
  );
}
