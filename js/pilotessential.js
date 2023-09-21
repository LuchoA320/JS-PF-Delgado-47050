// Constantes globales de Bootstrap para pop-overs
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);
// Variables Globales
let abrirCarrito = document.querySelector(".trolley");
let cerrarCarrito = document.querySelector(".closeTrolley");
let list = document.querySelector(".trolleyList");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let cantidad = document.querySelector(".trolleyQuantity");

// Array vacio del carrito
const carrito = [];

// Molde constructor de productos
class Product {
  constructor(nombre, precio, precioList, categoria, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.precioList = precioList;
    this.categoria = categoria;
    this.cantidad = cantidad;
  }
}

// ===== INSTANCIACION DE PRODUCTOS =====
const a20 = new Product(
  "Auriculares Bose A20 Bluetooth",
  1099.0,
  1195.0,
  "Headsets",
  1
);
const a30 = new Product(
  "Auriculares Bose A30 Bluetooth",
  1299.65,
  1495.65,
  "Headsets",
  1
);
const d2Mach1 = new Product(
  "Reloj Garmin D2 Mach 1 Aviator",
  1199.0,
  1399.0,
  "Watches",
  1
);
const asaCX3 = new Product(
  "Computadora de vuelo ASA CX-3 Pathfinder",
  117.45,
  124.95,
  "Flight Computers",
  1
);
const h10 = new Product(
  "Auriculares David Clark H10-13.4",
  356.95,
  391.65,
  "Headsets",
  1
);

// Evento para abrir la pestaña del carrito
abrirCarrito.addEventListener("click", () => {
  body.classList.add("active");
});
// Evento para cerrar la pestaña del carrito
cerrarCarrito.addEventListener("click", () => {
  body.classList.remove("active");
});

// Funcion para agregar el producto elegido al carrito.
function agregar(Producto) {
  carrito.unshift(Producto);
  // Alert indicando que el producto se agrego satisfactoriamente.
  swal(Producto.nombre + " fue agregado al carrito.", {
    buttons: ["Seguir Comprando", "Ver Carrito"],
  });

  // Vacia la lista del carrito
  let listaCarrito = "";
  // Por cada producto agregado al array Carrito, agrega un List Item con las propiedades del mismo a la lista del carrito
  carrito.forEach((producto) => {
    listaCarrito += `<li class="trolleyItem"> ${producto.nombre}
     <div> 
     U$D ${producto.precio} - <span class="listPrice"> U$D ${producto.precioList}
     <button class="btn" onclick="quitar()"><i class='bx bxs-trash'></i></button>
     </span>
     </div>
     </li>`;
  });
  // adjudico la variable de la lista al modificador de HTML
  list.innerHTML = listaCarrito;
  console.clear();
  console.log(carrito);
  // Reduce para sumar el precio de los productos en Carrito
  const trolleyCheckout = carrito.reduce((acu, el) => acu + el.precio, 0);
  const checkoutList = carrito.reduce((acu, el) => acu + el.precioList, 0);
  // Modifico el html de la clase total para mostrar el resultado de la suma almacenado en la variable
  total.innerHTML = `<div >Subtotal: U$D ${trolleyCheckout}</div>`;
  let trolleyLenght = carrito.length;
  cantidad.innerHTML = `<span class="trolleyQuantity">${trolleyLenght}</span></a>`;
}

function quitar(index) {
  carrito.splice(index, 1)[0];
  console.clear();
  console.log(carrito);
  // Vacia la lista del carrito
  let borrarCarrito = "";
  // Por cada producto agregado al array Carrito, agrega un List Item con las propiedades del mismo a la lista del carrito
  carrito.forEach((producto) => {
    borrarCarrito += `<li class="trolleyItem"> ${producto.nombre}
       <div> 
       U$D ${producto.precio} - <span class="listPrice"> U$D ${producto.precioList}
       <button class="btn" onclick="quitar()"><i class='bx bxs-trash'></i></button>
       </span>
       </div>
       </li>`;
  });
  // adjudico la variable para borrar la lista al modificador de HTML
  list.innerHTML = borrarCarrito;
  // Reduce para restar el precio del produco que elimino Carrito
  const trolleyRemoveCheckout = carrito.reduce((acu, el) => acu - el.precio, 0);
  const checkoutList = carrito.reduce((acu, el) => acu - el.precioList, 0);
  // Modifico el html de la clase total para mostrar el resultado tras restar los productos del carrito
  total.innerHTML = `<div >Subtotal: U$D ${trolleyRemoveCheckout}</div>`;
  let trolleyLenght = carrito.length;
  cantidad.innerHTML = `<span class="trolleyQuantity">${trolleyLenght}</span></a>`;
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
