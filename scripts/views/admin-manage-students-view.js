'use strict'
import {studentsArray} from "../module.js";
import {schoolClasses} from "../module.js"

export const mappingStudentsArray = (arr, container) => {
    const mappedStudentArray = arr.map(user =>{
        console.log(schoolClasses);
        const particularClass = schoolClasses.find(cla => cla.id === user.Classid)
        console.log(particularClass);
        return `<div class="student" data-user-id="${user.studentId}">
          <section>
          <header>
                <h3>${user.Name}</h3>
                <p>${particularClass.name}</p>
           </header>

           <main>
                <p>Guardian: ${user.ParentGuardianNo}</p>
                <p>Date of Birth: ${user.dateOfBirth}</p>
                <p>Email: ${user.Email}</p>
           </main>
          <hr>
           <footer>
              <button>Edit</button>
              <button>View records</button>
           </footer>
          </section>
        </div>`
    }).join('');
    if(arr.length > 0){
        container.innerHTML = mappedStudentArray;
    }else{
        container.innerHTML = `<section class="empty-state">
            <h3>No students yet</h3>
            <p>Once you add a student, their profile, class, and guardian details will show up here as a card</p>
            <button>Add your first student</button>
        </section>`
    }
}