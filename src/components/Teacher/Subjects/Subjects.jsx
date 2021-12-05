import React, {useEffect, useState} from "react";
import {Button, Typography} from "antd";
import {getSubjectsWithMarks} from "../api";
import {Tabs} from "antd";
import randomColor from "randomcolor"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const {TabPane} = Tabs;
const {Title} = Typography;

const MarksBoxes=({marks,subjectId})=>{
    return (
        <div
        >
            <Title level={4}>Tests Taken</Title>
        {
            marks.map((mark,index)=>{
            return (
                <Link to={`/teacher/test/${subjectId}/${mark}`}>
                <li style={{margin:"10px",color:randomColor()}}>
                    {(index+1)+". "+mark.slice(0,mark.indexOf("$"))}
                </li>
                </Link>
            )
            })
        }
        </div>
    )
}


const CreateNew=({subjectId})=>{
    const history=useHistory();
    const pushNewTest=()=>{
        history.push("/teacher/newTest/"+subjectId);
    }
    return (
        <div>
            <Button size="large" type="primary" onClick={pushNewTest}>Add New Test</Button>
        </div>
    )
}

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
      <Title level={3} style={{color: "darkcyan"}}>
        Subjects
      </Title>
      <Tabs>
        {subjects.map((subject) => {
            const v=subject.name + "-" + subject.classs + subject.section;
          return (
            <TabPane tab={v} key={v}>
                <CreateNew subjectId={subject._id}/>
                <MarksBoxes marks={subject.marks} subjectId={subject._id}/>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
