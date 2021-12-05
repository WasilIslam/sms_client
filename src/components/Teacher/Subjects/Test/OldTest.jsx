import {Divider, Input, Typography, Table, Button, Alert} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router";
import {getTestByName, updateMark} from "../../api";
const {Title} = Typography;

const OldTest = () => {
  const {subjectId, name} = useParams();
  const [students, setStudents] = useState([]);
  const [totalMarks,setTotalMarks]=useState(100);
  const [testName,setTestName]=useState("")
  const [errorMessage,setErrorMessage]=useState(null);
  const history=useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(students);
  }, [students]);
  useEffect(() => {
    const initialize = async () => {
      console.log(subjectId);
      const data = await getTestByName(subjectId,name);
      console.log(data);
      setStudents(data.students); //for sending back
      setTotalMarks(data.totalMarks);
      setTestName(data.testName.slice(0,data.testName.indexOf("$")));
    };
    initialize();
  }, [subjectId,name]);
  const UpdateTest=async ()=>{
      try{
        }
      catch(err){
    setErrorMessage(err);  
    }
  }
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
      render: (text, record) => {
        const index = students.findIndex((st) => st.id === record.id);
        if(students[index].marks===-1){
            //new student
            return <div style={{color:"firebrick"}}>New Student</div>
        }
        record.obtainedMarks = students[index].marks;
        return (
          <Input
            placeholder="Enter Marks Obtained"
            value={students[index].marks}
            onChange={(e) => {
              students[index].marks = e.target.value;
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
        return <div>{record.obtainedMarks?Math.round((record.obtainedMarks/totalMarks)*100)+"%":""}</div>;
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
      {location.state&&location.state.freshSaved&&<Alert type="success" message="Test Saved Successfully!!" showIcon closable/>}
      {
          errorMessage&&
          <Alert type="error" message={errorMessage}/>
      }
      <Divider orientation="left">Test Name</Divider>
      <Input value={testName}onChange={e=>setTestName(e.target.value)} placeholder="Enter Test Name" style={{fontSize: "16px"}} />
      <Divider orientation="left">Total Marks</Divider>
      <Input value={totalMarks}onChange={e=>setTotalMarks(e.target.value)} placeholder="Total Marks" style={{width: "30%", fontSize: "16px"}} />
      <Divider orientation="left">Individual Student Score</Divider>
      <Table dataSource={students} columns={ScoreColumn} />
      <Button type="primary" size="large" style={{marginLeft:"50%",transform:"translateX(-50%)"}} onClick={UpdateTest}>Update Changes</Button>
      <div></div>
    </div>
  );
};

export default OldTest;
