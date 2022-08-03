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


//-------------------------------------------------
//-------------Preloaders--------------------------
//-------------------------------------------------
let body = document.getElementById("body");
let loadingdiv = document.getElementById("loading-div");
setTimeout(function () {
    loadingdiv.classList.remove("show");
    body.classList.remove("overflow-hidden");
}, 2100);
setTimeout(function () {
    loadingdiv.classList.add("d-none")
}, 2250);


//----------------------------------------------------
//------------------Lista de Productos----------------
//----------------------------------------------------
let productos = [];
const traerDatos = async () => {
    const respuesta = await fetch("../data/productos.json")
    const data = await respuesta.json();

    data.forEach(producto => {
        productos.push(producto);
    });
    mostrarProductos("microprocesadores");
    actualizarCarrito();
    actualizarFav();
    totalCarrito();
}
traerDatos();

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
let favoritos = JSON.parse(sessionStorage.getItem("favoritos")) || [];
const listaCarrito = (clave, valor) => { sessionStorage.setItem(clave, valor) };
const addFav = (clave, valor) => { sessionStorage.setItem(clave, valor) };


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
                result.innerHTML += `<li class="list-unstyled"><a href="../pages/productos.html"class="nav-link px-1 text-primary">${producto.nombre}</a></li>`
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
let carritoVacio = document.getElementById("carritoVacio");
let filters = document.getElementById("filters");
let totalCarro = document.getElementById("totalCarrito");
let totalCompra = document.getElementById("totalCompra");
let contadores = document.querySelectorAll("#contador");
let favContainer = document.getElementById("favContainer");
let modalContainer = document.getElementById("modalContainer");
let modalPagar = document.getElementById("modalPagar");


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
                                <button class="position favorito" id="btnAddFav${producto.id}"><i class="fa-solid fa-heart-circle-plus"></i></button>
                            </div>`;
        productosContainer.append(div);


        let boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        let btnFav = document.getElementById(`btnAddFav${producto.id}`);
        btnFav.addEventListener("click", () => {
            agregarFavoritos(producto.id);
        });
    });
}
//------------------------------->



//-------Agregar a Favoritos------>
const agregarFavoritos = (prodId) => {
        //-------Alerta----------->
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado a Favoritos',
            showConfirmButton: false,
            timer: 2000,
            toast: true
        });
        //-------Fin Alerta----------->
    let producto = productos.find(producto => producto.id === prodId);
    favoritos.push(producto);
    actualizarFav();
}
//------------------------------->


//-------Actualizar Favoritos------->
const actualizarFav = () => {
    favContainer.innerHTML = "";
    favContainer.classList.add("d-flex", "flex-wrap");
    favoritos.forEach(producto => {
        let div = document.createElement("div");
        div.className = "card column-custom col-6 col-sm-4 col-md-3"
        div.innerHTML = `   <div class="thumb img-back">
                                    <img src="${producto.img}" class="img-contained p-2 alt="...">
                                </div>
                                <div class="w-100 h-100 p-1 bg-white d-flex flex-column justify-content-between">
                                    <p class="card-text text-center" style="font-size: 14px">${producto.nombre}</p>
                                    <button class="position favorito" id="btnEliminarFav${producto.id}"><i class="fa-solid fa-trash-can"></i></button>
                                </div>`;
        favContainer.append(div);

        let elimnarFavorito = document.getElementById(`btnEliminarFav${producto.id}`);
        elimnarFavorito.addEventListener("click", () => {
            eliminarFav(producto.id);
        });
    });
    addFav("favoritos", JSON.stringify(favoritos));
}
//------------------------------->



//-----------Eliminar Fav-------->
const eliminarFav = (prodId) => {
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
    let eliminarFav = favoritos.find(producto => producto.id === prodId);
    let indice = favoritos.indexOf(eliminarFav);
    favoritos.splice(indice, 1);
    actualizarFav();
}
//------------------------------->



//------Mostrar Productos-------->
const mostrarProductos = (categoria) => {
    let filtroCategoria = productos.filter(producto => producto.categoria === categoria),
        filtroMarcaAmd = filtroCategoria.filter(producto => producto.marca === "amd"),
        filtroMarcaIntel = filtroCategoria.filter(producto => producto.marca === "intel"),
        filtroMarcaXpg = filtroCategoria.filter(producto => producto.marca === "xpg"),
        filtroMarcaViper = filtroCategoria.filter(producto => producto.marca === "viper"),
        filtroMarcaCorsair = filtroCategoria.filter(producto => producto.marca === "corsair"),
        filtroMarcaKingston = filtroCategoria.filter(producto => producto.marca === "kingston"),
        filtroMarcaGeforce = filtroCategoria.filter(producto => producto.marca === "geforce");

    let amdFilter = document.querySelectorAll("#amd");
    amdFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaAmd);
        });
    });

    let intelFilter = document.querySelectorAll("#intel");
    intelFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaIntel);
        });
    });

    let xpgFilter = document.querySelectorAll("#xpg");
    xpgFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaXpg);
        });
    });

    let viperFilter = document.querySelectorAll("#viper");
    viperFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaViper);
        });
    });

    let corsairFilter = document.querySelectorAll("#corsair");
    corsairFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaCorsair);
        });
    });

    let kingstonFilter = document.querySelectorAll("#kingston");
    kingstonFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaKingston);
        });
    });

    let geforceFilter = document.querySelectorAll("#geforce");
    geforceFilter.forEach(select => {
        select.addEventListener("click", () => {
            productosContainer.innerHTML = "";
            createProductBox(filtroMarcaGeforce);
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
        carritoVacio.classList.add("d-none");
        totalCarro.classList.remove("d-none")
        carritoContainer.innerHTML = `<tr class="text-center f-gef fs-5">
                                        <td>Producto</td>
                                        <td>Cantidad</td>
                                        <td>Precio</td>
                                        <td></td>
                                    </tr>`;
    } else {
        totalCarro.classList.add("d-none");
        carritoVacio.classList.remove("d-none");
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


let codigoCupon = false;
//-----------Sumar Carrito---------->
const totalCarrito = () => {
    let totalSuma = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    let cuponBox = document.getElementById("codigoCupon");
    let btnCupon = document.getElementById("btnCupon");
    btnCupon.addEventListener("click", () => {
        if (cuponBox.value == "20%offcode") {
            codigoCupon = true;
            totalCompra.innerText = `$${parseInt(totalSuma * (20 / 100))}`;
        }
    });

    totalCarro.classList.add("mt-3");
    totalCarro.innerHTML = `<h4 class="f-ddn">TOTAL : <b class="text-danger">$${totalSuma}</b></h4>
                            <button id="vaciarCarrito" class="btn btn-danger f-gef fs-6 text-white">Vaciar Carrito</button>
                            <button id="finalizarCompra" class="btn btn-danger f-gef fs-6 text-white" data-bs-toggle="modal" data-bs-target="#modalComprar">Finalizar Compra</button>`;

    totalCompra.innerText = `$${totalSuma}`;
    codigoCupon == true ? totalFactura.innerText = `TOTAL: $${parseInt(totalSuma * (20 / 100))}` : totalFactura.innerText = `TOTAL: $${totalSuma}`;
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



//-------------------------------------------------
//-----------------Menu Productos------------------
//-------------------------------------------------
let motherList = document.querySelectorAll("#motherList"),
    microList = document.querySelectorAll("#microList"),
    ramList = document.querySelectorAll("#ramList"),
    placasList = document.querySelectorAll("#placasList"),
    monitoresList = document.querySelectorAll("#monitoresList"),
    fuentesList = document.querySelectorAll("#fuentesList"),
    refriList = document.querySelectorAll("#refriList"),
    gabinetesList = document.querySelectorAll("#gabinetesList");

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

ramList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("memoriasRam");
    });
});

placasList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("placasVideo");
    });
});

monitoresList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("monitores");
    });
});

fuentesList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("fuentes");
    });
});

refriList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("refrigeracion");
    });
});

gabinetesList.forEach(event => {
    event.addEventListener("click", () => {
        productosContainer.innerHTML = "";
        mostrarProductos("gabinetes");
    });
});


//-------------------------------------------------
//-----------------Datos Tarjeta-------------------
//-------------------------------------------------
let formulario = document.getElementById("formulario-tarjeta");
let numeroTarjeta = document.querySelector("#numero .numero");
let nombreTarjeta = document.querySelector("#nombre .nombre");
let mesExpiracion = document.querySelector("#expiracion .expiracion .mes");
let yearExpiracion = document.querySelector("#expiracion .expiracion .year");
let logoMarca = document.querySelector('#logo-marca');
let cvv = document.querySelector("#ccv .ccv");
let tarjeta = document.getElementById("tarjeta");
let facturaSection = document.getElementById("factura");


tarjeta.addEventListener("click", () => {
    tarjeta.classList.toggle("active");
});

const mostrarFrente = () => {
    if (tarjeta.classList.contains("active")) {
        tarjeta.classList.remove("active");
    }
}

//-------------------------------------------------
//-------------Input numero de tarjeta-------------
//-------------------------------------------------
formulario.inputNumero.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    formulario.inputNumero.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')
        // Elimina el ultimo espaciado
        .trim();
    numeroTarjeta.textContent = valorInput;

    if (numeroTarjeta.textContent == "") {
        numeroTarjeta.textContent = "#### #### #### ####";
    }
    if (valorInput[0] <= 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../img/tarjeta/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] >= 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../img/tarjeta/mastercard.png';
        logoMarca.appendChild(imagen);
    }
    mostrarFrente();
});
//-------------------------------------------------
//-------------Input nombre de tarjeta-------------
//-------------------------------------------------
formulario.inputNombre.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    formulario.inputNombre.value = valorInput
        // Eliminar Numeros
        .replace(/[0-9]/g, '')

    nombreTarjeta.textContent = valorInput;

    if (nombreTarjeta.textContent == "") {
        nombreTarjeta.textContent = "----------------------"
    }
    mostrarFrente();
})

//-------------------------------------------------
//-------------Input ccv de tarjeta----------------
//-------------------------------------------------
formulario.inputCCV.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    formulario.inputCCV.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Elimina el ultimo espaciado
        .trim();
    cvv.textContent = valorInput;
    if (!tarjeta.classList.contains("active")) {
        tarjeta.classList.toggle("active");
    }
});

//-------------------------------------------------
//-------------Input Mes de tarjeta----------------
//-------------------------------------------------
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.append(opcion);
}

formulario.selectMes.addEventListener("change", (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

//-------------------------------------------------
//-------------Input Año de tarjeta----------------
//-------------------------------------------------
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    formulario.selectYear.append(opcion);
}

formulario.selectYear.addEventListener("change", (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});



//-------------------------------------------------
//-------------Boton Pagar-------------------------
//-------------------------------------------------
let btnPagar = document.getElementById("btn-pagar");
btnPagar.addEventListener("click", (e) => {
    e.preventDefault();
    if (formulario.inputNumero.value.length != 19) {
        Swal.fire(
            'Numero de tarjeta invalido.',
            'El numero de tarjeta ingresado no es valido.',
            'error'
        )
    } else if (formulario.inputNombre.value.length <= 0) {
        Swal.fire(
            'Nombre invalido.',
            'El nombre ingresado no es valido.',
            'error'
        )
    } else if (formulario.selectYear.value == "Año") {
        Swal.fire(
            'Fecha de expiracion invalida',
            'El Año ingresado no es valido.',
            'error'
        )
    } else if (formulario.selectMes.value == "Mes") {
        Swal.fire(
            'Fecha de expiracion invalida',
            'El Mes ingresado no es valido.',
            'error'
        )
    } else if (formulario.inputCCV.value == "" || formulario.inputCCV.value.length != 3) {
        Swal.fire(
            'CCV Invalido',
            'El codigo CCV es invalido.',
            'error'
        )
    } else {
        const Toast = Swal.mixin({
            toast: false,
            allowOutsideClick: false,
            position: 'center',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'info',
            title: 'Procesando Pago...',
        })

        setTimeout(() => {
            modalPagar.classList.remove("show");
            /* vaciarCarrito(); */
            Swal.fire({
                title: 'Pago Realizado con Exito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })
        }, 5000);

        setTimeout(() => {
            let currentTime = new Date();

            let day = currentTime.getDate(),
                month = currentTime.getMonth() + 1,
                year = currentTime.getFullYear(),
                hour = currentTime.getHours(),
                minute = currentTime.getMinutes(),
                fecha = day + "/" + month + "/" + year + " - " + hour + ":" + minute;

            let btnModal = document.getElementById("btn-factura"),
                facturaNombre = document.getElementById("facturaNombre"),
                facturaNumero = document.getElementById("facturaNumero"),
                fechaCompra = document.getElementById("fechaCompra");

            facturaNombre.innerText = `${formulario.inputNombre.value}`;
            facturaNumero.innerText = `${formulario.inputNumero.value.slice(15)}`;
            fechaCompra.innerHTML = `${fecha}`;

            let productosFactura = document.getElementById("productosFactura");
            let totalFactura = document.getElementById("totalFactura");
            carrito.forEach(producto => {
                let div = document.createElement("div");
                div.innerHTML = `<h5><b>x${producto.cantidad}</b> - ${producto.nombre}</h5>`;
                productosFactura.append(div);
            });
            totalCarrito();
            btnModal.click();
            sessionStorage.clear();

        }, 10000);
    }
});




