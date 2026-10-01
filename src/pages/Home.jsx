import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import ProductoCard from '../components/ProductoCard';
import styles from './Home.module.css';

export default function Home({ productos, onAgregar }) {
  // Selección de 3 productos destacados
  const productosDestacados = productos
    .filter((producto) => producto.destacado)
    .slice(0, 3);

  return (
    <div className={styles.home}>
      {/* Sección Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <Leaf size={14} className={styles.heroTagIcon} />
            <span>Colección Botánica 2026</span>
          </div>

          <h1 className={styles.heroTitle}>
            Naturaleza viva para espacios{' '}
            <span className={styles.heroTitleHighlight}>arquitectónicos</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Diseñamos una selección curada de plantas de interior, herramientas de
            alta durabilidad y sustratos equilibrados para transformar cualquier
            ambiente en un refugio natural.
          </p>

          <Link to="/productos" className={styles.btnHero}>
            <span>Ver Catálogo Completo</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Sección Destacados */}
      <section className={styles.destacados}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h2 className={styles.sectionTitle}>Piezas Destacadas</h2>
            <p className={styles.sectionSubtitle}>
              Selección semanal de especímenes y herramientas recomendadas por nuestro equipo
            </p>
          </div>

          <Link to="/productos" className={styles.linkCatalog}>
            <span>Explorar todas ({productos.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className={styles.grid}>
          {productosDestacados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={onAgregar}
            />
          ))}
        </div>
      </section>

      {/* Garantías y Valores Minimalistas */}
      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <ShieldCheck size={22} className={styles.featureIcon} />
          <h4 className={styles.featureTitle}>Garantía de Adaptación</h4>
          <p className={styles.featureText}>
            Cada ejemplar cuenta con asesoramiento botánico personalizado y garantía de salud.
          </p>
        </div>

        <div className={styles.featureCard}>
          <Truck size={22} className={styles.featureIcon} />
          <h4 className={styles.featureTitle}>Envíos Cuidadosos</h4>
          <p className={styles.featureText}>
            Packaging térmico diseñado para proteger raíces y hojas en todo el trayecto.
          </p>
        </div>

        <div className={styles.featureCard}>
          <Sparkles size={22} className={styles.featureIcon} />
          <h4 className={styles.featureTitle}>Curaduría Sostenible</h4>
          <p className={styles.featureText}>
            Cultivo responsable sin pesticidas agresivos y macetas de barro cocido artesanal.
          </p>
        </div>
      </section>
    </div>
  );
}
