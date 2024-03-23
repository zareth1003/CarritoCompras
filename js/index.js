const contenedorTarjeta = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
    <img src="${producto.img}">
    <H3>${producto.nombre}</H3>
    <p>${producto.precio}</p>
    <button>Agregar al carrito</button>
    `;
    contenedorTarjeta.appendChild(nuevoProducto);
    //Hacemos que al hacer click sobre las tarjetas agregue el producto al carrio:
    //()=> que ejecuta la funcion agregar carrito del producto que estoy enviando.
    nuevoProducto
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}
crearTarjetasProductosInicio(productos);
