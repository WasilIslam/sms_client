import axios from "axios";
const base_api = process.env.REACT_APP_API+"/teacher";

console.log("API",process.env.REACT_APP_API)
export const login = async ({id, password}) => {
  const {data: token} = await axios.post(`${base_api}/login`, {id, password});
  //saving in the session storage
  console.log("Getting the token: ", token);
  sessionStorage.setItem("x-auth-token", token);
  return token?1:0;
};
export const logout = async () => {
  sessionStorage.clear();
};
export const get = async () => {
  const token = sessionStorage.getItem("x-auth-token");
  const {data: teacher} = await axios.get(`${base_api}/`, {headers: {"x-auth-token": token}});
  console.log("getting the teacher from the token: ", teacher);
  return teacher ? teacher : null;
};
export const changePassword=async (data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/changePassword`,data, {headers: {"x-auth-token": token}});
  return result.data;
}
export const getSubjectsWithMarks=async()=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/subjectsWithMarks`, {headers: {"x-auth-token": token}});
  return result.data;
}
export const getEnrollments=async(subjectId)=>{
 //data should contain the subject id
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/enrollments`, {headers: {"x-auth-token": token,subjectId}});
  return result.data;
}
export const saveMark=async (data)=>{
 //data should contain the subject id
 const token = sessionStorage.getItem("x-auth-token");
 const result = await axios.post(`${base_api}/saveMark`,data, {headers: {"x-auth-token": token}});
 return result.data;
}

export const updateMark=async (data)=>{
  //data should contain the subject id and test index
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/updateMark`,data, {headers: {"x-auth-token": token}});
  return result.data;
 }
 export const getTestByName=async (subjectId,testname)=>{
  //data should contain the subject id
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/testByName`, {headers: {"x-auth-token": token,subjectId,testname}});
  return result.data;
 }
  