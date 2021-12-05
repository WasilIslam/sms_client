import React, {useState} from "react";
import {login} from "../Admin/api";

import {LockOutlined, UnlockFilled, UserOutlined} from "@ant-design/icons";

import "./login.css";
import {Alert, Button, Input, Space} from "antd";
import {useHistory} from "react-router-dom";
const {Password} = Input;


export default function Login() {
  const coverImage = <img alt="Library Books" src="/images/library1.jpg"></img>;
  const coverText = (
    <div className="coverText">
      Welcome to
      <p style={{fontSize: "smaller"}}>Student Management System</p>
    </div>
  );
  let history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [AlertError,setAlertError]=useState("");
  const handleIdInput = (e) => {
    setId(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try{
      if (await login({id, password})) {
        history.push("/admin");
      }
    }
    catch(err){
      //todo check from the status codes which message to show
      const msg=err.response.data;
      setAlertError(msg);
      console.log(msg);//direct show the error
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginData">
        <div className="logo">
          <img src="/images/logo.jpeg" alt="logo" />
        </div>
        <div className="loginDataContainer">
          <h1>Admin Sign In</h1>
          <Space direction="vertical">
            <Input
              value={id}
              onInput={handleIdInput}
              size="large"
              style={{padding: "5px", width: "300px"}}
              placeholder="Enter Roll No."
              prefix={<UserOutlined />}
              autoFocus
            />
            <Password
              value={password}
              onInput={handlePasswordInput}
              size="large"
              style={{padding: "5px", width: "300px"}}
              placeholder="Enter Password"
              prefix={<LockOutlined />}
            />
            {AlertError&&<Alert style={{width:"300px"}} type="error" description={AlertError}/>}
            <Button onClick={handleLogin} type="primary" icon={<UnlockFilled />}>
              Sign In
            </Button>
          </Space>
        </div>
        <div className="contacts">
          <p style={{color: "grey"}}>Contact: 042-911</p>
        </div>
      </div>
      <div className="imgSection">
        {coverImage}
        {coverText}
      </div>
    </div>
  );
};