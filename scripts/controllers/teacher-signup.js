import { addTeacher } from "../module.js";
import { TeachersArray } from "../module.js";
import { validateEmail } from "../module.js";
import { studentsArray } from "../module.js";
import { adminArray } from "../module.js"
// import { generateIdForUsers } from "../module.js";
// import { saveCollection } from "../module.js";
import { saveUserIdOnLogin } from "../module.js";
import { saveUserRoleOnLogin } from "../module.js";
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const selectSubject = document.querySelector('.select-subject');
const passwordInput = document.querySelector('.password-input');
const confirmPassword = document.querySelector('.confirm-password-input');
const createTeacherBtn = document.querySelector('.create-teacher');
const phoneNumberInput = document.querySelector('.phone-number-input')
const toastMessage = document.querySelector('.toast-message');
const toastMessageText = document.querySelector('.toastMessage-text');
createTeacherBtn.addEventListener('click', async () => {
    try {
     toastMessage.classList.add('active-toast');
     toastMessageText.textContent = 'Creating teacher account';
        if(!nameInput.value || !emailInput.value || !selectSubject.value || !passwordInput.value || !confirmPassword.value){
            console.log('all fields are compulsory');
            toastMessageText.textContent = 'All fields are required';
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }else if(confirmPassword.value !== passwordInput.value){
            console.log('you password confirmation is wrong');
            toastMessageText.textContent = 'Please recheck password confirmation field';
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }else if(TeachersArray.some(user => user.Email === emailInput.value) || studentsArray.some(user => user.Email === emailInput.value) || adminArray.some(user => user.email === emailInput.value)){
           console.log('a user already exists with this email');
           toastMessageText.textContent = 'This is email is taken already';
           setTimeout(() => {
           toastMessage.classList.remove('active-toast');
           },2000)
        }else if(!validateEmail(emailInput.value)){
            console.log('invalid email');
            toastMessageText.textContent = 'Invalid Email';
            setTimeout(() => {
            toastMessage.classList.remove('active-toast');
            },2000)
        }
        else{
        const newTeacher = await addTeacher(nameInput.value, emailInput.value, passwordInput.value,selectSubject.value, null, phoneNumberInput.value)
        toastMessageText.textContent = 'Account Created successfully';
        setTimeout(() => {
        toastMessage.classList.remove('active-toast');
        },2000)
        console.log(newTeacher.teacherId);
        saveUserIdOnLogin("currentUserId", newTeacher.teacherId);
        saveUserRoleOnLogin('currentUserRole', 'teacher');
        window.location.href = '/pages/teacher-dashboard.html';
        console.log(TeachersArray);
        console.log('sign up successful')
        }
    } catch (error) {
        console.log("Failed to add Teacher:", error);
     toastMessageText.textContent = 'Accound creation failed';
     setTimeout(() => {
     toastMessage.classList.remove('active-toast');
     },2000)
    }
})