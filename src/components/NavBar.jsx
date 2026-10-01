import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar({ totalCantidad }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cerrar menú con tecla Escape (A11y)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuAbierto) {
        setMenuAbierto(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuAbierto]);

  // Cerrar menú si la pantalla se ensancha más allá del breakpoint móvil
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuAbierto) {
        setMenuAbierto(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuAbierto]);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink
          to="/"
          className={styles.brand}
          onClick={cerrarMenu}
          aria-label="Botánica Atelier - Ir a página de inicio"
        >
          <Sprout className={styles.brandIcon} size={26} aria-hidden="true" />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Botánica</span>
            <span className={styles.brandSub}>Atelier Floral</span>
          </div>
        </NavLink>

        {/* Navegación Desktop */}
        <nav className={styles.desktopNav} aria-label="Navegación principal de escritorio">
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

        {/* Acciones para Móviles */}
        <div className={styles.mobileActions}>
          <NavLink
            to="/carrito"
            className={styles.mobileCartBtn}
            onClick={cerrarMenu}
            aria-label={`Bolsa de compras móvil con ${totalCantidad} artículos`}
          >
            <ShoppingBag size={21} />
            {totalCantidad > 0 && (
              <span className={styles.mobileCartBadge} aria-hidden="true">
                {totalCantidad}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-controls="mobile-navigation"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú de navegación'}
          >
            {menuAbierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Drawer / Menú Desplegable Móvil */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileMenuOverlay} ${menuAbierto ? styles.open : ''}`}
        onClick={cerrarMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
            }
            onClick={cerrarMenu}
          >
            <span>Inicio</span>
            <ArrowRight size={16} opacity={0.6} />
          </NavLink>

          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
            }
            onClick={cerrarMenu}
          >
            <span>Catálogo de Productos</span>
            <ArrowRight size={16} opacity={0.6} />
          </NavLink>

          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
            }
            onClick={cerrarMenu}
          >
            <span>Bolsa de Compras</span>
            <span className={styles.mobileNavBadge}>{totalCantidad}</span>
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
            }
            onClick={cerrarMenu}
          >
            <span>Contacto & Asesoramiento</span>
            <ArrowRight size={16} opacity={0.6} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
