//----------------------------------------------------
//------------------Menus-----------------------------
//----------------------------------------------------
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active")
});

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("menu-active");
});

const acordionQuit = document.getElementById("flush-collapseOne");
acordionQuit.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    menu.classList.remove("menu-active");
});


//----------------------------------------------------
//------------------Lista de Productos----------------
//----------------------------------------------------
let productos = [];
const traerDatos = async () =>{
    const respuesta = await fetch("../data/productos.json")
    const data = await respuesta.json();

    data.forEach(producto => {
        productos.push(producto);
    });
}
traerDatos();

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
const listaCarrito = (clave, valor) => { sessionStorage.setItem(clave, valor) };

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
let compraContainer = document.getElementById("compraContainer");
let filters = document.getElementById("filters");
let totalCarro = document.getElementById("totalCarrito");
let totalCompra = document.getElementById("totalCompra");
let contadores = document.querySelectorAll("#contador");


//-------Crear Box Producto---------->
const createProductBox = (arrayAMostrar) => {
    arrayAMostrar.forEach(producto => {
        filters.classList.add("container-md");
        filters.innerHTML = `<h1 class="line"><span>${producto.categoria.toUpperCase()}</span></h1>`;

        let div = document.createElement("div");
        div.className = "card column-custom"
        div.innerHTML = `   <div class="thumb img-back">
                                <img src="${producto.img}" class="img-contained p-2 alt="...">
                            </div>
                            <div class="w-100 h-100 p-1 bg-white d-flex flex-column justify-content-between">
                                <h3 class="card-title">$${producto.precio}</h4>
                                <p class="card-text text-center" style="font-size: 14px">${producto.nombre}</p>
                                <button class="btn btn-primary" id="boton${producto.id}"><i class="fa-solid fa-cart-plus"></i> Añadir</button>
                            </div>`;
        productosContainer.append(div);


        let boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}
//------------------------------->


//------Mostrar Productos-------->
const mostrarProductos = (categoria) => {
    let filtroCategoria = productos.filter(producto => producto.categoria === categoria);
    let filtroMarcaAmd = filtroCategoria.filter(producto => producto.marca === "amd");
    let filtroMarcaIntel = filtroCategoria.filter(producto => producto.marca === "intel");


    let amdFilter = document.querySelectorAll("#amd");
    amdFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaAmd);
            ordenarProd(filtroCategoria);
        });
    });

    let intelFilter = document.querySelectorAll("#intel");
    intelFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaIntel);
            ordenarProd(filtroMarcaIntel);
        });
    });


    let select = document.getElementById("select");
    select.addEventListener("change", () => {
        productosContainer.innerHTML = "";
        if (select.value.toString() === "MayorPrecio") {
            filtroCategoria.sort((a, b) => b.precio - a.precio);
            createProductBox(filtroCategoria);
        } else if (select.value.toString() === "MenorPrecio") {
            filtroCategoria.sort((a, b) => a.precio - b.precio);
            createProductBox(filtroCategoria);
        }
    });

    createProductBox(filtroCategoria);
}
//-------------------------------->


//-------Contador Carrito--------->
const contador = () => {
    contadores.forEach(contador => {
        contador.innerText = carrito.length;
    });
}
//-------------------------------->


//-------Agregar Carrito---------->
const agregarAlCarrito = (prodId) => {
    //-------Alerta----------->
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000,
        toast: true
    })
    //-------Fin Alerta----------->
    const existe = carrito.some(producto => producto.id === prodId);
    if (existe) {
        const productoOriginal = productos.find(producto => producto.id === prodId)
        carrito.map(producto => {
            if (producto.id === prodId) {
                producto.cantidad++;
                producto.precio = productoOriginal.precio * producto.cantidad;
                totalCarrito();
            }
        })
    } else {
        let producto = productos.find(producto => producto.id === prodId)
        carrito.push({ ...producto });
        totalCarrito();
    }
    actualizarCarrito();
}
//-------------------------------->



