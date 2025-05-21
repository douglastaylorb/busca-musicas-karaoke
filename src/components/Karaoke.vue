<template>
  <div class="karaoke-container flex flex-col items-center justify-center text-center text-white">
    <h1 class="mb-5 lg:text-8xl md:text-6xl">Karaokê Web</h1>
    <div class="flex flex-col items-center justify-center">
      <input
        type="text"
        v-model="nomeVideo"
        placeholder="Número da canção..."
        @keypress.enter="buscarVideo"
        class="p-4 mb-4 text-lg border-none rounded-md outline-none w-96 max-w-full"
      />
      <div class="flex justify-around w-full max-w-md gap-4">
        <button
          @click="buscarVideo"
          class="flex-1 px-8 py-4 text-2xl font-bold text-black bg-orange-500 rounded-md hover:opacity-80 active:opacity-60"
        >
          Tocar
        </button>
        <BackToHome class="flex-1" />
      </div>
    </div>
    <div id="containerVideo" v-show="videoVisible" class="mt-5 w-4/5 max-w-lg max-h-[1024px] h-[60vh]">
      <video id="meuVideo" controls ref="videoElem" class="w-full h-full rounded-lg"></video>
    </div>
    <div class="error my-8 text-3xl">{{ error }}</div>
    <transition name="fade">
      <div class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" v-show="modalVisible">
        <div class="modal-content bg-black bg-opacity-95 p-16 rounded-lg text-center max-w-[80%] max-h-[90%] overflow-y-auto" v-html="modalContent"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import BackToHome from './BackToHome.vue';

export default {
  name: 'Karaoke',
  data() {
    return {
      nomeVideo: '',
      videoVisible: false,
      error: '',
      modalVisible: false,
      modalContent: '',
    };
  },
  components: {
    BackToHome,
  },
  methods: {
    buscarVideo() {
      const videoElem = this.$refs.videoElem;
      videoElem.src = `musicas/${this.nomeVideo}.mp4`;
      videoElem.addEventListener('error', this.handleVideoError);
      videoElem.onloadedmetadata = this.handleVideoLoaded;
      videoElem.onended = this.handleVideoEnded;
    },
    handleVideoError() {
      this.error = 'Vídeo não encontrado!';
      this.videoVisible = false;
    },
    handleVideoLoaded() {
      this.videoVisible = true;
      this.error = '';
      this.$refs.videoElem.play();
      this.$refs.videoElem.requestFullscreen();
    },
    handleVideoEnded() {
      document.exitFullscreen();
      const nota = this.gerarNota();
      this.modalVisible = true;
      this.modalContent = this.getModalContent(nota);
      setTimeout(() => {
        this.modalVisible = false;
        this.$router.push('/karaoke');
      }, 5000);
      this.videoVisible = false;
    },
    gerarNota() {
      const min = 85;
      const max = 99;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getModalContent(nota) {
      if (nota >= 85 && nota <= 90) {
        return`<div class="text-7xl text-white leading-loose">Muito Bem! 😊</div>
          <div class="text-4xl text-white leading-relaxed">Você tirou</div>
          <div class="text-8xl text-white leading-relaxed">${nota}</div>
          <div class="text-4xl text-white">pontos!</div>`;
      } else if (nota >= 91 && nota <= 95) {
        return `<div class="text-7xl text-white leading-loose">Arrasou! 😁</div>
          <div class="text-4xl text-white leading-relaxed">Você tirou</div>
          <div class="text-8xl text-white leading-relaxed">${nota}</div>
          <div class="text-4xl text-white">pontos!</div>`;
      } else {
        return `<div class="text-7xl text-white leading-loose">Você é Profissional? 🤩</div>
          <div class="text-4xl text-white leading-relaxed">Você tirou</div>
          <div class="text-8xl text-white leading-relaxed">${nota}</div>
          <div class="text-4xl text-white">pontos!</div>`;
      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>