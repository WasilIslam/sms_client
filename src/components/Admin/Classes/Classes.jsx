import React, {useEffect, useState} from "react";
import {getSectionsTable} from "../api";
import {classes} from "../../classes";

import {Table, Space, Button, PageHeader, Tabs} from "antd";
import {Link} from "react-router-dom";
const columns = [
  {
    title: "Class",
    dataIndex: "classs",
    key: "classs",
    responsive:["lg"]
  },
  {
    title: "Section",
    dataIndex: "section",
    key: "section",
  },
  {
    title: "No of Students",
    dataIndex: "studentsLength",
    key: "students",
    responsive:["md"],
    render: (text) => <b>{text}</b>,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link
          to={{pathname: "/admin/section/" + record._id + "/" + record.classs + record.section, id: record._id, name: record.classs + record.section}}
        >
          <Button type="primary">Open</Button>
        </Link>
      </Space>
    ),
  },
];

export default function Classes() {
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let data = await getSectionsTable();
      data.forEach((v) => (v.key = v._id));
      data = data.sort((c, n) => {
        return c.section - n.section;
      });
      setSections(data);
    };
    getData();
  }, []);
  return (
    <div>
      <PageHeader className="site-page-header" title="Classes" subTitle="List of Classes" />,
      <div className="table">
        <Tabs defaultActiveKey={10}>
          {classes.map((c) => (
            <Tabs.TabPane tab={c.name} key={c.name}>
              <Table bordered pagination={false} columns={columns} dataSource={sections.filter(section=>section.classs===c.name)} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
