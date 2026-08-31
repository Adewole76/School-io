'use strict'

// Local Storage helpers
export const saveCollection = (name, value) =>{
  localStorage.setItem(name, JSON.stringify(value));
}
export const getCollection = (name) =>{
    const storedItem = localStorage.getItem(name);
    const parsedStoredItem = JSON.parse(storedItem);
    return parsedStoredItem;
}


//Session Storage helpers
export const saveUserIdOnLogin = (name, value) => {
   sessionStorage.setItem(name, JSON.stringify(value))
}
export const saveUserRoleOnLogin = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
}

export const gettingUser = (name) => {
    const userDetail = sessionStorage.getItem(name);
    const parsedUserDetail = JSON.parse(userDetail);
    return parsedUserDetail
}

export const clearSessionStorage = () =>{
    sessionStorage.clear();
    window.location.href ='/index.html';
}

export const generateId = () => {
  const timestamp = Date.now().toString(36); 
  const randomStr = Math.random().toString(36).substring(2, 8);
  
  return `${timestamp}-${randomStr}`;
};

export const generateIdForUsers = (user) =>{
  const studentId = `${user}-${Math.random().toString(36).substring(2, 9)}`
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

export let studentsArray=getCollection('students')?getCollection('students'):[];
// CRUD functions
export const addStudent = async (studentName, studentAge, email, DOB, parentNo, classId) => {
  
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
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 600000,
        hash: 'SHA-256'
      },
      baseKey,
      256 
    );

    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    return { saltHex, hashHex };
  }

  const clearPassword = generateSecureShortPassword();
  console.log(clearPassword)

  const { saltHex, hashHex } = await hashPassword(clearPassword);

  const newStudentObject = {
    Name: studentName,
    age: studentAge,
    Email: email,
    dateOfBirth: DOB,
    ParentGuardianNo: parentNo,
    Classid: classId,
    passwordHash: hashHex,   
    passwordSalt: saltHex,  
    studentId: generateIdForUsers('student')
  };

  studentsArray.push(newStudentObject);
  saveCollection('students', studentsArray)

};

export const deleteStudent = (deletedStudentId) => {
   studentsArray = studentsArray.filter(student => student.studentId !== deletedStudentId);
   gradesArray = gradesArray.filter(grade => grade.studentId !== deletedStudentId.studentId);
   attendanceArray = attendanceArray.filter(attendance => attendance.studentId !== deletedStudentId);
   saveCollection('students', studentsArray);
   saveCollection('grades', gradesArray);
   saveCollection('attends', attendanceArray);
}

const keyNewValueInputs = []
export const updateStudent = (updatedStudentId,nameNewValue, emailnewValue, ageNewValue, DOBnewValue, parentNoNewValue, classIdNewValue) => {
  const studentTobeUpdated = studentsArray.find(student => student.studentId === updatedStudentId)
  studentTobeUpdated.Email = !emailnewValue?studentTobeUpdated.Email:emailnewValue;
  studentTobeUpdated.name = !nameNewValue?studentTobeUpdated.name:nameNewValue;
  studentTobeUpdated.age = !ageNewValue?studentTobeUpdated.age:ageNewValue;
  studentTobeUpdated.dateOfBirth = !DOBnewValue?studentTobeUpdated.dateOfBirth:DOBnewValue
  studentTobeUpdated.ParentGuardianNo = !parentNoNewValue?studentTobeUpdated.ParentGuardianNo:parentNoNewValue
  studentTobeUpdated.Classid = !emailnewValue?studentTobeUpdated.ClassId:classIdNewValue;
  console.log(studentTobeUpdated) 

  saveCollection('students', studentsArray);
}

//CRUD functionality for teachers
export let TeachersArray = getCollection('teachers')?getCollection('teachers'):[];
export const addTeacher = async (name, email, password, subject, classId, phoneNumber) => {

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

 
    const { saltHex, hashHex } = await hashPassword(password);
    
    // JavaScript is likely crashing on the line below:
    const newTeacherObject = {
      teacherId: generateIdForUsers('teacher'), 
      Name: name,
      Email: email,
      ClassId: classId,
      phonenumber: phoneNumber,
      passwordHash: hashHex,
      passwordSalt: saltHex,
      teacherSubject: subject,
      mustChangePassword: false
    };

    TeachersArray.push(newTeacherObject);
    saveCollection('teachers', TeachersArray);
    
    return newTeacherObject;

 
}

 
export const deleteTeacher = (deletedTeacherId) => {
   TeachersArray = TeachersArray.filter(teacher => teacher.teacherId !== deletedTeacherId);
   const particularTeacherClass = schoolClasses.find(particularclass => particularclass.teacherId === deletedTeacherId)
   particularTeacherClass.teacherId = null;
   saveCollection('teachers', TeachersArray);
}


export const updateTeacher = (updatedTeacherId, emailnewValue, phoneNumbernewValue, classIdNewValue, studentIdNewValue) => {
  const teacherToBeUpdated = TeachersArray.find(teacher => teacher.teacherId === updatedTeacherId)
  console.log(teacherToBeUpdated)  
  teacherToBeUpdated.Email = !emailnewValue?teacherToBeUpdated.Email:emailnewValue;
  teacherToBeUpdated.phoneNumber = !phoneNumbernewValue?teacherToBeUpdated.phoneNumber:phoneNumbernewValue;
  saveCollection('teachers', TeachersArray);
}


