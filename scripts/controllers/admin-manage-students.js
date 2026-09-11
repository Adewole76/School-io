import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import {saveCollection} from "../module.js";
import { clearSessionStorage } from "../module.js";
import {studentsArray} from "../module.js";
import {schoolClasses} from "../module.js";
import {mappingStudentsArray} from "../views/admin-manage-students-view.js"
import {addStudent} from "../module.js";
import {updateStudent} from "../module.js";
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
const activateFormButton = document.querySelector('.add-button');
const logoutButton = document.querySelector('.logout-btn');
const addStudentForm = document.querySelector('.add-student-form');
const addBtn = document.querySelector('.add-btn');
const nameInput = document.querySelector('.name-input');
const dateInput = document.querySelector('.date-input');
const classSelect = document.querySelector('.class-select');
const guardianNo = document.querySelector('.guardian-No');
const emailInput =  document.querySelector('.email-input');
const emptyState = document.querySelector('.empty-state');
const editStudent = document.querySelector('.edit-student');
const saveEdit = document.querySelector('.save-edit');
const cancelEdit = document.querySelector('.cancel-edit');


activateFormButton.addEventListener('click', async()=>{
    addStudentForm.classList.remove('hidden');
});
addBtn.addEventListener('click', async()=>{
    if(!nameInput.value||!dateInput.value||classSelect.value === 'Select a class'||!guardianNo.value||!emailInput.value){
       console.log(nameInput.value, dateInput.value, classSelect.value, guardianNo.value, emailInput.value);
        console.log(`you haven't filled in all the current information`);
    }else{
        let studentClass = schoolClasses.find(cla => cla.name === classSelect.value);
        console.log(studentClass);
        await addStudent(nameInput.value, emailInput.value, dateInput.value, guardianNo.value, studentClass.id)
        saveCollection('students', studentsArray);
        saveCollection('classes', schoolClasses);
        mappingStudentsArray(studentsArray, classContainer);
        addStudentForm.classList.add('hidden');
    }
});

classContainer.addEventListener('click', (event) => {
    if(event.target.closest('.edit-btn')){
        const particularStudent = event.target.closest('.student');
        console.log(particularStudent);
        editStudent.classList.remove('hidden');
        let studentToEdit = particularStudent.dataset.userId;
        console.log(studentToEdit);
        saveEdit.addEventListener('click', function(){
           updateStudent(studentToEdit, )
         })   
    }
})