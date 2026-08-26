'use strict'
import { addStudent } from "../module.js"
import { getCollection } from "../module.js";
import { saveCollection } from "../module.js";
import { studentsArray } from "../module.js";
const nameInput = document.querySelector('.name-input');
const ageInput = document.querySelector('.age-input');
const emailInput = document.querySelector('.email-input');
const dobInput = document.querySelector('.DOB-input');
const parentNumber = document.querySelector('.parent-phone-input');
const ClassIdSelect = document.querySelector('.classId-select');
const submitBtn = document.querySelector('.submit-btn')

submitBtn.addEventListener('click', async () => {
    try {
        await addStudent(nameInput.value, ageInput.value, emailInput.value, dobInput.value, parentNumber.value, ClassIdSelect.value);
        console.log(studentsArray);
        
    } catch (error) {
        console.error("Failed to add student:", error);
    }
    
})