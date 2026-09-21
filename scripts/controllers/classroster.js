'use strict'
import { studentsArray } from "../module.js";
import { TeachersArray } from "../module.js";
import { gettingUser } from "../module.js";
import { saveCollection } from "../module.js";
import { requireAuth } from "../module.js";
import { addStudent } from "../module.js";
import { deleteStudent } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { mappingClassRoster } from "../views/classroster-view.js";

const currentUser = gettingUser('currentUserId');
const currentRole = gettingUser('currentUserRole');
const currentTeacher = TeachersArray.find(user => user.teacherId === currentUser);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "teacherId", TeachersArray, freshUserRole, 'teacher');
    }
});
requireAuth(currentUser,"teacherId", TeachersArray, currentRole, "teacher");
//nav bar dom element
const userName = document.querySelector('.user-name');
const studentsContainer = document.querySelector('.students-container');
userName.textContent = currentTeacher.Name; 

//add student form dom elements
const addStudentForm = document.querySelector('.add-student-form');
const closeaddStudentForm = document.querySelector('.close-addStudent-form');
const nameInput = document.querySelector('.name-input');
const dateInput = document.querySelector('.date-input');
const guardianNo = document.querySelector('.guardian-No');
const emailInput =  document.querySelector('.email-input');
const CancelAddBtn = document.querySelector('.cancel-btn');

//edit student form dom elements
const editStudentNameInput = document.querySelector('.edit-Name');
const editStudentEmailInput = document.querySelector('.edit-Email');
const editStudentDobInput = document.querySelector('.edit-date');
const editStudentGuardianNo = document.querySelector('.edit-guardian-no');
const closeEditForm = document.querySelector('.close-edit-form');
const studentEditInstruction = document.querySelector('.student-for-edit');


const editStudentForm = document.querySelector('.edit-student')
const loadClassRoster = () =>{
    const teachersClassRoster = studentsArray.filter(users => users.Classid === currentTeacher.ClassId);
    mappingClassRoster(teachersClassRoster, studentsContainer);
}
loadClassRoster();