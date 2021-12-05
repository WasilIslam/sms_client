import React, { useEffect, useState } from "react";
import {Col, Row, Space, Typography} from "antd";
import "../../common/css/blocks.css";
import {get} from "../api.js"
const {Title} = Typography;

const Homepage = () => {
    const [teacher,setTeacher]=useState(null);
    useEffect(()=>{
        const initialize=async()=>{
            const teacher=await get();
            setTeacher(teacher);
        }
        initialize();
    },[])
    return (
        <div>
            
        </div>
    );
}

export default Homepage;

