import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PRODUCTOS from './datos/productos';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';

export default function App() {
  // Estado centralizado del carrito (Lifting State Up)
  // Vive en App para ser compartido entre NavBar, Home, Productos y Carrito
  const [carrito, setCarrito] = useState([]);

  // Estado para el Toast de feedback visual al agregar productos
  const [toast, setToast] = useState({ visible: false, productoNombre: '' });

  // Función para agregar un producto al carrito
  // Si ya existe, incrementa su cantidad sin duplicar la fila ni mutar el array
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });

    // Disparamos la micro-interacción Toast
    setToast({ visible: true, productoNombre: producto.nombre });
  };

  // Función para restar una unidad
  const restarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Función para eliminar completamente un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Cálculo de la cantidad total de artículos para la insignia en NavBar
  const totalCantidad = carrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout totalCantidad={totalCantidad} />}>
          <Route
            index
            element={
              <Home
                productos={PRODUCTOS}
                onAgregar={agregarAlCarrito}
              />
            }
          />
          <Route
            path="productos"
            element={
              <Productos
                productos={PRODUCTOS}
                onAgregar={agregarAlCarrito}
              />
            }
          />
          <Route
            path="carrito"
            element={
              <Carrito
                carrito={carrito}
                onSumar={agregarAlCarrito}
                onRestar={restarDelCarrito}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route path="contacto" element={<Contacto />} />
          {/* Ruta fallback para rutas no encontradas */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Página no encontrada (404)
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  La sección que intentás visitar no existe o ha sido trasladada.
                </p>
              </div>
            }
          />
        </Route>
      </Routes>

      {/* Notificación Toast flotante de feedback */}
      <Toast
        toast={toast}
        onCerrar={() => setToast({ visible: false, productoNombre: '' })}
      />
    </BrowserRouter>
  );
}
