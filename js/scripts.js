//----------------------------------------------------
//------------------Menus-----------------------------
//----------------------------------------------------
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active")
});

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("menu-active");
});

let acordionQuit = document.getElementById("flush-collapseOne");
acordionQuit.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    menu.classList.remove("menu-active");
});


//----------------------------------------------------
//------------------Lista de Productos----------------
//----------------------------------------------------
let productos = [
    { id: 1, nombre: "MOTHERBOARD ASUS PRIME A520M-K AM4", precio: 15429, img: "../img/productos/mother-1.png", categoria: "motherboard", cantidad: 1 },
    { id: 2, nombre: "MOTHERBOARD ASUS PRIME A520M-A II AM4", precio: 16049, img: "../img/productos/mother-2.png", categoria: "motherboard", cantidad: 1 },
    { id: 3, nombre: "MOTHERBOARD GIGABYTE B460M DS3H V2 M-ATX", precio: 20789, img: "../img/productos/mother-3.png", categoria: "motherboard", cantidad: 1 },
    { id: 4, nombre: "MOTHERBOARD GIGABYTE B450 GAMING X AM4", precio: 20999, img: "../img/productos/mother-4.png", categoria: "motherboard", cantidad: 1 },
    { id: 5, nombre: "MOTHERBOARD ASROCK Z590 PHANTOM GAMING 4", precio: 33489, img: "../img/productos/mother-5.png", categoria: "motherboard", cantidad: 1 },
    { id: 6, nombre: "MOTHERBOARD MSI B550M-A PRO AM4", precio: 34649, img: "../img/productos/mother-6.png", categoria: "motherboard", cantidad: 1 },
    { id: 7, nombre: "MOTHERBOARD ASUS TUF GAMING B550M-PLUS", precio: 37269, img: "../img/productos/mother-7.png", categoria: "motherboard", cantidad: 1 },
    { id: 8, nombre: "MOTHERBOARD MSI PRO Z690-A WIFI", precio: 45969, img: "../img/productos/mother-8.png", categoria: "motherboard", cantidad: 1 },
    { id: 9, nombre: "MOTHERBOARD GIGABYTE B660M AORUS PRO", precio: 50819, img: "../img/productos/mother-9.png", categoria: "motherboard", cantidad: 1 },
    { id: 10, nombre: "MOTHERBOARD GIGABYTE B660 AORUS MASTER", precio: 58329, img: "../img/productos/mother-10.png", categoria: "motherboard", cantidad: 1 },
    { id: 11, nombre: "MOTHERBOARD ASROCK Z590 PG VELOCITA", precio: 60869, img: "../img/productos/mother-11.png", categoria: "motherboard", cantidad: 1 },
    { id: 12, nombre: "MOTHERBOARD GIGABYTE Z690 AORUS ELITE AX", precio: 69359, img: "../img/productos/mother-12.png", categoria: "motherboard", cantidad: 1 },

    { id: 13, nombre: "MICROPROCESADOR CPU AMD RYZEN 3 4100", precio: 21490, img: "../img/productos/micro-1.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 14, nombre: "MICROPROCESADOR INTEL CORE I3 10100", precio: 25990, img: "../img/productos/micro-2.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 15, nombre: "MICROPROCESADOR INTEL CORE I5 10400F", precio: 28999, img: "../img/productos/micro-3.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 16, nombre: "MICROPROCESADOR CPU AMD RYZEN 5 4600G", precio: 39490, img: "../img/productos/micro-4.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 17, nombre: "MICROPROCESADOR INTEL CORE I5 10600K", precio: 46990, img: "../img/productos/micro-5.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 18, nombre: "MICROPROCESADOR CPU AMD RYZEN 5 5600", precio: 47990, img: "../img/productos/micro-6.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 19, nombre: "MICROPROCESADOR AMD RYZEN 5 5600X", precio: 52990, img: "../img/productos/micro-7.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 20, nombre: "PROCESADOR AMD RYZEN 7 5700G", precio: 63990, img: "../img/productos/micro-8.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 21, nombre: "MICROPROCESADOR INTEL I7 10700", precio: 64990, img: "../img/productos/micro-9.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 22, nombre: "MICROPROCESADOR AMD RYZEN 9 5900X", precio: 99990, img: "../img/productos/micro-10.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 23, nombre: "MICROPROCESADOR CPU INTEL CORE I9 12900", precio: 125999, img: "../img/productos/micro-11.png", categoria: "microprocesadores", cantidad: 1 },
    { id: 24, nombre: "MICROPROCESADOR AMD RYZEN 9 5950X", precio: 138990, img: "../img/productos/micro-12.png", categoria: "microprocesadores", cantidad: 1 },
];

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
const listaCarrito = (clave, valor) => { sessionStorage.setItem(clave, valor)};

