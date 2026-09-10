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
//const userTochangePassword = getCollection('userTochangePassword');

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
      



//console.log(userTochangePassword);
let currentTimestamp = Date.now();
const fifteenMinutes = 3 * 60 * 1000;
const fortyEightHrs = 40 * 60 * 60 * 1000;
//  setInterval(() => {
//    currentTimestamp = Date.now(); 
//    if(userTochangePassword){
//    let difference = currentTimestamp - userTochangePassword.passwordResetTimestamp;
//    console.log(difference);
//    if (difference >= fifteenMinutes){
//      userTochangePassword.passwordResetCode = null;
//      userTochangePassword.passwordResetTimestamp = null;
//    }else{
//      console.log('code is still valid');
//    }}
//    console.log(currentTimestamp);
//  }, 1000);


resetBtn.addEventListener('click', async() => {
    if(!resetCodeInput.value || !resetPasswordInput.value || !confirmPasswordInput.value){
      console.log('please fill in all the fields');
    }else if(resetCodeInput.value && resetPasswordInput.value === confirmPasswordInput.value){
      console.log(resetCodeInput.value);
      if(adminArray.some(user=> user.passwordResetCode === Number(resetCodeInput.value))){
        const particularAdmin = adminArray.find(user => user.passwordResetCode === Number(resetCodeInput.value));
        console.log(particularAdmin);
        let currentTimesstamp = Date.now();
        if (particularAdmin.passwordResetType === 'password reset' &&currentTimesstamp - particularAdmin.passwordResetTimestamp >= fifteenMinutes){
           console.log('you code has expired');
        }else if(particularAdmin.passwordResetType === 'password reset' && currentTimesstamp - particularAdmin.passwordResetTimestamp < fifteenMinutes){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularAdmin.passwordSalt = saltHex;
          particularAdmin.passwordHash = hashHex;
          saveCollection('admin', adminArray);
        }else if (particularAdmin.passwordResetType === 'setup' && currentTimesstamp - particularAdmin.passwordResetTimestamp >= fortyEightHrs){
          console.log('your code has expired');
        }else if(particularAdmin.passwordResetType === 'setup' && currentTimesstamp - particularAdmin.passwordResetTimestamp < fortyEightHrs){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularAdmin.passwordSalt = saltHex;
          particularAdmin.passwordHash = hashHex;
          saveCollection('admin', adminArray);
        }
      }else if(studentsArray.some(user=> user.passwordResetCode === resetCodeInput.value)){
        const particularStudent = studentsArray.find(user => user.passwordResetCode === resetCodeInput.value);
        console.log(particularStudent);
        let currentTimesstamp = Date.now();
        if (particularAdmin.passwordResetType === 'password reset' &&currentTimestamp - particularStudent.passwordResetTimestamp >= fifteenMinutes){
           console.log('you code has expired')
        }else if(particularAdmin.passwordResetType === 'password reset' && currentTimestamp - particularStudent.passwordResetTimestamp < fifteenMinutes){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularStudent.passwordSalt = saltHex;
          particularStudent.passwordHash = hashHex;
          saveCollection('teachers', TeachersArray);
        }else if (particularStudent.passwordResetType === 'setup' && currentTimestamp - particularStudent.passwordResetTimestamp >= fortyEightHrs){
          console.log('your code has expired');
        }else if(particularStudent.passwordResetType === 'setup' && currentTimestamp - particularStudent.passwordResetTimestamp < fortyEightHrs){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularStudent.passwordSalt = saltHex;
          particularStudent.passwordHash = hashHex;
          saveCollection('teachers', TeachersArray);
        }
      }else if(TeachersArray.some(user=> user.passwordResetCode === resetCodeInput.value)){
        const particularTeacher = studentsArray.find(user => user.passwordResetCode === resetCodeInput.value);
        console.log(particularTeacher);
        let currentTimesstamp = Date.now();
        if (particularTeacher.passwordResetType === 'password reset' &&currentTimestsamp - particularTeacher.passwordResetTimestamp >= fifteenMinutes){
           console.log('you code has expired')
        }else if(particularTeacher.passwordResetType === 'password reset' && currentTimesstamp - particularTeacher.passwordResetTimestamp < fifteenMinutes){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularTeacher.passwordSalt = saltHex;
          particularTeacher.passwordHash = hashHex;
          saveCollection('teachers', TeachersArray);
        }else if (particularTeacher.passwordResetType === 'setup' && currentTimesstamp - particularTeacher.passwordResetTimestamp >= fortyEightHrs){
          console.log('your code has expired');
        }else if(particularTeacher.passwordResetType === 'setup' && currentTimesstamp - particularTeacher.passwordResetTimestamp < fortyEightHrs){
          const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
          particularTeacher.passwordSalt = saltHex;
          particularTeacher.passwordHash = hashHex;
          saveCollection('teachers', TeachersArray);
        }
      }
//     }else if(Number(resetCodeInput.value) !== userTochangePassword.passwordResetCode && userTochangePassword.passwordResetCode !== null){
//       console.log(typeof resetCodeInput.value);
//       console.log(typeof userTochangePassword.passwordResetCode)
//       console.log('you entered the wrong code');
//     }else if(resetPasswordInput.value !== confirmPasswordInput.value ){
//       console.log('ensure you confirm your password very well');
//     }else if(Number(resetCodeInput.value) === userTochangePassword.passwordResetCode){
//       if(adminArray.some(user => user.email === userTochangePassword.email)){
//         const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
//         userTochangePassword.passwordSalt = saltHex;
//         userTochangePassword.passwordHash = hashHex;
//         console.log(userTochangePassword);
//         const adminRecordTochange = adminArray.find(user => user.email === userTochangePassword.email);
//         console.log(adminRecordTochange);
//         adminRecordTochange.passwordSalt = userTochangePassword.passwordSalt;
//         adminRecordTochange.passwordHash = userTochangePassword.passwordHash
//         saveCollection('admin', adminArray);
//         console.log(TeachersArray);
//         userTochangePassword.passwordResetCode = null;
//         userTochangePassword.passwordResetTimestamp = null
//       }else if(studentsArray.some(user => user.Email === userTochangePassword.Email)){
//         const { saltHex, hashHex } = await hashPassword(resetPasswordInput.value);
//         userTochangePassword.passwordSalt = saltHex;
//         userTochangePassword.passwordHash = hashHex;
//         console.log(userTochangePassword);
//         const studentRecordTochange = studentsArray.find(user => user.Email === userTochangePassword.Email);
//         studentRecordTochange.passwordSalt = userTochangePassword.passwordSalt;
//         studentRecordTochange.passwordHash = userTochangePassword.passwordHash
//         saveCollection('students', studentsArray);
//         console.log(studentsArray);
//         userTochangePassword.passwordResetCode = null;
//         userTochangePassword.passwordResetTimestamp = null
//       }else if(TeachersArray.some(user => user.Email === userTochangePassword.Email)){
//         const { saltHex, hashHex } = await  hashPassword(resetPasswordInput.value);
//         userTochangePassword.passwordSalt = saltHex;
//         userTochangePassword.passwordHash = hashHex;
//         console.log(userTochangePassword);
//         const TeacherRecordTochange = TeachersArray.find(user => user.Email === userTochangePassword.Email);
//         TeacherRecordTochange.passwordSalt = userTochangePassword.passwordSalt;
//         TeacherRecordTochange.passwordHash = userTochangePassword.passwordHash
//          saveCollection('teachers', TeachersArray);
//          console.log(TeachersArray);
//         userTochangePassword.passwordResetCode = null;
//         userTochangePassword.passwordResetTimestamp = null
       
//       }
//   }
// 
}});