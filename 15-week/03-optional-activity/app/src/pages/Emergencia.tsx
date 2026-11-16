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
  useIonViewWillEnter,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import EstadoCarga from '../components/EstadoCarga';
import MensajeError from '../components/MensajeError';
import { enlaceSms } from '../services/alertaCuidador';
import { obtenerCuidador, type Cuidador } from '../services/cuidadorStorage';
import { obtenerUbicacion, type ResultadoUbicacion } from '../services/ubicacionService';
import './Emergencia.css';

const MENSAJE_DENEGADO =
  'No diste permiso para usar tu ubicación, así que no podemos decirle a tu cuidador dónde estás. ' +
  'Puedes activarlo en Ajustes > Aplicaciones > HelpHealth > Permisos > Ubicación y volver a tocar el botón.';

const Emergencia: React.FC = () => {
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoUbicacion | null>(null);
  const [cuidador, setCuidador] = useState<Cuidador | null>(null);
  const [enlace, setEnlace] = useState(''); // mensaje SMS ya armado, para poder abrirlo otra vez

  // El cuidador está guardado en el teléfono: se lee sin internet y sin sesión
  useIonViewWillEnter(() => {
    obtenerCuidador().then(setCuidador);
  });

  // Un solo toque: obtiene la ubicación y, si hay cuidador, abre el SMS con ella (historia H2)
  async function pedirAyuda() {
    setCargando(true);
    setResultado(null);
    setEnlace('');
    const obtenido = await obtenerUbicacion();
    setResultado(obtenido);
    setCargando(false);

    if (obtenido.tipo === 'ok' && cuidador) {
      const sms = enlaceSms(cuidador, obtenido.ubicacion);
      setEnlace(sms);
      // Abre la app de mensajes del teléfono con el número y el texto ya escritos
      window.location.href = sms;
    }
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
          {enlace && cuidador && (
            <>
              <p className="emergencia-enviado">
                Se abrió tu app de mensajes con tu ubicación para {cuidador.nombre}. Solo toca Enviar.
              </p>
              <IonButton className="boton-reabrir-sms" href={enlace} expand="block" fill="outline">
                Abrir el mensaje otra vez
              </IonButton>
            </>
          )}
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
            <IonBackButton defaultHref="/inicio" text="Volver" />
          </IonButtons>
          <IonTitle>Emergencia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          {cuidador ? (
            <p className="emergencia-ayuda">
              Toca el botón y HelpHealth le enviará tu ubicación actual a {cuidador.nombre} por mensaje
              de texto.
            </p>
          ) : (
            <div className="emergencia-sin-cuidador">
              <p className="emergencia-ayuda">
                Todavía no has guardado a tu cuidador. Puedes obtener tu ubicación, pero para enviársela
                a alguien primero guarda su nombre y su teléfono.
              </p>
              <IonButton routerLink="/cuidador" expand="block" fill="outline">
                Guardar mi cuidador
              </IonButton>
            </div>
          )}

          <IonButton
            className="boton-emergencia"
            color="danger"
            expand="block"
            size="large"
            disabled={cargando}
            onClick={pedirAyuda}
          >
            <IonIcon slot="start" icon={locationOutline} aria-hidden="true" />
            {cuidador ? `Enviar mi ubicación a ${cuidador.nombre}` : 'Obtener mi ubicación'}
          </IonButton>

          {contenido()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Emergencia;
