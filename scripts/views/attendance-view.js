'use strict'
import { attendanceArray } from '../module.js'
export const mappingAttendanceStudents = (arr,date,container) => {
    const mappedStudentAttendance = arr.map(user => {
         const anAttendance = attendanceArray.find(attendance => attendance.studentId === user.studentId && attendance.date === date)?attendanceArray.find(attendance => attendance.studentId === user.studentId && attendance.date === date):[];
         console.log(anAttendance);
         if(anAttendance.attendanceStatus === 'present'){
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
                <button class="present-btn active-status-present">Present</button>
                <button class="absent-btn">Absent</button>
        </section>
        </div>`}else if(anAttendance.attendanceStatus === 'absent'){
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
                <button class="absent-btn active-status-absent">Absent</button>
        </section>
        </div>`
        }else{
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
        }
    }).join('')
if(mappedStudentAttendance.length === 0){
    container.innerHTML = `You haven't added any students yet`
}else{
    container.innerHTML = mappedStudentAttendance;
}
}