<template>
  <div class="feeds">
    <loading :loading="isLoading" :text="text"/>
    <div v-for="(feed, index) in feeds" :key="index" class="card">
      <v-carousel :show-arrows="false" cycle height="300">
        <v-carousel-item
          v-for="(item, i) in feed.imagens"
          :key="i"
          :src="item.url"
          cover
        ></v-carousel-item>
      </v-carousel>
    
      <div class="card-content">
        <h3>{{ feed.titulo}}</h3>
        <p>{{ feed.descricao }}</p>
      
        <div v-if="exist" class="acoes">
          <v-btn icon color="primary" @click="openEdit(feed)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteFeed(feed.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
      
    </div>
  </div>
  
  <RegisterFeed
    :isOpen="isOpen"
    @close="isOpen = false"
    :edit="edit"
    :form="selectedFeed"
    @updatedFeeds="getData"
/>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import RegisterFeed from "../components/RegisterFeed.vue";
import api from "../services/api.js";
import loading from './loading.vue';


const router = useRouter();

const isOpen = ref(false);
const edit = ref(false);
const exist = ref(localStorage.getItem('token'))
const isLoading = ref(false);
const text = ref('');


const form = ref({
    name: "",
    description: "",
    images: [],
});

const feeds = ref([]); 
const selectedFeed = ref(null);

const openEdit = (feed) => {
  selectedFeed.value = feed;
  isOpen.value = true;
  edit.value = true;
};


const getData = async () => {
  isLoading.value = true
  
  const token = localStorage.getItem('token');

  setTimeout(() => {
  isLoading.value = false
}, 2000)


  try {
    const { data } = await api.get('/v1/feeds', {
      headers: {
        'x-auth-token': token,
      }
    });

    feeds.value = data

    isLoading.value = false
  } catch (error) {
    console.error('Erro ao buscar feeds:', error);
  }
};


const loadFeeds = async() => {
  await getData();
}

const deleteFeed = async (id) => {
  text.value = 'Deletando feed...'
  isLoading.value = true
  const token = localStorage.getItem('token');
  try {
    await api.delete(`/v1/feeds/${id}`, {
      headers: {
        'x-auth-token': token,
      }
    });
    await getData(); 
  } catch (error) {
    console.error('Erro ao deletar feed:', error);
  }
};

onMounted(() => {
  isLoading.value = true

    setTimeout(() => {
    isLoading.value = false
  }, 1500)

  loadFeeds();
})

defineExpose({
  loadFeeds
})
</script>

<style scoped>
.feeds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.card {
  border: 1px solid rgb(150 136 1);
  border-radius: 8px;
  overflow: hidden;
  width: 400px;
  height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-content {
  padding: 16px;
  text-align: center;
}

.card-content h3 {
  margin: 0;
  font-size: 1.2em;
}

.card-content p {
  margin: 8px 0 0;
  max-height: 120px;
  color: #555;
  overflow-y: auto;
}

.acoes {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 40px 16px;
  gap: 10px;
}

@media (max-width: 600px) {
  .card {
    font-size: 12px;
  }

  .acoes {
    padding: 8px 16px;
    gap: 5px;
  }
}

</style>
