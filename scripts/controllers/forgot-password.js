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
      console.log(adminArray.find(admin => admin.email === emailInput.value));
    }else if(TeachersArray.some(teacher => teacher.Email === emailInput.value)){
        console.log(TeachersArray.find(teacher => teacher.Email === emailInput.value));
    }else if(studentsArray.some(student => student.Email === emailInput.value)){
        console.log(studentsArray.find(student => student.Email === emailInput.value));
    }else{
        console.log('Invalid email');
    }
})




// 2. Define the JavaScript variables you want to send
const userScore = 95;
const userName = "Alex";

// 3. Package your variables into a template parameters object
const templateParams = {
    to_name: userName,
    score_result: userScore, // This maps to your EmailJS template variable
    reply_to: "user@example.com"
};

// 4. Send the email using your Service ID and Template ID
// emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
//     .then((response) => {
//         console.log("Email sent successfully!", response.status, response.text);
//     })
//     .catch((error) => {
//         console.error("Failed to send email:", error);
//     });