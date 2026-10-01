import styles from './CategoryFilter.module.css';

export default function CategoryFilter({
  categorias,
  categoriaActiva,
  onSeleccionarCategoria,
}) {
  return (
    <nav className={styles.container} aria-label="Filtro de categorías de productos">
      <button
        type="button"
        className={`${styles.pill} ${categoriaActiva === 'Todas' ? styles.active : ''}`}
        onClick={() => onSeleccionarCategoria('Todas')}
      >
        Todas las piezas
      </button>

      {categorias.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`${styles.pill} ${categoriaActiva === cat ? styles.active : ''}`}
          onClick={() => onSeleccionarCategoria(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
