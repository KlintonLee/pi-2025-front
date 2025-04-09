<template>

    <div class="dflex__login">
       <loading :loading="isLoading" text="Logando..."/>

      <div class="background__login">
        <h1>Bem-vindo ao nosso sistema!</h1>
        <p>Por favor, faça login para continuar.</p>
      </div>
      <div class="login-container">
        <v-card class="pa-4" max-width="400">
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text>
                <v-text-field label="Email" v-model="email" />
                <v-text-field label="Senha" v-model="senha" type="password" />
            </v-card-text>
            <v-card-actions>
                <v-btn variant="tonal" color="blue" @click="fazerLogin" block>Entrar</v-btn>


            </v-card-actions>
        </v-card>
      </div>
    </div>

    <v-snackbar v-model="snackbar" :color="typeSnackbar">
       {{ snackbarMessage }}
        <v-btn color="white" text @click="snackbar = false"> Fechar </v-btn>
      </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import api from "../services/api.js";
import loading from './loading.vue';


const email = ref('')
const senha = ref('')
const snackbar = ref(false)
const isLoading = ref(false)
const snackbarMessage = ref('')
const typeSnackbar = ref('')

const fazerLogin = async() => {
    isLoading.value = true
    try {
        const token = await api.post('/v1/admins', {
            email: email.value,
            senha: senha.value
        })

        localStorage.setItem('token', token.data)


        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
        isLoading.value = false

     } catch(e){
        console.error(e)
        snackbar.value = true
        snackbarMessage.value = 'Usuário ou senha inválidos. Tentar novamente.'
        typeSnackbar.value = 'error'
    }
}
</script>

<style scoped>
.dflex__login {
    background-image: url('https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2s');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    gap: 20px;
    margin: 0;
}

.login-container {
    width: 100%;
    max-width: 400px;
    padding: 16px;
    box-sizing: border-box;
}

.background__login {
    color: rgb(150 136 1);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

@media (min-width: 768px) {
    .dflex__login {
        flex-direction: row; 
    }
}
</style>
  