import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import {deleteTeacher} from "../module.js";
// import {schoolClass} from "../views/admin-manage-teacher-view.js"
import { schoolClasses } from "../module.js";
import { requireAuth } from "../module.js";
import { TeachersArray } from "../module.js";
import {getCollection} from "../module.js";
import { saveCollection } from "../module.js";
import { clearSessionStorage } from "../module.js";
import { mapUnAssignedTeachers } from "../views/admin-manage-teacher-view.js"
import { mapAssignedTeachers } from "../views/admin-manage-teacher-view.js"
import {checkIfThereAreAnyteachers} from "../module.js"
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
const currentAdmin = adminArray.find(user => user.adminid === currentUser);
requireAuth(currentUser, "adminid", adminArray, currentUserRole, 'admin');

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "adminid", adminArray, freshUserRole, 'admin');
    }
});

const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.overlay');
const sidebarToggleOn = document.querySelector('.sidebar-toggle-on');
const closeSidebarBtn = document.querySelector('.close-sidebar');
if (sidebarToggleOn && sidebar && sidebarOverlay) {
    sidebarToggleOn.addEventListener('click', function(){
        sidebar.classList.add('active');
        sidebarOverlay.classList.remove('hidden');
    });
}
if (closeSidebarBtn && sidebar && sidebarOverlay) {
    closeSidebarBtn.addEventListener('click', function(){
        sidebar.classList.remove('active');
        sidebarOverlay.classList.add('hidden');
    });
}
const sidebarUserName = document.querySelector('.sidebar-user-name');
const sidebarUserRole = document.querySelector('.sidebar-user-role');
const sidebarLogOutBtn = document.querySelector('.sidebar-logout-btn');
if (sidebarLogOutBtn) {
    sidebarLogOutBtn.addEventListener('click', function(){
        clearSessionStorage();
    });
}
if (sidebarUserRole) sidebarUserRole.textContent = currentUserRole;
if (sidebarUserName && currentAdmin) sidebarUserName.textContent = currentAdmin.name;

const teachersSection = document.querySelector('.teachers-section')
const emptyState = document.querySelector('.empty-state-section');
checkIfThereAreAnyteachers(TeachersArray, emptyState, teachersSection)
const AssignmentForm = document.querySelector('.assignment-form')
const saveAssignmentbtn = document.querySelector('.save-assignment');
const classAssignmentInput = document.querySelector('.class-select');
let unassignedTeachers = TeachersArray.filter(user => user.ClassId === null);
let assignedTeachers = TeachersArray.filter(user => user.ClassId !== null);
const unassingnedContainer = document.querySelector('.unassinged-container');
const assignedContainer = document.querySelector('.assinged-container');
const logoutBtn = document.querySelector('.logout-btn');
const removeBtn = document.querySelector('.remove-btn');
const removalSection = document.querySelector('.removal-section');
const cancelRemovalBtn = document.querySelector('.cancel-removal-btn');
const actualRemoveBtn = document.querySelector('.actual-remove-btn');
const formOverlay = document.querySelector('.form-overlay');
const closeFormBtn = document.querySelector('.close-btn');
const unassignBtn = document.querySelector('.unassign-btn');
const removalWarning = document.querySelector('.removal-warning1');
console.log(removeBtn);
const formUserName = document.querySelector('.formUserName');
const formUserEmail = document.querySelector('.formUserEmail');
logoutBtn.addEventListener('click', function(){
 clearSessionStorage();
})


mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer)
mapAssignedTeachers(assignedTeachers, assignedContainer);

