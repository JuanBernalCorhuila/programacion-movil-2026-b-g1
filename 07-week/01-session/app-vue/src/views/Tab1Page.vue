<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro de usuario</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="register-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Crear cuenta</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list lines="full">
              <ion-item>
                <ion-input
                  v-model="userForm.nombre"
                  label="Nombre completo"
                  label-placement="floating"
                  type="text"
                  placeholder="Ingrese su nombre"
                />
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="userForm.identificacion"
                  label="Identificación / ID"
                  label-placement="floating"
                  type="text"
                  placeholder="Ej: 123456789"
                />
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="userForm.email"
                  label="Correo electrónico"
                  label-placement="floating"
                  type="email"
                  placeholder="usuario@correo.com"
                />
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="userForm.telefono"
                  label="Teléfono"
                  label-placement="floating"
                  type="tel"
                  placeholder="3001234567"
                />
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="userForm.ciudad"
                  label="Ciudad"
                  label-placement="floating"
                  type="text"
                  placeholder="Bogotá"
                />
              </ion-item>

              <ion-item>
                <ion-textarea
                  v-model="userForm.direccion"
                  label="Dirección"
                  label-placement="floating"
                  rows="3"
                  placeholder="Ingrese su dirección"
                />
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="userForm.password"
                  label="Contraseña"
                  label-placement="floating"
                  type="password"
                  placeholder="********"
                />
              </ion-item>
            </ion-list>

            <ion-button expand="block" class="ion-margin-top" @click="handleRegister">
              Registrar usuario
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/vue';
import { createEmptyUserForm, registerUser, type UserForm } from '@/core/userService';
import { getCharacters, type Character } from '@/services/rickMortyApi';

const userForm = ref<UserForm>(createEmptyUserForm());
const characters = ref<Character[]>([]);

const handleRegister = () => {
  const savedUser = registerUser({ ...userForm.value });

  console.log('Usuario registrado:', savedUser);
  userForm.value = createEmptyUserForm();
};

onMounted(async () => {
  const receivedCharacters = await getCharacters();
  characters.value = receivedCharacters;

  console.log('Personajes recibidos:', characters.value);
});
</script>

<style scoped src="@/styles/register.css"></style>



