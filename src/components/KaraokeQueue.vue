<template>
  <div class="max-w-screen-xl mx-auto flex flex-col justify-between text-center text-white p-4 gap-16">
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="mb-5 mt-5 text-8xl max-md:text-6xl max-sm:text-5xl">Gerenciar Fila</h1>
      <div class="px-4 flex flex-col items-center justify-center w-full">
        <input
          type="text"
          v-model="nomeVideo"
          placeholder="Número da canção..."
          @keypress.enter="adicionarNaFila"
          class="p-4 mb-4 text-lg border-none rounded-md outline-none w-full max-w-md"
        />
        <div v-if="erro" class="text-red-500 mb-4">{{ erro }}</div>
        <div class="flex justify-around max-sm:flex-col w-full max-w-md gap-4 max-sm:gap-2">
          <button
            @click="adicionarNaFila"
            class="flex-1 px-8 py-4 text-2xl font-bold text-black bg-orange-500 rounded-md hover:opacity-80 active:opacity-60"
          >
            Adicionar
          </button>
          <BackToHome class="flex-1" />
        </div>
      </div>
    </div>

    <!-- Lista de músicas na fila -->
    <div class="w-full flex flex-col items-center justify-center">
      <h2 class="mb-5 text-5xl max-md:text-6xl max-sm:text-5xl font-bold">Músicas na Fila</h2>
      <div class="bg-black bg-opacity-50 rounded-lg p-4 w-full max-w-md flex flex-col items-center justify-center">
        <div v-if="filaMusicas.length === 0" class="text-xl text-gray-400">
          Nenhuma música na fila.
        </div>
        <div v-else class="space-y-2 max-h-[325px] overflow-y-auto custom-scrollbar">
          <div v-for="(codigo, index) in filaMusicas" :key="index" 
               :class="[
                 'flex flex-col p-2 rounded min-w-[415px] max-w-[415px]',
                 index === 0 ? 'bg-green-200' : 'bg-neutral-100'
               ]">
            <div class="flex justify-between items-center">
              <div class="flex flex-col items-start">
                <span class="text-lg font-bold text-neutral-800">{{ musicasInfo[codigo]?.titulo || codigo }}</span>
                <span class="text-lg text-neutral-700">{{ musicasInfo[codigo]?.cantor || 'Artista desconhecido' }}</span>
                <span class="text-sm text-neutral-600">Código: {{ codigo }}</span>
              </div>
              <div 
                v-if="index === 0"
                class="text-green-600 ml-4 cursor-pointer flex flex-col items-center justify-center"
                @click="removerDaFila(index)"
                >
                <span class="text-green-600 font-bold ml-4 text-lg">Tocando</span>
                <span class="text-green-600 ml-4 text-sm">Remover</span>
              </div>
              <button v-else
                      @click="removerDaFila(index)" 
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
import BackToHome from '../common/BackToHome.vue';

export default {
  name: 'KaraokeQueue',
  data() {
    return {
      nomeVideo: '',
      filaMusicas: [],
      musicasInfo: {},
      erro: ''
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
    verificarMusicaExiste(codigo) {
      if (this.musicasInfo[codigo]) {
        return codigo;
      }
      return null;
    },
    adicionarNaFila() {
      if (this.nomeVideo.trim()) {
        const codigoValido = this.verificarMusicaExiste(this.nomeVideo.trim());
        if (codigoValido) {
          this.filaMusicas.push(codigoValido);
          this.nomeVideo = '';
          this.erro = '';
          this.atualizarFilaLocalStorage();
        } else {
          this.erro = 'Música não encontrada!';
        }
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