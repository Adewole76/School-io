'use strict'
import { requireAuth } from "../module.js";
import { studentsArray } from "../module.js";
import { gettingUser } from "../module.js";
import { clearSessionStorage } from "../module.js";
const logOutBtn = document.querySelector('.logout-btn');
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole")
requireAuth(currentUser, "studentId", studentsArray, 'student');
logOutBtn.addEventListener('click', function (){
    clearSessionStorage();
})
window.addEventListener('pageshow', (event) => {
    // Your code to execute when the page is shown
    requireAuth(currentUser, "studentId", studentsArray, 'student');
});