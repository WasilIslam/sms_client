import React from "react";
import StudentLogin from "./components/Login/StudentLogin";
import AdminLogin from "./components/Login/AdminLogin";
import TeacherLogin from "./components/Login/TeacherLogin";


import "./App.css";

import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./components/Home/Home";
import Student from "./components/Student/Main";
import Teacher from "./components/Teacher/Main";
import Admin from "./components/Admin/Main";

export default function App() {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/studentlogin">
            <StudentLogin></StudentLogin>
          </Route>
          <Route path="/student">
            <Student />
          </Route>
          <Route exact path="/adminlogin">
            <AdminLogin/>
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/teacherlogin">
            <TeacherLogin/>
          </Route>
          <Route path="/teacher">
            <Teacher />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
