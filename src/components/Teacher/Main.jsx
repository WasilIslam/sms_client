import {Button, Dropdown, Layout, Menu} from "antd";
import {
  FieldBinaryOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./main.css";
import {Route, Switch, useHistory, useRouteMatch} from "react-router";
import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {Link} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import {get, logout} from "./api";
import ChangePassword from "./ChangePassword/ChangePassword";
import Subjects from "./Subjects/Subjects";
import Test from "./Subjects/Test/Test";
import OldTest from "./Subjects/Test/OldTest";

const {Header, Content, Footer, Sider} = Layout;

const Head = ({setSiderStatus, name}) => {
  const history = useHistory();
  const handleMenuClick = (e) => {
    //TODO remove the key
    if (e.key === "logout") {
      logout();
      history.push("/teacherlogin"); //back to the main page
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Change Password" icon={<KeyOutlined />}>
        <div
          onClick={() => {
            history.push("/teacher/changePassword");
          }}
        >
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
            style={{zIndex: 10000}}
            icon={<MenuFoldOutlined />}
          ></Button>
        ) : null}
        <Dropdown.Button overlay={menu} placement="bottomRight" icon={<UserOutlined />}>
          {name}
        </Dropdown.Button>
      </div>
    </Header>
  );
};

function Body({setSiderStatus, teacher}) {
  const {path} = useRouteMatch();
  return (
    <Layout>
      <Head setSiderStatus={setSiderStatus} name={teacher.name} />
      <Content style={{padding: "20px"}}>
        <div className="mainbody" style={{padding: 24, minHeight: 360}}>
          <Switch>
            <Route path={`${path}/`} exact>
              <HomePage teacher={teacher}/>
            </Route>
            <Route path={`${path}/subjects`} exact>
              <Subjects />
            </Route>
            <Route path={`${path}/newTest/:subjectId`} exact>
              <Test />
            </Route>
            <Route path={`${path}/test/:subjectId/:name`} exact>
              <OldTest />
            </Route>
            <Route path={`${path}/changePassword`} exact>
              <ChangePassword />
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
  const [teacher, setTeacher] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const getTeacher = async () => {
      try {
        const teacher = await get();
        console.log(teacher)
        setTeacher(teacher);
      } catch (err) {
        history.push("/teacherlogin");
      }
    };
    getTeacher();
  }, [history]);
  const [siderStatus, setSiderStatus] = useState(true);
  console.log("Is Mobile ", isMobile);
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider
        style={isMobile ? {zIndex: 9999, position: "absolute", minHeight: "100%"} : {}}
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
          <Menu.Item key="2" icon={<FieldBinaryOutlined />}>
            <Link to={`${path}/subjects`}>My Subjects</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {teacher && <Body setSiderStatus={isMobile ? setSiderStatus : null} teacher={teacher} />}
    </Layout>
  );
}
