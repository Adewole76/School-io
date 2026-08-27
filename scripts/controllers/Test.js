'use strict'
import { mapStudentsArray } from "../views/testView.js";
import { addStudent } from "../module.js"
import { studentsArray } from "../module.js";
import { addTeacher } from "../module.js";
import { TeachersArray } from "../module.js";
import { deleteStudent } from "../module.js";
import { updateStudent } from "../module.js";
const studentsContainer = document.querySelector('.students-container');
const nameInput = document.querySelector('.name-input');
const ageInput = document.querySelector('.age-input');
const emailInput = document.querySelector('.email-input');
const dobInput = document.querySelector('.DOB-input');
const parentNumber = document.querySelector('.parent-phone-input');
const ClassIdSelect = document.querySelector('.classId-select');
const submitBtn = document.querySelector('.submit-btn')
const teacherNameInput = document.querySelector('.teacher-name-input');
const teacherEmailInput = document.querySelector('.teacher-email-input');
const teacherPasswordInput = document.querySelector('.teacher-password-input');
const teacherPhoneInput = document.querySelector('.teacher-phone-input');
const createTeacherBtn = document.querySelector('.add-teacher-btn');
mapStudentsArray(studentsArray, studentsContainer);
submitBtn.addEventListener('click', async () => {
    try {
        await addStudent(nameInput.value, ageInput.value, emailInput.value, dobInput.value, parentNumber.value, ClassIdSelect.value);
        console.log(studentsArray);
        mapStudentsArray(studentsArray, studentsContainer)
        
    } catch (error) {
        console.error("Failed to add student:", error);
    }
});

createTeacherBtn.addEventListener('click', async () => {
    try {
        await addTeacher(teacherNameInput.value, teacherEmailInput.value, teacherPasswordInput.value, null, teacherPhoneInput.value)
        console.log(TeachersArray);
    } catch (error) {
        console.log("Failed to add student:", error);
    }
})
