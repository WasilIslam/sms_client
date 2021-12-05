import React, {useEffect, useState} from "react";
import {getTeachersTable} from "../api";
import {Table} from "antd";
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
    title: "Subjects Teaching",
    dataIndex: "subjects",
    key: "afsafs",
  },
];

const Students = () => {
  const [teachersTable, setTeachersTable] = useState([]);
  useEffect(() => {
    const initialize = async () => {
      setTeachersTable(await getTeachersTable());
    };
    initialize();
  }, []);
  return (
    <div>
      <div style={{padding: "20px"}}>
        <h1 style={{color: "darkcyan"}}>My Teachers</h1>
        <b>Total:</b> {teachersTable.length}
      </div>
      <Table dataSource={teachersTable} columns={columns} />;
    </div>
  );
};

export default Students;
