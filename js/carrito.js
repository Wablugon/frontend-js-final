import { obtenerCarrito } from "./storage.js";
import {
  eliminarDelCarrito,
  vaciarCarritoStorage,
} from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const accionesCarrito = document.getElementById("acciones-carrito");
  const resumenCompra = document.getElementById("resumen-compra");

  resumenCompra.innerHTML = "";
  contenedorCarrito.innerHTML = "";
  accionesCarrito.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList = "carrito-vacio";
    mensaje.textContent = "No hay productos en el carrito.";
    contenedorCarrito.appendChild(mensaje);
    return;
  }

  carrito.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "carrito-item";
    tarjeta.innerHTML = `
    <img src="../${producto.img}" alt="portada_${
      producto.titulo
    }" class="carrito-item-img">
    <div class="carrito-item-info">
        <h3>${producto.titulo}</h3>
        <div class="carrito-item-detalles">
            <p>Cantidad: ${producto.cantidad}</p>
            <p class="carrito-item-precio">Precio: $${(
              producto.precio * producto.cantidad
            ).toFixed(2)}</p>
        </div>
    </div>
    <button class="btn-eliminar" id="eliminar-${producto.id}">Eliminar</button>
    `;

    contenedorCarrito.appendChild(tarjeta);

    const botonEliminar = document.getElementById(`eliminar-${producto.id}`);
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
      renderizarCarrito();
    });
  });

  const precioTotal = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const totalElement = document.createElement("div");
  totalElement.className = "carrito-total";
  totalElement.innerHTML = `
    <p>Total a pagar:</p>
    <p class="total-precio">$${precioTotal.toFixed(2)}</p>
  `;
  resumenCompra.appendChild(totalElement);

  const botonVaciarCarrito = document.createElement("button");
  botonVaciarCarrito.className = "btn-vaciar-carrito";
  botonVaciarCarrito.textContent = "Vaciar Carrito";
  botonVaciarCarrito.addEventListener("click", () => {
    vaciarCarritoStorage();
    renderizarCarrito();
  });
  accionesCarrito.appendChild(botonVaciarCarrito);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
