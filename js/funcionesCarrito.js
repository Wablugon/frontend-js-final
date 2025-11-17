import { guardarCarrito, obtenerCarrito, vaciarCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const productoEnCarrito = carrito.find((item) => item.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado al carrito.");
};

export const eliminarDelCarrito = (id) => {
  const carrito = obtenerCarrito();
  const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
  guardarCarrito(nuevoCarrito);
  actualizarContador(nuevoCarrito);
  mostrarMensaje("Producto eliminado del carrito.");
};

export const vaciarCarritoStorage = () => {
  vaciarCarrito();
  actualizarContador([]);
  mostrarMensaje("Se vaciaron los productos del carrito.");
};
