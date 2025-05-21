// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Karaoke from '../components/Karaoke.vue';
import KaraokeQueue from '../components/KaraokeQueue.vue';
import MusicSearch from '../components/MusicSearch.vue';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';

const routes = [
  // { path: '/', name: 'music-search', component: MusicSearch },
  { path: '/', name: 'home', component: Home},
  { path: '/karaoke', name: 'karaoke', component: Karaoke},
  { path: '/karaoke-queue', name: 'karaoke-queue', component: KaraokeQueue},
  { path: '/music-search', name: 'music-search', component: MusicSearch },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger rotas que exigem autenticação
// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('loggedIn');

//   if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router;