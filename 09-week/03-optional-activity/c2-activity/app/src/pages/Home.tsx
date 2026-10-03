import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import FormularioSintoma from '../components/FormularioSintoma';
import ListaSintomas from '../components/ListaSintomas';
import MensajeError from '../components/MensajeError';
import { crearSintoma, listarSintomas, type Sintoma } from '../services/sintomasApi';
import './Home.css';

const Home: React.FC = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState('');
  const [errorRegistro, setErrorRegistro] = useState('');

  async function cargar() {
    setCargando(true);
    setErrorLista('');
    try {
      setSintomas(await listarSintomas());
    } catch (e) {
      setErrorLista((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  async function registrar(contenido: string): Promise<boolean> {
    setErrorRegistro('');
    try {
      const nuevo = await crearSintoma(contenido);
      setSintomas([...sintomas, nuevo]); // agrega a la lista el registro que devolvió la API
      return true;
    } catch (e) {
      setErrorRegistro((e as Error).message);
      return false;
    }
  }

  // Pide el historial una sola vez, cuando se abre la pantalla
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
        <FormularioSintoma onRegistrar={registrar} />
        {errorRegistro && <MensajeError mensaje={errorRegistro} />}

        <h2 className="titulo-historial">Historial</h2>
        {cargando && <IonSpinner />}
        {errorLista && <MensajeError mensaje={errorLista} onReintentar={cargar} />}
        {!cargando && !errorLista && <ListaSintomas sintomas={sintomas} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
