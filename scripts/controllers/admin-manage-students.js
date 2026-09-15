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
import {deleteStudent} from "../module.js";

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "adminid", adminArray, freshUserRole, 'admin');
    }
});

const currentUser = gettingUser('currentUserId');
console.log(currentUser);
const adminName = document.querySelector('.admin-name');
const userName = adminArray.find(user => user.adminid === currentUser);
adminName.textContent = userName.name;
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "adminid", adminArray, currentUserRole, 'admin');
const classContainer = document.querySelector('.class-container');
mappingStudentsArray(studentsArray, classContainer);
const activateFormButton = document.querySelector('.add-button');
const logoutButton = document.querySelector('.logout-btn');
const addStudentForm = document.querySelector('.add-student-form');
const addBtn = document.querySelector('.add-btn');
const formOverlay = document.querySelector('.overlay');
// add student form Input variables
const nameInput = document.querySelector('.name-input');
const dateInput = document.querySelector('.date-input');
const classSelect = document.querySelector('.class-select');
const guardianNo = document.querySelector('.guardian-No');
const emailInput =  document.querySelector('.email-input');
const CancelAddBtn = document.querySelector('.cancel-btn');
const closeAddForm = document.querySelector('.close-addStudent-form');
// edit student form input variables
const editStudentNameInput = document.querySelector('.edit-Name');
const editStudentEmailInput = document.querySelector('.edit-Email');
const editStudentDobInput = document.querySelector('.edit-date');
const editStudentGuardianNo = document.querySelector('.edit-guardian-no');
const editStudentClassId = document.querySelector('.edit-student-class');
const closeEditForm = document.querySelector('.close-edit-form');
const studentEditInstruction = document.querySelector('.student-for-edit');
// essential edit student variables
const emptyState = document.querySelector('.empty-state');
const editStudent = document.querySelector('.edit-student');
const saveEdit = document.querySelector('.save-edit');
const cancelEdit = document.querySelector('.cancel-edit');
// search bar
const searchBar = document.querySelector('.search-bar');
const searchClassDropdown = document.querySelector('.search-class-dropdown');
//delete student variables
const studentDeleteSection = document.querySelector('.student-delete-confirmation');
const cancelDeleteBtn = document.querySelector('.cancel-del');
const deleteStudentBtn = document.querySelector('.delete-student');
const showDeleteBtn = document.querySelector('.show-delete');


logoutButton.addEventListener('click', function(){
  clearSessionStorage()
})
activateFormButton.addEventListener('click', async()=>{
    addStudentForm.classList.remove('hidden');
    formOverlay.classList.remove('hidden');
});
addBtn.addEventListener('click', async()=>{
    if(!nameInput.value||!dateInput.value||classSelect.value === 'Select a class'||!guardianNo.value||!emailInput.value){
       console.log(nameInput.value, dateInput.value, classSelect.value, guardianNo.value, emailInput.value);
        console.log(`you haven't filled in all the current information`);
    }else{
        let studentClass = schoolClasses.find(cla => cla.name === classSelect.value);
        console.log(studentClass);
        await addStudent(nameInput.value, emailInput.value, dateInput.value, guardianNo.value, studentClass.id)
        saveCollection('classes', schoolClasses);
        mappingStudentsArray(studentsArray, classContainer);
        addStudentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
    }
});

CancelAddBtn.addEventListener('click', function(){
  addStudentForm.classList.add('hidden');
  formOverlay.classList.add('hidden');
});
closeAddForm.addEventListener('click', function(){
  addStudentForm.classList.add('hidden');
  formOverlay.classList.add('hidden');
})

classContainer.addEventListener('click', (event) => {
    if(event.target.closest('.edit-btn')){
        const particularStudent = event.target.closest('.student');
        console.log(particularStudent);
        editStudent.classList.remove('hidden');
        formOverlay.classList.remove('hidden')
        let studentToEdit = particularStudent.dataset.userId;
        let particularStudentObject = studentsArray.find(user => user.studentId === studentToEdit)
        console.log(studentToEdit);
        studentEditInstruction.textContent = `Update ${particularStudentObject.Name}'s profile details below`;
        saveEdit.addEventListener('click', function(){
        let newstudentClass = schoolClasses.find(cla => cla.name === editStudentClassId.value);
        console.log(newstudentClass);
           updateStudent(studentToEdit, editStudentNameInput.value, editStudentEmailInput.value, editStudentDobInput.value, editStudentGuardianNo.value, !newstudentClass?particularStudentObject.Classid:newstudentClass.id);
           editStudent.classList.add('hidden');
           formOverlay.classList.add('hidden');
           //saveCollection('students', studentsArray);
           saveCollection('classes', schoolClasses);
           mappingStudentsArray(studentsArray, classContainer);
        });   
        showDeleteBtn.addEventListener('click', function(){
        studentDeleteSection.classList.remove('hidden');
        showDeleteBtn.classList.add('hidden');
        });
        closeEditForm.addEventListener('click', function(){
        editStudent.classList.add('hidden');
        formOverlay.classList.add('hidden');
        })
        cancelDeleteBtn.addEventListener('click', function(){
        studentDeleteSection.classList.add('hidden');
        showDeleteBtn.classList.remove('hidden');
        });
        deleteStudentBtn.addEventListener('click', function(){
            deleteStudent(studentToEdit);
            mappingStudentsArray(studentsArray, classContainer);
            editStudent.classList.add('hidden');
            formOverlay.classList.add('hidden');
        });
    }
})

function fetchSearchResults(query) {
  console.log(`🔍 Getting student with record: "${query}"`);
  let filteredStudentsArray = studentsArray.filter(user => user.Name.toLowerCase().includes(query.toLowerCase()));
  
  if(filteredStudentsArray.length > 0){
  mappingStudentsArray(filteredStudentsArray, classContainer)
  }else if (filteredStudentsArray.length === 0){
    // classContainer.innerHTML= 
  }
;
}

// Wrap the original function in your debounce utility with a 500ms delay
const debouncedSearch = debounce((event) => {
  fetchSearchResults(event.target.value);
}, 500);

// Attach the debounced function to the event listener

searchBar.addEventListener('input', debouncedSearch);

function fetchSearchDropdown(query) {
  console.log(`🔍 Getting student with record: "${query}"`);
  if(query !== 'All classes'){
  const particularClass = schoolClasses.find(cla => cla.name === query);
  const filteredStudentsArray = studentsArray.filter(user => user.Classid === particularClass.id);
  mappingStudentsArray(filteredStudentsArray, classContainer);
}
}

// Wrap the original function in your debounce utility with a 500ms delay
const debouncedSearchDropdown = debounce((event) => {
  fetchSearchDropdown(event.target.value);
}, 500);

// Attach the debounced function to the event listener
searchClassDropdown.addEventListener('change', debouncedSearchDropdown);