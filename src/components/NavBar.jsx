import { NavLink } from 'react-router-dom';
import { Sprout, ShoppingBag } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar({ totalCantidad }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand} aria-label="Botánica Atelier - Ir a página de inicio">
          <Sprout className={styles.brandIcon} size={26} aria-hidden="true" />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Botánica</span>
            <span className={styles.brandSub}>Atelier Floral</span>
          </div>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegación principal">
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
            aria-label={`Bolsa de compras, ${totalCantidad} artículo${totalCantidad === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={17} className={styles.cartIcon} aria-hidden="true" />
            <span>Carrito</span>
            <span className={styles.cartBadge} aria-hidden="true">
              {totalCantidad}
            </span>
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
