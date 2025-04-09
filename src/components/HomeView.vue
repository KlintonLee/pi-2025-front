<template>
  <div class="dflex__home">
    <loading :loading="isLoading" :text="text"/>
    <div :class="{ header: exist }" class="dflex__exist">
      <v-menu open-on-hover v-if="exist">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-menu" v-bind="props" variant="text" @click="clear()">
            <span class="toGoOut">SAIR</span>
          </v-btn>
        </template>
      </v-menu>
      <div class="logo">
        <div class="info">
          <p class="title">ADOLFO ESPOSITO</p>
          <span class="subtitle">Construções & Pintura</span>
        </div>
        <img
          src="../assets/image/logo.png"
          alt="Company Logo"
          class="company-logo"
          style="width: 100px; height: auto"
        />
      </div>
    </div>

    <div class="home ma-12">
      <div class="free-quote">
        <v-btn
          class="ma-6"
          color="success"
          @click="redirectToWhatsApp"
        >
          <v-icon left>mdi-file-document-outline</v-icon>
          Orçamento Gratuito Para Tupã e região
        </v-btn>
      </div>

      <Feeds ref="feedsRef" />
      <div class="btn__register" v-if="exist">
        <v-btn class="ma-6" color="primary" @click="isOpen = true">
          <v-icon left>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="footer">
      <div class="footer__list">
        <v-row justify="center" align="center" class="social-icons" dense>
          <v-col cols="12" class="text-center mb-2">
            <v-icon color="white" size="24">mdi-phone</v-icon>
            <span class="icon-text ml-1">(14)9.9805-0967</span>
          </v-col>
          <v-col cols="12" class="text-center mb-2">
            <v-icon color="white" size="24">mdi-email</v-icon>
            <span class="icon-text ml-1">dolfo_griffe@homail.com</span>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-icon color="white" size="24">mdi-instagram</v-icon>
            <span class="icon-text ml-1">@adolfoesposito</span>
          </v-col>
        </v-row>
      </div>
      <div class="logo__footer">
        <div class="info">
          <p class="title">ADOLFO ESPOSITO</p>
          <span class="subtitle">Construções & Pintura</span>
        </div>
        <img
          src="../assets/image/logo.png"
          alt="Company Logo"
          class="company-logo"
          style="width: 120px; height: auto"
        />
      </div>
    </div>
  </div>

  <RegisterFeed
    :isOpen="isOpen"
    @close="isOpen = false"
    @updatedFeeds="updatedFeeds"
  />
</template>

<script setup>
import Feeds from "../components/Feeds.vue";
import RegisterFeed from "../components/RegisterFeed.vue";
import loading from "./loading.vue";

import { ref } from "vue";

const items = [{ title: "SAIR" }];
const feedsRef = ref(null);
const exist = ref(localStorage.getItem("token"));
const isLoading = ref(false);
const text = ref("");

const updatedFeeds = () => {
  feedsRef.value?.loadFeeds?.();
};

const isOpen = ref(false);

const clear = () => {
  isLoading.value = true;
  text.value = "Saindo...";

  localStorage.clear();

  setTimeout(() => {
    isLoading.value = false;
    window.location.href = "/login";
  }, 1000);
};


const redirectToWhatsApp = () => {
  const phoneNumber = "+5514998050967";
  const message = "Olá, gostaria de um orçamento gratuito!";
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
};
</script>

<style scoped>
.toGoOut {
    font-size: 12px;
    color:  rgb(150 136 1);
    text-decoration: none;
    font-weight: bold;
}

.dflex__home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0f0f0;
}

.dflex__exist {
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgb(150 136 1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgb(150 136 1);
}

.menu .hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.logo {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: -15px;
}

.title {
  font-weight: bold;
  font-size: 12px;
}

.subtitle {
  font-size: 8px;
  color:  rgb(150 136 1);
}

.btn__register {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.free-quote {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: ;
}

.footer {
  height: 40vh;
  padding: 20px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.logo__footer {
  display: flex;
  align-items: center;
  flex-direction: row;
}




</style>
