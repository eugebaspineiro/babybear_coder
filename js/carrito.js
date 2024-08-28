const contenedorCarrito = document.querySelector("#pag-carrito");

let total= 0;

let valordescuento= 0;

// Codigos de descuento

const descuentos = {
    "DESC10" : 0.10,
    "DESC20" : 0.20,
};

let carritoLS = JSON.parse(localStorage.getItem("carrito"));

carritoLS.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("productoFlex");
    div.innerHTML= `
            <div class="listaProdFlex">
            <img src= "${producto.imgcar}" class="productoTamano">                  
            <p class="subtituloTypo">${producto.titulo}</p>
            </div>                        
            <p class="subtituloTypo">${producto.cantidad}</p>
            <p class="subtituloTypo">$${producto.precio}</p>
            <p class="subtituloTypo">${producto.cantidad * producto.precio}</p>
    
    `;

    contenedorCarrito.append(div);

   total += producto.cantidad * producto.precio;
    
});

const contenedorSubtotal = document.querySelector("#sub-total");

const agregarSubtotal = () => {
    let div = document.createElement("div");
    div.classList.add("flexSubtotal", "descuentoTypo");
    div.innerHTML = `
        <p> Subtotal </p>
        <p>$ ${total} </p>
    `;
    
    contenedorSubtotal.append(div);
    console.log(total);
}

agregarSubtotal();

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

agregarTotalisimo(total);

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