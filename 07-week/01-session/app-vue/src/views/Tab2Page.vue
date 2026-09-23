<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Personajes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="loading" class="status-text">Cargando personajes...</div>
      <div v-else-if="errorMessage" class="status-text error">{{ errorMessage }}</div>

      <ion-list v-else>
        <ion-item v-for="character in characters" :key="character.id">
          <ion-thumbnail slot="start">
            <img :src="character.image" :alt="character.name" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ character.name }}</h2>
            <p>{{ character.species }} - {{ character.status }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/vue';
import { getCharacters, type Character } from '@/services/rickMortyApi';

const characters = ref<Character[]>([]);
const loading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  try {
    characters.value = await getCharacters();
  } catch (error) {
    errorMessage.value = 'No se pudieron cargar los personajes.';
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.status-text {
  text-align: center;
  margin-top: 24px;
  color: #666;
}

.status-text.error {
  color: #d93025;
}

ion-thumbnail {
  --size: 64px;
  margin-right: 12px;
}

ion-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
</style>
