'use strict'
import { clearSessionStorage } from "../module.js";
const logOutBtn = document.querySelector('.logout-btn');

logOutBtn.addEventListener('click', function (){
    clearSessionStorage();
})