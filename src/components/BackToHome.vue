<template>
  <a href="/" class="return-home">Voltar</a>
</template>

<script>
  export default {
    name: 'BackToHome',
  };
</script>

<style scoped>
  .return-home {
  padding: 14px 1rem;
  font-size: 16px;
  color: var(--font-color);
  font-weight: 700;
  background-color: #2e2e2e;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  text-decoration: none;
}
.return-home:hover {
  background-color: #464545;
}
.return-home:active {
  background-color: #161616;
}
button:focus{
  outline: 0;
}
</style>