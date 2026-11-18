import { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import EstadoCarga from '../components/EstadoCarga';
import EstadoVacio from '../components/EstadoVacio';
import FormularioSintoma from '../components/FormularioSintoma';
import ListaSintomas from '../components/ListaSintomas';
import MensajeError from '../components/MensajeError';
import { crearSintoma, listarSintomas, type Sintoma } from '../services/sintomasApi';
import './Sintomas.css';

// Wireframe 3: arriba se escribe cómo se siente la persona y abajo está el historial (H3)
const Sintomas: React.FC = () => {
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState('');
  const [errorRegistro, setErrorRegistro] = useState('');
  const [mostrarToast] = useIonToast();

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
      setSintomas([nuevo, ...sintomas]); // el nuevo va primero: es el más reciente
      mostrarToast({ message: 'Síntoma guardado', duration: 2500, color: 'success', position: 'top' });
      return true;
    } catch (e) {
      setErrorRegistro((e as Error).message);
      return false;
    }
  }

  useIonViewWillEnter(() => {
    cargar();
  });

  // Estados del historial: solo uno a la vez
  function historial() {
    if (cargando) {
      return <EstadoCarga mensaje="Cargando tu historial..." />;
    }
    if (errorLista) {
      return <MensajeError mensaje={errorLista} onReintentar={cargar} />;
    }
    if (sintomas.length === 0) {
      return <EstadoVacio titulo="Aún no hay registros" mensaje="Lo que guardes aparecerá aquí." />;
    }
    return <ListaSintomas sintomas={sintomas} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/inicio" text="Volver" />
          </IonButtons>
          <IonTitle>Síntomas de hoy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          {errorRegistro && <MensajeError mensaje={errorRegistro} />}
          <FormularioSintoma onRegistrar={registrar} />

          <h2 className="titulo-historial">Historial</h2>
          {historial()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Sintomas;
