import {Divider, Table, Tabs, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {getAttendance} from "../api";

const {Title} = Typography;

const marksColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render:(name=><p>{name.slice(0,name.indexOf("$"))}</p>)
    },
    {
      title: 'Obtained',
      dataIndex: 'obtained',
      key: 'o',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'rt',
    },
    {
        title:"Percentage",
        render: (text, record) => {
            return <div>{Math.round((record.obtained / record.total) * 100) + "%"}</div>;
          },}
  ];

const Attendance = ({student}) => {
  const [subjects, setSubjects] = useState([]); //here subject contains just the enrollment in which student is in and that enrollment contains the marks and attendance stuff
  useEffect(() => {
    const initialize = async () => {
      const subjects = await getAttendance();
      console.log(subjects);
      setSubjects(subjects);
    };
    initialize();
  }, []);
  const totalMarks=(arr)=>{
      const obtained=arr.reduce((a,c)=>a+c.obtained,0);
      const total=arr.reduce((a,c)=>a+c.total,0);
      return Math.round((obtained*100)/total)
  }
  return (
    <div>
      <Title level={3} style={{color: "#3F51B5"}}>
        Marks
      </Title>
      <div className="subjects">
        <Tabs>{
            subjects.map(subject=>
            <Tabs.TabPane tab={subject.name} key={subject.name}>
                <Table pagination={false} scroll={{x:true}} columns={marksColumns} dataSource={subject.enrollment.marks}></Table>
                {
                    subject.enrollment.marks.length?
                    <Divider orientation="right"><Title level={5} style={{color:"#3F51B5"}}>Percentage: {totalMarks(subject.enrollment.marks)} %</Title></Divider>
                    :null
                }
            </Tabs.TabPane>)
            }</Tabs>
      </div>
    </div>
  );
};

export default Attendance;
