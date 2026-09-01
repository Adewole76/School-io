'use strict'
import {TeachersArray} from '../module.js';
import {studentsArray} from '../module.js';
import {adminArray} from '../module.js';``
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
      sendEmail(particularAdmin.name, resetCode, particularAdmin.email);
    }else if(TeachersArray.some(teacher => teacher.Email === emailInput.value)){
        const particularTeacher = TeachersArray.find(teacher => teacher.Email === emailInput.value);
        console.log(particularTeacher.Email);
        const resetCode = generateFourDigitNumber();
        console.log(resetCode);
        sendEmail(particularTeacher.Name, resetCode, particularTeacher.Email);
    }else if(studentsArray.some(student => student.Email === emailInput.value)){
        const particularStudent = studentsArray.find(student => student.Email === emailInput.value);
        console.log(particularStudent.Email);
        const resetCode = generateFourDigitNumber();
        console.log(resetCode);
        sendEmail(particularStudent.Name, resetCode, particularStudent.Email);
    }else{
        console.log('Email not found');
    }
})




// 2. Define the JavaScript variables you want to send
const sendEmail = (userName, resetCode, userEmail) => {

// 3. Package your variables into a template parameters object
const templateParams = {
    name: userName,
    reset_code: resetCode, // This maps to your EmailJS template variable
    user_email:  userEmail
};

// 4. Send the email using your Service ID and Template ID

emailjs.send("service_1fzqpt7", "template_625pnsa", templateParams)
    .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
        console.error("Failed to send email:", error);
    });
}