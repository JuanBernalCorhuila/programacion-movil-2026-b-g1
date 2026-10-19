import { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import FormularioMedicamento from '../components/FormularioMedicamento';
import MensajeError from '../components/MensajeError';
import { crearMedicamento, type NuevoMedicamento } from '../services/medicamentosApi';

const Agregar: React.FC = () => {
  const [error, setError] = useState('');
  const router = useIonRouter();
  const [mostrarToast] = useIonToast();

  async function guardar(medicamento: NuevoMedicamento): Promise<boolean> {
    setError('');
    try {
      const nuevo = await crearMedicamento(medicamento);
      // Feedback de éxito y regreso a la lista (navegación stack)
      mostrarToast({
        message: `${nuevo.nombre} se agregó a tus medicamentos`,
        duration: 2500,
        color: 'success',
        position: 'top',
      });
      router.goBack();
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" />
          </IonButtons>
          <IonTitle>Agregar medicamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contenedor">
          {error && <MensajeError mensaje={error} />}
          <FormularioMedicamento onAgregar={guardar} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Agregar;
