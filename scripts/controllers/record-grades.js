'use strict'
import { TeachersArray } from "../module.js";
import { gradesArray } from "../module.js";
import { mappingGradesRecords } from "../views/record-grades-view.js"
import { clearSessionStorage } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { studentsArray } from "../module.js";
import { addGrades } from "../module.js";
import { saveCollection } from "../module.js";
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
console.log(currentUser, currentUserRole);
const currentTeacher = TeachersArray.find(user => user.teacherId === currentUser);
requireAuth(currentUser, "teacherId", TeachersArray, currentUserRole, 'teacher');
window.addEventListener('pageshow', (event) => {
   if(event.persisted){
      const freshUserId = gettingUser('currentUserId');
      const freshUserRole = gettingUser('currentUserRole')
      requireAuth(freshUserId, "teacherId", TeachersArray, freshUserRole, 'teacher');
   }
});

//navbar elements
const userName = document.querySelector('.user-name');
userName.textContent  = currentTeacher.Name

//subjects and terms pickers
const subjectSelect = document.querySelector('.subject-select');
const termPicker = document.querySelector('.term-picker');
const terms = document.querySelectorAll('.term');

const mainGradesContainer = document.querySelector('.main-grades-container');

const loadRecordGrades = ()=>{
   const teachersStudents = studentsArray.filter(student => student.Classid === currentTeacher.ClassId);
   console.log(teachersStudents);
   if(subjectSelect.value !== "Select a subject"){
   mappingGradesRecords(teachersStudents, mainGradesContainer)
   }else {
      mainGradesContainer.innerHTML = `Select a subject above to see the class roster and recording grades`;
   }
}
loadRecordGrades()