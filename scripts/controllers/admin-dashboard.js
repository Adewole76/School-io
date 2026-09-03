'use strict'
import { getCollection } from "../module.js";
import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { TeachersArray } from "../module.js"
import { studentsArray }  from "../module.js"
import { clearSessionStorage } from "../module.js";
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "adminid", adminArray, freshUserRole, 'admin');
    }
});
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser('currentUserRole');
console.log(currentUser);
const currentAdmin = adminArray.find(user => user.adminid === currentUser);
console.log(typeof adminArray);
requireAuth(currentUser, "adminid", adminArray, currentUserRole, 'admin');
const adminName = document.querySelector('.admin-name');
const totalTeachers = document.querySelector('.total-teachers');
const totalStudents = document.querySelector('.total-students');
const unassignedTeachers = document.querySelector('.unassinged-teachers');
const manageTeachers = document.querySelector('.manage-teachers');
const manageStudents = document.querySelector('.manage-students');
adminName.textContent = currentAdmin.name;
totalTeachers.textContent = TeachersArray.length;
totalStudents.textContent = studentsArray.length;
export const unassignedTeachersArray = TeachersArray.filter(user => user.ClassId === null);
unassignedTeachers.textContent = unassignedTeachersArray.length;

manageTeachers.addEventListener('click', function(){
    window.location.href = "/pages/admin-manage-teachers.html";
});
manageStudents.addEventListener('click', function(){
    window.location.href = "pages/admin-manage-students.html";
})


const logOut = document.querySelector('.log-out');
logOut.addEventListener('click', function(){
    clearSessionStorage();
})