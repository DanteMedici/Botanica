import { NavLink } from 'react-router-dom';
import { Sprout, ShoppingBag } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar({ totalCantidad }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          <Sprout className={styles.brandIcon} size={26} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Botánica</span>
            <span className={styles.brandSub}>Atelier Floral</span>
          </div>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `${styles.navLink} ${styles.cartLink} ${isActive ? styles.active : ''}`
            }
          >
            <ShoppingBag size={17} className={styles.cartIcon} />
            <span>Carrito</span>
            <span className={styles.cartBadge}>{totalCantidad}</span>
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Contacto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
