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
import { obtenerSintoma, type Sintoma } from '../services/sintomasApi';

const Detalle: React.FC = () => {
  const { id } = useParams(); // el id viene en la ruta /detalle/:id
  const [sintoma, setSintoma] = useState<Sintoma | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setSintoma(await obtenerSintoma(id ?? ''));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  // Vuelve a pedir el registro cada vez que cambia el id de la ruta
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
          <IonTitle>Detalle del síntoma</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cargando && <IonSpinner />}

        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {!cargando && !error && sintoma && (
          <IonList>
            <IonItem>
              <IonLabel>
                <p>¿Cómo se sintió?</p>
                <h2>{sintoma.contenido}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Fecha y hora del registro</p>
                <h2>{new Date(sintoma.fecha).toLocaleString()}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Tipo de registro</p>
                <h2>{sintoma.tipo}</h2>
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
