'use strict'
export const mappingGradeRecords = (arr, container)=>{
    const mappedGradesRecords = arr.map(item => {
        return `<div class="grade-record" data-user-id="${item.studentId}">
        <section>
            <img src="/images/user.png">
            <p>${item.Name}</p>
        </section>

        <section>

            <div class="">
                <label class="">Test 1</label>
                <input class="test-1-input" type="number" placeholder="--">
            </div>

            <div class="">
                <label class="">Test 2</label>
                <input class="test-2-input" type="number" placeholder="--">
            </div>

            <div class="">
                <p>Exam</p>
                <input class="Exam-input" type="number" placeholder="--">
            </div>

            </section>
        </div> 
        `
    }).join('');
    container.innerHTML = mappedGradesRecords
}