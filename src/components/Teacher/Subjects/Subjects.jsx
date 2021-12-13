import React, {useEffect, useState} from "react";
import {Button, List, Typography} from "antd";
import {getSubjectsWithMarks} from "../api";
import {Tabs} from "antd";
import randomColor from "randomcolor";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const {TabPane} = Tabs;
const {Title} = Typography;

const MarksBoxes = ({marks, subjectId}) => {
  const history = useHistory();
  const pushNewTest = () => {
    history.push("/teacher/newTest/" + subjectId);
  };
  return (
    <div>
      <List
        size="large"
        header={
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
            <Title level={4}>Tests Taken</Title>
            </div>
            <div>
              <Button style={{backgroundColor:"#3F51B5"}} type="primary" onClick={pushNewTest}>Add New Test</Button>
            </div>
          </div>
        }
        bordered
        dataSource={marks}
        renderItem={(mark, index) => (
          <List.Item>
            <Link to={`/teacher/test/${subjectId}/${mark}`}>
              <li>{mark.slice(0, mark.indexOf("$"))}</li>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const initialize = async () => {
      const data = await getSubjectsWithMarks();
      console.log("data", data);
      setSubjects(data);
    };
    initialize();
  }, []);
  return (
    <div>
      <Title level={3} style={{color: "#3F51B5"}}>
        Subjects
      </Title>
      <Tabs>
        {subjects.map((subject) => {
          const v = subject.name + "-" + subject.classs + subject.section;
          return (
            <TabPane tab={v} key={v}>
              <MarksBoxes marks={subject.marks} subjectId={subject._id} />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
