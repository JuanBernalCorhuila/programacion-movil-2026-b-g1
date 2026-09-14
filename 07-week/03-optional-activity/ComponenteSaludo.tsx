// Saludo.tsx
// Semana 7 - Programación Móvil
// Componente simple: muestra un nombre y un botón.

import React, { useState } from 'react';
import { IonContent, IonButton, IonLabel } from '@ionic/react';

const Saludo: React.FC = () => {
  const nombre = "Ana";
  const [saludado, setSaludado] = useState(false);

  return (
    <IonContent className="ion-padding">
      <IonLabel>
        <h2>{saludado ? `Hola, ${nombre}!` : nombre}</h2>
      </IonLabel>
      <IonButton onClick={() => setSaludado(true)}>Saludar</IonButton>
    </IonContent>
  );
};

export default Saludo;
