'use strict'
import { TeachersArray } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { addAttendance } from "../module.js";
import { studentsArray } from "../module.js";
import { attendanceArray } from "../module.js"
import { getStudentsForTeachers } from "../module.js";
import { mappingAttendanceStudents } from "../views/attendance-view.js"
import { saveCollection } from "../module.js"
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
console.log(currentUser, currentUserRole);
const currentTeacher = TeachersArray.find(user => user.teacherId === currentUser);
requireAuth(currentUser, "teacherId", TeachersArray, currentUserRole, 'teacher');
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "teacherId", TeachersArray, freshUserRole, 'teacher');
    }
});


//navbar dom elements 
const userName = document.querySelector('.user-name');

//date select elements
const particularDay = document.querySelector('.day');
const prevDayBtn = document.querySelector('.prev-btn');
const nextDayBtn = document.querySelector('.next-btn');
const fullDate = document.querySelector('.full-date');

// term selection elements
const termPicker = document.querySelector('.term-picker');
const terms = document.querySelectorAll('term');

const attendanceContainer = document.querySelector('.mark-attendance-container');

const editableState = document.querySelector('.editable-state');
editableState.textContent = `Editable - today`;

userName.textContent = currentTeacher.Name;
const today = new Date();
const dayName = today.toLocaleString('en-US', { weekday: 'long' });

particularDay.textContent = dayName;
fullDate.textContent = today.toDateString(); 
console.log(today.toLocaleString())
console.log(dayName);

nextDayBtn.disabled = true;

// previous and next days buttons event listeners
let dayNum = 0
prevDayBtn.addEventListener('click', function(){
    nextDayBtn.disabled = false;
    const previousDays = new Date(today);
    dayNum ++
    previousDays.setDate(previousDays.getDate() - dayNum);
    const previousDaysName = previousDays.toLocaleString('en-US', { weekday: 'long' });
    particularDay.textContent = previousDaysName;
    fullDate.textContent = previousDays.toDateString();
    console.log(dayNum)
    if(previousDays.toLocaleString() !== today.toLocaleString()){
        editableState.textContent = `View only - Past date`
    }else{
        editableState.textContent = `Editable - today`
    }
})
nextDayBtn.addEventListener('click', function(){
    nextDayBtn.disabled = false;
    const previousDays = new Date(today);
    dayNum --
    previousDays.setDate(previousDays.getDate() - dayNum);
    const previousDaysName = previousDays.toLocaleString('en-US', { weekday: 'long' });
    particularDay.textContent = previousDaysName;
    fullDate.textContent = previousDays.toDateString();

    if(previousDays.toLocaleString() === today.toLocaleString()){
        nextDayBtn.disabled = true;
        editableState.textContent = `Editable - today`
    };
})

const loadAttendanceList = () =>{
    getStudentsForTeachers(currentTeacher.ClassId);
    mappingAttendanceStudents(getStudentsForTeachers(currentTeacher.ClassId), attendanceContainer);
}
loadAttendanceList();


//term picker event Listener
let termValue;
console.log(termValue)
termPicker.addEventListener('click', (event) => {
    if(event.target.closest('.term')){
        const particularButton = event.target.closest('.term');
        particularButton.classList.add('active-term')
        const terms = termPicker.querySelectorAll('.term');
        termValue = particularButton.textContent
        //console.log(termVValue);
        for(let i = 0; i < terms.length; i++){
            if(terms[i].textContent !== particularButton.textContent){
                terms[i].classList.remove('active-term');
            }
        }
    }
})
//attendance container event listeners for marking present/absent
attendanceContainer.addEventListener('click', (event)=>{
    if(event.target.closest('.present-btn')){
        //console.log(event.target.closest('.present-btn'))
        const parentContainer = event.target.closest('.attendance-record')
        console.log(parentContainer);
        const particularStudent = studentsArray.find(student => student.studentId === parentContainer.dataset.userId)
        console.log(particularStudent.studentId, particularStudent);
        const absentButton = parentContainer.querySelector('.absent-btn');
        console.log(absentButton);
        if(attendanceArray.some(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toLocaleDateString())){
           const particularAttendance = attendanceArray.find(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toLocaleDateString())
           particularAttendance.attendanceStatus = `present`; 
           saveCollection('attends', attendanceArray);
        }else if(!termValue && !attendanceArray.some(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toLocaleDateString())){
            console.log(`you have not selected a term`);
        }
        else{
            addAttendance(particularStudent.studentId, particularStudent.Classid, today.toLocaleDateString(), termValue, 'present')
            console.log(attendanceArray) 
        }
    }else if(event.target.closest('.absent-btn')){
        const parentContainer = event.target.closest('.attendance-record')
        const particularStudent = studentsArray.find(student => student.studentId === parentContainer.dataset.userId)
        console.log(particularStudent.studentId, particularStudent);
        const presentButton = parentContainer.querySelector('.present-btn');
        console.log(presentButton);
         if(attendanceArray.some(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toLocaleDateString())){
           const particularAttendance = attendanceArray.find(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toLocaleDateString())
           particularAttendance.attendanceStatus = `absent`; 
           saveCollection('attends', attendanceArray);
        }else if(!termValue && !attendanceArray.some(attendance => attendance.studentId === particularStudent.studentId && attendance.date === today.toDateString())){
            console.log(`you have not selected a term`);
        }
        else{
            addAttendance(particularStudent.studentId, particularStudent.Classid, today.toLocaleDateString(), termValue, 'absent')
            console.log(attendanceArray); 
        }
    }
});


