'use strict'
import { TeachersArray } from "../module.js";
import { gradesArray } from "../module.js";
import { mappingGradeRecords } from "../views/record-grades-view.js"
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
   if(subjectSelect.value === 'Select a subject' || !activeTerm){
      mainGradesContainer.innerHTML = `Select a subject above to see the class roster and recording grades`;
   }else if(subjectSelect.value !== "Select a subject" && activeTerm){
   mappingGradeRecords(classStudents, mainGradesContainer);
   }
   return teachersStudents
}
let activeTerm;
for(let i = 0; i < terms.length; i++){
   terms[i].addEventListener('click', function(){
      terms[i].classList.add('active-term');
      activeTerm = terms[i].textContent;
      for(let i =0; i< terms.length; i++){
         if(terms[i].textContent !== activeTerm){
            terms[i].classList.remove('active-term');
         }
      }
        loadRecordGrades();
   })
};

const classStudents =  loadRecordGrades();


 subjectSelect.addEventListener('change', function(){
   loadRecordGrades()
 });
mainGradesContainer.addEventListener('change', (event) => {
   if(event.target.closest('.test-1-input')){
      const particulartest1Input = event.target.closest('.test-1-input');
      const particularOnPageRecord = event.target.closest('.grade-record');
      const particularStudentId = particularOnPageRecord.dataset.userId;
      console.log(particularOnPageRecord.dataset.userId);
      const particularTest2Input = particularOnPageRecord.querySelector('.test-2-input');
      const particularExamInput = particularOnPageRecord.querySelector('.Exam-input');
      console.log(particularTest2Input);
      console.log(particularExamInput);
       if(gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)){
       const particularCorrespondingRecord = gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)
       particularCorrespondingRecord.test1Score = particulartest1Input.value;
       saveCollection('grades', gradesArray)
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particulartest1Input.value), Number(particularTest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
    }
   }else if(event.target.closest('.test-2-input')){
      const particulartest2Input = event.target.closest('.test-2-input');
      const particularOnPageRecord = event.target.closest('.grade-record');
      const particularTest1Input = particularOnPageRecord.querySelector('.test-1-input');
      const particularExamInput = particularOnPageRecord.querySelector('.Exam-input');
      const particularStudentId = particularOnPageRecord.dataset.userId
      console.log(particularTest1Input);
      console.log(particularExamInput);
      console.log(particularOnPageRecord.dataset.userId);
      if(gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)){
        const particularCorrespondingRecord = gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)
       particularCorrespondingRecord.test2Score = particulartest2Input.value;
       saveCollection('grades', gradesArray);
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particularTest1Input.value), Number(particulartest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
    }
   }else if(event.target.closest('.Exam-input')){
      const particularExamInput = event.target.closest('.Exam-input');
      const particularOnPageRecord = event.target.closest('.grade-record')
      const particularStudentId = particularOnPageRecord.dataset.userId
      console.log(particularStudentId);
      const particularTest1Input = particularOnPageRecord.querySelector('.test-1-input');
      const particularTest2Input = particularOnPageRecord.querySelector('.test-2-input')
      console.log(particularTest1Input);
      console.log(particularTest2Input);
      if(gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)){
        const particularCorrespondingRecord = gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)
       particularCorrespondingRecord.examScore = particularExamInput.value;
       saveCollection('grades', gradesArray)
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particularTest1Input.value), Number(particularTest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
    }
   }
})