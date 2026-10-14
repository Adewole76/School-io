'use strict'
import { requireAuth } from "../module.js";
import { studentsArray } from "../module.js";
import { gettingUser } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { schoolClasses } from "../module.js";
import { gradesArray } from "../module.js";
const currentUser = gettingUser('currentUserId');
const currentUserRole = gettingUser("currentUserRole");
const currentStudent  = studentsArray.find(user => user.studentId === currentUser);  
const currentStudentClass = schoolClasses.find(clas => clas.id === currentStudent.Classid);
window.addEventListener('pageshow', (event) => {
    if(event.persisted){
    const freshUserId = gettingUser("currentUserId");
    const freshUserRole = gettingUser("currentUserRole");
    requireAuth(freshUserId, "studentId", studentsArray, freshUserRole, 'student');
    }
});
requireAuth(currentUser, "studentId", studentsArray, currentUserRole, 'student');


console.log(currentStudent);
const WelcomeMessage = document.querySelector('.welcome-message');

//nav bar elements
const logOutBtn = document.querySelector('.log-out-btn');
const userName = document.querySelector('.user-name');

//profile details
const dateOfBirth = document.querySelector('.Date-of-birth');
const studentClass = document.querySelector('.student-Class');
const GuardianParentContact = document.querySelector('.Guardian-Parent-Contact');
const Email = document.querySelector('.Email');

dateOfBirth.textContent = currentStudent.dateOfBirth;
studentClass.textContent = currentStudentClass.name;
GuardianParentContact.textContent = currentStudent.ParentGuardianNo;
Email.textContent = currentStudent.Email;

userName.textContent = `${currentStudent.Name}`

WelcomeMessage.textContent = `Welcome to your dashboard ${currentStudent.Name}`;

logOutBtn.addEventListener('click', function (){
    clearSessionStorage();
})

