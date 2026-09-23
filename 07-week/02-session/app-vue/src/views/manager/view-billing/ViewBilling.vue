<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Facturación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Facturación</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="factura in facturas" :key="factura.id">
          <ion-label>
            <h2>Factura #{{ factura.id }}</h2>
            <p>{{ factura.cliente }} · {{ factura.fecha }}</p>
          </ion-label>
          <ion-note slot="end">${{ factura.total.toFixed(2) }}</ion-note>
          <ion-badge :color="colorEstado(factura.estado)" slot="end">
            {{ factura.estado }}
          </ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

interface Factura {
  id: number;
  cliente: string;
  fecha: string;
  total: number;
  estado: 'pagada' | 'pendiente' | 'anulada';
}

const facturas: Factura[] = [
  { id: 1001, cliente: 'Juan Pérez', fecha: '2026-09-10', total: 89.9, estado: 'pagada' },
  { id: 1002, cliente: 'María Gómez', fecha: '2026-09-14', total: 45.5, estado: 'pendiente' },
  { id: 1003, cliente: 'Carlos Ruiz', fecha: '2026-09-16', total: 132.0, estado: 'pagada' },
  { id: 1004, cliente: 'Laura Torres', fecha: '2026-09-17', total: 21.75, estado: 'anulada' },
];

function colorEstado(estado: Factura['estado']) {
  return { pagada: 'success', pendiente: 'warning', anulada: 'danger' }[estado];
}
</script>
