import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tarjetas");
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <img src="${producto.img}" alt="portada_${producto.titulo}">
            <div class="tarjeta-info">
                <h3>${producto.titulo}</h3>
                <p class="tarjeta-descripcion">${producto.descripcion}</p>
                <div class="tarjeta-compra">
                    <p class="tarjeta-precio">${producto.precio.toFixed(2)}</p>
                    <button class="btn-agregar" id="btn-${
                      producto.id
                    }">Añadir al carrito</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);

        const botonComprar = document.getElementById(`btn-${producto.id}`);

        botonComprar.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
