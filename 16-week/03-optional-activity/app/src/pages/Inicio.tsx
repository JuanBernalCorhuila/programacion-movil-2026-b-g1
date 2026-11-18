import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react';
import { alertCircleOutline, clipboardOutline, medkitOutline, personCircleOutline } from 'ionicons/icons';
import { cerrarSesion, haySesion } from '../services/authApi';
import './Inicio.css';

// Pantalla principal (wireframe 1): el botón de emergencia grande arriba
// y debajo los accesos a las otras dos funciones del MVP.
const Inicio: React.FC = () => {
  const router = useIonRouter();

  // Si no hay sesión, esta pantalla no tiene sentido: se va al login
  useIonViewWillEnter(() => {
    haySesion().then((activa) => {
      if (!activa) router.push('/login', 'root', 'replace');
    });
  });

  // Borra el token y vuelve al login; 'root' limpia el historial para que "atrás" no regrese aquí
  async function salir() {
    await cerrarSesion();
    router.push('/login', 'root', 'replace');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>HelpHealth</IonTitle>
          {/* Configuración del contacto de confianza ([config] en el wireframe) */}
          <IonButtons slot="end">
            <IonButton routerLink="/cuidador">
              <IonIcon slot="start" icon={personCircleOutline} aria-hidden="true" />
              Cuidador
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          <IonButton className="boton-inicio-emergencia" routerLink="/emergencia" color="danger" expand="block">
            <IonIcon slot="start" icon={alertCircleOutline} aria-hidden="true" />
            Emergencia
          </IonButton>

          <IonList className="accesos-inicio">
            <IonItem routerLink="/medicamentos" detail>
              <IonIcon slot="start" icon={medkitOutline} aria-hidden="true" />
              <IonLabel>Mis medicamentos</IonLabel>
            </IonItem>
            <IonItem routerLink="/sintomas" detail>
              <IonIcon slot="start" icon={clipboardOutline} aria-hidden="true" />
              <IonLabel>Registrar síntomas</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>

      <IonFooter className="pie-accion">
        <IonToolbar>
          <div className="contenedor">
            <IonButton fill="outline" expand="block" onClick={salir}>
              Cerrar sesión
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Inicio;
