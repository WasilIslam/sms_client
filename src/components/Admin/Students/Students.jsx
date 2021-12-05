import React, {useEffect, useState} from "react";
import {getStudentsTable, getTeachersTable} from "../api";
import {Button, Space, Table} from "antd";
import { Link } from "react-router-dom";
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
        <Link
          to={{pathname: "/admin/student/" + record._id}}
        >
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
        <h1 style={{color: "darkcyan"}}>My Students</h1>
        <b>Total Students:</b> {studentsTable.length}
      </div>
      <Table dataSource={studentsTable} columns={columns} />;
    </div>
  );
};

export default Students;
