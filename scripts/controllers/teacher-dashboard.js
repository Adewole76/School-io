'use strict'
import { TeachersArray } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";

const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
console.log(currentUser, currentUserRole);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "teacherId", TeachersArray, freshUserRole, 'teacher');
    }
});
const currentTeacher = TeachersArray.find(user => user.teacherId === currentUser);
requireAuth(currentUser, "teacherId", TeachersArray, currentUserRole, 'teacher')
const userName = document.querySelector('.user-name');
const userName2 = document.querySelector('.user-name-2')
const userSubject = document.querySelector('.user-subject');
const logOutBtn = document.querySelector('.log-out-btn');
console.log(TeachersArray);

userName.textContent = currentTeacher.Name;
userName2.textContent = currentTeacher.Name;
userSubject.textContent = currentTeacher.teacherSubject;

logOutBtn.addEventListener('click', function(){
    clearSessionStorage();
})
