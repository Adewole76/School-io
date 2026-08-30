import { adminArray, checkIfAdminExist } from "../module.js";
import { createAdmin } from "../module.js";
import { validateEmail } from "../module.js";
import { checkIfAdminExist } from "../module.js";
import { saveUserIdOnLogin } from "../module.js";
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const confirmPassword = document.querySelector('.confirm-password');
const createAdminBtn = document.querySelector('.create-admin-btn');

createAdminBtn.addEventListener('click',  async () => {
    if(!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPassword.value){
     console.log("fields are required");
    }else if(confirmPassword.value !== passwordInput.value){
        console.log('your password has not been confirmed, please type it exactly in the confirmation input');
    }else if(!validateEmail(emailInput.value)){
        console.log("invalid email");
    }else if(checkIfAdminExist(adminArray)){
        console.log("admin already exists");
    }else{
        await createAdmin(nameInput.value, emailInput.value, passwordInput.value)
        console.log(adminArray);
    }
    
})