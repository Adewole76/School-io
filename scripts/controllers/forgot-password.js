'use strict'
import {TeachersArray} from '../module.js';
import {studentsArray} from '../module.js';
import {adminArray} from '../module.js';``
import {saveCollection} from '../module.js';
const sendBtn = document.querySelector('.send-btn');
const emailInput = document.querySelector('.email-input');
function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
console.log(TeachersArray);
console.log(studentsArray);
console.log(adminArray);
sendBtn.addEventListener('click', function(){
    if(!emailInput.value){
        console.log('please fill in your email address');
    }else if(adminArray.some(admin => admin.email === emailInput.value)){
      const particularAdmin = adminArray.find(admin => admin.email === emailInput.value);
      console.log(particularAdmin.email);
      const resetCode = generateFourDigitNumber();
      particularAdmin.passwordResetCode = resetCode;
      particularAdmin.passwordResetTimestamp = Date.now();
      particularAdmin.passwordResetType = 'password reset';
      console.log(particularAdmin);
      saveCollection('admin', adminArray);
      sendEmail(particularAdmin.name, resetCode, particularAdmin.email);
      //saveCollection('userTochangePassword', particularAdmin);
      window.location.href = '/pages/reset-password.html'
    }else if(TeachersArray.some(teacher => teacher.Email === emailInput.value)){
        const particularTeacher = TeachersArray.find(teacher => teacher.Email === emailInput.value);
        console.log(particularTeacher.Email);
        const resetCode = generateFourDigitNumber();
        console.log(resetCode);
        particularTeacher.passwordResetCode = resetCode;
        particularTeacher.passwordResetTimestamp = Date.now();
        particularTeacher.passwordResetType = 'password reset';
        console.log(particularTeacher);
        saveCollection('teachers', TeachersArray);
        sendEmail(particularTeacher.Name, resetCode, particularTeacher.Email);
        //saveCollection('userTochangePassword', particularTeacher);
        window.location.href = '/pages/reset-password.html'
    }else if(studentsArray.some(student => student.Email === emailInput.value)){
        const particularStudent = studentsArray.find(student => student.Email === emailInput.value);
        console.log(particularStudent.Email);
        const resetCode = generateFourDigitNumber();
        particularStudent.passwordResetCode = resetCode;
        particularStudent.passwordResetTimestamp = Date.now();
        particularStudent.passwordResetType = 'password reset';
        console.log(resetCode);
        console.log(particularStudent);
        saveCollection('students', studentsArray);
        sendEmail(particularStudent.Name, resetCode, particularStudent.Email);
        //saveCollection('userTochangePassword', particularStudent);
        window.location.href = '/pages/reset-password.html'
    }else{
        console.log('Email not found');
    }
})


//send Email function
const sendEmail = (userName, resetCode, userEmail) => {

// templateParams object package
const templateParams = {
    name: userName,
    reset_code: resetCode, // maps to EmailJS template variable
    user_email:  userEmail,
    duration: '15 minutes',
    headWording: 'Your Password Reset Code is'

};

//  Service ID and Template ID

emailjs.send("service_1fzqpt7", "template_625pnsa", templateParams)
    .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
        console.error("Failed to send email:", error);
    });
}