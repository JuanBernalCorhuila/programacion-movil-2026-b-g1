import { IonItem, IonLabel, IonList, IonNote } from '@ionic/react';
import type { Medicamento } from '../services/medicamentosApi';

interface Props {
  medicamentos: Medicamento[];
}

const ListaMedicamentos: React.FC<Props> = ({ medicamentos }) => (
  <IonList>
    {medicamentos.map((m) => (
      <IonItem key={m.id} routerLink={`/detalle/${m.id}`} detail>
        <IonLabel>
          <h3>{m.nombre}</h3>
          <p>{m.horario}</p>
        </IonLabel>
        <IonNote slot="end">{m.estado_confirmacion}</IonNote>
      </IonItem>
    ))}
  </IonList>
);

export default ListaMedicamentos;
