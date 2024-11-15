// src/store/auth.js
import { ref } from 'vue';

export const isLoggedIn = ref(localStorage.getItem('loggedIn') === 'true');

export function logIn() {
  localStorage.setItem('loggedIn', 'true');
  isLoggedIn.value = true;
}

export function logOut() {
  localStorage.removeItem('loggedIn');
  isLoggedIn.value = false;
}