<template>
  <Header v-if="isLoggedIn" />
  <div class="app-container">
    <router-view></router-view>
    <footer v-if="!isLoginPage" class="text-neutral-400 text-lg mt-4">Criado por <a href="https://douglastaylor.com.br" target="_blank" class="font-bold text-white">Douglas Taylor.</a></footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import { isLoggedIn } from './store/auth';

export default {
  name: "App",
  components: {
    Header
  },
  computed: {
    isLoginPage() {
      return this.$route.name === 'login';
    },
    isLoggedIn() {
      return isLoggedIn.value;    }
  },
  methods: {
    goToKaraoke() {
      this.$router.push({ name: 'karaoke' });
    },
    goToMusicSearch() {
      this.$router.push({ name: 'music-search' });
    }
  }
};
</script>

<style scoped>
.app-container {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eeeeee;
  font-family: "Roboto", sans-serif;
  text-align: center;
  min-height: 100vh;
}
.footer {
  margin-top: auto;
  font-size: 18px;
}
</style>