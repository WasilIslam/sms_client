import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Input} from "antd";
import {changePassword} from "../api";

const requiredRule = (feild = "This") => {
  return {required: true, message: `${feild} is required`};
};

const ChangePassword = () => {
  const [password, setPassword] = useState({
    oldpassword: "",
    newpassword: "",
  });
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(null);
  const setPasswordCover = (property, value) => {
    let newT = {...password};
    newT[property] = value;
    setPassword(newT);
  };

  useEffect(() => {
    console.log(password);
    form.setFieldsValue(password);
  }, [password, form]);
  const validateForm = async () => {
    try {
      await form.validateFields();
    } catch (err) {
      throw new Error("Empty Input Feilds");
    }
  };
  const submitForm = async () => {
    try {
      await validateForm();
      await changePassword(password);
      setAlertMessage(`Success! Password has been added.`);
      // form.resetFields(); //TODO uncomment
    } catch (err) {
      setAlertMessage("Error: Password not updated.");
    }
  };
  const showAlertMessage = () =>
    alertMessage ? <Alert type={alertMessage.includes("Success!") ? "success" : "error"} closable message={alertMessage} /> : null;

  return (
    <div>
      <h4>Add Password</h4>
      <div className="addPassword">
        {showAlertMessage()}
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 10,
          }}
          autoComplete="off"
        >
          <Form.Item name="oldpassword" label="Old Password" rules={[requiredRule()]}>
            <Input onInput={(e) => setPasswordCover("oldpassword", e.target.value)} />
          </Form.Item>
          <Form.Item name="newpassword" label="New Password" rules={[requiredRule()]}>
            <Input onInput={(e) => setPasswordCover("newpassword", e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitForm}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
