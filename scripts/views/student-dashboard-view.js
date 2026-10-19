'use strict'
import { activeTerm } from "../controllers/student-dashboard.js";
export const mappingStudentResults = (arr, container) =>{
    const mappedStudentGrades = arr.map(grade => {
        const total = grade.test1Score + grade.test2Score + grade.examScore;
        return `<div class="grade-record">
        <header>
         <h2>${grade.gradeSubject}</h2>
        </header>

        <section>
           <div>
              <p>Test 1</p>
              <p class="test-1"><span>${grade.test1Score}</span>/20</p>
           </div>
           <div>
              <p>Test 2</p>
              <p class="test-2"><span>${grade.test2Score}</span>/20</p>
           </div>
           <div>
              <p>Exam</p>
              <p class="exam"><span>${grade.examScore}</span>/60</p>
           </div>
        </section>

        <hr>
        
        <footer>
          <p>Total</p>
          <p><span>${total}</span>/100</p>
        </footer>
        </div>`
    }).join('')

 if(arr.length === 0){
    container.innerHTML = `<div class="empty-state">
    <div>
     <img src="/images/empty-folder.png" alt="empty-folder-icon">
     <h2>Results for ${activeTerm} are not available</h2>
     <p>Your teachers will add your scores here as the tests and exams are marked</p>
    </div>
     </div>`;
     container.style.display = 'flex';
     container.style.justifyContent = 'center';
     container.style.alignContent = 'center';
 }else if(arr.length > 0){
    container.innerHTML = mappedStudentGrades;
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr 1fr';
    container.style.columnGap = '1em';
    container.style.rowGap = '1em';
    container.style.marginTop = '2em';
 }
}