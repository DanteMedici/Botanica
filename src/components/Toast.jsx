import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ toast, onCerrar }) {
  useEffect(() => {
    if (!toast?.visible) return;

    const timer = setTimeout(() => {
      onCerrar();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast, onCerrar]);

  if (!toast?.visible) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <CheckCircle2 size={20} className={styles.icon} strokeWidth={2} />
      <div className={styles.content}>
        <span className={styles.title}>
          {toast.productoNombre ? `"${toast.productoNombre}"` : 'Producto'} agregado
        </span>
        <span className={styles.text}>
          Se sumó a tu bolsa de compras.
        </span>
      </div>

      <Link to="/carrito" className={styles.linkCart} onClick={onCerrar}>
        Ver bolsa →
      </Link>

      <button
        type="button"
        className={styles.btnClose}
        onClick={onCerrar}
        aria-label="Cerrar aviso"
      >
        <X size={16} />
      </button>
    </div>
  );
}
