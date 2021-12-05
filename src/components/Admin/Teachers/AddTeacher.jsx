import React, {useEffect, useState} from "react";
import "./addTeacher.css";
import {Alert, Button, Form, Input} from "antd";
import * as generator from "generate-password";
import {addTeacher} from "../api";
import {generateDocx} from "../../../docxtemplater";

const requiredRule = (feild = "This") => {
  return {required: true, message: `${feild} is required`};
};

const Addteacher = () => {
  const [teacher, setTeacher] = useState({name: "", id: "", age: "", password: generator.generate({length: 10}), phone: "", education: ""});
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(null);
  const setTeacherWrap = (property, value) => {
    let newT = {...teacher};
    newT[property] = value;
    setTeacher(newT);
  };
  useEffect(() => {
    console.log(teacher);
    form.setFieldsValue(teacher);
  }, [teacher, form]);
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
      const name = await addTeacher(teacher);
      setAlertMessage(`Success! Teacher ${name} has been added.`);
      // form.resetFields(); //TODO uncomment
      window.scrollTo(0, 0); //reload page effect
      generateDocx("/docxtemplates/teacherAdded.docx", teacher, teacher.id);
    } catch (err) {
      alert(err);
      setAlertMessage("Error: The teacher was not saved. Reason: " + err);
    }
  };
  const showAlertMessage = () =>
    alertMessage ? <Alert type={alertMessage.includes("Success!") ? "success" : "error"} closable message={alertMessage} /> : null;

  return (
    <div>
      <h4>Add Teacher</h4>
      <div className="addTeacher">
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
          <Form.Item label="Name" name="name" rules={[requiredRule()]}>
            <Input
              onInput={(e) => {
                setTeacherWrap("name", e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[requiredRule()]}>
            <Input
              onInput={(e) => {
                setTeacherWrap("password", e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Age" name="age" rules={[requiredRule()]}>
            <Input type="number" onInput={(e) => setTeacherWrap("age", e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[requiredRule()]}>
            <Input onInput={(e) => setTeacherWrap("phone", e.target.value)} />
          </Form.Item>
          <Form.Item label="Education" name="education" rules={[requiredRule()]}>
            <Input.TextArea onInput={(e) => setTeacherWrap("education", e.target.value)} />
          </Form.Item>
          <Form.Item label="Id/Roll" name="id" rules={[requiredRule()]}>
            <Input onInput={(e) => setTeacherWrap("id", e.target.value)} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Addteacher;
