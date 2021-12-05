import React, {useEffect, useState} from "react";
import "./addSection.css";
import {Alert, Button, Form, Input, Select} from "antd";
import {addSection} from "../api";
import {classes} from "../../classes";
const {Option} = Select;

const classOptions = classes.map((v) => <Option key={v.classs+v.name} value={v.name}>{v.name}</Option>);

const requiredRule = (feild = "This") => {
  return {required: true, message: `${feild} is required`};
};

const Addsection = () => {
  const [section, setSection] = useState({subjects: [], section: "", classs: null});
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(null);
  const setSectionWrap = (property, value) => {
    let newT = {...section};
    newT[property] = value;
    if(property==="classs"){
      newT.subjects=classes[classes.findIndex(v=>v.name===value)].subjects;
    }
    setSection(newT);
  };
  useEffect(() => {
    console.log(section);
    form.setFieldsValue(section);
  }, [section, form]);
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
      const name = await addSection(section);
      setAlertMessage(`Success! Section ${name} has been added.`);
      window.scrollTo(0, 0); //reload page effect
    } catch (err) {
      setAlertMessage("Error: The section was not saved. Reason: " + err.response.data);
    }
    // form.resetFields(); //TODO uncomment
  };
  const showAlertMessage = () =>
    alertMessage ? <Alert type={alertMessage.includes("Success!") ? "success" : "error"} message={alertMessage} /> : null;

  return (
    <div>
      <h4>Add Section</h4>
      <div className="addSection">
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
          <Form.Item label="Class" name="classs" rules={[requiredRule()]}>
            <Select
            defaultValue={section.classs}
              placeholder="Select Student's Class"
              onChange={(v) => {
                setSectionWrap("classs", v);
              }}
            >
              {classOptions}
            </Select>{" "}
          </Form.Item>
          <Form.Item label="Section" name="section" rules={[requiredRule()]}>
            <Input
              onInput={(e) => {
                setSectionWrap("section", e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Subjects" rules={[requiredRule()]}>
            {section.classs&&
            <Select mode="multiple" value={section.subjects} placeholder="Select Subjects" onChange={(v) => setSectionWrap("subjects", v)}>
              {classes[classes.findIndex(v=>v.name===section.classs)].subjects.map((s) => (
                <Option value={s}>{s}</Option>
              ))}
            </Select>
            }
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

export default Addsection;
