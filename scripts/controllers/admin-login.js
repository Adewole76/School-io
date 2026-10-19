'use strict'
import {adminArray} from "../module.js";
import {verifyPassword} from "../module.js"
import {saveUserIdOnLogin} from "../module.js"
import {saveUserRoleOnLogin} from "../module.js"
const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const signInButton = document.querySelector('.sign-in-btn');
const toastMessage = document.querySelector('.toast-message');
const toastMessageText = document.querySelector('.toastMessage-text');

signInButton.addEventListener('click', async() => {
   toastMessage.classList.add('active-toast');
   toastMessageText.textContent ='Signing you in...'
    if(!emailInput.value || !passwordInput.value){
        console.log('please fill all necessary Inputs');
        toastMessageText.textContent = 'Please fill in all necessary info';
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
      }else if(adminArray.some(user => user.email === emailInput.value)){
      let currentAdmin  = adminArray.find(user => user.email === emailInput.value);
      console.log(currentAdmin.passwordSalt)
      let isPasswordverified = await verifyPassword(passwordInput.value, currentAdmin.passwordSalt, 600000, currentAdmin.passwordHash);
      if(isPasswordverified){
        toastMessageText.textContent = 'Sign in successful';
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
        saveUserIdOnLogin("currentUserId", currentAdmin.adminid);
        saveUserRoleOnLogin("currentUserRole", 'admin');
        window.location.href = '/pages/admin-dashboard.html';
      }else {
        console.log("password is incorrect");
        toastMessageText.textContent = 'Sign in failed please check details and try again';
        setTimeout(() => {
         toastMessage.classList.remove('active-toast');
        },2000)
        
      };
}})
