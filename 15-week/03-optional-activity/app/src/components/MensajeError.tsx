import { IonButton, IonText } from '@ionic/react';
import './MensajeError.css';

interface Props {
  mensaje: string;
  onReintentar?: () => void; // si se pasa, se muestra el botón "Reintentar"
}

// role="alert" hace que el lector de pantalla lea el error apenas aparece
const MensajeError: React.FC<Props> = ({ mensaje, onReintentar }) => (
  <div className="mensaje-error" role="alert">
    <IonText color="danger">
      <p>{mensaje}</p>
    </IonText>
    {onReintentar && (
      <IonButton fill="outline" onClick={onReintentar}>
        Reintentar
      </IonButton>
    )}
  </div>
);

export default MensajeError;
