<template>
  <section>
    <div class="pt-20 flex flex-col justify-center items-center">
      <h1 class="px-4 text-center mb-5 text-slate-100 font-bold max-sm:text-5xl max-md:text-5xl max-lg:text-6xl text-7xl">Encontre a música</h1>
      <div class="px-4 flex flex-col items-center justify-center w-full">
        <input
          type="text"
          v-model="input"
          placeholder="Digite o nome da música..."
          class="p-4 mb-4 text-lg border-none rounded-md outline-none w-full max-w-md"
        />
        <div class="flex flex-col sm:flex-row justify-around w-full max-w-md gap-4 max-sm:gap-0">
          <button
            @click="recebeInput"
            class="flex-1 px-6 py-3 text-xl font-bold text-black bg-orange-500 rounded-md hover:opacity-80 active:opacity-60 mt-2 sm:mt-0"
          >
            Buscar
          </button>
          <BackToHome class="flex-1 mt-2 sm:mt-0" />
        </div>
      </div>
      <div class="px-4 text-center mt-6 text-slate-100 grid gap-4 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div v-if="searchActivated && filteredMusic.length === 0" class="col-span-full">
          <div class="text-slate-100">
            <span>Nenhuma música encontrada!</span>
          </div>
        </div>
        <div
          class="flex flex-col justify-center bg-slate-100 mb-2 rounded-md text-black p-4"
          v-for="music in filteredMusic"
          :key="music.CODIGO"
        >
          <div class="text-lg font-bold">
            <p>Código da Música: {{ formatCodigo(music.CODIGO) }}</p>
          </div>
          <p>Nome da Música: {{ music.TITULO }} </p>
          <p>Cantor: {{ music.CANTOR }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { getMusicList } from '../http/request.js';
import BackToHome from './BackToHome.vue';

export default {
  components: {
    BackToHome
  },
  name: 'MusicSearch',
  setup() {
    const input = ref('');
    const filteredMusic = ref([]);
    const searchActivated = ref(false);

    async function recebeInput() {
      const formattedInput = input.value.toUpperCase();
      const musicList = await getMusicList();
      filteredMusic.value = musicList.filter(music =>
        (typeof music.TITULO === 'string' && music.TITULO.includes(formattedInput)) ||
        (typeof music.CANTOR === 'string' && music.CANTOR.toUpperCase().includes(formattedInput))
      );
      searchActivated.value = true;
    }

    function formatCodigo(codigo) {
      const codigoStr = codigo.toString();
      return codigoStr.length === 4 ? '0' + codigoStr : codigoStr;
    }

    return {
      input,
      recebeInput,
      filteredMusic,
      formatCodigo,
      searchActivated
    };
  }
};
</script>
