<!-- src/components/Login.vue -->
<template>
  <section class="login-container">
    <h1>Login</h1>
    <p>Digite suas credenciais nos campos abaixo:</p>
    <form @submit.prevent="handleLogin">
      <div>
        <input type="text" v-model="username" placeholder="Usuário" required />
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Senha" required />
      </div>
      <button type="submit">Entrar</button>
      <a href="#">Esqueci minha senha</a>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  mounted() {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.$router.push('/karaoke'); // Ou qualquer rota protegida
    }
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === '123456') { // Exemplo de credenciais
        localStorage.setItem('loggedIn', 'true'); // Persistência simples
        this.$router.push('/home'); // Redireciona para a home após login
      } else {
        this.error = 'Usuário ou senha incorretos.';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 3rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 40px rgba(95, 95, 95, 0.6);
}

.login-container h1 {
  color: #181818;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.login-container p {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  background-color: orange;
  border: none;
  color: #151515;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #ff8c00;
}

button:active {
  background-color: #fab662;
}

.error {
  color: rgb(250, 86, 86);
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  .login-container {
    padding: 2rem 2rem;
  }
}
</style>