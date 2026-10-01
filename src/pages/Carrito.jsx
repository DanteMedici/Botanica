import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import CartItem from '../components/CartItem';
import Modal from '../components/Modal';
import styles from './Carrito.module.css';

export default function Carrito({
  carrito,
  onSumar,
  onRestar,
  onEliminar,
  onVaciar,
}) {
  const [modalCheckoutAbierto, setModalCheckoutAbierto] = useState(false);

  // Totales acumulados
  const totalPagar = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const totalProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const handleFinalizarCompra = () => {
    setModalCheckoutAbierto(true);
  };

  const handleCerrarCheckout = () => {
    setModalCheckoutAbierto(false);
    onVaciar();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bolsa de Compras</h1>
        <p className={styles.description}>
          Revisá tu selección botánica y procedé a la confirmación del pedido.
        </p>
      </div>

      {carrito.length > 0 ? (
        <div className={styles.layout}>
          {/* Listado de items */}
          <div className={styles.cartList}>
            <div className={styles.listHeader}>
              <span>Artículos seleccionados ({totalProductos})</span>
              <button
                type="button"
                className={styles.btnClearCart}
                onClick={onVaciar}
              >
                Vaciar bolsa
              </button>
            </div>

            {carrito.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onSumar={onSumar}
                onRestar={onRestar}
                onEliminar={onEliminar}
              />
            ))}
          </div>

          {/* Resumen de orden */}
          <aside className={styles.summaryPanel}>
            <h3 className={styles.summaryTitle}>Resumen del Pedido</h3>

            <div className={styles.summaryRow}>
              <span>Subtotal artículos</span>
              <span>${totalPagar.toLocaleString('es-AR')}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Envío seguro botánico</span>
              <span className={styles.freeShipping}>Bonificado</span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total estimado</span>
              <span className={styles.totalAmount}>
                ${totalPagar.toLocaleString('es-AR')}
              </span>
            </div>

            <button
              type="button"
              className={styles.btnCheckout}
              onClick={handleFinalizarCompra}
            >
              <span>Confirmar Pedido</span>
              <ArrowRight size={17} />
            </button>

            <Link to="/productos" className={styles.continueShopping}>
              ← Continuar explorando el catálogo
            </Link>
          </aside>
        </div>
      ) : (
        /* Estado de carrito vacío */
        <div className={styles.emptyCart}>
          <ShoppingBag size={52} className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>Tu bolsa está vacía</h2>
          <p className={styles.emptyText}>
            Aún no has incorporado plantas ni herramientas a tu pedido actual.
          </p>
          <Link to="/productos" className={styles.btnExplore}>
            <span>Descubrir catálogo</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Modal de checkout */}
      <Modal
        isOpen={modalCheckoutAbierto}
        onClose={handleCerrarCheckout}
        title="Confirmación de Pedido"
      >
        <div className={styles.modalSuccessContent}>
          <CheckCircle2 size={48} className={styles.successIcon} strokeWidth={1.8} />
          <p>
            ¡Tu solicitud por un total de{' '}
            <strong className={styles.orderTotalHighlight}>
              ${totalPagar.toLocaleString('es-AR')}
            </strong>{' '}
            ha sido registrada satisfactoriamente!
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            Prepararemos el embalaje protector para que recibas tus plantas en
            condiciones óptimas.
          </p>
        </div>
      </Modal>
    </div>
  );
}