//----Actualizar Carrito---------->
const actualizarCarrito = () => {
    carritoContainer.innerHTML = "";
    compraContainer.innerHTML = `<tr class="text-center f-gef fs-5">
                                <td>Cantidad</td>
                                <td>Producto</td>
                                <td>Precio</td>
                                <td></td>
                                </tr>`;
    if (carrito.length >= 1) {
        totalCarro.classList.remove("d-none")
        carritoContainer.innerHTML = `<tr class="text-center f-gef fs-5">
                                        <td>Producto</td>
                                        <td>Cantidad</td>
                                        <td>Precio</td>
                                        <td></td>
                                    </tr>`;
    } else {
        totalCarro.classList.add("d-none")
    }

    carrito.forEach(producto => {
        let tablaCarrito = document.createElement("tr")
        tablaCarrito.classList.add("text-center", "border-danger", "border-bottom", "border-top", "f-ddn");
        tablaCarrito.innerHTML = `<td class="col-5">${producto.nombre}</td>
                        <td class="col-4">x${producto.cantidad}</td>
                        <td class="col-3 text-danger">$${producto.precio}</td>
                        <td><button class="btn text-warning fs-5" id="eliminar${producto.id}"><i class="fa-solid fa-trash-can"></i></button></td>`;
        carritoContainer.append(tablaCarrito);

        let tablaCompra = document.createElement("tr");
        tablaCompra.classList.add("text-center");
        tablaCompra.innerHTML = `<td class="col-4"><img class="col-9 col-sm-4" src="${producto.img}" height="auto" width="100%"><b>x${producto.cantidad}</b></td>
                            <td class="col-4">${producto.nombre}</td>
                            <td class="col-4 text-danger">$${producto.precio}</td>`;
        compraContainer.append(tablaCompra);

        let btnEliminar = document.getElementById(`eliminar${producto.id}`);
        btnEliminar.addEventListener("click", () => {
            eliminarProd(producto.id);
        });
    });
    listaCarrito("carrito", JSON.stringify(carrito));
    contador();
}
//---------------------------------->



//-----------Sumar Carrito---------->
const totalCarrito = () => {
    let totalSuma = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    totalCarro.classList.add("mt-3");
    totalCarro.innerHTML = `<h3 class="f-ddn">Total : <b class="text-danger">$${totalSuma}</b></h3>
                            <button id="vaciarCarrito" class="btn btn-danger f-gef fs-6 text-white">Vaciar Carrito</button>
                            <button id="finalizarCompra" class="btn btn-danger f-gef fs-6 text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar Compra</button>`;

    totalCompra.innerText = `$${totalSuma}`;
    let btnVaciar = document.getElementById("vaciarCarrito");
    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();
    });

    let btnFinalizarCompra = document.getElementById("finalizarCompra");
    let offcanvasCarrito = document.getElementById("offcanvasRight");
    btnFinalizarCompra.addEventListener("click", () => {
        offcanvasCarrito.classList.remove("show");
    });
}
//-------------------------------->


//-----Eliminar Producto---------->
const eliminarProd = (prodId) => {
    //-------Alerta----------->
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Producto eliminado',
        showConfirmButton: false,
        timer: 2000,
        toast: true
    });
    //-------Fin Alerta----------->
    let prodAEliminar = carrito.find(producto => producto.id === prodId)
    let indice = carrito.indexOf(prodAEliminar);
    carrito.splice(indice, 1);
    actualizarCarrito();
    totalCarrito();
}
//------------------------------->


//-------Vaciar Carrito---------->
const vaciarCarrito = () => {
    //-------Alerta----------->
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'El carrito de compras esta vacío.',
        showConfirmButton: false,
        timer: 2000,
        toast: true
    })
    //-------Fin Alerta---------->
    carrito.length = 0;
    sessionStorage.clear();
    actualizarCarrito();
}
//------------------------------->

mostrarProductos("microprocesadores");
actualizarCarrito();
totalCarrito();

//----------------------------------------------------
//-----------------Menu Productos------------------
//----------------------------------------------------
let motherList = document.querySelectorAll("#motherList");
let microList = document.querySelectorAll("#microList");

motherList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("motherboards");
    });
});

microList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("microprocesadores");
    });
});


