import {Button, Divider, Input, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getStudentData, setStudentPassword} from "../api";

function PasswordChangeModal({id}) {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newPassword,setNewPassword]=useState("");
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await setStudentPassword(id,newPassword)
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Change Password
      </Button>
      <Modal title="Change Password" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
          <p>
          Enter New Password for the student:
          </p>
          <Input value={newPassword} onInput={(e)=>setNewPassword(e.target.value)}/>
      </Modal>
    </>
  );
}

export default function Student() {
  const {id} = useParams();
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    console.log(studentData);
  }, [studentData]);
  useEffect(() => {
    const initialize = async () => {
      setStudentData(await getStudentData(id));
    };
    initialize();
  }, [id]);
  return (
    <div>
      <Divider orientation="left">
        <div>
          <h1 style={{color: "royalblue"}}>Actions</h1>
        </div>
        <PasswordChangeModal id={id}/>
      </Divider>
    </div>
  );
}
