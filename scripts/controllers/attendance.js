'use strict'
import { TeachersArray } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { addAttendance } from "../module.js";
import { studentsArray } from "../module.js";
import { getStudentsForTeachers } from "../module.js";
import { mappingAttendanceStudents } from "../views/attendance-view.js"
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
const termPicker = document.querySelector('.term-picker');
const terms = document.querySelectorAll('term');

const attendanceContainer = document.querySelector('.mark-attendance-container');

//
const presentBtn = document.querySelector('.present-btn');
const absentBtn = document.querySelector('.absent-btn');
userName.textContent = currentTeacher.Name;
const today = new Date();
const dayName = today.toLocaleString('en-US', { weekday: 'long' });

particularDay.textContent = dayName;
fullDate.textContent = today.toDateString(); 
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
    }
})


const loadAttendanceList = () =>{
    getStudentsForTeachers(currentTeacher.ClassId);
    mappingAttendanceStudents(getStudentsForTeachers(currentTeacher.ClassId), attendanceContainer);
}
loadAttendanceList();

attendanceContainer.addEventListener('click', (event)=>{
})