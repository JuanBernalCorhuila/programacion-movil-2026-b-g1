import { IonItem, IonLabel, IonList } from '@ionic/react';
import type { Medicamento } from '../services/medicamentosApi';
import EstadoBadge from './EstadoBadge';
import './ListaMedicamentos.css';

interface Props {
  medicamentos: Medicamento[];
}

// Jerarquía dentro de cada fila: primero el nombre (lo más importante),
// debajo el horario y a la derecha el estado.
const ListaMedicamentos: React.FC<Props> = ({ medicamentos }) => (
  <IonList className="lista-medicamentos">
    {medicamentos.map((m) => (
      <IonItem key={m.id} routerLink={`/detalle/${m.id}`} detail>
        <IonLabel>
          <h2>{m.nombre}</h2>
          <p>{m.horario}</p>
        </IonLabel>
        <EstadoBadge estado={m.estado_confirmacion} />
      </IonItem>
    ))}
  </IonList>
);

export default ListaMedicamentos;
