'use strict'
import { requireAuth } from "../module.js";
import { studentsArray } from "../module.js";
import { gettingUser } from "../module.js";
import { clearSessionStorage } from "../module.js";
window.addEventListener('pageshow', (event) => {
    if(event.persisted){
    const freshUserId = gettingUser("currentUserId");
    const freshUserRole = gettingUser("currentUserRole");
    requireAuth(freshUserId, "studentId", studentsArray, freshUserRole, 'student');
    }
});
requireAuth(currentUser, "studentId", studentsArray, currentUserRole, 'student');

const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
const currentStudent  = studentsArray.find(user => user.studentId === currentUser);  
const WelcomeMessage = document.querySelector('.welcome-message');

//nav bar elements
const logOutBtn = document.querySelector('.log-out-btn');

WelcomeMessage.textContent = `Welcome to your dashboard ${currentStudent.Name}`;

logOutBtn.addEventListener('click', function (){
    clearSessionStorage();
})

