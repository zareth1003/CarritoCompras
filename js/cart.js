const contenedorTarjeta = document.getElementById("cart-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");
const finalizarCarritoElement = document.getElementById("finalizar-compra");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjeta.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
    <img src="${producto.img}" alt="Producto 1">
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjeta.appendChild(nuevoProducto);
      nuevoProducto
        .getElementsByTagName("button")[1]
        .addEventListener("click", () => {
          agregarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
          actualizarNumeroCarrito();
        });
      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
    });
  }
}
crearTarjetasProductosCarrito();
actualizarTotales();

function actualizarTotales() {
  const productos2 = JSON.parse(localStorage.getItem("productos"));
  let unidades = 0;
  let precio = 0;
  if (productos2 && productos2.length > 0) {
    productos2.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
    actualizarNumeroCarrito();
  }
  revisarMensajeVacio();
}
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  //comprobación para ver si carritovacio o productos es mayor a cero, se enconde:
  carritoVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  //todo lo contrario con el (!) se muestra si es mayor a 1
  totalesContainer.classList.toggle(
    "escondido",
    !(productos && productos.length > 0)
  );
}
revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("productos");
  revisarMensajeVacio();
  crearTarjetasProductosCarrito();
}

finalizarCarritoElement.addEventListener("click", finalizar);
function finalizar() {
  localStorage.removeItem("productos");
  alert("Gracias por su compra!!");
  crearTarjetasProductosCarrito();
  revisarMensajeVacio();
}
