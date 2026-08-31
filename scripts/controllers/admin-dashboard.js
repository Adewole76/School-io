'use strict'
import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { clearSessionStorage } from "../module.js";
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "adminid", adminArray, 'admin');

const logOut = document.querySelector('log-out');
logOut.addEventListener('click', function(){
    clearSessionStorage();
})