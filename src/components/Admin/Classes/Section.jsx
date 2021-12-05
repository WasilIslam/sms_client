import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import {assignTeacher, getSubjects} from "../api";
import {Empty, Tabs, Table, Button, Alert, Divider, Modal, Input} from "antd";
import {Link} from "react-router-dom";
const {TabPane} = Tabs;

const studentColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rollno",
    dataIndex: "id",
    key: "id",
  },
];

const AddTeacherModal = ({handleAssignTeacher}) => {
  //teacher id is the roll no
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async() => {
    setConfirmLoading(true);
    await handleAssignTeacher(teacherId)
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const body = (
    <div>
      <Input value={teacherId} onInput={(e) => setTeacherId(e.target.value)} placeholder={"Enter Teacher ID"} />
    </div>
  );
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Teacher
      </Button>
      <Modal title="Title" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        {body}
      </Modal>
    </>
  );
};

const Subject = ({subject, handleAssignTeacher}) => {
  const studentDataSource = subject.enrollments;
  console.log(subject.enrollments);
  return (
    <div>
      <div className="teacher">
        <Divider orientation="left">Teacher</Divider>
        {subject.teacherName ? (
            <div style={{padding:20}}>
          <b>Teacher Name: </b>
          <Link>
            {subject.teacherName}
          </Link>
          </div>
        ) : (
          <Alert
            type="warning"
            message="Teacher Not Assigned For this Course"
            showIcon
            action={
              <AddTeacherModal
                handleAssignTeacher={async(tId) => {
                  await handleAssignTeacher(tId, subject._id);
                }}
              />
            }
          />
        )}
      </div>
      <div className="table">
        <Divider orientation="left">Students</Divider>
        <Table bordered pagination={false} dataSource={studentDataSource} columns={studentColumns} />
      </div>
    </div>
  );
};

export default function Section() {
  const {id, name} = useParams();
  const [subjects, setSubjects] = useState([]);
  const initialize = useCallback(async () => {
    const result = await getSubjects(id);
    console.log(result);
    setSubjects(result);
  }, [id]);
  const [alert,setAlert]=useState(null);
  console.log("component reloaded",subjects);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const handleAssignTeacher = async (tId, subId) => {
    try{
    const {teacherName, teacherId} = await assignTeacher(tId, subId);
    
    subjects.forEach(subject=>{
        if(subject._id===subId){
            subject.teacherName=teacherName;
            subject.teacherId=teacherId;
            return;
        }
    })
    setSubjects([...subjects]);
    setAlert({type:"success",message:`Teacher ${teacherName} assigned to ${name} successfully!`})
    }
    catch(err){
        setAlert({type:"error",message:"Teacher Could not be assigned. "})
        //TODO check the status and set message accordingly
    }
  };
  const showAlert=(alert&&<Alert {...alert} showIcon/>)
  return (
    <div>
        {showAlert}
      <h1>Class {name}</h1>
      <p style={{color: "darkorchid", fontSize: "10px"}}>Subjects List</p>
      {subjects?.length > 0 ? (
        <Tabs defaultActiveKey={subjects[0].name}>
          {subjects.map((subject,index) => (
            <TabPane tab={subject.name} key={subject.teacherId?subject.teacherId+index:index+subject._id}>
              <Subject subject={subject} handleAssignTeacher={handleAssignTeacher} />
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <Empty />
      )}
    </div>
  );
}
