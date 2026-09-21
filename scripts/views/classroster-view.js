'use strict'
export const mappingClassRoster = (arr, container) => {
  const mappedClassRoster = arr.map(user =>{
    return `<div>
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
        <button>Edit</button>
        <button>View records</button>
     </div>
    </div>`
  }).join('');
if(arr.length === 0){
    container.innerHTML = `<p>No student in your clas yet</p>`
}else if(arr.length > 0){
    container.innerHTML = mappedClassRoster;
}
}