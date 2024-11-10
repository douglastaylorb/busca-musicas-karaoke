<template>
  <div class="app-container">
    <div v-if="isHomePage">
      <h1>Bem-vindo ao Cante Mais</h1>
      <div class="button-group">
        <button @click="goToKaraoke">Ir para Karaokê</button>
        <button @click="goToMusicSearch">Encontre a música</button>
      </div>
    </div>
    <router-view></router-view>
    <footer>Criado por Douglas Taylor.</footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isHomePage() {
      return this.$route.name === 'home';
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #eeeeee;
  font-family: "Roboto", sans-serif;
  text-align: center;
}
.app-container h1 {
  font-size: 2.5rem;
}
.button-group {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 20px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  color: #151515;
  background-color: #eeeeee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
button:active {
  opacity: 0.6;
}
footer {
  margin-top: 2rem;
  font-size: 18px;
}
</style>