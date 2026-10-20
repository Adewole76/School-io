import { adminArray } from "../module.js";
import { createAdmin } from "../module.js";
import { validateEmail } from "../module.js";
import { checkIfAdminExist } from "../module.js";
import { saveUserIdOnLogin } from "../module.js";
import { saveUserRoleOnLogin } from "../module.js";
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const confirmPassword = document.querySelector('.confirm-password');
const createAdminBtn = document.querySelector('.create-admin-btn');
const toastMessage = document.querySelector('.toast-message');
const toastMessageText = document.querySelector('.toastMessage-text');

createAdminBtn.addEventListener('click',  async () => {
    toastMessage.classList.add('active-toast');
    toastMessageText.textContent = 'Creating admin account...'
    if(!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPassword.value){
     console.log("fields are required");
     toastMessageText.textContent = 'All fields are required';
     setTimeout(() => {
     toastMessage.classList.remove('active-toast');
     },2000)
    }else if(confirmPassword.value !== passwordInput.value){
        console.log('your password has not been confirmed, please type it exactly in the confirmation input');
        toastMessageText.textContent = 'Recheck password confirmation field';
        setTimeout(() => {
        toastMessage.classList.remove('active-toast');
        },2000)
    }else if(!validateEmail(emailInput.value)){
        console.log("invalid email");
        toastMessageText.textContent = 'Invalid Email';
        setTimeout(() => {
        toastMessage.classList.remove('active-toast');
        },2000)
    }else if(checkIfAdminExist(adminArray)){
        console.log("admin already exists");
        toastMessageText.textContent = 'Admin already exists';
        setTimeout(() => {
        toastMessage.classList.remove('active-toast');
        },2000)
    }else{
        const currentAdmin = await createAdmin(nameInput.value, emailInput.value, passwordInput.value)
         toastMessageText.textContent = 'account created successfully';
        setTimeout(() => {
        toastMessage.classList.remove('active-toast');
        },2000)
        console.log(currentAdmin);
        console.log(adminArray);
        saveUserIdOnLogin('currentUserId', currentAdmin.adminid )
        saveUserRoleOnLogin('currentUserRole', 'admin');
        window.location.href = "/pages/admin-dashboard.html"
    }
})