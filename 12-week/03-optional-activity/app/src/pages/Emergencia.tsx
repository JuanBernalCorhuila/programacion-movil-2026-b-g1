import { useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import EstadoCarga from '../components/EstadoCarga';
import MensajeError from '../components/MensajeError';
import { obtenerUbicacion, type ResultadoUbicacion } from '../services/ubicacionService';
import './Emergencia.css';

const MENSAJE_DENEGADO =
  'No diste permiso para usar tu ubicación, así que no podemos decirle a tu cuidador dónde estás. ' +
  'Puedes activarlo en Ajustes > Aplicaciones > HelpHealth > Permisos > Ubicación y volver a tocar el botón.';

const Emergencia: React.FC = () => {
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoUbicacion | null>(null);

  async function buscarUbicacion() {
    setCargando(true);
    setResultado(null);
    setResultado(await obtenerUbicacion());
    setCargando(false);
  }

  // Solo uno de los estados se muestra a la vez
  function contenido() {
    if (cargando) {
      return <EstadoCarga mensaje="Obteniendo tu ubicación..." />;
    }
    if (resultado?.tipo === 'denegado') {
      return <MensajeError mensaje={MENSAJE_DENEGADO} />;
    }
    if (resultado?.tipo === 'error') {
      return <MensajeError mensaje={resultado.mensaje} />;
    }
    if (resultado?.tipo === 'ok') {
      const { lat, lng } = resultado.ubicacion;
      return (
        // role="status": el lector de pantalla anuncia la ubicación cuando aparece
        <div role="status">
          <IonList>
            <IonItem>
              <IonLabel>
                <p>Latitud</p>
                <h2>{lat.toFixed(6)}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Longitud</p>
                <h2>{lng.toFixed(6)}</h2>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      );
    }
    return null; // todavía no se ha tocado el botón
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" />
          </IonButtons>
          <IonTitle>Emergencia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          <p className="emergencia-ayuda">
            Toca el botón para obtener tu ubicación actual. Es la ubicación que HelpHealth le
            enviará a tu cuidador cuando necesites ayuda.
          </p>

          <IonButton
            className="boton-emergencia"
            color="danger"
            expand="block"
            size="large"
            disabled={cargando}
            onClick={buscarUbicacion}
          >
            <IonIcon slot="start" icon={locationOutline} aria-hidden="true" />
            Obtener mi ubicación
          </IonButton>

          {contenido()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Emergencia;
