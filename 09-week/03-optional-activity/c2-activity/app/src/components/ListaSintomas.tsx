import { IonItem, IonLabel, IonList } from '@ionic/react';
import type { Sintoma } from '../services/sintomasApi';

interface Props {
  sintomas: Sintoma[];
}

const ListaSintomas: React.FC<Props> = ({ sintomas }) => (
  <IonList>
    {sintomas.map((s) => (
      <IonItem key={s.id} routerLink={`/detalle/${s.id}`} detail>
        <IonLabel>
          <h3>{s.contenido}</h3>
          <p>{new Date(s.fecha).toLocaleString()}</p>
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default ListaSintomas;
