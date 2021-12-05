import {Divider, Input, Typography, Table, Button, Alert} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getEnrollments, saveMark} from "../../api";
const {Title} = Typography;

const Test = () => {
  const {subjectId} = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalMarks, setTotalMarks] = useState(100);
  const [testName, setTestName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  useEffect(() => {
    console.log(students);
  }, [students]);
  useEffect(() => {
    const initialize = async () => {
      console.log(subjectId);
      const enrollments = await getEnrollments(subjectId);
      setStudents(
        enrollments.map((e) => {
          return {id: e.id, obtainedMarks: null};
        })
      ); //for sending back
      console.log(enrollments);
      setEnrollments(enrollments);
    };
    initialize();
  }, [subjectId]);
  const saveTest = async () => {
    try {
      const {name} = await saveMark({subjectId, testName, totalMarks, students});
      history.push({pathname: `/teacher/test/${subjectId}/${name}`, state: {freshSaved: true}});
    } catch (err) {
      setErrorMessage(err);
    }
  };
  const ScoreColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Obtained Marks",
      render: (text, record, index) => {
        return (
          <Input
            placeholder="Enter Marks Obtained"
            value={students[students.findIndex((st) => st.id === record.id)].obtainedMarks}
            onChange={(e) => {
              const index = students.findIndex((st) => st.id === record.id);
              students[index].obtainedMarks = e.target.value;
              record.obtainedMarks = e.target.value;
              setStudents([...students]);
            }}
          />
        );
      },
      width: "30%",
      key: "address",
    },
    {
      title: "Percentage",
      render: (text, record, index) => {
        return <div>{record.obtainedMarks ? Math.round((record.obtainedMarks / totalMarks) * 100) + "%" : ""}</div>;
      },
      width: "30%",
      key: "address",
    },
  ];
  return (
    <div>
      <Title level={3} style={{color: "darkorchid"}}>
        Test
      </Title>
      {errorMessage && <Alert message={errorMessage} />}
      <Divider orientation="left">Test Name</Divider>
      <Input value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Enter Test Name" style={{fontSize: "16px"}} />
      <Divider orientation="left">Total Marks</Divider>
      <Input value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} placeholder="Total Marks" style={{width: "30%", fontSize: "16px"}} />
      <Divider orientation="left">Individual Student Score</Divider>
      <Table dataSource={enrollments} columns={ScoreColumn} />
      <Button type="primary" size="large" style={{marginLeft: "50%", transform: "translateX(-50%)"}} onClick={saveTest}>
        Save Test
      </Button>
      <div></div>
    </div>
  );
};

export default Test;
