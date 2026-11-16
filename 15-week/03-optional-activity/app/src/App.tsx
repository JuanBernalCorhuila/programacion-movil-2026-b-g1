import { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Agregar from './pages/Agregar';
import Cuidador from './pages/Cuidador';
import Detalle from './pages/Detalle';
import Emergencia from './pages/Emergencia';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Medicamentos from './pages/Medicamentos';
import Sintomas from './pages/Sintomas';
import { cuandoSePierdaLaSesion } from './services/api';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/layout.css';

setupIonicReact();

// Cuando el servicio de la API avisa que no hay sesión o que el token venció (401),
// se lleva al usuario al login. Se registra una sola vez para toda la app.
const VigilanteSesion: React.FC = () => {
  const router = useIonRouter();
  useEffect(() => {
    cuandoSePierdaLaSesion((motivo) => {
      router.push(motivo === 'vencida' ? '/login?motivo=vencida' : '/login', 'root', 'replace');
    });
  }, [router]);
  return null;
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <VigilanteSesion />
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/sintomas" element={<Sintomas />} />
        <Route path="/cuidador" element={<Cuidador />} />
        <Route path="/emergencia" element={<Emergencia />} />
        <Route path="/" element={<Navigate to="/inicio" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
