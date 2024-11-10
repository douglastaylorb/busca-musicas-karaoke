// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Karaoke from '../components/Karaoke.vue';
import MusicSearch from '../components/MusicSearch.vue';

const routes = [
  { path: '/', name: 'home', component: { template: '<div></div>' } }, 
  { path: '/karaoke', name: 'karaoke', component: Karaoke },
  { path: '/music-search', name: 'music-search', component: MusicSearch },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;