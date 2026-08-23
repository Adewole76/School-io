'use strict'

// Local Storage helpers
const saveCollection = (name, value) =>{
  localStorage.setItem(name, JSON.stringify(value));
}
const getCollection = (name) =>{
    const storedItem = localStorage.getItem(name);
    const parsedStoredItem = JSON.parse(storedItem);
    return parsedStoredItem;
}


//Session Storage helpers
const saveUserIdOnLogin = (name, value) => {
   sessionStorage.setItem(name, JSON.stringify(value))
}
const saveUserRoleOnLogin = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
}

const gettingUser = (name) => {
    const userDetail = sessionStorage.getItem(name);
    const parsedUserDetail = JSON.parse(userDetail);
    return parsedUserDetail
}

const clearSessionStorage = () =>{
    sessionStorage.clear();
}

const generateId = () => {
  const timestamp = Date.now().toString(36); 
  const randomStr = Math.random().toString(36).substring(2, 8);
  
  return `${timestamp}-${randomStr}`;
};

const schoolClasses = [
    {
      name:"Js1",
      id: generateId(),
      teacherId: null,
    },
    {
      name:"Js2",
      id: generateId(),
      teacherId: null,
    },
    {
      name:"Js3",
      id: generateId(),
      teacherId: null,
    },
    {
      name:"Ss1",
      id: generateId(),
      teacherId: null,
    },
    {
      name:"Ss2",
      id: generateId(),
      teacherId: null,
    },
    {
      name:"Ss3",
      id: generateId(),
      teacherId: null,
    },
]

let studentsArray=getCollection('students')?getCollection('students'):[];
// CRUD functions
const addStudent = (email, password, DOB, parentNo, classId, StudentId) => {
  const newStudentObject  = {
    Email: email,
    passWord: password,
    dateOfBirth:DOB,
    ParentGuardianNo: parentNo,
    Classid: classId,
    studentId: StudentId
  }

  studentsArray.push(newStudentObject);
  saveCollection('students', studentsArray);
}

const deleteStudent = (deletedStudentId) => {
   studentsArray = studentsArray.filter(student => student.studentId !== deletedStudentId);
   saveCollection('students', studentsArray);
}

const keyNewValueInputs = []
const updateStudent = (updatedStudentId, keyToBeUpdated, keyNewValue) => {
  const studentTobeUpdated = studentsArray.find(student => student.studentId === updatedStudentId)
  console.log(studentTobeUpdated) 
}