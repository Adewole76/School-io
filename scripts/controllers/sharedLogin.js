'use strict'
import { studentsArray } from "../module.js";
import { TeachersArray } from "../module.js"
import { verifyPassword } from "../module.js";
import { saveUserIdOnLogin } from "../module.js";
import { saveUserRoleOnLogin } from "../module.js";
import { checkIfAdminExist } from "../module.js";
import { adminArray } from "../module.js";
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const submitButton = document.querySelector('.submit-btn');
const adminLinkToggle = document.querySelector('.admin-link-toggle');
const adminExists = checkIfAdminExist(adminArray)
if(adminExists){
  console.log('admin exists');
  adminLinkToggle.textContent = 'Sign in as Admin';
  adminLinkToggle.href = "/pages/admin-login.html";
}else if(!adminExists){
    console.log('admin does not exist')
    adminLinkToggle.textContent = 'Sign up Admin';
    adminLinkToggle.href = "/pages/admin-setup.html";
}
console.log(studentsArray);
submitButton.addEventListener('click', async () => {
try {
    if(emailInput.value && studentsArray.some(user => user.Email === emailInput.value)){
      const particularStudent = studentsArray.find(student => student.Email === emailInput.value);
      console.log(particularStudent);
     console.log(await verifyPassword(passwordInput.value, particularStudent.passwordSalt, 600000, particularStudent.passwordHash)) 
    if(passwordInput.value && await verifyPassword(passwordInput.value, particularStudent.passwordSalt, 600000, particularStudent.passwordHash)){
        console.log('password was verified'); 
        saveUserIdOnLogin('currentUserId', particularStudent.studentId);
        saveUserRoleOnLogin('currentUserRole', 'student');
        window.location.href = '/pages/student-dashboard.html';
    }else{
        console.log("incorrect password")
    }
    }else if (emailInput.value && TeachersArray.some(user => user.Email === emailInput.value)){
       const ParticularTeacher = TeachersArray.find(teacher => teacher.Email === emailInput.value);
       console.log(ParticularTeacher);
       console.log(await verifyPassword(passwordInput.value, ParticularTeacher.passwordSalt, 600000, ParticularTeacher.passwordHash))       
   if(passwordInput.value && await verifyPassword(passwordInput.value, ParticularTeacher.passwordSalt, 600000, ParticularTeacher.passwordHash)){
        console.log('password was verified'); 
        saveUserIdOnLogin('currentUserId', ParticularTeacher.teacherId);
        saveUserRoleOnLogin('currentUserRole', 'teacher');
        window.location.href = '/pages/teacher-dashboard.html'
    }else(
        console.log("incorrect password")
    );
    }else if(!emailInput.value || !passwordInput.value){
        console.log('please fill in all the required data')
    }else{
        console.log('user does not exist');
    }
} catch (error) {
    console.log(error)
}
})

