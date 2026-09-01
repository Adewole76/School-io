'use strict';
import { getCollection } from '../module.js';
const resetCodeInput = document.querySelector('.reset-code-input');
const resetPasswordInput = document.querySelector('.reset-password-input');
const confirmPasswordInput = document.querySelector('.confirm-password-input');
const resetBtn = document.querySelector('.reset-btn');
const userTochangePassword = getCollection('userTochangePassword');
let currentTimestamp = Date.now();
const fifteenMinutes = 15 * 60 * 1000;
setInterval(() => {
  currentTimestamp = Date.now(); 
  
  let difference = currentTimestamp - userTochangePassword.passwordResetTimestamp;
  if (difference >= fifteenMinutes){
    userTochangePassword.passwordResetCode = null;
    userTochangePassword.passwordResetTimestamp = null;
  }else{
    console.log('code is still valid');
  }
}, 1000);


resetBtn.addEventListener('click', function(){
    if(!resetCodeInput.value || !resetPasswordInput.value || !confirmPasswordInput.value){
      console.log('please fill in all the fields');
    }else if(userTochangePassword.passwordResetCode === null){
      console.log('your reset code as expired proceed to the forgot password page to get a new one');
    }else if(resetCodeInput.value !== userTochangePassword.passwordResetCode && userTochangePassword.passwordResetCode !== null){
      console.log('you entered the wrong code');
    }else if(resetPasswordInput.value !== confirmPasswordInput.value ){
      console.log('ensure you confirm your password very well');
    }

});