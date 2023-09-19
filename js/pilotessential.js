const carrito = [];

class Product {
  constructor(nombre, precio, precioLista, categoria) {
    this.nombre = nombre;
    this.precio = precio;
    this.precioLista = precioLista;
    this.categoria = categoria;
  }
}

const a20 = new Product(
  "Auriculares Bose A20 Bluetooth",
  "U$D 1,099.00",
  "U$D 1,195.00",
  "headsets"
);
const a30 = new Product(
  "Auriculares Bose A30 Bluetooth",
  "U$D 1,299.00",
  "U$D 1,495.00",
  "headsets"
);
const d2Mach1 = new Product(
  "Reloj Garmin D2 Mach 1 Aviator",
  "U$D 1,199.00",
  "U$D 1,399.00",
  "watches"
);
const asaCX3 = new Product(
  "Computadora de vuelo ASA CX-3 Pathfinder",
  "U$D 117.50",
  "U$D 124.95",
  "Flight Computers"
);
const h10 = new Product(
  "Auriculares David Clarck H10-13.4",
  "U$D 356.95",
  "U$D 391.65",
  "Headsets"
);

function listar() {
  console.clear();
  console.log("Productos que hay en el carrito:");

  // Recorremos los elementos del array carrito
  for (const Product of carrito) {
    console.log("----------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Cantidad:", producto.cantidad);
  }
}

listar();

carrito.push(h10);
