<template>
  <button
    type="button"
    @click="$router ? $router.push('/') : window.location.href = '/'"
    class="px-4 py-3 text-2xl font-bold text-[var(--font-color)] bg-[#2e2e2e] rounded-md hover:bg-[#464545] active:bg-[#161616] no-underline border-none cursor-pointer focus:outline-0"
  >
    Voltar
  </button>
</template>

<script>
export default {
  name: 'BackToHome',
};
</script>