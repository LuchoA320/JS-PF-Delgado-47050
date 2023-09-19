// Array vacio del carrito
const carrito = [];

// Molde constructor de productos
class Product {
  constructor(nombre, precio, precioList, categoria, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.precioList = precioList;
    this.categoria = categoria;
    this.stock = stock;
  }
}

// ===== INSTANCIACION DE PRODUCTOS =====
const a20 = new Product(
  "Auriculares Bose A20 Bluetooth",
  "U$D 1,099.00",
  "U$D 1,195.00",
  "Headsets",
  25
);
const a30 = new Product(
  "Auriculares Bose A30 Bluetooth",
  "U$D 1,299.00",
  "U$D 1,495.00",
  "Headsets",
  30
);
const d2Mach1 = new Product(
  "Reloj Garmin D2 Mach 1 Aviator",
  "U$D 1,199.00",
  "U$D 1,399.00",
  "Watches",
  10
);
const asaCX3 = new Product(
  "Computadora de vuelo ASA CX-3 Pathfinder",
  "U$D 117.50",
  "U$D 124.95",
  "Flight Computers",
  15
);
const h10 = new Product(
  "Auriculares David Clark H10-13.4",
  "U$D 356.95",
  "U$D 391.65",
  "Headsets",
  35
);

// carrito.push(h10);
// carrito.push(a20);

// Funcion para agregar el producto elegido al carrito.
function agregar(Producto) {
  carrito.unshift(Producto);
  // Alert indicando que el producto se agrego satisfactoriamente.
  alert(Producto.nombre + " fue agregado al carrito.");

  // Que limpie y actualice la consola cada vez que se agrega un producto al carrito.
  console.clear();
  console.log("Tu carrito:");
  for (const producto of carrito) {
    console.log("------------------------------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Precio de Lista:", producto.precioList);
    console.log("Categoria:", producto.categoria);
  }
}

// function listar() {
//   for (const producto of carrito) {
//     console.log("Producto:", producto);
//   }
// }

// listar();
