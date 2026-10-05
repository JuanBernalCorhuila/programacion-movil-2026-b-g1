import { useState } from 'react';
import { IonButton, IonInput } from '@ionic/react';
import type { NuevoMedicamento } from '../services/medicamentosApi';
import './FormularioMedicamento.css';

interface Props {
  // Devuelve true si el medicamento se guardó, para saber si se limpian los campos
  onAgregar: (medicamento: NuevoMedicamento) => Promise<boolean>;
}

const FormularioMedicamento: React.FC<Props> = ({ onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [horario, setHorario] = useState('');
  const [dosis, setDosis] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault(); // evita que el formulario recargue la página
    setEnviando(true);
    const guardado = await onAgregar({ nombre, horario, dosis });
    if (guardado) {
      setNombre('');
      setHorario('');
      setDosis('');
    }
    setEnviando(false);
  }

  return (
    <form className="formulario-medicamento" onSubmit={enviar}>
      <IonInput
        label="Nombre del medicamento o terapia"
        labelPlacement="stacked"
        fill="outline"
        value={nombre}
        onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
      />
      <IonInput
        label="Horario"
        labelPlacement="stacked"
        fill="outline"
        type="time"
        value={horario}
        onIonInput={(e) => setHorario(String(e.detail.value ?? ''))}
      />
      <IonInput
        label="Dosis o indicación"
        labelPlacement="stacked"
        fill="outline"
        value={dosis}
        onIonInput={(e) => setDosis(String(e.detail.value ?? ''))}
      />
      <IonButton type="submit" expand="block" disabled={enviando}>
        {enviando ? 'Agregando...' : 'Agregar medicamento'}
      </IonButton>
    </form>
  );
};

export default FormularioMedicamento;
