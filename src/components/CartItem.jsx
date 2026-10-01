import { Plus, Minus, Trash2 } from 'lucide-react';
import styles from './CartItem.module.css';

export default function CartItem({ item, onSumar, onRestar, onEliminar }) {
  const { id, nombre, precio, imagen, cantidad } = item;
  const subtotal = precio * cantidad;

  return (
    <article className={styles.item}>
      <div className={styles.productCol}>
        {imagen && (
          <img
            src={imagen}
            alt={nombre}
            className={styles.thumbnail}
            loading="lazy"
          />
        )}
        <div className={styles.details}>
          <h4 className={styles.title}>{nombre}</h4>
          <span className={styles.unitPrice}>
            ${precio.toLocaleString('es-AR')} por unidad
          </span>
        </div>
      </div>

      <div className={styles.quantityControl}>
        <button
          type="button"
          className={styles.btnQty}
          onClick={() => onRestar(id)}
          aria-label={`Restar una unidad de ${nombre}`}
        >
          <Minus size={14} />
        </button>
        <span className={styles.qtyValue}>{cantidad}</span>
        <button
          type="button"
          className={styles.btnQty}
          onClick={() => onSumar(item)}
          aria-label={`Sumar una unidad de ${nombre}`}
        >
          <Plus size={14} />
        </button>
      </div>

      <div className={styles.subtotalCol}>
        <span className={styles.subtotalLabel}>Subtotal</span>
        <span className={styles.subtotalAmount}>
          ${subtotal.toLocaleString('es-AR')}
        </span>
      </div>

      <button
        type="button"
        className={styles.btnRemove}
        onClick={() => onEliminar(id)}
        aria-label={`Eliminar ${nombre} del pedido`}
        title="Quitar producto"
      >
        <Trash2 size={16} />
      </button>
    </article>
  );
}
