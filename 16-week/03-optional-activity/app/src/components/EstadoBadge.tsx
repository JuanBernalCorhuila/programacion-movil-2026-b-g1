import { IonBadge } from '@ionic/react';
import './EstadoBadge.css';

interface Props {
  estado: string; // pendiente, tomado o pospuesto (modelo de datos de la semana 4)
}

// Cada estado tiene un color, pero también su palabra escrita:
// así no depende solo del color (personas con daltonismo o baja visión).
const COLORES: Record<string, string> = {
  pendiente: 'warning',
  tomado: 'success',
  pospuesto: 'medium',
};

const EstadoBadge: React.FC<Props> = ({ estado }) => (
  <IonBadge className="estado-badge" color={COLORES[estado] ?? 'medium'}>
    {estado.charAt(0).toUpperCase() + estado.slice(1)}
  </IonBadge>
);

export default EstadoBadge;
