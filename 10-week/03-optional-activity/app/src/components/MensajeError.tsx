import { IonButton, IonText } from '@ionic/react';
import './MensajeError.css';

interface Props {
  mensaje: string;
  onReintentar?: () => void; // si se pasa, se muestra el botón "Reintentar"
}

const MensajeError: React.FC<Props> = ({ mensaje, onReintentar }) => (
  <div className="mensaje-error" role="alert">
    <IonText color="danger">
      <p>{mensaje}</p>
    </IonText>
    {onReintentar && (
      <IonButton fill="outline" size="small" onClick={onReintentar}>
        Reintentar
      </IonButton>
    )}
  </div>
);

export default MensajeError;
