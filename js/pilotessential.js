// Constantes globales de Bootstrap para pop-overs
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);
// Variables Globales
let abrirCarrito = document.querySelector(".Cart");
let cerrarCarrito = document.querySelector(".closeCart");
let list = document.querySelector(".cartList");
let listaCarrito = document.querySelector(".cartCard");
let totalCarrito = document.querySelector(".total");
let cantidad = document.querySelector(".cartQuantity");
let catalogoProductos = document.querySelector("#productsCatalogue");
let botonCategoria = document.querySelectorAll(".btnCategories");
let tituloCategoria = document.querySelector("#titleCategories");
let botonComprar = document.querySelector(".btnComprar");
const inputBuscar = document.querySelector("#searchInput");
const sectionCategorias = document.querySelector("#productCategories");
const formBuscar = document.querySelector("#searchForm");

// Traigo el carrito del storage
const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
// Si existe un carrito en el storage, lo traigo, si no, pongo un array vacio
const carrito = carritoStorage || [];
// Llamo a listar el carrito del storage
listarCarrito();

// Molde constructor de productos
class Product {
  constructor(id, nombre, precio, precioList, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.precioList = precioList;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}
// Clase de la base de datos del catalogo
class DataBase {
  constructor() {
    // Array vacio del catalogo
    this.catalogo = [];
    //
    this.cargarCatalogo();
  }
  async cargarCatalogo() {
    const resultado = await fetch("./json/catalogo.json");
    this.catalogo = await resultado.json();
    console.log(this.catalogo);
    cargarProductos(this.catalogo);
  }
  // Metodo para listar el catalogo citando a la base de datos
  listarProductos() {
    return this.catalogo;
  }
  // Metodo para buscar un producto por su ID
  productoPorId(id) {
    return this.catalogo.find((producto) => producto.id === id);
  }
  // Metodo para buscar un producto por su Nombre
  productoPorNombre(palabra) {
    return this.catalogo.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
  // Metodo para filtrar productos por su categoria
  productoPorCategoria(categoria) {
    return this.catalogo.filter((producto) => producto.categoria == categoria);
  }
}
// Instanciamos la base de datos
const dB = new DataBase();

// Buscador De Productos
if (formBuscar != null) {
  formBuscar.addEventListener("submit", (event) => {
    event.preventDefault();
    // realizo la busqueda con el value del input de busqueda
    const busqueda = inputBuscar.value;
    const productos = dB.productoPorNombre(busqueda);
    // hago scroll hacia la seccion de productos
    window.scrollTo(0, 650);
    cargarProductos(productos);
    tituloCategoria.innerText = `Resultados de la busqueda`;
  });
}

botonCategoria.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    //Prevengo recargar la pagina al tocar el boton
    event.preventDefault();
    const categoria = boton.dataset.categoria;
    // Si la categoria seleccionada es todos, listo el catalogo sin filtros
    if (categoria == "Todos") {
      tituloCategoria.innerText = `Todos Los Productos`;
      cargarProductos(dB.listarProductos());
    } else {
      // Si no, muestro la categoria seleccionada
      cargarProductos(dB.productoPorCategoria(categoria));
      // Cambio el titular de la seccion al nombre de la categoria
      tituloCategoria.innerText = `${categoria}`;
    }
  });
});
// Mostramos el catalogo de la base de datos apenas carga la pagina
cargarProductos(dB.listarProductos());
// Funcion para mostrar los productos del catalogo
function cargarProductos(productos) {
  if (catalogoProductos !== null) {
    catalogoProductos.innerHTML = "";

    for (const producto of productos) {
      catalogoProductos.innerHTML += `
    <article class="productCard">
          <img src="./assets/images/products/${producto.imagen}" alt="${producto.nombre}">

          <h3 class="text-center">${producto.nombre}</h3>

          <div class="cardPrice">
            <p>U$D ${producto.precio}</p>
            <p class="listPrice"> U$D ${producto.precioList}

              <span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Precio de lista, abonando con tarjetas de credito en 3, 6 o 12 cuotas sin interes.">
                <i class='bx bx-question-mark'></i>
              </span>
            </p>
          </div>

          <button data-id="${producto.id}" class="btn btnAgregar">Agregar al Carrito</button>

        </article>
    `;
    }
  }

  // selecciono todos los botones de agregar con QS all
  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Obtengo el id del objeto segun el boton que toco
      const idProducto = Number(boton.dataset.id);
      // Utilizo el metodo de busqueda por id de la DB para localizar el id del producto
      const producto = dB.productoPorId(idProducto);
      // Llama al metodo para agregar al carrito
      agregar(producto);
      console.log(carrito);
    });
  });
}

