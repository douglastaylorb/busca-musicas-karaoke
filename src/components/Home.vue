<!-- src/components/Home.vue -->
<template>
  <div>
    <h1>Bem-vindo ao Cante Mais</h1>
    <div class="button-group">
      <button @click="goToKaraoke">Ir para Karaokê</button>
      <button @click="goToMusicSearch">Encontre a música</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
.button-group {
  padding: 1rem 0 3rem 0;
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
</style>