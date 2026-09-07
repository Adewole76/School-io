'use strict'
import {adminArray} from "../module.js";
import {verifyPassword} from "../module.js"
import {saveUserIdOnLogin} from "../module.js"
import {saveUserRoleOnLogin} from "../module.js"
const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const signInButton = document.querySelector('.sign-in-btn');

signInButton.addEventListener('click', async() => {
    if(!emailInput.value || !passwordInput.value){
        console.log('please fill all necessary Inputs');
    }else if(adminArray.some(user => user.email === emailInput.value)){
      let currentAdmin  = adminArray.find(user => user.email === emailInput.value);
      console.log(currentAdmin.passwordSalt)
      let isPasswordverified = await verifyPassword(passwordInput.value, currentAdmin.passwordSalt, 600000, currentAdmin.passwordHash);
      if(isPasswordverified){
        saveUserIdOnLogin("currentUserId", currentAdmin.adminid);
        saveUserRoleOnLogin("currentUserRole", 'admin');
        window.location.href = '/pages/admin-dashboard.html';
      }else {
        console.log("password is incorrect");
      };
}})
