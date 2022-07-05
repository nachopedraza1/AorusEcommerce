//menu 
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active")
});

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("menu-active");
});


class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let productos = [
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-1.png" },
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-2.png" },
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-3.png" },
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-1.png" },
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-2.png" }
];

for (const producto of productos) {
    let productoCard = document.querySelector("#productosBox");
    let card = document.createElement("div");
    card.className = "border rounded-1 box-shw row col-6 col-sm-3 p-0";
    card.innerHTML = `<div><img src="${producto.img}" class="card-img-bottom" alt="..."></div>
                    <div class="card-body p-2">
                        <h5 class="card-title">${"$"+producto.precio}</h5>
                        <p class="card-text">${producto.nombre}</p>
                    </div>`;

    productoCard.append(card);
}

let filtro = prompt("Ingrese el nombre del producto a buscar");

let filtrados = productos.filter(producto => producto.nombre.includes(filtro));
console.log(filtrados);








