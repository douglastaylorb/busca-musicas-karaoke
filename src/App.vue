<template>
  <main>
    <MusicSearch />
  </main>
</template>

<script>
import MusicSearch from './components/MusicSearch.vue';

export default {
  name: 'App',
  components: {
    MusicSearch
  },
  metaInfo: {
    title: 'Encontre a Música',
    meta: [
      {
        name: 'description',
        content: 'Encontre a música que você deseja cantar'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      },
      {
        property: 'og:title',
        content: 'Encontre a Música',
      },
      {
        property: 'og:description',
        content:  'Encontre a música que você deseja cantar',
      },
      {
        property: 'og:image',
        content: 'https://img.freepik.com/vetores-gratis/fundo-gradiente-de-karaoke_23-2150970025.jpg?semt=ais_hybrid',
      },
      {
        property: 'og:url',
        content: 'https://busca-musicas-karaoke.vercel.app/',
      }
    ]
  }
};
</script>

<style scoped>

</style>
