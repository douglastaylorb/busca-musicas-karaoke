<template>
  <section>
    <div class="container">
      <h1>Encontre a música que deseja cantar</h1>
      <div class="container__input">
        <input type="text" v-model="input" placeholder="Digite o nome da música" />
        <div class="container__input__buttons">
          <button @click="recebeInput">Buscar</button>
          <BackToHome />
        </div>
      </div>
      <div class="container__result grid md:grid-cols-2 lg:grid-cols-3">
        <div v-if="searchActivated && filteredMusic.length === 0">
          <p>Nenhuma música encontrada!</p>
        </div>
        <div class="container__result__info" v-for="music in filteredMusic" :key="music.CODIGO">
          <div class="container__result__info__codigo">
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
        typeof music.TITULO === 'string' && music.TITULO.includes(formattedInput)
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

<style scoped>
.container {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container h1 {
  text-align: center;
  margin-bottom: 1.2rem;
  color: aliceblue;
  font-weight: 700;
  font-size: 3rem;
}

.container__input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
}

.container__input input {
  padding: 12px 20px 11px 13px;
  font-size: 15px;
  border: none;
  border-radius: 5px 0 0 5px;
  color: #2e2e2e;
}

.container__input button {
  padding: 11px 1rem;
  font-size: 16px;
  color: #2e2e2e;
  font-weight: 700;
  background-color: orange;
  border: none;
  cursor: pointer;
}

.container__input button:hover {
  background-color: #ff8c00;
}

.container__input button:active {
  background-color: #fab662;
}

.container__result {
  text-align: center;
  margin-top: 10px;
  color: aliceblue;
  gap: 10px;
}

.container__result__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: aliceblue;
  margin-bottom: 0.5rem;
  border-radius: 0.4rem;
  color: black;
  padding: 0.5rem;
}

.container__result__info__codigo {
  font-size: 20px;
  font-weight: 700;
}

textarea:focus,
input:focus,
button:focus,
select:focus {
  outline: 0;
}

@media screen and (max-width: 768px) {
  .container h1 {
    font-size: 2.5rem;
  }

  .container__input input {
    padding: 12px 30px 11px 30px;
  }

  .container__input button {
    padding: 9px 2rem;
  }
  
}

@media only screen and (max-width: 425px) {
  .container h1 {
    font-size: 1.8rem;
  }

  .container__input {
    flex-direction: column;
  }

  .container__input input {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 12px 30px 11px 30px;
  }
  .container__input__buttons {
    display: flex;
    justify-content: center;
  }

  .container__input button {
    border-radius: 5px 0 0 5px;
    padding: 9px 2rem;
  }

  .container__result {
    min-width: 300px;
    height: auto;
  }
}
</style>