'use strict'
export const mappingClassRoster = (arr, container) => {
  const mappedClassRoster = arr.map(user =>{
    return `<div class="student" data-user-id="${user.studentId}">
     <header>
        <h3>${user.Name}</h3>
        <p></p>
     </header>

     <ul>
        <li>Guardian <span>${user.ParentGuardianNo}</span></li>
        <li>Date of birth <span>${user.dateOfBirth}</span></li>
     </ul>
     <hr>
     <footer>
        <button class="edit-student-btn">Edit</button>
        <button class="view-student-btn">View records</button>
     </footer>
    </div>`
  }).join('');
if(arr.length === 0){
    container.style.width = '100%';
    container.style.height = '50vh';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center'
    container.innerHTML = `<p class=empty-state>No student in your class yet</p>`
}else if(arr.length > 0){
    container.innerHTML = mappedClassRoster;
}
};