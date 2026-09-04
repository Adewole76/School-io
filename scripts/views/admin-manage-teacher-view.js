'use strict'
import {TeachersArray} from "../module.js"
import {schoolClasses} from "../module.js"
export const mapUnAssignedTeachers = (arr, container) => {
   const mappedAssignedTeachers = arr.map(user => {
    return `<div class="unassigned-teacher">
    <section>
        <div>
             <img src="/images/user.png">
        </div>
        <footer>
        <h3>${user.Name}</h3>
        <p>${user.Email} &#9679; ${user.teacherSubject}</p>
        </footer>
    </section>
    <section>
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

export const mapAssignedTeachers = (arr, container) => {
    const mappedAssignedTeachers = arr.map(user => {
        const particularClass = schoolClasses.find(cla => cla.id === user.ClassId);
        console.log(particularClass.name)
        return `<div class="assigned-teacher">
        <section>
            <footer>
                <h3>${user.Name}</h3>
                <p>${user.Email} &#9679; ${user.teacherSubject} &#9679; ${particularClass.name}</p>
            </footer>
        </section>

        <section>
           <p>&#9679; Assigned</p>
           <button class="manage-btn">manage</button>
        </section>
        </div>`
    }).join();

    container.innerHTML = mappedAssignedTeachers;
}