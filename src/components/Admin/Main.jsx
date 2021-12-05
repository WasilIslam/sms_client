import {Button, Dropdown, Layout, Menu} from "antd";
import {
  ArrowRightOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  NumberOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./main.css";
import {Route, Switch, useHistory, useRouteMatch} from "react-router";
import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {Link} from "react-router-dom";
import Teachers from "./Teachers/Teachers";
import HomePage from "./HomePage/HomePage";
import {get, logout} from "./api";
import Students from "./Students/Students";
import Classes from "./Classes/Classes";
import Addstudent from "./Students/AddStudent";
import Addteacher from "./Teachers/AddTeacher";
import Addsection from "./Classes/AddSection";
import Teacher from "./Teachers/Teacher"
import Student from "./Students/Student"

import ChangePassword from "./ChangePassword/ChangePassword";
import Section from "./Classes/Section";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu}=Menu;

const Head = ({setSiderStatus, name}) => {
  const history = useHistory();
  const handleMenuClick = (e) => {
    //TODO remove the key
    if (e.key === "logout") {
      logout();
      history.push("/adminlogin"); //back to the main page
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Change Password" icon={<KeyOutlined /> }>
        <div onClick={()=>{history.push("/admin/changePassword")}}>
        Change Password
        </div>
      </Menu.Item>
      <Menu.Item danger key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header" style={{paddingRight: 20, paddingLeft: 10}}>
      <div className="imgBox">
        <img src="/images/logo.jpeg" alt="logo" />
      </div>
      <div className="accountInfo">
        {setSiderStatus ? (
          <Button
            onClick={() =>
              setSiderStatus((value) => {
                return !value;
              })
            }
            icon={<MenuFoldOutlined />}
            style={{zIndex:10000}}
            ></Button>
        ) : null}
        <Dropdown.Button overlay={menu} placement="bottomRight" icon={<UserOutlined />}>
          {name}
        </Dropdown.Button>
      </div>
    </Header>
  );
};

function Body({setSiderStatus, admin}) {
  const {path} = useRouteMatch();
  return (
    <Layout >
      <Head setSiderStatus={setSiderStatus} name={admin.name} />
      <Content style={{padding:"20px"}}>
        <div className="mainbody" style={{padding: 24, minHeight: 360}}>
          <Switch>
            <Route path={`${path}/`} exact>
              <HomePage admin={admin} />
            </Route>
            <Route path={`${path}/teachers`} exact>
              <Teachers />
            </Route>
            <Route path={`${path}/teachers/add`} exact>
              <Addteacher />
            </Route>
            <Route path={`${path}/teacher/:id`} exact>
              <Teacher />
            </Route>
            <Route path={`${path}/students/add`} exact>
              <Addstudent />
            </Route>
            <Route path={`${path}/student/:id`} exact>
              <Student />
            </Route>
            <Route path={`${path}/students`} exact>
              <Students />
            </Route>
            <Route path={`${path}/sections/add`} exact>
              <Addsection />
            </Route>
            <Route path={`${path}/classes`} exact>
              <Classes/>
            </Route>
            <Route path={`${path}/section/:id/:name`} exact>
              <Section/>
            </Route>
            <Route path={`${path}/changePassword`} exact>
              <ChangePassword/>
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{textAlign: "center"}}>SMS - Managing Big</Footer>
    </Layout>
  );
}

export default function Main() {
  const {path} = useRouteMatch();
  const [admin, setAdmin] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const admin = await get();
        setAdmin(admin);
      } catch (err) {
        history.push("/adminlogin");
      }
    };
    getAdmin();
  }, [history]);
  const [siderStatus, setSiderStatus] = useState(true);
  console.log("Is Mobile ", isMobile);
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider
        style={isMobile ? {position: "absolute", minHeight: "100%",zIndex:9999} : {}}
        collapsed={isMobile ? siderStatus : false}
        breakpoint="sm"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        trigger={null}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} onClick={() => setSiderStatus(!siderStatus)}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to={`${path}/`}>Home</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<UsergroupAddOutlined />} title="Students">
          <Menu.Item key={"2-ss"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/students`}>Students</Link>
            </Menu.Item>
            <Menu.Item key={"2-add"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/students/add`}>Add Student</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="3" icon={<NumberOutlined />} title="Classes">
          <Menu.Item key={"3-min"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/classes`}>Show Classes</Link>
            </Menu.Item>
            <Menu.Item key={"3-add"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/sections/add`}>Add Section</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="4" icon={<UsergroupAddOutlined />} title="Teachers">
          <Menu.Item key={"4-ts"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/teachers`}>Teachers</Link>
            </Menu.Item>
            <Menu.Item key={"4-add"} icon={<ArrowRightOutlined/>}>
            <Link to={`${path}/teachers/add`}>Add Teacher</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Body setSiderStatus={isMobile ? setSiderStatus : null} admin={admin} />
    </Layout>
  );
}