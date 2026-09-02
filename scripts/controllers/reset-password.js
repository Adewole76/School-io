'use strict';
import { getCollection } from '../module.js';
import { saveCollection } from '../module.js';
import { TeachersArray } from '../module.js';
import {studentsArray} from '../module.js';
import { adminArray } from '../module.js';
const resetCodeInput = document.querySelector('.reset-code-input');
const resetPasswordInput = document.querySelector('.reset-password-input');
const confirmPasswordInput = document.querySelector('.confirm-password-input');
const resetBtn = document.querySelector('.reset-btn');
const userTochangePassword = getCollection('userTochangePassword');

function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const baseKey = crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const hashBuffer = crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 600000,
        hash: 'SHA-256'
      },
      baseKey,
      256 
    );

    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    return { saltHex, hashHex };
  }



  //const { saltHex, hashHex } = hashPassword(clearPassword);
      



console.log(userTochangePassword);
let currentTimestamp = Date.now();
const fifteenMinutes = 3 * 60 * 1000;
 setInterval(() => {
   currentTimestamp = Date.now(); 
   if(userTochangePassword){
   let difference = currentTimestamp - userTochangePassword.passwordResetTimestamp;
   if (difference >= fifteenMinutes){
     userTochangePassword.passwordResetCode = null;
     userTochangePassword.passwordResetTimestamp = null;
   }else{
     console.log('code is still valid');
   }}
   console.log(currentTimestamp);
 }, 1000);


resetBtn.addEventListener('click', function(){
    if(!resetCodeInput.value || !resetPasswordInput.value || !confirmPasswordInput.value){
      console.log('please fill in all the fields');
    }else if(resetCodeInput.value && userTochangePassword.passwordResetCode === null){
      console.log('your reset code as expired proceed to the forgot password page to get a new one');
    }else if(resetCodeInput.value !== userTochangePassword.passwordResetCode && userTochangePassword.passwordResetCode !== null){
      console.log('you entered the wrong code');
    }else if(resetPasswordInput.value !== confirmPasswordInput.value ){
      console.log('ensure you confirm your password very well');
    }else if(resetCodeInput.value === userTochangePassword.passwordResetCode && userTochangePassword.passwordResetCode !== null){
      if(adminArray.some(user => user.email === userTochangePassword.email)){
        const { newsaltHex, newhashHex } = hashPassword(resetPasswordInput.value);
        userTochangePassword.saltHex = newsaltHex;
        userTochangePassword.hashHex = newhashHex;
        saveCollection('admin', adminArray);
      }else if(studentsArray.some(user => user.Email === userTochangePassword.Email)){
        const { newsaltHex, newhashHex } = hashPassword(resetPasswordInput.value);
        userTochangePassword.saltHex = newsaltHex;
        userTochangePassword.hashHex = newhashHex;
        saveCollection('students', studentsArray);
      }else if(TeachersArray.some(user => user.Email === userTochangePassword.Email)){
        const { newsaltHex, newhashHex } = hashPassword(resetPasswordInput.value);
        userTochangePassword.saltHex = newsaltHex;
        userTochangePassword.hashHex = newhashHex;
        userTochangePassword.passwordResetCode = null;
        userTochangePassword.passwordResetTimestamp = null
        saveCollection('teachers', TeachersArray);
      }
  }
});