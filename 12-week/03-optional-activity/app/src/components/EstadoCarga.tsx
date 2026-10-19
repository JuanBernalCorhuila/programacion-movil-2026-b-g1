import { IonSpinner } from '@ionic/react';
import './EstadoCarga.css';

interface Props {
  mensaje: string;
}

// Estado "cargando": el spinner va acompañado de un texto, así el usuario
// (y el lector de pantalla, gracias a role="status") sabe qué está pasando.
const EstadoCarga: React.FC<Props> = ({ mensaje }) => (
  <div className="estado-carga" role="status">
    <IonSpinner name="crescent" aria-hidden="true" />
    <p>{mensaje}</p>
  </div>
);

export default EstadoCarga;
