'use strict'
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
              <p>${grade.test1Score}/20</p>
           </div>
           <div>
              <p>Test 2</p>
              <p>${grade.test2Score}/20</p>
           </div>
           <div>
              <p>Exam</p>
              <p>${grade.examScore}/60</p>
           </div>
        </section>

        <hr>
        
        <footer>
          <p>Total</p>
          <p>${total}</p>
        </footer>
        </div>`
    }).join('')

 if(arr.length === 0){
    container.innerHTML = '<p>Your grades are currently not available</p>'
 }else if(arr.length > 0){
    container.innerHTML = mappedStudentGrades;
 }
}