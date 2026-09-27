import { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { crearSintoma, listarSintomas, type Sintoma } from '../services/sintomasApi';
import './Home.css';

const Home: React.FC = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [contenido, setContenido] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setSintomas(await listarSintomas());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  async function registrar() {
    setError('');
    try {
      await crearSintoma(contenido);
      setContenido('');
      cargar();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de síntomas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTextarea
          label="¿Cómo te sientes hoy?"
          labelPlacement="stacked"
          fill="outline"
          value={contenido}
          onIonInput={(e) => setContenido(e.detail.value ?? '')}
        />
        <IonButton expand="block" onClick={registrar}>
          Registrar
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <h2>Historial</h2>
        {cargando ? (
          <IonSpinner />
        ) : (
          <IonList>
            {sintomas.map((s) => (
              <IonItem key={s.id}>
                <IonLabel>
                  <h3>{s.contenido}</h3>
                  <p>{new Date(s.fecha).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
