'use strict'
import { requireAuth } from "../module.js";
import { studentsArray } from "../module.js";
import { gettingUser } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { schoolClasses } from "../module.js";
import { gradesArray } from "../module.js";
import { attendanceArray } from "../module.js";
import { mappingStudentResults } from "../views/student-dashboard-view.js";
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
requireAuth(currentUser, "studentId", studentsArray, currentUserRole, 'student');
window.addEventListener('pageshow', (event) => {
    if(event.persisted){
    const freshUserId = gettingUser("currentUserId");
    const freshUserRole = gettingUser("currentUserRole");
    requireAuth(freshUserId, "studentId", studentsArray, freshUserRole, 'student');
    }
});

const currentStudent  = studentsArray.find(user => user.studentId === currentUser);  
const currentStudentClass = schoolClasses.find(clas => clas.id === currentStudent.Classid);

const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.overlay');
const sidebarToggleOn = document.querySelector('.sidebar-toggle-on');
const closeSidebarBtn = document.querySelector('.close-sidebar');
if (sidebarToggleOn && sidebar && sidebarOverlay) {
    sidebarToggleOn.addEventListener('click', function(){
        sidebar.classList.add('active');
        sidebarOverlay.classList.remove('hidden');
    });
}
if (closeSidebarBtn && sidebar && sidebarOverlay) {
    closeSidebarBtn.addEventListener('click', function(){
        sidebar.classList.remove('active');
        sidebarOverlay.classList.add('hidden');
    });
}
const sidebarUserName = document.querySelector('.sidebar-user-name');
const sidebarUserRole = document.querySelector('.sidebar-user-role');
const sidebarLogOutBtn = document.querySelector('.sidebar-logout-btn');
if (sidebarLogOutBtn) {
    sidebarLogOutBtn.addEventListener('click', function(){
        clearSessionStorage();
    });
}
if (sidebarUserRole) sidebarUserRole.textContent = currentUserRole;
if (sidebarUserName && currentStudent) sidebarUserName.textContent = currentStudent.Name;



console.log(currentStudent);
const WelcomeMessage = document.querySelector('.welcome-message');

//nav bar elements
const logOutBtn = document.querySelector('.log-out-btn');
const userName = document.querySelector('.user-name');

//empty state elements
const emptyState = document.querySelector('.empty-state');
const emptyStateHeading = document.querySelector('.empty-state-heading');


//profile details elements
const dateOfBirth = document.querySelector('.Date-of-birth');
const studentClass = document.querySelector('.student-Class');
const GuardianParentContact = document.querySelector('.Guardian-Parent-Contact');
const Email = document.querySelector('.Email');
const userProfileName = document.querySelector('.user-profile-name');

userProfileName.textContent = currentStudent.Name;

//attendance stats section elements
const attendanceStats = document.querySelector('.attendance-stats');
const noOfDaysPresent = document.querySelector('.no-present');
const noOfDaysAbsent = document.querySelector('.no-absent');
const attendanceRate = document.querySelector('.attendance-rate');


//results sections elements
const mainResultsContainer = document.querySelector('.main-results-container');
const termPicker = document.querySelector('.term-picker');
const terms = document.querySelectorAll('.term');

userName.textContent = currentStudent.Name;
WelcomeMessage.textContent = `Welcome back, ${currentStudent.Name}`;

dateOfBirth.textContent = currentStudent.dateOfBirth;
studentClass.textContent = currentStudentClass.name;
GuardianParentContact.textContent = currentStudent.ParentGuardianNo;
Email.textContent = currentStudent.Email;

export let activeTerm = 'First Term';
for(let i = 0; i < terms.length; i++){
    if(terms[i].textContent === activeTerm){
        terms[i].classList.add('active-term');
    }
}

const loadAttendanceInfo = () => {
  const NumberOfDaysPresent = attendanceArray.filter(record => record.studentId === currentStudent.studentId && record.attendanceStatus === 'present');
  const NumberOfDaysAbsent = attendanceArray.filter(record => record.studentId === currentStudent.studentId && record.attendanceStatus === 'absent');
  let attendanceRateCalculation = (NumberOfDaysPresent.length / 120) * 100

  
  if(NumberOfDaysPresent.length || NumberOfDaysAbsent.length){
  noOfDaysPresent.textContent = `${NumberOfDaysPresent.length}/120`;
  noOfDaysAbsent.textContent = `${NumberOfDaysAbsent.length}`;
  attendanceRate.textContent = `${attendanceRateCalculation.toFixed(2)}`;
  }else if(!NumberOfDaysPresent.length && !NumberOfDaysAbsent.length){
    attendanceStats.innerHTML = `<div>
    <p>When your teacher starts marking your attendance it will show here</p>
    </div>`
  }
}
loadAttendanceInfo();
const loadResults = () => {    
const currentStudentGrades = gradesArray.filter(grade => grade.studentId === currentStudent.studentId && grade.term === activeTerm);
mappingStudentResults(currentStudentGrades, mainResultsContainer);
console.log(currentStudentGrades);
}
loadResults();

termPicker.addEventListener('click', (event) =>{
    if(event.target.closest('.term')){
        const particularTerm = event.target.closest('.term');
        particularTerm.classList.add('active-term');
        console.log(particularTerm);
        activeTerm = particularTerm.textContent;
        console.log(activeTerm); 
        loadResults();
         for(let i = 0; i < terms.length; i++){
             if(terms[i].textContent !== particularTerm.textContent){
                 terms[i].classList.remove('active-term');
             }
         }
    }
})



logOutBtn.addEventListener('click', function (){
    clearSessionStorage();
});
