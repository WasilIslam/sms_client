import axios from "axios";
const base_api = "http://localhost:5000/student";

export const login = async ({id, password}) => {
  const {data: token} = await axios.post(`${base_api}/login`, {id, password});
  //saving in the session storage
  console.log("Getting the token: ", token);
  sessionStorage.setItem("x-auth-token", token);
  return token ? 1 : 0;
};
export const logout = async () => {
  sessionStorage.clear();
};
export const get = async () => {
  const token = sessionStorage.getItem("x-auth-token");
  const {data: student} = await axios.get(`${base_api}/`, {headers: {"x-auth-token": token}});
  console.log("getting the student from the token: ", student);
  return student ? student : null;
};
export const changePassword=async (data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/changePassword`,data, {headers: {"x-auth-token": token}});
  return result.data;
}
export const getAttendance=async ()=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/getAttendance`, {headers: {"x-auth-token": token}});
  return result.data;
}