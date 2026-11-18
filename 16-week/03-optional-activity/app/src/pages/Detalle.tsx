import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import EstadoBadge from '../components/EstadoBadge';
import EstadoCarga from '../components/EstadoCarga';
import MensajeError from '../components/MensajeError';
import {
  cambiarEstado,
  obtenerMedicamento,
  type EstadoConfirmacion,
  type Medicamento,
} from '../services/medicamentosApi';
import './Detalle.css';

const Detalle: React.FC = () => {
  const { id } = useParams(); // el id viene en la ruta /detalle/:id
  const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorEstado, setErrorEstado] = useState('');
  const [mostrarToast] = useIonToast();

  // useCallback: la función solo cambia cuando cambia el id, así el useEffect de abajo
  // la puede declarar como dependencia sin volver a cargar en cada render
  const cargar = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      setMedicamento(await obtenerMedicamento(id ?? ''));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }, [id]);

  // Marca el medicamento como tomado o pospuesto (historia H1) y muestra el estado nuevo
  async function marcar(estado: EstadoConfirmacion) {
    if (!medicamento) return;
    setGuardando(true);
    setErrorEstado('');
    try {
      const actualizado = await cambiarEstado(medicamento.id, estado);
      setMedicamento(actualizado); // se muestra lo que guardó la API
      mostrarToast({
        message: estado === 'tomado' ? 'Listo, quedó como tomado' : 'Listo, quedó como pospuesto',
        duration: 2500,
        color: 'success',
        position: 'top',
      });
    } catch (e) {
      setErrorEstado((e as Error).message);
    } finally {
      setGuardando(false);
    }
  }

  // Vuelve a pedir el medicamento cada vez que cambia el id de la ruta
  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/medicamentos" text="Volver" />
          </IonButtons>
          <IonTitle>Detalle del medicamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="contenedor">
          {cargando && <EstadoCarga mensaje="Cargando el medicamento..." />}

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
                </IonLabel>
                <EstadoBadge estado={medicamento.estado_confirmacion} />
              </IonItem>
            </IonList>
          )}

          {/* Si ya se tomó no hace falta volver a marcarlo */}
          {!cargando && !error && medicamento && medicamento.estado_confirmacion !== 'tomado' && (
            <div className="acciones-estado">
              {errorEstado && <MensajeError mensaje={errorEstado} />}
              <IonButton expand="block" size="large" color="success" disabled={guardando} onClick={() => marcar('tomado')}>
                Ya lo tomé
              </IonButton>
              <IonButton
                expand="block"
                size="large"
                fill="outline"
                color="medium"
                disabled={guardando}
                onClick={() => marcar('pospuesto')}
              >
                Posponer
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
