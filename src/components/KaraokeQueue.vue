<template>
  <div class="karaoke-queue-container flex flex-col items-center justify-center text-center text-white">
    <h1 class="mb-5 text-8xl max-md:text-6xl max-sm:text-5xl">Gerenciar Fila</h1>
    <div class="px-4 flex flex-col items-center justify-center w-full">
      <input
        type="text"
        v-model="nomeVideo"
        placeholder="Número da canção..."
        @keypress.enter="adicionarNaFila"
        class="p-4 mb-4 text-lg border-none rounded-md outline-none w-full max-w-md"
      />
      <div class="flex justify-around max-sm:flex-col w-full max-w-md gap-4 max-sm:gap-2">
        <button
          @click="adicionarNaFila"
          class="flex-1 px-8 py-4 text-2xl font-bold text-black bg-orange-500 rounded-md hover:opacity-80 active:opacity-60"
        >
          Adicionar à Fila
        </button>
        <BackToHome class="flex-1" />
      </div>
    </div>

    <!-- Lista de músicas na fila -->
    <div class="mt-8 w-4/5 max-w-lg">
      <h2 class="text-3xl mb-4">Músicas na Fila</h2>
      <div class="bg-black bg-opacity-50 rounded-lg p-4">
        <div v-if="filaMusicas.length === 0" class="text-xl text-gray-400">
          Nenhuma música na fila
        </div>
        <div v-else class="space-y-2">
          <div v-for="(codigo, index) in filaMusicas" :key="index" 
               class="flex flex-col p-2 bg-neutral-100 rounded">
            <div class="flex justify-between items-center">
              <div class="flex flex-col items-start">
                <span class="text-xl font-bold text-neutral-800">{{ musicasInfo[codigo]?.titulo || codigo }}</span>
                <span class="text-lg text-neutral-700">{{ musicasInfo[codigo]?.cantor || 'Artista desconhecido' }}</span>
                <span class="text-sm text-neutral-600">Código: {{ codigo }}</span>
              </div>
              <button @click="removerDaFila(index)" 
                      class="text-red-500 hover:text-red-700 ml-4 text-lg">
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackToHome from './BackToHome.vue';

export default {
  name: 'KaraokeQueue',
  data() {
    return {
      nomeVideo: '',
      filaMusicas: [],
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
        acc[musica.CODIGO] = {
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
    adicionarNaFila() {
      if (this.nomeVideo.trim()) {
        this.filaMusicas.push(this.nomeVideo);
        this.nomeVideo = '';
        this.atualizarFilaLocalStorage();
      }
    },
    removerDaFila(index) {
      this.filaMusicas.splice(index, 1);
      this.atualizarFilaLocalStorage();
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
</style> 