import axios from "axios";
const base_api = "http://localhost:5000/admin";

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
  const {data: admin} = await axios.get(`${base_api}/`, {headers: {"x-auth-token": token}});
  console.log("getting the admin from the token: ", admin);
  return admin ? admin : null;
};
export const addStudent=async(data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/students/add`,data,{headers: {"x-auth-token": token}})
  return result.data;//returns the name
}
export const addTeacher=async(data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/teachers/add`,data,{headers: {"x-auth-token": token}})
  return result.data;//returns the name
}
export const addSection=async (data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/sections/add`,data,{headers: {"x-auth-token": token}})
  return result.data;//returns the name
}
export const getSectionsTable=async ()=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/sections/table`,{headers: {"x-auth-token": token}})
  return result.data;//returns the name
}
export const changePassword=async (data)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/changePassword`,data, {headers: {"x-auth-token": token}});
  return result.data;
}
export const getSubjects=async (id)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/subjects`, {headers: {"x-auth-token": token,id}});
  return result.data;
}
export const assignTeacher=async(teacherRoll,subjectId)=>{
//assigns the teacher by roll
const data={teacherRoll,subjectId};
const token = sessionStorage.getItem("x-auth-token");
const result = await axios.post(`${base_api}/assignTeacher`,data, {headers: {"x-auth-token": token}});
return result.data;
}
export const getStudentsTable=async ()=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/students/table`, {headers: {"x-auth-token": token}});
  return result.data;

}
export const getTeachersTable=async ()=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/teachers/table`, {headers: {"x-auth-token": token}});
  return result.data;

}
export const getStudentData=async (id)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/student/data`, {headers: {"x-auth-token": token,id}});
  return result.data;

}
export const getTeacherData=async (id)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.get(`${base_api}/teacher/data`, {headers: {"x-auth-token": token,id}});
  return result.data;
  
}

export const setStudentPassword=async(id,newpassword)=>{
  const token = sessionStorage.getItem("x-auth-token");
  const result = await axios.post(`${base_api}/student/password`, {headers: {"x-auth-token": token,id,newpassword}});
  return result.data;
}