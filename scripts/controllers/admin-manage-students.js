import { adminArray } from "../module.js";
import { gettingUser } from "../module.js";
import { requireAuth } from "../module.js";
import { clearSessionStorage } from "../module.js";
const currentUser = gettingUser('currentUserId');
console.log(currentUser);
console.log(typeof adminArray);
const currentUserRole = gettingUser('currentUserRole');
requireAuth(currentUser, "id", adminArray, currentUserRole, 'admin');

window.addEventListener('pageshow', (event) => {
requireAuth(currentUser, "id", adminArray, currentUserRole, 'admin');
});