import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Truck, ShieldCheck } from 'lucide-react';
import Modal from './Modal';
import styles from './Footer.module.css';

export default function Footer() {
  const [modalEnviosAbierto, setModalEnviosAbierto] = useState(false);
  const [modalGarantiaAbierto, setModalGarantiaAbierto] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <Sprout size={20} className={styles.brandIcon} aria-hidden="true" />
              <span>Botánica Atelier</span>
            </div>
            <p className={styles.description}>
              Curaduría botánica para espacios contemporáneos. Selección de plantas de interior,
              herramientas de forja tradicional y sustratos de origen sostenible.
            </p>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colGroup}>
              <h4>Explorar</h4>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Catálogo de Productos</Link></li>
                <li><Link to="/carrito">Mi Carrito</Link></li>
              </ul>
            </div>
            <div className={styles.colGroup}>
              <h4>Atención & Soporte</h4>
              <ul>
                <li><Link to="/contacto">Contacto & Consultas</Link></li>
                <li>
                  <button
                    type="button"
                    className={styles.btnFooterLink}
                    onClick={() => setModalEnviosAbierto(true)}
                  >
                    Envíos y Cuidados
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.btnFooterLink}
                    onClick={() => setModalGarantiaAbierto(true)}
                  >
                    Términos de Garantía
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Botánica Atelier · Mini Tienda React (Semanas 1 y 2).
          </p>
          <p className={styles.tagline}>
            Diseño minimalista, accesibilidad universal & botánica consciente.
          </p>
        </div>
      </div>

      {/* Modal Informativo: Envíos y Cuidados */}
      <Modal
        isOpen={modalEnviosAbierto}
        onClose={() => setModalEnviosAbierto(false)}
        title="Protocolo de Envíos & Cuidados"
      >
        <div className={styles.modalInfoContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-botanical)' }}>
            <Truck size={22} />
            <h4 style={{ margin: 0 }}>Embalaje y Distribución Segura</h4>
          </div>
          <p>
            Todos nuestros ejemplares se despachan en cajas con aislamiento térmico y
            sujeción radicular biodegradable, asegurando que las hojas y tallos lleguen intactos.
          </p>
          <h4>Primeros 3 días en tu hogar:</h4>
          <ul>
            <li><strong>Aclimatación:</strong> Ubicá la planta en un lugar con luz natural indirecta. Evitá corrientes de aire acondicionado o calefacción.</li>
            <li><strong>Riego inicial:</strong> Comprobá la humedad del sustrato introduciendo un dedo 2 cm. Regá únicamente si la tierra se siente seca al tacto.</li>
            <li><strong>Follaje:</strong> Pulverizá agua a temperatura ambiente en hojas tropicales para mantener la humedad ambiental.</li>
          </ul>
        </div>
      </Modal>

      {/* Modal Informativo: Términos de Garantía */}
      <Modal
        isOpen={modalGarantiaAbierto}
        onClose={() => setModalGarantiaAbierto(false)}
        title="Términos de Garantía Botánica"
      >
        <div className={styles.modalInfoContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-botanical)' }}>
            <ShieldCheck size={22} />
            <h4 style={{ margin: 0 }}>Garantía de Adaptación de 30 Días</h4>
          </div>
          <p>
            En Botánica Atelier nos comprometemos con la vitalidad de cada espécimen. Ofrecemos
            garantía total de adaptación durante los primeros 30 días posteriores a la entrega.
          </p>
          <h4>Condiciones de cobertura:</h4>
          <ul>
            <li><strong>Reemplazo sin cargo:</strong> Si tu planta presenta signos de decaimiento no relacionados con exceso prolongado de agua o quemaduras solares directas, te asesoramos y enviamos un reemplazo sin costo.</li>
            <li><strong>Herramientas de jardinería:</strong> Cuentan con 2 años de garantía contra cualquier defecto de forja, desajuste mecánico o fractura del acero.</li>
            <li><strong>Atención permanente:</strong> Podés escribirnos a través del formulario de contacto adjuntando fotos para recibir guía personalizada de recuperación.</li>
          </ul>
        </div>
      </Modal>
    </footer>
  );
}
