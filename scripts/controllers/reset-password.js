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

async function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const hashBuffer = await crypto.subtle.deriveBits(
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
   console.log(difference);
   if (difference >= fifteenMinutes){
     userTochangePassword.passwordResetCode = null;
     userTochangePassword.passwordResetTimestamp = null;
   }else{
     console.log('code is still valid');
   }}
   console.log(currentTimestamp);
 }, 1000);


resetBtn.addEventListener('click', async() => {
    if(!resetCodeInput.value || !resetPasswordInput.value || !confirmPasswordInput.value){
      console.log('please fill in all the fields');
    }else if(resetCodeInput.value && userTochangePassword.passwordResetCode === null){
      console.log('your reset code as expired proceed to the forgot password page to get a new one');
    }else if(Number(resetCodeInput.value) !== userTochangePassword.passwordResetCode && userTochangePassword.passwordResetCode !== null){
      console.log(typeof resetCodeInput.value);
      console.log(typeof userTochangePassword.passwordResetCode)
      console.log('you entered the wrong code');
    }else if(resetPasswordInput.value !== confirmPasswordInput.value ){
      console.log('ensure you confirm your password very well');
    }else if(Number(resetCodeInput.value) === userTochangePassword.passwordResetCode){
      if(adminArray.some(user => user.email === userTochangePassword.email)){
        const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
        userTochangePassword.passwordSalt = saltHex;
        userTochangePassword.passwordHash = hashHex;
        saveCollection('admin', adminArray);
      }else if(studentsArray.some(user => user.Email === userTochangePassword.Email)){
        const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
        userTochangePassword.passwordSalt = saltHex;
        userTochangePassword.passwordHash = hashHex;
        saveCollection('students', studentsArray);
      }else if(TeachersArray.some(user => user.Email === userTochangePassword.Email)){
        const { saltHex, hashHex } = await  hashPassword(resetPasswordInput.value);
        userTochangePassword.passwordSalt = saltHex;
        userTochangePassword.passwordHash = hashHex;
        console.log(userTochangePassword);
        const TeacherRecordTochange = TeachersArray.find(user => user.Email === userTochangePassword.Email);
        TeacherRecordTochange.passwordSalt = userTochangePassword.passwordSalt;
        TeacherRecordTochange.passwordHash = userTochangePassword.passwordHash
         saveCollection('teachers', TeachersArray);
         console.log(TeachersArray);
        userTochangePassword.passwordResetCode = null;
        userTochangePassword.passwordResetTimestamp = null
       
      }
  }
});