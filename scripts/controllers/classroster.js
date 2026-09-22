'use strict'
import { studentsArray } from "../module.js";
import { TeachersArray } from "../module.js";
import { gettingUser } from "../module.js";
import { saveCollection } from "../module.js";
import { requireAuth } from "../module.js";
import { schoolClasses } from "../module.js";
import { addStudent } from "../module.js";
import { deleteStudent } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { updateStudent } from "../module.js";
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
const logOutButton = document.querySelector('.log-out-btn');


const studentsContainer = document.querySelector('.students-container');
userName.textContent = currentTeacher.Name; 
const classNameTag = document.querySelector('.class-name-tag');
const currentTeacherClass = schoolClasses.find(cla => cla.id === currentTeacher.ClassId)


//heaader dom elements
const className = document.querySelector('.class-name');
className.textContent = `${currentTeacherClass.name} Roster`;
classNameTag.textContent = currentTeacherClass.name;
console.log(className);
const formOverlay = document.querySelector('.form-overlay');
//add student form dom elements
const showAddStudentForm = document.querySelector('.show-addStudentform');
const addStudentForm = document.querySelector('.add-student-form');
const closeaddStudentForm = document.querySelector('.close-addStudent-form');
const nameInput = document.querySelector('.name-input');
const dateInput = document.querySelector('.date-input');
const guardianNo = document.querySelector('.guardian-No');
const emailInput =  document.querySelector('.email-input');
const CancelAddBtn = document.querySelector('.cancel-btn');
const addButton = document.querySelector('.add-btn');
//edit student form dom elements
const editStudentForm = document.querySelector('.edit-student')
const editStudentNameInput = document.querySelector('.edit-Name');
const editStudentEmailInput = document.querySelector('.edit-Email');
const editStudentDobInput = document.querySelector('.edit-date');
const editStudentGuardianNo = document.querySelector('.edit-guardian-no');
const closeEditForm = document.querySelector('.close-edit-form');
const studentEditInstruction = document.querySelector('.student-for-edit');

//
const errorState = document.querySelector('.error-state');
console.log(errorState);
const closeErrorState = document.querySelector('.close-error-state');

const loadClassRoster = () =>{
    const teachersClassRoster = studentsArray.filter(users => users.Classid === currentTeacher.ClassId);
    mappingClassRoster(teachersClassRoster, studentsContainer);

    return teachersClassRoster
}
const teacherClassRoster = loadClassRoster();
console.log(teacherClassRoster);

showAddStudentForm.addEventListener('click', function(){
    addStudentForm.classList.remove('hidden');
    formOverlay.classList.remove('hidden');
});

CancelAddBtn.addEventListener('click', function(){
    addStudentForm.classList.add('hidden');
    formOverlay.classList.add('hidden');
})

addButton.addEventListener('click', async()=>{
    if(!nameInput.value||!dateInput.value||!guardianNo.value||!emailInput.value){
        console.log(nameInput.value, dateInput.value, guardianNo.value, emailInput.value);
        console.log(`you haven't filled in all the current information`);
    }else{
        let studentClass = schoolClasses.find(cla => cla.id === currentTeacher.ClassId);
        console.log(studentClass);
        if(await addStudent(nameInput.value, emailInput.value, dateInput.value, guardianNo.value, studentClass.id)){
        saveCollection('classes', schoolClasses);
        loadClassRoster();
        mappingClassRoster(teacherClassRoster, studentsContainer);
        addStudentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        }else{
           addStudentForm.classList.add('hidden');
           errorState.classList.remove('hidden');
           console.log(errorState);
           closeErrorState.addEventListener('click', function(){
           errorState.classList.add('hidden');
           formOverlay.classList.add('hidden');
           });
        }
       
    }
});

logOutButton.addEventListener('click', function(){
    clearSessionStorage();
});


