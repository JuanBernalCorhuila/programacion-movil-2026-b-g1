import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import EstadoCarga from '../components/EstadoCarga';
import EstadoVacio from '../components/EstadoVacio';
import ListaMedicamentos from '../components/ListaMedicamentos';
import MensajeError from '../components/MensajeError';
import { listarMedicamentos, type Medicamento } from '../services/medicamentosApi';
import './Home.css';

const Home: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

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

  // Se ejecuta cada vez que esta pantalla se va a mostrar: al abrir la app
  // y también al volver desde "Agregar", así la lista siempre está al día.
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
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
