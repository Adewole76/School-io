'use strict'
export const mappingClassRoster = (arr, container) => {
  const mappedClassRoster = arr.map(user =>{
    return `<div class="student" data-user-id="${user.studentId}">
     <div>
        <h3>${user.Name}</h3>
        <p></p>
     </div>

     <ul>
        <li>Guardian:${user.ParentGuardianNo}</li>
        <li>Date of birth:${user.dateOfBirth}</li>
     </ul>
     <hr>
     <div>
        <button class="edit-student-btn">Edit</button>
        <button>View records</button>
     </div>
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
}