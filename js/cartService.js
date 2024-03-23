function agregarAlCarrito(producto) {
  //crear array que se llama memoria,
  const memoria = JSON.parse(localStorage.getItem("productos")); //leemos si en nuestra memoria ya hay un items, si ya hay un carrito presente, que se llama prodcutos.
  console.log(memoria);
  //Si la memoria no existe, memoria == null
  if (!memoria) {
    const nuevoProducto = producto; //creamos nuevo producto.
    nuevoProducto.cantidad = 1; // nuevo producto le agregamos cant=1
    localStorage.setItem("productos", JSON.stringify([nuevoProducto])); //agregamos item producto a un array de NuevoProducto
    alert("producto agregado");
  } else {
    // Convertirlo memoria a un array
    // validar si producto esta en el array
    //if no esta
    const indiceProducto = memoria.findIndex(
      (productoGuardado) => producto.id === productoGuardado.id
    );
    if (indiceProducto === -1) {
      //Esto es sino existe el producto
      const nuevoProducto = producto; //creamos nuevo producto.
      nuevoProducto.cantidad = 1;
      memoria.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(memoria));

      alert("producto agregado");
    } else {
      nuevoProducto = memoria[indiceProducto].cantidad++;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    console.log(indiceProducto);
    actualizarNumeroCarrito();
  }
  actualizarNumeroCarrito();
}

function restarAlCarrito(producto) {
  //creo la memoria
  const memoria = JSON.parse(localStorage.getItem("productos"));
  const indiceProducto = memoria.findIndex(
    (productoGuardado) => producto.id === productoGuardado.id
  );
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("productos", JSON.stringify(memoria));
  actualizarNumeroCarrito();
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("productos")); //Primero leemos memoria
  //Reduce es una funcion que coge un array y los reduce en un solo valor
  if (memoria && memoria.length > 0) {
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    return (cuentaCarritoElement.innerText = cuenta);
  }
  cuentaCarritoElement.innerText = 0;
}
actualizarNumeroCarrito();
