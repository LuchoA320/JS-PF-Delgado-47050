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
let sectionFeatured = document.querySelector("#featuredProducts");

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
    // ===== INSTANCIACION DE PRODUCTOS =====
    this.instanciarProducto(
      1,
      "Auriculares Bose A20 Bluetooth",
      1099.0,
      1195.0,
      "Headsets",
      "BoseA20-1.jpg"
    );
    this.instanciarProducto(
      2,
      "Auriculares Bose A30 Bluetooth",
      1299.65,
      1495.65,
      "Headsets",
      "BoseA30-1.jpg"
    );
    this.instanciarProducto(
      3,
      "Reloj Garmin D2 Mach 1 Aviator",
      1199.0,
      1399.0,
      "Watches",
      "garminD2-1.jpg"
    );
    this.instanciarProducto(
      4,
      "Computadora de vuelo ASA CX-3 Pathfinder",
      117.45,
      124.95,
      "Flight Computers",
      "ASA-CX3-1.jpg"
    );
    this.instanciarProducto(
      5,
      "Auriculares David Clark H10-13.4",
      356.95,
      391.65,
      "Headsets",
      "davidclarkH10-1.jpg"
    );
  }
  // Metodo para instanciar productos dinamicamente y agregarlos al catalogo
  instanciarProducto(id, nombre, precio, precioList, categoria, imagen) {
    const producto = new Product(
      id,
      nombre,
      precio,
      precioList,
      categoria,
      imagen
    );
    // Push automatico del producto al catalogo
    this.catalogo.push(producto);
  }
  // Metodo para listar el catalogo citando a la base de datos
  listarProductos() {
    return this.catalogo;
  }
  productoPorId(id) {
    return this.catalogo.find((producto) => producto.id === id);
  }
  productoPorNombre(palabra) {
    return this.catalogo.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}
// Instanciamos la base de datos
const dB = new DataBase();

// Instanciamos la clase Carrito
// const miCarrito = new Carrito();

// Mostramos el catalogo de la base de datos apenas carga la pagina
cargarProductos(dB.listarProductos());
// Funcion para mostrar los productos del catalogo
function cargarProductos(productos) {
  sectionFeatured.innerHTML = "";

  for (const producto of productos) {
    sectionFeatured.innerHTML += `
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
  swal(producto.nombre + " fue agregado al carrito.", {
    buttons: ["Seguir Comprando", "Ver Carrito"],
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
}

// Funcion para iniciar sesion
function userLogin() {
  let userLogin;
  let nombreUsuario;
  while (
    userLogin != "Iniciar Sesion" &&
    userLogin != "Registrarse" &&
    userLogin != "Salir"
  ) {
    userLogin = prompt(
      "¿Que desea hacer? \n Iniciar Sesion \n Registrarse \n Salir"
    );
    switch (userLogin) {
      // Pido por Prompt el nombre del usuario
      case "Iniciar Sesion":
        nombreUsuario = prompt("Ingrese su nombre de usuario");
        // Pido que ingrese su contraseña de usuario (puede ser cualquier cosa)
        prompt("Ingrese su contraseña");
        // Bienvenida con nombre de usuario
        alert(`Bienvenido de nuevo ${nombreUsuario}.`);
        break;
      case "Registrarse":
        // Pido al usuario que cree su cuenta con Correo, Contraseña y Usuario
        const correoUsuario = prompt("Ingrese su correo electronico");
        nombreUsuario = prompt("Ingrese su nombre de usuario");
        prompt("Ingrese su contraseña");
        // Bienvenida con nombre de usuario y correo electronico
        alert(
          `Te damos la bienvenida a Pilot Essential ${nombreUsuario}, se ha enviado un correo de verificacion de identidad a ${correoUsuario}. Recuerda que debes verificar tu correo antes de poder realizar compras.`
        );
        break;
      case "Salir":
        break;
      default:
        alert(
          "No se reconoce el comando ingresado, por favor intentelo nuevamente."
        );
    }
  }

  // Remplazo el boton de Mi cuenta por el nombre de usuario almacenado en la variable
  const usuario = document.querySelector("#nombreUsuario");
  usuario.innerHTML = `<a href="#">${nombreUsuario}</a>`;
}

function continuarCompra() {
  window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}
