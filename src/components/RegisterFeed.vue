<template>
  <v-dialog v-model="props.isOpen" max-width="600px">
    <loading :loading="isLoading" :text="text"/>
    <v-card>
      <v-card-title>
        <span class="text-h5 title__register">{{
          props.edit ? "Editar Postagem" : "Cadastrar novas obras"
        }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            label="Nome"
            maxlength="20"
            counter
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Descrição"
            maxlength="100"
            counter
          ></v-textarea>

          <v-text-field
          v-model="newImageUrl"
          label="Adicionar URL de Imagem"
          maxlength="500"
          counter
        ></v-text-field>
        
        <v-btn small color="blue darken-1" text @click="addImageUrl">Adicionar</v-btn>
        
        <v-list v-if="images.length > 0">
          <v-list-item v-for="(url, index) in images" :key="index">
            <v-list-item-content>{{ url }}</v-list-item-content>
            <v-btn icon @click="removeImageUrl(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
        
        </v-form>
      </v-card-text>

      <v-card-actions class="mx-4">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="emit('close')"
          >Cancelar</v-btn
        >
        <v-btn
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="handleSubmit"
          variant="tonal"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../services/api.js";
import loading from './loading.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },

  edit: {
    type: Boolean,
    default: false,
  },

  form: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      images: [],
    }),
  },
});

const emit = defineEmits(["close", "updatedFeeds"]);


const valid = ref(false);
const name = ref("");
const description = ref("");
const images = ref([]); 
const newImageUrl = ref("");
const isLoading = ref(false);
const text = ref('');

const addImageUrl = () => {
  const trimmed = newImageUrl.value.trim();
  if (trimmed && !images.value.includes(trimmed)) {
    images.value.push(trimmed);
    newImageUrl.value = "";
  }
};

const removeImageUrl = (index) => {
  images.value.splice(index, 1);
};

watch(
  () => props.form,
  (newForm) => {
    if (props.edit && newForm) {
      name.value = newForm.titulo || "";
      description.value = newForm.descricao || "";
      images.value = newForm.imagens?.map((img) => img.url) || [];
    } else {
      // limpa campos se não estiver editando
      name.value = "";
      description.value = "";
      images.value = [];
    }
  },
  { immediate: true }
);


const submit = async () => {
  isLoading.value = true;
  text.value = 'Cadastrando...'
  
  const token = localStorage.getItem("token");
  try {
    const { data } = await api.post(
      "/v1/feeds",
      {
        titulo: name.value,
        descricao: description.value,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    await submitImagens(data.id);
 
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    throw error;
  }  finally {
    emit("close");
    name.value = "";
      description.value = "";
      images.value = [];
  }
};

const submitImagens = async (id) => {
  const token = localStorage.getItem("token");

  try {
    for (const url of images.value) {
      await api.post(
        "/v1/feeds/imagens",
        {
          feed_id: id,
          url,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    }
    isLoading.value = false;
  } catch (error) {
    console.error("Erro ao enviar imagens:", error);
  }  finally {
    emit("updatedFeeds");
    emit("close");
    name.value = "";
      description.value = "";
      images.value = [];
  }
};


const updateFeed = async () => {
  isLoading.value = true;
  text.value = 'Atualizando...'
  const token = localStorage.getItem("token");

  try {

    await api.put(
      `/v1/feeds/${props.form.id}`,
      {
        titulo: name.value,
        descricao: description.value,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    const originalUrls = props.form.imagens?.map((img) => img.url) || [];
    const currentUrls = images.value;

    const added = currentUrls.filter((url) => !originalUrls.includes(url));
    const removed = originalUrls.filter((url) => !currentUrls.includes(url));


    for (const url of added) {
      await api.post(
        "/v1/feeds/imagens",
        {
          feed_id: props.form.id,
          url,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    }


    for (const url of removed) {
      await api.delete("/v1/feeds/imagens", {
        headers: {
          "x-auth-token": token,
        },
        data: {
          feed_id: props.form.id,
          url,
        },
      });
    }

    isLoading.value = false;

    emit("updatedFeeds");
    emit("close");
  } catch (error) {
    console.error("Erro ao atualizar feed:", error);
  }
}

const handleSubmit = async () => {
  if (props.edit) {
    await updateFeed();
  } else {
    await submit();
  }
};


</script>

<style scoped>
.title__register {
  font-size: 24px;
  font-weight: bold;
  color: rgb(79, 164, 234);
}
</style>