//----------------------------------------------------
//------------------Barra de busqueda-----------------
//----------------------------------------------------
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

//----------------------------------------------------
//------------------Productos-------------------------
//----------------------------------------------------
let productosContainer = document.getElementById("productosContainer");
let carritoContainer = document.getElementById("carritoContainer");
let total = document.getElementById("sumaTotal");

let contadores = document.querySelectorAll("#contador");


const contador = () => {
    contadores.forEach(contador => {
        contador.innerText = carrito.length;
    });
}

const mostrarProductos = (prodCaract) => {
    let filtro = productos.filter(producto => producto.categoria === prodCaract);
    filtro.forEach(producto => {
        let div = document.createElement("div");
        div.className = "card column-custom"
        div.id = `${producto.categoria}`
        div.innerHTML = `   <div class="thumb img-back">
                                <img src="${producto.img}" class="img-contained" alt="...">
                            </div>
                            <div class="w-100 p-1 bg-white">
                                <h3 class="card-title">$${producto.precio}</h4>
                                <p class="card-text" style="font-size: 14px">${producto.nombre}</p>
                                <button class="btn btn-primary" id="boton${producto.id}">Comprar</button>
                            </div>`;
        productosContainer.append(div);
        let boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}


const agregarAlCarrito = (prodId) => {
    let producto = productos.find(producto => producto.id === prodId)
    carrito.push(producto);
    actualizarCarrito();
    totalCarrito();
}

const actualizarCarrito = () => {
    carritoContainer.innerHTML = "";

    if (carrito.length >= 1) {
        total.classList.remove("d-none")
        carritoContainer.innerHTML = `<tr class="text-center f-gef fs-5">
                                        <td>Producto</td>
                                        <td>Cantidad</td>
                                        <td>Precio</td>
                                        <td></td>
                                    </tr>`;
    } else {
        total.classList.add("d-none")
    }

    carrito.forEach(producto => {
        let tr = document.createElement("tr")
        tr.classList.add("text-center", "border-danger", "border-bottom", "border-top", "f-ddn");
        tr.innerHTML = `<td class="col-5">${producto.nombre}</td>
                        <td class="col-4">x${producto.cantidad}</td>
                        <td class="col-3 text-danger">$${producto.precio}</td>
                        <td><button class="btn text-warning fs-5" id="eliminar${producto.id}"><i class="fa-solid fa-trash-can"></i></button></td>`;
        carritoContainer.append(tr);
        
        let btnEliminar = document.getElementById(`eliminar${producto.id}`);
        btnEliminar.addEventListener("click", () => {
            eliminarProd(producto.id);
        });
    });
    listaCarrito("carrito", JSON.stringify(carrito));
    contador();
}

const totalCarrito = () => {
    let totalSuma = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    total.innerHTML = `<button id="vaciarCarrito" class="btn btn-danger f-gef fs-6 text-white">Vaciar Carrito</button>
                        <h3>Total: $${totalSuma}</h3>`;

    let btnVaciar = document.getElementById("vaciarCarrito");
    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
    });
}

const eliminarProd = (prodId) => {
    let prodAEliminar = carrito.find(producto => producto.id === prodId)
    let indice = carrito.indexOf(prodAEliminar);
    carrito.splice(indice, 1);
    actualizarCarrito();
    totalCarrito();
}

const vaciarCarrito = () => {
    carrito.length = 0;
    localStorage.clear();
    actualizarCarrito();
}



actualizarCarrito();
totalCarrito();
//----------------------------------------------------
//-----------------Mostrar Productos------------------
//----------------------------------------------------

let motherList = document.querySelectorAll("#motherList");
let microList = document.querySelectorAll("#microList");


motherList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("motherboard");
    });
});

microList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("microprocesadores");
    });
});


