const contenedorCarrito = document.querySelector("#pag-carrito");
const carritoVacio = document.querySelector("#carrito-vacio");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total= 0;

let valordescuento= 0;

// Codigos de descuento

const descuentos = {
    "DESC10" : 0.10,
    "DESC20" : 0.20,
};

// carrito

function actualizarCarrito() {
    if (carrito.length === 0){
        carritoVacio.classList.remove("emptyclass");
        contenedorCarrito.classList.add("emptyclass");
        vaciarCarrito.classList.remove("emptyclass");
        contenedorSubtotal.classList.add("emptyclass"); 
        contenedorTotal.classList.add("emptyclass");   
        contenedorDescuento.classList.add("emptyclass");    
    } else {
        carritoVacio.classList.add("emptyclass");
        contenedorCarrito.classList.remove("emptyclass");
        vaciarCarrito.classList.remove("emptyclass");

        contenedorCarrito.innerHTML = "";
        total = 0;

        contenedorCarrito.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("gridProd");
            div.innerHTML = `
                 <div class="prodNuevoFlex">
                <img src= "${producto.imgcar}" class="productoTamano">                  
                <p class="subtituloTypo">${producto.titulo}</p>
                </div>   
                                
                <p class="subtituloTypo">${producto.cantidad}</p>
                <p class="subtituloTypo">$${producto.precio}</p>
                <p class="subtituloTypo">${producto.cantidad * producto.precio}</p>

            `;

            let button = document.createElement("button");
            button.classList.add("btnEliminar");
            button.innerHTML = `
                <ion-icon name="trash-outline"></ion-icon>
            `;
            button.addEventListener("click", () => {
                eliminarDelCarrito(producto);
            })

            div.append(button);
            contenedorCarrito.append(div);

            total += producto.cantidad * producto.precio;
        });

        agregarSubtotal();
        agregarTotalisimo(total);
    }
}


function eliminarDelCarrito (producto) {
    const indice = carrito.findIndex((articulo) => articulo.id === producto.id);
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}



vaciarCarrito.addEventListener("click", () => {
    const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    Swal.fire({
        title: "¿Estas seguro de dejar sin productos el carrito?",
        text: "No podras revertir este proceso",
        icon: "warning",        
        showCancelButton: true,
        confirmButtonColor: "#4A8FA5",
        cancelButtonColor: "#B47F7D",
        confirmButtonText: "Si, borrar todo!",
        customClass: {
            popup: "sweetFormat",
            text: "sweetTypo"
        }
      }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
          Swal.fire({
            title: "Carrito Vacio!",
            text: "El carrito quedo vacio",
            icon: "success",
            customClass: {
                popup: 'sweetFormat',
                text: "sweetTypo"
              }
          });
        }
      });
})


// descuento total

const contenedorSubtotal = document.querySelector("#sub-total");

const agregarSubtotal = () => {

    if (carrito.length === 0){
        contenedorDescuento.classList.add("emptyclass");
    }
    
    contenedorSubtotal.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("flexSubtotal", "descuentoTypo");
    div.innerHTML = `
        <p> Subtotal </p>
        <p>$ ${total} </p>
    `;
    
    contenedorSubtotal.append(div);
}

// agregarSubtotal();

const contenedorTotal = document.querySelector("#totalisimo");

const agregarTotalisimo = (nuevototal) => {
    contenedorTotal.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("flexSubtotal", "totalTypo");
    div.innerHTML = `
        <p> Total </p>
        <p>$ ${nuevototal} </p>
    `;
    
    contenedorTotal.append(div);
    console.log(total);
}

// formulario descuento

const alertaForm = document.querySelector("#alerta-form");
const alertaImput = document.querySelector("#cod-descuento");
const alertaSubmit = document.querySelector("#alerta-submit");

alertaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigoIngresado = alertaImput.value.trim();
    let descuento = descuentos[codigoIngresado];

    if (descuento) {
        valordescuento = descuento;
        let nuevototal= total - (total * descuento);
        agregarTotalisimo(nuevototal);
        mostrardescuento();
    } else {
        Swal.fire({
            icon: "error",
            title: "Codigo Incorrecto",
            text: "El codigo de descuento ingresado no es correcto!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });

    }

});

const contenedorDescuento = document.querySelector("#codigo-desc");

const mostrardescuento = () => {
    contenedorDescuento.innerHTML="";
    let div = document.createElement("div");
    div.classList.add("flexSubtotal", "descuentoTypo");
    div.innerHTML = `
        <p> Descuento </p>
        <p> ${valordescuento * 100} %</p>
    `;
    
    contenedorDescuento.append(div);
};

actualizarCarrito();