'use strict'
import {TeachersArray} from "../module.js"
import {schoolClasses} from "../module.js"
import { getCollection } from "../module.js"
export const mapUnAssignedTeachers = (arr, container) => {
   const mappedAssignedTeachers = arr.map(user => {
    return `<div class="unassigned-teacher" data-user-id="${user.teacherId}" >
    <section class="img-name-email">
        <div>
             <img src="/images/user2.png">
        </div>
        <footer>
        <h3>${user.Name}</h3>
        <p>${user.Email} &#9679; ${user.teacherSubject}</p>
        </footer>
    </section>
    <section class="tag-btn">
    <p>&#9679; Unassigned</p>
    <button class="Assign-btn">Assign Class</button>
    </section>
    </div>
    `
   }).join('')
   if(arr.length > 0){
   container.innerHTML = mappedAssignedTeachers;
   }else{
    container.innerHTML = `<div>
    <h3>Needs assignment ${arr.length}</h3>
    </div>`
   }
}
let schoolClass = getCollection("classes")
export const mapAssignedTeachers = (arr, container) => {
    console.log(schoolClass);
    const mappedAssignedTeachers = arr.map(user => {
        const particularClass = schoolClass.find(cla => cla.id === user.ClassId);
        console.log(particularClass);
        return `<div class="assigned-teacher" data-user-id="${user.teacherId}">
        <section class="img-Name-Email">
           <div imga>
              <img src="/images/user2.png">
           </div>
            <footer>
                <h3>${user.Name}</h3>
                <p>${user.Email} &#9679; ${user.teacherSubject} &#9679; coordinates ${particularClass.name}</p>
            </footer>
        </section>

        <section class="assigned-tag-btn">
           <p>&#9679; Assigned</p>
           <button class="manage-btn">manage</button>
        </section>
        </div>`
    }).join('');
   if(arr.length > 0){
    container.innerHTML = mappedAssignedTeachers;
    }else {
        container.innerHTML = `<div>
         <h2>No teacher has been assigned to any class</h2>
        </div>`
    }
}