// Evento para abrir la pestaña del carrito
abrirCarrito.addEventListener("click", () => {
  listaCarrito.classList.add("activeCart");
});
// Evento para cerrar la pestaña del carrito
cerrarCarrito.addEventListener("click", () => {
  listaCarrito.classList.remove("activeCart");
});
// funcion para buscar si un producto existe en el carrito
function enCarrito({ id }) {
  return carrito.find((producto) => producto.id === id);
}
// Funcion para agregar el producto elegido al carrito.
function agregar(producto) {
  // Almaceno la funcion enCarrito en una variable
  const productoEnCarrito = enCarrito(producto);
  // Si el producto no se encuentra en el carrito, lo agrega al principio con unshift
  // y le suma la propiedad unidades
  if (!productoEnCarrito) {
    carrito.unshift({ ...producto, unidades: 1 });
  } else {
    // Si lo encuentra, le agrega una unidad
    productoEnCarrito.unidades++;
  }

  // Alert indicando que el producto se agrego satisfactoriamente.
  swal.fire({
    text: `${producto.nombre} fue agregado al carrito.`,
    confirmButtonText: "Continuar",
    confirmButtonColor: "#0b2742",
  });
  // Guardo el storage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Llamo a listar el carrito
  listarCarrito();
}

// Funcion para quitar productos del carrito segun su ID
function quitar(id) {
  // Busco el indice del producto con findIndex
  const indiceProducto = carrito.findIndex((producto) => producto.id === id);
  // Si la cantidad de este producto es mayor a 1 le resto una unidad
  if (carrito[indiceProducto].unidades > 1) {
    carrito[indiceProducto].unidades--;
  } else {
    // Si no, lo borro directamente con splice
    carrito.splice(indiceProducto, 1);
  }
  // Guardo el storage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Llamo a listar el carrito
  listarCarrito();
}

function listarCarrito() {
  // Vacia la lista del carrito
  let listaCarrito = "";
  // Por cada producto agregado al array Carrito, agrega un List Item con las propiedades del mismo a la lista del carrito
  carrito.forEach((producto) => {
    listaCarrito += `<li class="cartItem"> <img src="./assets/images/products/${producto.imagen}"/>
    <div>
    <h3>${producto.nombre}</h3>

      <p>${producto.unidades} u.</p>
     U$D ${producto.precio} - <span class="listPrice"> U$D ${producto.precioList}
     <button class="btn btnQuitar" data-id="${producto.id}"" >
     <i class='bx bxs-trash'></i>
     </button>
     </span>
     </div>
     </li>`;
  });

  // adjudico la variable de la lista al modificador de HTML
  list.innerHTML = listaCarrito;
  console.clear();
  console.log(carrito);
  // Reduce para sumar el precio de los productos en Carrito
  const cartCheckout = carrito.reduce(
    (acu, el) => acu + el.precio * el.unidades,
    0
  );
  // Modifico el html de la clase total para mostrar el resultado de la suma almacenado en la variable
  totalCarrito.innerHTML = `<div >Subtotal: U$D ${cartCheckout}</div>`;
  let cartLenght = carrito.length;
  cantidad.innerHTML = `<span class="cartQuantity">${cartLenght}</span></a>`;
  // Selecciono todos los botones de quitar con QS all
  const botonQuitar = document.querySelectorAll(".btnQuitar");
  botonQuitar.forEach((boton) => {
    boton.addEventListener("click", () => {
      // busco el id del producto y lo almaceno en la variable
      const idProducto = Number(boton.dataset.id);
      // quito el producto segun su ID
      quitar(idProducto);
    });
  });

  if (cartLenght > 0) {
    botonComprar.classList.remove("disabled");
    totalCarrito.style.display = "block";
  } else {
    botonComprar.classList.add("disabled");
    totalCarrito.style.display = "none";
  }
}

botonComprar.addEventListener("click", () => {
  window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

// ===== SECCION LOGIN Y REGISTER =====

let usuarioInput = document.querySelector("#username");
let correoInput = document.querySelector("#email");
let contraseñaInput = document.querySelector("#password");
const btnLogin = document.querySelector("#btnLogin");
const registerBox = document.querySelector(".registerBox");
const formRegistro = document.querySelector("#registerForm");
let btnSubmit = document.querySelector(".btnSubmit");
const formLogin = document.querySelector("#formLogin");

// Array Vacio de los usuarios
const usuariosStorage = JSON.parse(localStorage.getItem("usuarios"));
// Si existe un carrito en el storage, lo traigo, si no, pongo un array vacio
const usuarios = usuariosStorage || [];
function agregarUsuario(event) {
  event.preventDefault();
  let nuevoUsuario = {
    nombre: usuarioInput.value,
    correo: correoInput.value,
    contraseña: contraseñaInput.value,
  };
  usuarios.push(nuevoUsuario);
  document.forms[0].reset();
  console.log(usuarios);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
if (btnSubmit !== null) {
  btnSubmit.addEventListener("click", agregarUsuario);
}

// Prevengo la accion default del link para cambiar de formulario
// y cambio el form completo con el de registro
if (btnLogin !== null) {
  btnLogin.addEventListener("click", (event) => {
    event.preventDefault();
    formLogin.classList.remove("hide");
    formRegistro.classList.add("hide");
  });
}
