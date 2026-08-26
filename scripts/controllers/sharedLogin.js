'use strict'
import { studentsArray } from "../module.js";
import { TeachersArray } from "../module.js"
import { verifyPassword } from "../module.js";
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const submitButton = document.querySelector('.submit-btn');
console.log(studentsArray);
submitButton.addEventListener('click', async () => {
try {
    if(studentsArray.some(user => user.Email === emailInput.value)){
      const particularStudent = studentsArray.find(student => student.Email === emailInput.value);
      console.log(particularStudent);
     console.log(await verifyPassword(passwordInput.value, particularStudent.passwordSalt, 600000, particularStudent.passwordHash)) 
    }else{
        console.log('email does not exist')
    }
} catch (error) {
    console.log(error)
}

})

