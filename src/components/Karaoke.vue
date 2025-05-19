<template>
  <div class="karaoke-container">
    <h1>Karaokê Web</h1>
    <div class="busca">
      <input type="text" v-model="nomeVideo" placeholder="Número da canção..." @keypress.enter="buscarVideo" />
      <div class="busca-buttons">
        <button @click="buscarVideo">Tocar</button>
        <BackToHome />
      </div>
    </div>
    <div id="containerVideo" v-show="videoVisible">
      <video id="meuVideo" controls ref="videoElem"></video>
    </div>
    <div class="error">{{ error }}</div>
    <transition name="fade">
      <div class="modal" v-show="modalVisible">
        <div class="modal-content" v-html="modalContent"></div>
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
    },
    gerarNota() {
      const min = 85;
      const max = 99;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getModalContent(nota) {
      if (nota >= 85 && nota <= 90) {
        return `<div class="text-7xl text-white leading-loose">Muito Bem! 😊</div>
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
.karaoke-container {
  margin: 0;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--font-color);
  font-family: var(--font-principal);
}

.karaoke-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: bottom;
  z-index: -1;
  opacity: 0.02;
}

.karaoke-container h1 {
  margin-bottom: 20px;
  font-size: 70px;
}

.busca {
  display: flex;
  align-items: center;
  justify-content: center;
}

.busca input,
.busca button {
  border: 0;
  outline: none;
}

.busca input {
  padding: 12px 20px 11px 13px;
  font-size: 15px;
  border: none;
  border-radius: 5px 0 0 5px;
}

.busca button {
  padding: 11px 2rem;
  font-size: 16px;
  font-family: var(--font-principal);
  background-color: orange;
  cursor: pointer;
  color: #2e2e2e;
  font-weight: 700;
}

.busca button:hover {
  opacity: 0.8;
}

.busca button:active {
  opacity: 0.6;
}

.error {
  margin: 30px 0;
  font-size: 30px;
}

#containerVideo {
  margin-top: 20px;
  width: 80%;
  height: 60%;
  max-width: 768px;
  max-height: 1024px;
}

#containerVideo video {
  border-radius: 10px;
}

#meuVideo {
  width: 100%;
  height: 100%;
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.95);
  padding: 5rem;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
  max-height: 90%;
  overflow-y: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 425px) {
  .karaoke-container h1 {
    font-size: 45px;
  }

  .busca {
    flex-direction: column;
    align-items: center;
  }

  .busca input {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 12px 30px 11px 30px;
  }
  .busca button {
    margin-top: 10px;
  }

  .busca button {
    border-radius: 5px 0 0 5px;
  }

  #containerVideo {
    width: 90%;
  }
}
</style>