export const mapStudentsArray = (arr, arrContainer) => {
   const mappedStudentsArr = arr.map(items =>{
    return `<div class="student" data-user-id="${items.studentId}">
    <h1>${items.Name}</h1>
    <p>${items.Email}</p>
    <button class="edit-student">Edit</button>
    <button class="delete-student">delete</button>
    </div>`
   }).join('')
   arrContainer.innerHTML = mappedStudentsArr;
}