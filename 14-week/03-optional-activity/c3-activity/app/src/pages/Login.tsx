import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import MensajeError from '../components/MensajeError';
import { iniciarSesion } from '../services/authApi';
import './Login.css';

const Login: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const router = useIonRouter();

  // Si se llegó aquí porque el token venció (401), se explica al usuario
  const sesionVencida = new URLSearchParams(useLocation().search).get('motivo') === 'vencida';

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault(); // evita que el formulario recargue la página
    setEnviando(true);
    setError('');
    try {
      await iniciarSesion(correo, clave);
      setClave(''); // la contraseña no se queda en memoria después de entrar
      router.push('/home', 'root', 'replace'); // 'root': no se puede volver al login con "atrás"
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
          {/* La emergencia no depende de la sesión: siempre debe estar a mano */}
          <IonButtons slot="end">
            <IonButton className="boton-ir-emergencia" routerLink="/emergencia" color="danger" fill="solid">
              Emergencia
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="contenedor">
          {sesionVencida && !error && (
            <MensajeError mensaje="Tu sesión venció. Vuelve a iniciar sesión para ver tus medicamentos." />
          )}
          {error && <MensajeError mensaje={error} />}

          <form className="formulario-login" onSubmit={entrar}>
            <IonInput
              label="Correo"
              labelPlacement="stacked"
              fill="outline"
              type="email"
              autocomplete="email"
              value={correo}
              onIonInput={(e) => setCorreo(String(e.detail.value ?? ''))}
            />
            <IonInput
              label="Contraseña"
              labelPlacement="stacked"
              fill="outline"
              type="password"
              autocomplete="current-password"
              value={clave}
              onIonInput={(e) => setClave(String(e.detail.value ?? ''))}
            />
            <IonButton type="submit" expand="block" size="large" disabled={enviando}>
              {enviando ? 'Entrando...' : 'Iniciar sesión'}
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
