<template>
  <!-- adicionar as próximas musicas e o texto deve ter uma sombra -->
  <div class="text-4xl text-gray-200 absolute top-2 left-50 flex flex-col gap-2 z-50 items-center text-shadow-lg bg-black bg-opacity-50 p-2 rounded-lg">
    <div class="flex flex-row gap-2">
      <span>Próxima música: {{ musicasInfo[filaMusicas[0]]?.titulo || '' }}</span>
    </div>
  </div>
  <div class="karaoke-container flex flex-col items-center justify-center text-center text-white">
    <h1 class="mb-4 text-8xl max-md:text-6xl max-sm:text-5xl">Karaokê Web</h1>
    
    <!-- Lista de músicas na fila -->
    <div class="w-4/5 max-w-lg">
      <div class="bg-black bg-opacity-50 rounded-lg p-4">
        <div v-if="filaMusicas.length === 0" class="text-xl text-gray-400">
          Nenhuma música na fila
        </div>
        <div v-else class="space-y-2 max-h-[325px] overflow-y-auto custom-scrollbar">
          <div v-for="(codigo, index) in filaMusicas" :key="index" 
               class="flex flex-col p-2 bg-neutral-100 rounded">
            <span class="text-xl font-bold text-neutral-800">{{ musicasInfo[codigo]?.titulo || codigo }}</span>
            <span class="text-lg text-neutral-700">{{ musicasInfo[codigo]?.cantor || 'Artista desconhecido' }}</span>
            <span class="text-sm text-gray-600">Código: {{ codigo }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-around max-sm:flex-col w-full max-w-md gap-4 max-sm:gap-2 mt-4">
      <button
        @click="toggleReproducao"
        class="flex-1 px-8 py-4 text-2xl font-bold text-black bg-orange-500 rounded-md hover:opacity-80 active:opacity-60"
      >
        {{ reproduzindo ? 'Pausar' : 'Iniciar' }}
      </button>
      <BackToHome class="flex-1" />
    </div>

    <div id="containerVideo" v-show="videoVisible" class="video-container">
      <video id="meuVideo" controls ref="videoElem" class="video-player"></video>
    </div>
    <div class="error my-8 text-3xl">{{ error }}</div>
    <transition name="fade">
      <div v-if="modalVisible" class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999]">
        <div class="modal-content bg-black bg-opacity-95 p-16 rounded-lg text-center max-w-[80%] max-h-[90%] overflow-y-auto" v-html="modalContent"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import BackToHome from '../common/BackToHome.vue';

export default {
  name: 'Karaoke',
  data() {
    return {
      videoVisible: false,
      error: '',
      modalVisible: false,
      modalContent: '',
      filaMusicas: [],
      reproduzindo: false,
      tocandoAtualmente: false,
      musicasInfo: {}
    };
  },
  components: {
    BackToHome,
  },
  async created() {
    // Recupera a fila do localStorage ao criar o componente
    const filaSalva = localStorage.getItem('filaMusicas');
    if (filaSalva) {
      this.filaMusicas = JSON.parse(filaSalva);
    }

    // Carrega as informações das músicas
    try {
      const response = await fetch('/musicas.json');
      const musicas = await response.json();
      this.musicasInfo = musicas.reduce((acc, musica) => {
        // Converte o código para string e adiciona zero no início se tiver 4 dígitos
        let codigo = String(musica.CODIGO);
        if (codigo.length === 4) {
          codigo = '0' + codigo;
        }
        acc[codigo] = {
          titulo: musica.TITULO,
          cantor: musica.CANTOR
        };
        return acc;
      }, {});
    } catch (error) {
      console.error('Erro ao carregar informações das músicas:', error);
    }

    // Adiciona listener para mudanças na fila
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    // Remove o listener quando o componente é destruído
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === 'filaMusicas') {
        this.filaMusicas = JSON.parse(event.newValue || '[]');
      }
    },
    toggleReproducao() {
      if (!this.reproduzindo && !this.tocandoAtualmente) {
        this.tocarProximaMusica();
      } else if (this.reproduzindo) {
        this.$refs.videoElem.pause();
        this.reproduzindo = false;
      } else {
        this.$refs.videoElem.play();
        this.reproduzindo = true;
      }
    },
    tocarProximaMusica() {
      if (this.filaMusicas.length > 0) {
        this.tocandoAtualmente = true;
        this.reproduzindo = true;
        const videoElem = this.$refs.videoElem;
        videoElem.src = `musicas/${this.filaMusicas[0]}.mp4`;
        videoElem.addEventListener('error', this.handleVideoError);
        videoElem.onloadedmetadata = this.handleVideoLoaded;
        videoElem.onended = this.handleVideoEnded;
      } else {
        this.tocandoAtualmente = false;
        this.reproduzindo = false;
        this.videoVisible = false;
      }
    },
    handleVideoError() {
      this.error = 'Vídeo não encontrado!';
      this.videoVisible = false;
      this.filaMusicas.shift();
      this.atualizarFilaLocalStorage();
      this.tocarProximaMusica();
    },
    handleVideoLoaded() {
      this.videoVisible = true;
      this.error = '';
      this.$refs.videoElem.play();
    },
    handleVideoEnded() {
      const nota = this.gerarNota();
      this.modalVisible = true;
      this.modalContent = this.getModalContent(nota);
      

        setTimeout(() => {
          this.modalVisible = false;
          this.filaMusicas.shift();
          this.atualizarFilaLocalStorage();
          this.tocarProximaMusica();
        }, 10000);

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
    },
    atualizarFilaLocalStorage() {
      localStorage.setItem('filaMusicas', JSON.stringify(this.filaMusicas));
      // Dispara um evento personalizado para notificar outras abas
      window.dispatchEvent(new Event('storage'));
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

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Ajusta o layout quando o vídeo está visível */
.video-container:not(:empty) ~ * {
  display: none;
}

/* Ajusta o layout quando o vídeo está visível */
.video-container:not(:empty) ~ .karaoke-container > *:not(.video-container) {
  display: none;
}

/* Garante que o modal sempre fique por cima */
.modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

.modal-content {
  z-index: 10000 !important;
  pointer-events: auto !important;
  background-color: rgba(0, 0, 0, 0.95) !important;
  padding: 4rem !important;
  border-radius: 0.5rem !important;
  text-align: center !important;
  max-width: 80% !important;
  max-height: 90% !important;
  overflow-y: auto !important;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>