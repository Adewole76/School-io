'use strict'
export const mappingAttendanceStudents = (arr, container) => {
    const mappedStudentAttendance = arr.map(user => {
        return `<div class="attendance-record" data-user-id="${user.studentId}">
        <section class="student-name">
            <div>
                <img>
            </div>
            <aside>
                 <p>${user.Name}</p>
            <aside>
        </section>
        <section class=change-status-btn>
                <button class="present-btn">Present</button>
                <button class="absent-btn">Absent</button>
        </section>
        </div>`
    }).join('')
if(mappedStudentAttendance.length === 0){
    container.innerHTML = `You haven't added any students yet`
}else{
    container.innerHTML = mappedStudentAttendance;
}
}