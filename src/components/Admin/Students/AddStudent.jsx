import React, {useEffect, useState} from "react";
import "./addStudent.css";
import {Alert, Button, Divider, Form, Input, Radio, Select} from "antd";
import * as generator from "generate-password";
import {addStudent} from "../api";
import {generateDocx} from "../../../docxtemplater";
import {classes} from "../../classes";
const {Option} = Select;

const requiredRule = (feild = "This") => {
  return {required: true, message: `${feild} is required`};
};

const classOptions = classes.map((v) => <Option key={v.name} value={v.name}>{v.name}</Option>);
const Addstudent = () => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    password: generator.generate({length: 5}),
    gender: "",
    phone: "",
    address: "",
    classs: "",
    section: "",
    gname: "",
    grelation: "",
    gphone: "",
    gemail: "",
  });
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(null);
  const setStudentCover = (property, value) => {
    let newT = {...student};
    newT[property] = value;
    setStudent(newT);
  };
  useEffect(() => {
    console.log(student);
    form.setFieldsValue(student);
  }, [student, form]);
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
      const req = {
        id: student.id,
        name: student.name,
        email: student.name,
        password: student.password,
        phone: student.phone,
        classs: student.classs,
        section: student.section,
        address: student.address,
        gender: student.gender,
        guardian: {
          name: student.gname,
          relation: student.grelation,
          email: student.gemail,
          phone: student.gphone,
        },
      };
      const name = await addStudent(req);
      setAlertMessage(`Success! Student ${name} has been added.`);
      // form.resetFields(); //TODO uncomment
      window.scrollTo(0, 0); //reload page effect
      generateDocx("/docxtemplates/studentAdded.docx", student, student.id);
    } catch (err) {
      alert(err);
      setAlertMessage("Error: The student was not saved. Reason: " + err);
    }
  };
  const showAlertMessage = () =>
    alertMessage ? <Alert type={alertMessage.includes("Success!") ? "success" : "error"} closable message={alertMessage} /> : null;

  return (
    <div>
      <h4>Add Student</h4>
      <div className="addStudent">
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
          <Divider orientation="left" style={{color: "darkblue"}}>
            Personal Information
          </Divider>
          <Form.Item name="id" label="Id/ Roll no" rules={[requiredRule()]}>
            <Input onInput={(e) => setStudentCover("id", e.target.value)} placeholder="Student Roll no" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[requiredRule()]}>
            <Input onInput={(e) => setStudentCover("name", e.target.value)} placeholder="Student Name" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[requiredRule()]}>
            <Input onInput={(e) => setStudentCover("password", e.target.value)} placeholder="Student Password" />
          </Form.Item>
          <Form.Item name="email" label="Email" >
            <Input onInput={(e) => setStudentCover("email", e.target.value)} placeholder="someone@something.com" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[requiredRule()]}>
            <Radio.Group onChange={(e) => setStudentCover("gender", e.target.value)}>
              <Radio.Button value={1}>Male</Radio.Button>
              <Radio.Button value={0}>Female</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[requiredRule()]}>
            <Input onInput={(e) => setStudentCover("phone", e.target.value)} placeholder="Enter Student Phone number" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[requiredRule()]}>
            <Input.TextArea onInput={(e) => setStudentCover("address", e.target.value)} placeholder="Enter Student Address" />
          </Form.Item>
          <span>
            <Divider orientation="left" style={{color: "darkorchid"}}>
              Educational Information
            </Divider>
            <Form.Item
              name="classs"
              label="Class"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Student's Class"
                onChange={(v) => {
                  setStudentCover("classs", v);
                }}
              >
                {classOptions}
              </Select>
            </Form.Item>
            <Form.Item
              name="section"
              label="Section"
              rules={[
                {
                  required: true,
                  min: 1,
                  max: 1,
                },
              ]}
            >
              <Input
                value={student.section}
                placeholder="Select Student's Section"
                onInput={(e) => {
                  let edited = e.target.value.toUpperCase().slice(0, 1);
                  setStudentCover("section", edited);
                }}
              />
            </Form.Item>
          </span>
          <Divider orientation="left" style={{color: "darkcyan"}}>
            Guardian Information
          </Divider>
          <Form.Item
            name="gname"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Guardian name",
              },
            ]}
          >
            <Input onInput={(e) => setStudentCover("gname", e.target.value)} placeholder="Guardian Name" />
          </Form.Item>
          <Form.Item name="gphone" label="Phone" rules={[requiredRule()]}>
            <Input onInput={(e) => setStudentCover("gphone", e.target.value)} placeholder="Guardian Phone Number" />
          </Form.Item>
          <Form.Item name="gemail" label="Email" >
            <Input onInput={(e) => setStudentCover("gemail", e.target.value)} placeholder="someone@something.com" />
          </Form.Item>
          <Form.Item name="grelation" label="Relation" rules={[requiredRule()]} initialValue="Father">
            <Select placeholder="select Relation" onChange={(v) => setStudentCover("grelation", v)}>
              <Option value="Father">Father</Option>
              <Option value="Mother">Mother</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Addstudent;
