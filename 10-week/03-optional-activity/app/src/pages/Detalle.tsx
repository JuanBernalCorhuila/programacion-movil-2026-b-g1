import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import MensajeError from '../components/MensajeError';
import { obtenerMedicamento, type Medicamento } from '../services/medicamentosApi';

const Detalle: React.FC = () => {
  const { id } = useParams(); // el id viene en la ruta /detalle/:id
  const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setMedicamento(await obtenerMedicamento(id ?? ''));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  // Vuelve a pedir el medicamento cada vez que cambia el id de la ruta
  useEffect(() => {
    cargar();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" />
          </IonButtons>
          <IonTitle>Detalle del medicamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cargando && <IonSpinner />}

        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {!cargando && !error && medicamento && (
          <IonList>
            <IonItem>
              <IonLabel>
                <p>Medicamento o terapia</p>
                <h2>{medicamento.nombre}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Horario</p>
                <h2>{medicamento.horario}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Dosis o indicación</p>
                <h2>{medicamento.dosis}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Estado</p>
                <h2>{medicamento.estado_confirmacion}</h2>
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
