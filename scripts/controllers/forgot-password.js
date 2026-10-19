'use strict'
import {TeachersArray} from '../module.js';
import {studentsArray} from '../module.js';
import {adminArray} from '../module.js';``
import {saveCollection} from '../module.js';
const sendBtn = document.querySelector('.send-btn');
const emailInput = document.querySelector('.email-input');
const toastMessage = document.querySelector('.toast-message');
const toastMessageText = document.querySelector('.toastMessage-text');
function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
console.log(TeachersArray);
console.log(studentsArray);
console.log(adminArray);
sendBtn.addEventListener('click',  async () =>{
    toastMessage.classList.add('active-toast');
    toastMessageText.textContent = `Sending password reset code to your email..`;
    if(!emailInput.value){
        console.log('please fill in your email address');
        toastMessageText.textContent = 'please fill in the input';
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
    }else if(adminArray.some(admin => admin.email === emailInput.value)){
      const particularAdmin = adminArray.find(admin => admin.email === emailInput.value);
      console.log(particularAdmin.email);
      const resetCode = generateFourDigitNumber();
      particularAdmin.passwordResetCode = resetCode;
      particularAdmin.passwordResetTimestamp = Date.now();
      particularAdmin.passwordResetType = 'password reset';
      console.log(particularAdmin);
      saveCollection('admin', adminArray);

      if(await sendEmail(particularAdmin.name, resetCode, particularAdmin.email)){
        toastMessageText.textContent = 'check your email for reset code';
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
      }else{
        toastMessageText.textContent = `reset code email failed`;
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
      };
      //saveCollection('userTochangePassword', particularAdmin);
      //window.location.href = '/pages/reset-password.html'
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
        if(await sendEmail(particularTeacher.Name, resetCode, particularTeacher.Email)){
            toastMessageText.textContent = 'check your email for reset code';
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }else{
            toastMessageText.textContent = `reset code email failed`;
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }
        //saveCollection('userTochangePassword', particularTeacher);
        //window.location.href = '/pages/reset-password.html'
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
        if(await sendEmail(particularStudent.Name, resetCode, particularStudent.Email)){
            toastMessageText.textContent = 'check your email for reset code';
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }else{
            toastMessageText.textContent = `reset code email failed`;
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }
        //saveCollection('userTochangePassword', particularStudent);
        //window.location.href = '/pages/reset-password.html'
    }else{
        toastMessageText.textContent = `This user does not exists`;
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
        console.log('Email not found');
    }
})


//send Email function
const sendEmail = async (userName, resetCode, userEmail) => {

// templateParams object package
const templateParams = {
    name: userName,
    reset_code: resetCode, // maps to EmailJS template variable
    user_email:  userEmail,
    duration: '15 minutes',
    headWording: 'Your Password Reset Code is'

};

//  Service ID and Template ID
try{
 await emailjs.send("service_1fzqpt7", "template_625pnsa", templateParams);
 console.log('email was sent successfully');
 return true;
}catch(error){
 console.error("Failed to send email:", error);
 return false
}

}