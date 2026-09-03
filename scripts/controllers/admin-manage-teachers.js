import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { TeachersArray } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { mapUnAssignedTeachers } from "../views/admin-manage-teacher-view.js"
import { mapAssignedTeachers } from "../views/admin-manage-teacher-view.js"
const teachersSection = document.querySelector('.teachers-section')
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "adminid", adminArray, currentUserRole, 'admin');

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "adminid", adminArray, freshUserRole, 'admin');
    }
});
const unassignedTeachers = TeachersArray.filter(user => user.ClassId === null);
const assignedTeachers = TeachersArray.filter(user => user.ClassId !== null);
const unassingnedContainer = document.querySelector('.unassinged-container');
const assignedContainer = document.querySelector('.assinged-container');
const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', function(){
 clearSessionStorage();
})


mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer)
mapAssignedTeachers(assignedTeachers, assignedContainer);


