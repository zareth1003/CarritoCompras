function agregarAlCarrito(producto) {
  const memoria = localStorage.getItem("productos");
  console.log(memoria);
  if (memoria == null) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
  }
}
