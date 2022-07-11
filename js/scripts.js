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

let productos = [
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-1.png" },
    { nombre: "Motherboard Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-2.png" },
    { nombre: "Disco Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-3.png" },
    { nombre: "Disco Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-1.png" },
    { nombre: "Disco Gigabyte B660M DS3H DDR4 S1700", precio: 28000, img: "img/productos/mother-2.png" }
];

let buscador = document.getElementsByClassName("searchTerm");
let resultado = document.getElementsByClassName("subBusqueda");

for (const search of buscador) {
    search.addEventListener("keyup", filtro);
}

function filtro(filters) {
    let search = filters.target;
    let texto = search.value.toLowerCase();
    let filtroProd = productos.filter(producto => producto.nombre.toLowerCase().includes(texto));
    for (const result of resultado) {
        result.innerHTML = "";
        for (const producto of filtroProd) {
            if (filtroProd.length === 0) {
                result.classList.remove("active");
                result.innerHTML = "";
            } else if (texto == "") {
                result.classList.remove("active");
                result.innerHTML = "";
            } else {
                result.classList.add("active");
                result.innerHTML += `<li class ="text-danger"> ${producto.nombre} </li>`
            }
        }
    }
}


