<!-- src/components/Header.vue -->
<template>
  <div class="header-container">
    <button @click="handleLogoff">Logoff</button>
  </div>
</template>

<script>
import { logOut } from '@/store/auth';

export default {
  name: "Header",
  methods: {
    handleLogoff() {
      logOut();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.header-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 40px;
  color: #fff;
  position: absolute;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  color: #151515;
  background-color: #eeeeee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:active {
  opacity: 0.6;
}
</style>