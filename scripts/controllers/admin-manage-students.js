import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { clearSessionStorage } from "../module.js";
import {studentsArray} from "../module.js";
import {mappingStudentsArray} from "../views/admin-manage-students-view.js"
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "adminid", adminArray, freshUserRole, 'admin');
    }
});
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "adminid", adminArray, currentUserRole, 'admin');
const classContainer = document.querySelector('.class-container');
mappingStudentsArray(studentsArray, classContainer);
const addButton = document.querySelector('.add-button');