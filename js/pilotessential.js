// Variables Globales
let abrirCarrito = document.querySelector(".trolley");
let cerrarCarrito = document.querySelector(".closeTrolley");
let list = document.querySelector(".trolleyList");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let cantidad = document.querySelector(".trolleyQuantity");

// Array vacio del carrito
const carrito = [];
let checkout = 0;

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

// carrito.push(h10);
// carrito.push(a20);

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

  carrito.forEach((producto) => {
    list.innerHTML = `<li>
    ${producto.nombre}
    U$D${producto.precio}
    </li>`;
  });

  // Que limpie y actualice la consola cada vez que se agrega un producto al carrito.
  console.clear();
  console.log("Tu carrito:");

  carrito.forEach((producto) => {
    console.log("------------------------------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:  U$D", producto.precio);
    console.log("Precio de Lista: U$D", producto.precioList);
    console.log("Categoria:", producto.categoria);
    console.log("Cantidad:", producto.cantidad);
  });
  const trolleyCheckout = carrito.reduce((acu, el) => acu + el.precio, 0);
  const checkoutList = carrito.reduce((acu, el) => acu + el.precioList, 0);
  total.innerHTML = `<div >Subtotal: U$D${trolleyCheckout}</div>`;
  console.log("------------------------------");
  console.log(
    "Subtotal del carrito: U$D",
    trolleyCheckout,
    " - Subtotal Lista: U$D",
    checkoutList
  );
}

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
      case "Iniciar Sesion":
        nombreUsuario = prompt("Ingrese su nombre de usuario");
        prompt("Ingrese su contraseña");
        alert(`Bienvenido de nuevo ${nombreUsuario}.`);
        break;
      case "Registrarse":
        const correoUsuario = prompt("Ingrese su correo electronico");
        nombreUsuario = prompt("Ingrese su nombre de usuario");
        prompt("Ingrese su contraseña");
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
  const usuario = document.querySelector("#nombreUsuario");
  usuario.innerHTML = `<a href="#">${nombreUsuario}</a>`;
}
