import { useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import MensajeError from '../components/MensajeError';
import { guardarCuidador, obtenerCuidador } from '../services/cuidadorStorage';
import './Cuidador.css';

// Contacto de confianza (entidad Cuidador): a quién le llega la ubicación en una emergencia
const Cuidador: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const router = useIonRouter();
  const [mostrarToast] = useIonToast();

  // Si ya había un cuidador guardado, se muestran sus datos para poder cambiarlos
  useIonViewWillEnter(() => {
    obtenerCuidador().then((guardado) => {
      if (guardado) {
        setNombre(guardado.nombre);
        setTelefono(guardado.telefono);
      }
    });
  });

  async function guardar(evento: React.FormEvent) {
    evento.preventDefault(); // evita que el formulario recargue la página
    const soloDigitos = telefono.replace(/\D/g, '');
    if (!nombre.trim() || soloDigitos.length < 7) {
      setError('Escribe el nombre y un número de teléfono válido (al menos 7 dígitos).');
      return;
    }
    setError('');
    await guardarCuidador({ nombre: nombre.trim(), telefono: telefono.trim() });
    mostrarToast({ message: `${nombre.trim()} es ahora tu contacto de emergencia`, duration: 2500, color: 'success', position: 'top' });
    router.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/inicio" text="Volver" />
          </IonButtons>
          <IonTitle>Mi cuidador</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          <p className="cuidador-ayuda">
            Cuando toques Emergencia, HelpHealth le enviará tu ubicación a esta persona por mensaje de
            texto. Sus datos se guardan solo en este teléfono, así funcionan aunque no tengas internet.
          </p>

          {error && <MensajeError mensaje={error} />}

          <form className="formulario-cuidador" onSubmit={guardar}>
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              fill="outline"
              autocomplete="name"
              value={nombre}
              onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
            />
            <IonInput
              label="Teléfono"
              labelPlacement="stacked"
              fill="outline"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              value={telefono}
              onIonInput={(e) => setTelefono(String(e.detail.value ?? ''))}
            />
            <IonButton type="submit" expand="block" size="large">
              Guardar cuidador
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cuidador;
