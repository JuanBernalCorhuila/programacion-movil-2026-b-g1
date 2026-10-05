import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import FormularioMedicamento from '../components/FormularioMedicamento';
import ListaMedicamentos from '../components/ListaMedicamentos';
import MensajeError from '../components/MensajeError';
import {
  crearMedicamento,
  listarMedicamentos,
  type Medicamento,
  type NuevoMedicamento,
} from '../services/medicamentosApi';
import './Home.css';

const Home: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState('');
  const [errorFormulario, setErrorFormulario] = useState('');

  async function cargar() {
    setCargando(true);
    setErrorLista('');
    try {
      setMedicamentos(await listarMedicamentos());
    } catch (e) {
      setErrorLista((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  async function agregar(medicamento: NuevoMedicamento): Promise<boolean> {
    setErrorFormulario('');
    try {
      const nuevo = await crearMedicamento(medicamento);
      setMedicamentos([...medicamentos, nuevo]); // agrega a la lista el que devolvió la API
      return true;
    } catch (e) {
      setErrorFormulario((e as Error).message);
      return false;
    }
  }

  // Pide la lista una sola vez, cuando se abre la pantalla
  useEffect(() => {
    cargar();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Medicamentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cargando && <IonSpinner />}
        {errorLista && <MensajeError mensaje={errorLista} onReintentar={cargar} />}
        {!cargando && !errorLista && <ListaMedicamentos medicamentos={medicamentos} />}

        <h2 className="titulo-formulario">Agregar medicamento</h2>
        <FormularioMedicamento onAgregar={agregar} />
        {errorFormulario && <MensajeError mensaje={errorFormulario} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
