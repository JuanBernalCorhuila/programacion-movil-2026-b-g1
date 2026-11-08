import { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react';
import EstadoCarga from '../components/EstadoCarga';
import EstadoVacio from '../components/EstadoVacio';
import ListaMedicamentos from '../components/ListaMedicamentos';
import MensajeError from '../components/MensajeError';
import { cerrarSesion } from '../services/authApi';
import { listarMedicamentos, type Medicamento } from '../services/medicamentosApi';
import './Home.css';

const Home: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const router = useIonRouter();

  // Borra el token y vuelve al login; 'root' limpia el historial para que "atrás" no regrese aquí
  async function salir() {
    await cerrarSesion();
    router.push('/login', 'root', 'replace');
  }

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setMedicamentos(await listarMedicamentos());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta cada vez que esta pantalla se va a mostrar: al abrir la app y al volver
  // desde "Agregar" o "Detalle". listarMedicamentos reutiliza la copia en memoria si es
  // reciente, y tras agregar un medicamento la borra, así la lista siempre está al día.
  useIonViewWillEnter(() => {
    cargar();
  });

  // Solo uno de los estados se muestra a la vez
  function contenido() {
    if (cargando) {
      return <EstadoCarga mensaje="Cargando tus medicamentos..." />;
    }
    if (error) {
      return <MensajeError mensaje={error} onReintentar={cargar} />;
    }
    if (medicamentos.length === 0) {
      return (
        <EstadoVacio
          titulo="Aún no tienes medicamentos"
          mensaje="Toca «Agregar medicamento» para registrar el primero."
        />
      );
    }
    return <ListaMedicamentos medicamentos={medicamentos} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis medicamentos</IonTitle>
          {/* Acceso a emergencia siempre visible arriba, aunque la lista falle */}
          <IonButtons slot="end">
            <IonButton className="boton-ir-emergencia" routerLink="/emergencia" color="danger" fill="solid">
              Emergencia
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">{contenido()}</div>
      </IonContent>

      {/* Acción principal: fija abajo, al alcance del pulgar */}
      <IonFooter className="pie-accion">
        <IonToolbar>
          <div className="contenedor">
            <IonButton routerLink="/agregar" expand="block" size="large">
              Agregar medicamento
            </IonButton>
            <IonButton className="boton-cerrar-sesion" fill="outline" expand="block" onClick={salir}>
              Cerrar sesión
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
