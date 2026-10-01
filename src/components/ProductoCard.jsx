import { Plus } from 'lucide-react';
import Badge from './Badge';
import ImageWithFallback from './ImageWithFallback';
import styles from './ProductoCard.module.css';

export default function ProductoCard({ producto, onAgregar }) {
  const { nombre, precio, imagen, categoria, destacado, descripcion } = producto;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <ImageWithFallback
          src={imagen}
          alt={nombre}
          fallbackText={nombre}
        />
        <div className={styles.badgesOverlay}>
          {destacado ? (
            <Badge variant="destacado" size="sm">
              Destacado
            </Badge>
          ) : (
            <span />
          )}
          {categoria && (
            <Badge variant="categoria" size="sm">
              {categoria}
            </Badge>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{nombre}</h3>
        {descripcion && <p className={styles.description}>{descripcion}</p>}

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.priceLabel}>Precio</span>
            <span className={styles.price}>
              ${precio.toLocaleString('es-AR')}
            </span>
          </div>

          <button
            type="button"
            className={styles.btnAdd}
            onClick={() => onAgregar(producto)}
            aria-label={`Agregar ${nombre} a la bolsa de compras`}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