//CRUD for grades
let gradesArray = getCollection('grades')?getCollection('grades'):[]
export const addGrades = (studentId, term, subject, test1, test2, Exam) => {
  const newGradeObject = {
    id: generateIdForUsers('grade'),
    studentId: studentId,
    term: term,
    gradeSubject: subject,
    test1Score: test1,
    test2Score: test2,
    examScore: Exam
  }
  
gradesArray.push(newGradeObject);
saveCollection('grades', gradesArray);
}

export const deleteGrade = (gradeId) => {
   gradesArray = gradesArray.filter(grade => grade.id !== gradeId)
   saveCollection('grades', gradesArray);
}

export const updateGrade = (gradeId, termNewValue, subjectNewValue, test1NewValue, test2NewValue, examNewValue) => {
  const gradeToBeUpdated = gradesArray.find(grade => grade.id === gradeId);
  console.log(gradeToBeUpdated);
  gradeToBeUpdated.term = !termNewValue?gradeToBeUpdated.term:termNewValue;
  gradeToBeUpdated.gradeSubject = !subjectNewValue?gradeToBeUpdated.gradeSubject:subjectNewValue;
  gradeToBeUpdated.test1Score = !test1NewValue?gradeToBeUpdated.test1Score:test1NewValue;
  gradeToBeUpdated.test2Score = !test2NewValue?gradeToBeUpdated.test2Score:test2NewValue;
  gradeToBeUpdated.examScore = !examNewValue?gradeToBeUpdated.examScore:examNewValue;

  saveCollection('grades', gradesArray);
}

//Attendance CRUD operations
let attendanceArray = getCollection('attends')?getCollection('attends'):[];
export const addAttendance = (studentId, classId, date, term, Status) => {
  const newAttendanceObject = { 
    id: generateIdForUsers('attend'), 
    studentId: studentId, 
    classId: classId,
    date: date, 
    term: term,
    attendanceStatus: Status
  } 
  
  attendanceArray.unshift(newAttendanceObject)
  saveCollection('attends', attendanceArray);
}

export const deleteAttendance = (attendanceId) => {
   attendanceArray = attendanceArray.filter(attendance => attendance.id !== attendanceId);
   saveCollection('attends', attendanceArray);
}

export const updateAttendance = (attendanceId, date, term, status) => {
  const attendanceToBeUpdated = attendanceArray.find(attendance => attendance.id === attendanceId);
  console.log(attendanceToBeUpdated);
  attendanceToBeUpdated.term = !term?attendanceToBeUpdated.term:term;
  attendanceToBeUpdated.attendanceStatus = !status?attendanceToBeUpdated.attendanceStatus:status;
  attendanceToBeUpdated.date = !date?attendanceToBeUpdated.test1Score:date;

  saveCollection('attends', attendanceArray);
}

//Global Email Validation Logic
export const checkIfEmailExists = (email) => {
   if(studentsArray.some(student => student.Email === email) || TeachersArray.some(teacher => teacher.mail === email)){
    console.log('email exists');
   }
}

//role scoped data-loading function
export const getStudentsForTeachers = (teacherClassId) => {
   const teachersStudents = studentsArray.filter(student => student.classId === teacherClassId)
   return teachersStudents
}

//Basic field validators
export const validateEmail = (email) =>{
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};  

export const adminArray = getCollection('admin')?getCollection('admin'):[];
//does admin exist check function
export const createAdmin = async (name, email, password) => {
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

 const { saltHex, hashHex } = await hashPassword(password);

 const newAdminObject = {
  adminid: generateIdForUsers('admin'),
  name: name,
  email: email,
  passwordSalt: saltHex,
  passwordHash: hashHex
 }
adminArray.push(newAdminObject);
console.log(adminArray);
saveCollection('admin', JSON.stringify(adminArray))
return newAdminObject;
}
export const checkIfAdminExist = (adminArr) => {
  let result;
  if(adminArr.length>0){
    result = true
  }else{
    result = false
  }
    return result
}

function hexToBytes(hexString) {
  // Check for odd length and fix or throw error
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }

  const numBytes = hexString.length / 2;
  const byteArray = new Uint8Array(numBytes);

  for (let i = 0; i < numBytes; i++) {
    // Extract a 2-character chunk
    const hexChunk = hexString.substr(i * 2, 2);
    // Convert base-16 string to numeric byte value
    byteArray[i] = parseInt(hexChunk, 16);
  }

  return byteArray;
}

function bufferToHex(buffer){
  const HashHex = Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
return HashHex
}
export async function verifyPassword(plainPassword, storedSaltHex, iterations, expectedHashHex) {
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(plainPassword);
  const salt = hexToBytes(storedSaltHex);

  // 1. Import the plain password as a raw key material
  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  // 2. Re-derive the bits using the exact same salt and iterations
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256", // Use a strong hashing function
      salt: salt,
      iterations: iterations
    },
    baseKey,
    256 // Length of the key in bits (32 bytes)
  );

  // 3. Convert the newly computed hash to a Hex string
  const newHashHex = bufferToHex(derivedBits);
  console.log(newHashHex);

  // 4. Securely compare the newly computed hash against the stored hash
  return newHashHex === expectedHashHex;
}

export const requireAuth = (id, particular, array, particularRole, role) => {
  if(!array.some(user => user[particular] === id) && particularRole !== role ){
  window.location.href ='/index.html';
  }
}
