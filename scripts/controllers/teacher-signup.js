import { addTeacher } from "../module.js";
import { TeachersArray } from "../module.js";
import { validateEmail } from "../module.js";
import { studentsArray } from "../module.js";
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const selectSubject = document.querySelector('.select-subject');
const passwordInput = document.querySelector('.password-input');
const confirmPassword = document.querySelector('.confirm-password-input');
const createTeacherBtn = document.querySelector('.create-teacher');
const phoneNumberInput = document.querySelector('.phone-number-input')
createTeacherBtn.addEventListener('click', async () => {
    try {
        if(!nameInput.value || !emailInput.value || !selectSubject.value || !passwordInput.value || !confirmPassword.value){
            console.log('all fields are compulsory');
        }else if(confirmPassword.value !== passwordInput.value){
            console.log('you password confirmation is wrong');
        }else if(TeachersArray.some(user => user.Email === emailInput.value) || studentsArray.some(user => user.Email === emailInput.value)){
           console.log('a user already exists with this email')
        }else if(!validateEmail(emailInput.value)){
            console.log('invalid email');
        }
        else{
        await addTeacher(nameInput.value, emailInput.value, passwordInput.value,selectSubject.value, null, phoneNumberInput.value)
        console.log(TeachersArray);
        console.log('sign up successful')
        }
    } catch (error) {
        console.log("Failed to add student:", error);
    }
})