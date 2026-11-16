import { IonItem, IonLabel, IonList } from '@ionic/react';
import type { Sintoma } from '../services/sintomasApi';
import './ListaSintomas.css';

interface Props {
  sintomas: Sintoma[];
}

// Muestra la fecha como la leería una persona: "14 nov 2026, 3:40 p. m."
function formatearFecha(fechaIso: string): string {
  return new Date(fechaIso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

// Historial de síntomas. Llega ordenado desde la API (el más reciente primero),
// que es como el médico lo consulta en la cita.
const ListaSintomas: React.FC<Props> = ({ sintomas }) => (
  <IonList className="lista-sintomas">
    {sintomas.map((s) => (
      <IonItem key={s.id}>
        <IonLabel className="ion-text-wrap">
          <p>{formatearFecha(s.fecha)}</p>
          <h2>{s.contenido}</h2>
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default ListaSintomas;
