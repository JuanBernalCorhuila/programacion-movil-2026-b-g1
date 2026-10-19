import { IonIcon } from '@ionic/react';
import { medkitOutline } from 'ionicons/icons';
import './EstadoVacio.css';

interface Props {
  titulo: string;
  mensaje: string;
}

// Estado "vacío": la petición salió bien pero no hay datos.
// En vez de una pantalla en blanco se explica qué pasa y qué puede hacer el usuario.
const EstadoVacio: React.FC<Props> = ({ titulo, mensaje }) => (
  <div className="estado-vacio">
    <IonIcon icon={medkitOutline} aria-hidden="true" />
    <h2>{titulo}</h2>
    <p>{mensaje}</p>
  </div>
);

export default EstadoVacio;
