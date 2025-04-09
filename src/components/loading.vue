<template>
    <div
    v-if="loading"
    class="loading-overlay d-flex flex-column justify-center align-center"
  >
    <v-progress-circular
      indeterminate
      color="#968801"
      size="60"
      width="6"
    />
    <span class="mt-4 text-subtitle-1" style="color: white">{{text}}</span>
  </div>
  
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Carregando...'
  }
})

</script>
<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.57);
  z-index: 9999;
}
</style>