teachersSection.addEventListener('click', (event)=>{
   if(event.target.closest('.Assign-btn')){
     AssignmentForm.classList.remove('hidden'); 
     formOverlay.classList.remove('hidden');
     let UnassignedTeachertag = event.target.closest('.unassigned-teacher');
     const UnassignedTeacherInfo = TeachersArray.find(user => user.teacherId === UnassignedTeachertag.dataset.userId);
     console.log(UnassignedTeachertag, UnassignedTeacherInfo);
     formUserName.innerHTML = UnassignedTeacherInfo.Name;
     formUserEmail.innerHTML = UnassignedTeacherInfo.Email;
     saveAssignmentbtn.addEventListener('click', function(){
        if(classAssignmentInput.value === "Select a class to coordinate"){
            console.log(`you haven't selected a class`);
        }else{
           const particularClass = schoolClasses.find(c => c.name === classAssignmentInput.value);
           console.log(particularClass);
           if(particularClass.teacherId !== null){
            console.log('this class already has a teacher');
           }else{
           UnassignedTeacherInfo.ClassId = particularClass.id;
           particularClass.teacherId = UnassignedTeacherInfo.teacherId;
           saveCollection('teachers', TeachersArray);
           saveCollection('classes', schoolClasses);
           AssignmentForm.classList.add('hidden');
           formOverlay.classList.add('hidden');
           unassignedTeachers = TeachersArray.filter(user => user.ClassId === null);
           assignedTeachers = TeachersArray.filter(user => user.ClassId !== null);
           mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer);
           mapAssignedTeachers(assignedTeachers, assignedContainer);
        console.log(UnassignedTeacherInfo);
           AssignmentForm.classList.add('hidden');
           }
        };
     });
      removeBtn.addEventListener('click', function(){
        console.log('i am working')
        removalSection.classList.remove('hidden');
        removeBtn.classList.add('hidden');
        removalWarning.classList.add('hidden');
     });
     cancelRemovalBtn.addEventListener('click', function(){
      removalSection.classList.add('hidden');
      removeBtn.classList.remove('hidden');
      removalWarning.classList.remove('hidden');
     });
     closeFormBtn.addEventListener('click', function(){
        AssignmentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
     });
     actualRemoveBtn.addEventListener('click', function(){
        console.log(UnassignedTeacherInfo);
        deleteTeacher(UnassignedTeacherInfo.teacherId);
        unassignedTeachers = TeachersArray.filter(user => user.ClassId === null);
        assignedTeachers = TeachersArray.filter(user => user.ClassId !== null);
        mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer);
        mapAssignedTeachers(assignedTeachers, assignedContainer);
        removeBtn.classList.remove('hidden')
        AssignmentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        checkIfThereAreAnyteachers(TeachersArray, emptyState, teachersSection)
     })
   }else if (event.target.closest('.manage-btn')){
     AssignmentForm.classList.remove('hidden'); 
     formOverlay.classList.remove('hidden');
     let assignedTeachertag = event.target.closest('.assigned-teacher');
     const assignedTeacherInfo = TeachersArray.find(user => user.teacherId === assignedTeachertag.dataset.userId);
     console.log(assignedTeachertag, assignedTeacherInfo);
     formUserName.innerHTML = assignedTeacherInfo.Name;
     formUserEmail.innerHTML = assignedTeacherInfo.Email;
     saveAssignmentbtn.classList.add('hidden');
     console.log(assignedTeacherInfo.ClassId);
     const AssignedTeacherClass = schoolClasses.find(clas => clas.id === assignedTeacherInfo.ClassId);
     console.log(AssignedTeacherClass);
     unassignBtn.classList.remove('hidden');
     classAssignmentInput.classList.add('hidden');
     unassignBtn.addEventListener('click', function(){
       AssignedTeacherClass.teacherId = null;
       assignedTeacherInfo.ClassId = null;
       saveCollection('classes', schoolClasses)
       saveCollection('teachers', TeachersArray);
       mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer)
       mapAssignedTeachers(assignedTeachers, assignedContainer);
     })
      removeBtn.addEventListener('click', function(){
        console.log('i am working')
        removalSection.classList.remove('hidden');
        removeBtn.classList.add('hidden');
        removalWarning.classList.add('hidden');
     });
     cancelRemovalBtn.addEventListener('click', function(){
      removalSection.classList.add('hidden');
      removeBtn.classList.remove('hidden');
      removalWarning.classList.remove('hidden');
     });
     closeFormBtn.addEventListener('click', function(){
        AssignmentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
     });
     actualRemoveBtn.addEventListener('click', function(){
        console.log(assignedTeacherInfo);
        deleteTeacher(assignedTeacherInfo.teacherId);
        unassignedTeachers = TeachersArray.filter(user => user.ClassId === null);
        assignedTeachers = TeachersArray.filter(user => user.ClassId !== null);
        mapUnAssignedTeachers(unassignedTeachers, unassingnedContainer);
        mapAssignedTeachers(assignedTeachers, assignedContainer);
        removeBtn.classList.remove('hidden')
        AssignmentForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        checkIfThereAreAnyteachers(TeachersArray, emptyState, teachersSection)
     })
   }
})




