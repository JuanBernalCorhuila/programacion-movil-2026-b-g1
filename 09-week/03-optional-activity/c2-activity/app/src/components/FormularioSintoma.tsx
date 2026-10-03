import { useState } from 'react';
import { IonButton, IonTextarea } from '@ionic/react';
import './FormularioSintoma.css';

interface Props {
  // Devuelve true si el síntoma se guardó, para saber si se limpia el campo
  onRegistrar: (contenido: string) => Promise<boolean>;
}

const FormularioSintoma: React.FC<Props> = ({ onRegistrar }) => {
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault(); // evita que el formulario recargue la página
    setEnviando(true);
    const guardado = await onRegistrar(contenido);
    if (guardado) {
      setContenido('');
    }
    setEnviando(false);
  }

  return (
    <form className="formulario-sintoma" onSubmit={enviar}>
      <IonTextarea
        label="¿Cómo te sientes hoy?"
        labelPlacement="stacked"
        fill="outline"
        value={contenido}
        onIonInput={(e) => setContenido(e.detail.value ?? '')}
      />
      <IonButton type="submit" expand="block" disabled={enviando}>
        {enviando ? 'Registrando...' : 'Registrar'}
      </IonButton>
    </form>
  );
};

export default FormularioSintoma;
