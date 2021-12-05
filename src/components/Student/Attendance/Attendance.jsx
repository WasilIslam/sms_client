import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAttendance } from '../api';

const {Title} = Typography;
const Attendance = ({student}) => {
    const [attendance,setAttendance]=useState();
    useEffect(()=>{
        const initialize=async()=>{
            const attendanceInfo=await getAttendance();
            console.log(attendanceInfo);
            setAttendance(attendanceInfo);
        }
        initialize();
    },[])
    return (
        <div>
            <Title level={3} style={{color:"darkolivegreen"}}>Attendance</Title>
        </div>
    );
}

export default Attendance;
