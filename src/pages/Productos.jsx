import { useState, useMemo } from 'react';
import { Search, X, SearchX } from 'lucide-react';
import ProductoCard from '../components/ProductoCard';
import CategoryFilter from '../components/CategoryFilter';
import styles from './Productos.module.css';

export default function Productos({ productos, onAgregar }) {
  // Estado controlado para el buscador
  const [busqueda, setBusqueda] = useState('');
  // Estado para la categoría seleccionada
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  // Obtener categorías únicas dinámicamente
  const categorias = useMemo(() => {
    return [...new Set(productos.map((p) => p.categoria).filter(Boolean))];
  }, [productos]);

  // Filtrado reactivo en tiempo real por nombre y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim());
    const coincideCategoria =
      categoriaActiva === 'Todas' || producto.categoria === categoriaActiva;
    return coincideNombre && coincideCategoria;
  });

  const handleResetFiltros = () => {
    setBusqueda('');
    setCategoriaActiva('Todas');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Colección & Catálogo</h1>
          <p className={styles.description}>
            Plantas de interior, complementos botánicos y herramientas de diseño
            concebidas para perdurar.
          </p>
        </div>

        {/* Buscador controlado en vivo */}
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por espécimen o herramienta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar producto por nombre"
          />
          {busqueda && (
            <button
              type="button"
              className={styles.btnClear}
              onClick={() => setBusqueda('')}
              title="Borrar término de búsqueda"
              aria-label="Borrar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filtro rápido por categorías */}
        <CategoryFilter
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onSeleccionarCategoria={setCategoriaActiva}
        />

        <span className={styles.countInfo}>
          Mostrando {productosFiltrados.length} de {productos.length} productos
          {categoriaActiva !== 'Todas' && ` en "${categoriaActiva}"`}
        </span>
      </div>

      {/* Cuadrícula o estado vacío */}
      {productosFiltrados.length > 0 ? (
        <div className={styles.grid}>
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={onAgregar}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <SearchX size={44} className={styles.emptyIcon} strokeWidth={1.5} />
          <h3 className={styles.emptyTitle}>Sin coincidencias</h3>
          <p className={styles.emptyText}>
            No encontramos ninguna variedad o producto que coincida con{' '}
            {busqueda && <strong>"{busqueda}"</strong>}
            {busqueda && categoriaActiva !== 'Todas' && ' en '}
            {categoriaActiva !== 'Todas' && <strong>categoría "{categoriaActiva}"</strong>}.
          </p>
          <button
            type="button"
            className={styles.btnResetSearch}
            onClick={handleResetFiltros}
          >
            Restablecer filtros y búsqueda
          </button>
        </div>
      )}
    </div>
  );
}
