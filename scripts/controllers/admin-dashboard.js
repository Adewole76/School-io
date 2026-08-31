'use strict'
import { getCollection } from "../module.js";
import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { clearSessionStorage } from "../module.js";
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "id", adminArray, currentUserRole, 'admin');

const logOut = document.querySelector('.log-out');
logOut.addEventListener('click', function(){
    clearSessionStorage();
})