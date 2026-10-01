import { useState } from 'react';
import { Mail, MapPin, Clock, Phone, Send, CheckCircle2 } from 'lucide-react';
import CampoFormulario from '../components/CampoFormulario';
import Modal from '../components/Modal';
import styles from './Contacto.module.css';

export default function Contacto() {
  // Estado controlado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Estado para errores individuales por campo
  const [errores, setErrores] = useState({});

  // Estados para modal y confirmación
  const [modalExitoAbierto, setModalExitoAbierto] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(null);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpieza reactiva del error del campo al editar
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validaciones estrictas en React
  const validarFormulario = () => {
    const nuevosErrores = {};

    // 1. Nombre (obligatorio, mín 3 caracteres)
    const nombreTrim = formData.nombre.trim();
    if (!nombreTrim) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (nombreTrim.length < 3) {
      nuevosErrores.nombre = 'El nombre debe contener al menos 3 caracteres.';
    }

    // 2. Email (obligatorio, formato algo@algo.algo)
    const emailTrim = formData.email.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(emailTrim)) {
      nuevosErrores.email = 'El correo debe tener un formato válido (ej: usuario@dominio.com).';
    }

    // 3. Mensaje (obligatorio, mín 10 caracteres)
    const mensajeTrim = formData.mensaje.trim();
    if (!mensajeTrim) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.';
    } else if (mensajeTrim.length < 10) {
      nuevosErrores.mensaje = `El mensaje debe contener al menos 10 caracteres (actuales: ${mensajeTrim.length}).`;
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    // Evitamos recarga de página
    e.preventDefault();

    const erroresDetectados = validarFormulario();

    // Si existen errores, se muestran y se bloquea el envío
    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados);
      return;
    }

    // Todo válido: preparamos el modal, limpiamos errores y vaciamos el formulario
    setErrores({});
    setMensajeEnviado({
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      mensaje: formData.mensaje.trim(),
    });

    setModalExitoAbierto(true);

    setFormData({
      nombre: '',
      email: '',
      mensaje: '',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Atelier & Consultas</h1>
        <p className={styles.description}>
          Para asesoramiento sobre paisajismo de interiores, cuidados específicos de
          especies o encargos especiales, completá el siguiente formulario.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Información lateral minimalista */}
        <aside className={styles.infoCard}>
          <div>
            <h3 className={styles.infoTitle}>Botánica Atelier</h3>
            <p className={styles.infoSubtitle}>
              Espacio dedicado a la divulgación y cultivo de especies botánicas contemporáneas.
            </p>
          </div>

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <MapPin size={18} className={styles.infoIcon} />
              <div className={styles.infoItemContent}>
                <span className={styles.infoLabel}>Ubicación</span>
                <span>Pasaje Botánico 1420, CABA</span>
              </div>
            </li>

            <li className={styles.infoItem}>
              <Clock size={18} className={styles.infoIcon} />
              <div className={styles.infoItemContent}>
                <span className={styles.infoLabel}>Atención</span>
                <span>Lunes a Sábado de 10:00 a 19:30 hs</span>
              </div>
            </li>

            <li className={styles.infoItem}>
              <Mail size={18} className={styles.infoIcon} />
              <div className={styles.infoItemContent}>
                <span className={styles.infoLabel}>Correo</span>
                <span>atelier@botanica.com</span>
              </div>
            </li>

            <li className={styles.infoItem}>
              <Phone size={18} className={styles.infoIcon} />
              <div className={styles.infoItemContent}>
                <span className={styles.infoLabel}>Línea directa</span>
                <span>+54 11 5234-8900</span>
              </div>
            </li>
          </ul>
        </aside>

        {/* Formulario controlado */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <CampoFormulario
              id="nombre"
              label="Nombre y Apellido *"
              valor={formData.nombre}
              onChange={handleChange}
              error={errores.nombre}
              placeholder="Ej: Clara Benítez"
            />

            <CampoFormulario
              id="email"
              label="Correo Electrónico *"
              tipo="email"
              valor={formData.email}
              onChange={handleChange}
              error={errores.email}
              placeholder="Ej: clara@ejemplo.com"
            />

            <CampoFormulario
              id="mensaje"
              label="Mensaje o Consulta (mínimo 10 caracteres) *"
              valor={formData.mensaje}
              onChange={handleChange}
              error={errores.mensaje}
              placeholder="Detallá tu consulta o especie de interés..."
              esTextarea={true}
              filas={5}
            />

            <button type="submit" className={styles.btnSubmit}>
              <Send size={16} />
              <span>Enviar Mensaje</span>
            </button>
          </form>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={modalExitoAbierto}
        onClose={() => setModalExitoAbierto(false)}
        title="Mensaje Recibido"
      >
        <div className={styles.modalSuccess}>
          <CheckCircle2 size={46} className={styles.successIcon} strokeWidth={1.8} />
          <p>
            ¡Muchas gracias <strong>{mensajeEnviado?.nombre}</strong>! Tu consulta ha sido
            registrada en nuestro sistema.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            Un especialista botánico te responderá a la brevedad a la casilla:{' '}
            <strong>{mensajeEnviado?.email}</strong>.
          </p>
          <div className={styles.summaryQuote}>
            <span className={styles.quoteLabel}>Copia del mensaje:</span>
            <p className={styles.quoteText}>"{mensajeEnviado?.mensaje}"</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
