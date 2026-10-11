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


const subjectGradesStats = document.querySelector('.subject-grades-stats');
const averageForEachSubject = document.querySelector('.average');
const NoOfCompletedRecords = document.querySelector('.completed-records');
const mainGradesContainer = document.querySelector('.main-grades-container');


let activeTerm;
const loadRecordGrades = ()=>{
   const teachersStudents = studentsArray.filter(student => student.Classid === currentTeacher.ClassId);
   console.log(teachersStudents);
   if(subjectSelect.value === 'Select a subject' || !activeTerm){
      mainGradesContainer.innerHTML = `Select a subject above to see the class roster and recording grades`;
   }else if(subjectSelect.value !== "Select a subject" && activeTerm){
      mappingGradeRecords(classStudents, mainGradesContainer);
      const records = mainGradesContainer.querySelectorAll('.grade-record');
      console.log(records);
      for(let i = 0; i < records.length; i++){
      if(gradesArray.find(grade => grade.studentId === records[i].dataset.userId && grade.gradeSubject === subjectSelect.value && grade.term === activeTerm)){
         let grades = gradesArray.find(grade => grade.studentId === records[i].dataset.userId && grade.gradeSubject === subjectSelect.value && grade.term === activeTerm)
         let test1inputs = records[i].querySelector('.test-1-input');
         let test2inputs = records[i].querySelector('.test-2-input');
         let ExamInputs = records[i].querySelector('.Exam-input');    

         test1inputs.value = grades.test1Score;
         test2inputs.value = grades.test2Score;
         ExamInputs.value = grades.examScore;
       }

      }
       const currentTermSubjectRecord = gradesArray.filter(grade => grade.term === activeTerm && grade.gradeSubject === subjectSelect.value)
       console.log(currentTermSubjectRecord);
       let accumulatedResult = [];
       for(let i = 0; i < currentTermSubjectRecord.length; i++){
         let overallResult = currentTermSubjectRecord[i].test1Score + currentTermSubjectRecord[i].test2Score + currentTermSubjectRecord[i].examScore;
         accumulatedResult.push(overallResult);
         console.log(accumulatedResult); 
       }
       console.log(accumulatedResult);
       const totalSumOfOverallScores =  accumulatedResult.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(totalSumOfOverallScores);
const averageScore = totalSumOfOverallScores / teachersStudents.length;
console.log(averageScore);

}
   return teachersStudents
}

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
       particularCorrespondingRecord.test1Score = Number(particulartest1Input.value);
       saveCollection('grades', gradesArray)
       loadRecordGrades()
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particulartest1Input.value), Number(particularTest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
     loadRecordGrades()
    }
   }else if(event.target.closest('.test-2-input')){
      const particulartest2Input = event.target.closest('.test-2-input');
      const particularOnPageRecord = event.target.closest('.grade-record');
      const particularTest1Input = particularOnPageRecord.querySelector('.test-1-input');
      const particularExamInput = particularOnPageRecord.querySelector('.Exam-input');
      const particularStudentId = particularOnPageRecord.dataset.userId;
      console.log(particularTest1Input);
      console.log(particularExamInput);
      console.log(particularOnPageRecord.dataset.userId);
      if(gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)){
        const particularCorrespondingRecord = gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)
       particularCorrespondingRecord.test2Score = Number(particulartest2Input.value);
       saveCollection('grades', gradesArray);
       loadRecordGrades()
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particularTest1Input.value), Number(particulartest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
     loadRecordGrades()
    }
   }else if(event.target.closest('.Exam-input')){
      const particularExamInput = event.target.closest('.Exam-input');
      const particularOnPageRecord = event.target.closest('.grade-record')
      const particularStudentId = particularOnPageRecord.dataset.userId;
      console.log(particularStudentId);
      const particularTest1Input = particularOnPageRecord.querySelector('.test-1-input');
      const particularTest2Input = particularOnPageRecord.querySelector('.test-2-input')
      console.log(particularTest1Input);
      console.log(particularTest2Input);
      if(gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)){
        const particularCorrespondingRecord = gradesArray.find(grade => grade.gradeSubject === subjectSelect.value && grade.term === activeTerm && grade.studentId === particularStudentId)
       particularCorrespondingRecord.examScore = Number(particularExamInput.value);
       saveCollection('grades', gradesArray)
       loadRecordGrades()
    }else{
     addGrades(particularStudentId, activeTerm, subjectSelect.value, Number(particularTest1Input.value), Number(particularTest2Input.value), Number(particularExamInput.value));
     console.log(gradesArray); 
     loadRecordGrades()
    }
   }
})