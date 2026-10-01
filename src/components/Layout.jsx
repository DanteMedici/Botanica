import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout({ totalCantidad }) {
  return (
    <div className={styles.layout}>
      {/* Enlace accesible para saltar navegación en lectores de pantalla y teclado */}
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>

      <NavBar totalCantidad={totalCantidad} />

      <main id="contenido-principal" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
