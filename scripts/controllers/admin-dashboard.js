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

//sidebar elements and functions
const sidebar = document.querySelector('.sidebar')
const sidebarOverlay = document.querySelector('.overlay');
const sidebarToggleOn = document.querySelector('.sidebar-toggle-on');
const closeSidebarBtn = document.querySelector('.close-sidebar');
sidebarToggleOn.addEventListener('click', function(){
    sidebar.classList.add('active');
    sidebarOverlay.classList.remove('hidden');
});

closeSidebarBtn.addEventListener('click', function(){
  sidebar.classList.remove('active')
  sidebarOverlay.classList.add('hidden');
})
const sidebarUserName = document.querySelector('.sidebar-user-name');
const sidebarUserRole = document.querySelector('.sidebar-user-role');
const sidebarLogOutBtn = document.querySelector('.sidebar-logout-btn');
sidebarLogOutBtn.addEventListener('click', function(){
    clearSessionStorage();
})
sidebarUserRole.textContent = currentUserRole;
sidebarUserName.textContent = currentAdmin.name;



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
    window.location.href = "/pages/admin-manage-students.html";
})


const logOut = document.querySelector('.log-out');
logOut.addEventListener('click', function(){
    clearSessionStorage();
})