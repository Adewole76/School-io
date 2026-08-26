'use strict'
import { mapStudentsArray } from "../views/testView.js";
import { addStudent } from "../module.js"
import { studentsArray } from "../module.js";
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

studentsContainer.addEventListener('click', (event) => {
   if(event.target.closest('.delete-student')){
     console.log(event.target.closest('.student'))
   }
})
