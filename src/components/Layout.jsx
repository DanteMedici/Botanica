import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout({ totalCantidad }) {
  return (
    <div className={styles.layout}>
      <NavBar totalCantidad={totalCantidad} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
