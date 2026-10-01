import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <Sprout size={20} className={styles.brandIcon} />
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
              <h4>Contacto</h4>
              <ul>
                <li><Link to="/contacto">Escribinos</Link></li>
                <li><a href="#ayuda">Envíos y Cuidados</a></li>
                <li><a href="#terminos">Términos de Garantía</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Botánica Atelier · Mini Tienda React (Semanas 1 y 2).
          </p>
          <p className={styles.tagline}>
            Diseño minimalista & botánica consciente.
          </p>
        </div>
      </div>
    </footer>
  );
}
