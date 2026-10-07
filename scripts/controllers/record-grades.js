'use strict'
import { TeachersArray } from "../module.js";
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

const loadRecordGrades = ()=>{
   
}
