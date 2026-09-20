'use strict'
import { studentsArray } from "../module.js";
import { TeachersArray } from "../module.js";
import { gettingUser } from "../module.js";
import { saveCollection } from "../module.js";
import { requireAuth } from "../module.js";
const currentUser = gettingUser('currentUserId');
const currentRole = gettingUser('currentUserRole');
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const freshUserId = gettingUser('currentUserId');
        const freshUserRole = gettingUser('currentUserRole');
        requireAuth(freshUserId, "teacherId", TeachersArray, freshUserRole, 'teacher');
    }
});
requireAuth(currentUser,"teacherId", TeachersArray, currentRole, "teacher");
