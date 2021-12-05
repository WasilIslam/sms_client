import {Button, Dropdown, Layout, Menu} from "antd";
import {
  FieldBinaryOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MoneyCollectFilled,
  NumberOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./main.css";
import {Route, Switch, useHistory, useRouteMatch} from "react-router";
import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {Link} from "react-router-dom";
import Accounts from "./Accounts/Accounts";
import HomePage from "./HomePage/HomePage";
import Marks from "./Marks/Marks";
import Attendance from "./Attendance/Attendance";
import {get, logout} from "./api";
import ChangePassword from "./ChangePassword/ChangePassword";

const {Header, Content, Footer, Sider} = Layout;

const Head = ({setSiderStatus, name}) => {
  const history = useHistory();
  const handleMenuClick = (e) => {
    //TODO remove the key
    if (e.key === "logout") {
      logout();
      history.push("/studentlogin"); //back to the main page
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Change Password" icon={<KeyOutlined /> }>
        <div onClick={()=>{history.push("/student/changePassword")}}>
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
          style={{zIndex:10000}}
            onClick={() =>
              setSiderStatus((value) => {
                return !value;
              })
            }
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

function Body({setSiderStatus, student}) {
  const {path} = useRouteMatch();
  return (
    <Layout>
      <Head setSiderStatus={setSiderStatus} name={student.name} />
      <Content style={{padding:"20px"}}>
        <div className="mainbody" style={{padding: 24, minHeight: 360}}>
            <Switch>
            <Route path={`${path}/`} exact>
              <HomePage student={student}/>
            </Route>
            <Route path={`${path}/accounts`} exact>
              <Accounts />
            </Route>
            <Route path={`${path}/attendance`} exact>
              <Attendance />
            </Route>
            <Route path={`${path}/marks`} exact>
              <Marks></Marks>
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
  const [student, setStudent] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const getStudent = async () => {
      try {
        const student = await get();
        setStudent(student);
      } catch (err) {
        history.push("/studentlogin");
      }
    };
    getStudent();
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
          <Menu.Item key="2" icon={<FieldBinaryOutlined />}>
            <Link to={`${path}/attendance`}>Attendance</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<NumberOutlined />}>
            <Link to={`${path}/marks`}>Marks</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MoneyCollectFilled />}>
            <Link to={`${path}/accounts`}>Accounts</Link>
          </Menu.Item>
        </Menu>
      </Sider>
     {
       student&&
      <Body setSiderStatus={isMobile ? setSiderStatus : null} student={student} />
     }
      </Layout>
  );
}