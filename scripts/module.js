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

const generateStudentId = () =>{
  const studentId = `student-${Math.random().toString(36).substring(2, 9)}`
  return studentId
}

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

//let studentsArray=getCollection('students')?getCollection('students'):[];
let TeachersArray = []
let exampleArray= []
// CRUD functions
const addStudent = (studentName,studentAge, email, password, DOB, parentNo, classId,) => {
function generateSecureShortPassword(length = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  return password;
}
async function hashPassword(password) {
  // 1. Generate a random 16-byte salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // 2. Turn the plain text password into a crypto key object
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  // 3. Run PBKDF2 with 600,000 iterations
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 600000, // High count slows down attackers
      hash: 'SHA-256'
    },
    baseKey,
    256 // Output hash size in bits (32 bytes)
  );

  // 4. Convert salt and hash to Hex strings to store them
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  // Return both! You need the exact same salt to verify the password later.
  return { saltHex, hashHex };
}

hashPassword(generateSecureShortPassword()).then(result => console.log(result))

  const newStudentObject  = {
    Name: studentName,
    age: studentAge,
    Email: email,
    passWord: password,
    dateOfBirth:DOB,
    ParentGuardianNo: parentNo,
    Classid: classId,
    passwordHash: saltHex,
    passwordSalt: hashHex,
    studentId: generateStudentId()
  }

  studentsArray.push(newStudentObject);
  saveCollection('students', studentsArray);
}

const deleteStudent = (deletedStudentId) => {
   studentsArray = studentsArray.filter(student => student.studentId !== deletedStudentId);
   saveCollection('students', studentsArray);
}

const keyNewValueInputs = []
const updateStudent = (updatedStudentId, emailnewValue, ageNewValue, DOBnewValue, parentNoNewValue, classIdNewValue) => {
  const studentTobeUpdated = studentsArray.find(student => student.studentId === updatedStudentId)
  studentTobeUpdated.Email = !emailnewValue?studentTobeUpdated.Email:passwordNewValue;
  studentTobeUpdated.age = !ageNewValue?studentTobeUpdated.age:ageNewValue;
  studentTobeUpdated.dateOfBirth = !DOBnewValue?studentTobeUpdated.Email:DOBnewValue
  studentTobeUpdated.ParentGuardianNo = !parentNoNewValue?studentTobeUpdated.Email:parentNoNewValue
  studentTobeUpdated.Classid = !emailnewValue?studentTobeUpdated.Email:classIdNewValue;
  console.log(studentTobeUpdated) 

  saveCollection('students', studentsArray);
}

//CRUD functionality for teachers
const addTeacher = (name, email, password, classId, phoneNumber) => {
  const newTeacherObject  = {
    teacherId:,
    Name: name,
    Email: email,
    passwordHash:,
    ClassId: classId,
    phoneNumber: 
    passwordHash:
    mustChangePassword: false;
  }

  TeachersArray.push(newTeacherObject);
  saveCollection('teachers', TeachersArray);
}
 
const deleteTeacher = (deletedTeacherId) => {
   TeachersArray = TeachersArray.filter(teacher => teacher.teacherId !== deletedTeacherId);
   saveCollection('teachers', TeachersArray);
}


const updateTeacher = (updatedTeacherId, emailnewValue, passwordNewValue, classIdNewValue, studentIdNewValue) => {
  const studentTobeUpdated = TeachersArray.find(teacher => teacher.teacherId === updatedTeacherId)
  console.log(studentTobeUpdated)  
  studentTobeUpdated.Email = !emailnewValue?studentTobeUpdated.Email:passwordNewValue
  studentTobeUpdated.password = !passwordNewValue?studentTobeUpdated.password:passwordNewValue
  studentTobeUpdated.dateOfBirth = !DOBnewValue?studentTobeUpdated.Email:DOBnewValue
  studentTobeUpdated.ParentGuardianNo = !parentNoNewValue?studentTobeUpdated.Email:parentNoNewValue
  studentTobeUpdated.Classid = !emailnewValue?studentTobeUpdated.Email:classIdNewValue;
  saveCollection('students', studentsArray);
}