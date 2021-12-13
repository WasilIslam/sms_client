import React, {useEffect, useState} from "react";
import {getStudentsTable} from "../api";
import {Button, Space, Table, Typography} from "antd";
import {Link} from "react-router-dom";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "name",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "naoidf",
  },
  {
    title: "Class",
    dataIndex: "classs",
    key: "afsafs",
  },
  {
    title: "Section",
    dataIndex: "section",
    key: "addressafsd",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to={{pathname: "/admin/student/" + record._id}}>
          <Button type="primary">Open</Button>
        </Link>
      </Space>
    ),
  },
];

const Students = () => {
  const [studentsTable, setStudentsTable] = useState([]);
  useEffect(() => {
    const initialize = async () => {
      setStudentsTable(await getStudentsTable());
      console.log(await getStudentsTable());
    };
    initialize();
  }, []);
  return (
    <div>
      <div style={{padding: "20px"}}>
        <Typography.Title level={3} style={{color: "#3F51B5"}}>
          My Students
        </Typography.Title>
        <b>Total: </b> {studentsTable.length}
      </div>
      <Table dataSource={studentsTable} columns={columns} />;
    </div>
  );
};

export default Students;
