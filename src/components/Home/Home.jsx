import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            Home sweet Home
            <Link to="studentlogin">Login for student</Link>
            <Link to="teacherlogin">Login for Teacher</Link>
            <Link to="adminlogin">Login for Admin</Link>
        </div>
    )
}
