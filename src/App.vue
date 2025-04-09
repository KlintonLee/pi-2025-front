<script setup>
import { RouterView } from 'vue-router'


</script>

<template>
  <v-app>
    <main>
      <RouterView />
    </main>
  </v-app>
</template>

<style>
.v-app { 
  height: 100vh;
  overflow-y: auto
}

</style>