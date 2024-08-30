
const contenedorProductosDestacados = document.querySelector("#productos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const pedirProductos = async function () {
    const resp = await fetch ("../data/productos.json");
    const data = await resp.json();  
    return data 
};

const obtenerDestacados = async function () {
    try{
        const data = await pedirProductos();
        const destacados = data.slice(0, 9);
        
        destacados.forEach((producto) => {
            let div = document.createElement("div");
            div.innerHTML = `
                <img src="${producto.img}">
                <div class="nameFlex">
                    <p class="titleCard">${producto.titulo}</p>
                    <ion-icon name="heart-outline" class="heartIcon"></ion-icon>
                </div>
                <p class="priceTypo marginPrice">$ ${producto.precio}</p>
            `;
    
            let button = document.createElement("button");
            button.classList.add("cardButton");
            button.innerText = "Agregar al carrito";
            button.addEventListener("click", () => {
            agregarAlStorage(producto);
            });
    
            div.append(button);
            contenedorProductosDestacados.append(div);
        });
    } catch (error){

        let errorDiv = document.createElement("div");
             
        errorDiv.innerHTML = `
            <h3> Los productos se cargaran en un instante </h3>
        `;

        contenedorProductosDestacados.append(errorDiv);

    }

};

obtenerDestacados();

const agregarAlStorage = (producto) => {
    let carritoConProductos = carrito.find((articulo) => articulo.id === producto.id);
    if (carritoConProductos) {
        carritoConProductos.cantidad++;
    } else {
        carrito.push({...producto, cantidad:1});
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
   

    Toastify({
        text: "Agregaste " + producto.titulo + " al carrito",
        avatar: producto.img,
        duration: 2500,
        close: true,
        className: "toastFormato",
        className: "toastTypo",
        style: {
          background: "#B47F7D",
          color: "#ffff"
        },
      }).showToast();
        
};





// const agregarAlCarrito = (producto) => {
//     let carritoConProductos = carrito.find((articulo) => articulo.id === producto.id);

//     if (carritoConProductos) {
//         carritoConProductos.cantidad++;
//     } else {
//         carrito.push({...producto, cantidad:1});
//     }

//     actualizarCarrito();

//     Toastify({
//         text: "Agregaste " + producto.titulo + " al carrito",
//         avatar: producto.img,
//         duration: 2500,
//         close: true,
//         className: "toastFormato",
//         className: "toastTypo",
//         style: {
//           background: "#B47F7D",
//           color: "#ffff"
//         },
//       }).showToast();
    
// }



// const productosDestacados = [
//     {
//         id: "chaleco-otto",
//         titulo: "Chaleco Otto",
//         precio: 3000,
//         img: "./assets/chaleco_otto.jpg",
//         imgcar: "../assets/chaleco_otto.jpg",
//     },
//     {
//         id: "camisa-cuadros",
//         titulo: "Camisa Cuadros",
//         precio: 5000,
//         img: "./assets/camisa_cuadros.jpg",
//         imgcar: "../assets/camisa_cuadros.jpg",
//     },
//     {
//         id: "remera-tsuki",
//         titulo: "Remera Tsuki",
//         precio: 3500,
//         img: "./assets/remera_tsuki.jpg",
//         imgcar: "../assets/remera_tsuki.jpg",
//     },
//     {
//         id: "vestido-lilo",
//         titulo: "Vestido Lilo",
//         precio: 12000,
//         img: "./assets/vestido_lilo.jpg", 
//         imgcar: "../assets/vestido_lilo.jpg",    
//     },
//     {
//         id: "camisa-yoga",
//         titulo: "Camisa Yoga",
//         precio: 8000,
//         img: "./assets/camisa_yoga.jpg",
//         imgcar: "../assets/camisa_yoga.jpg",   
//     },
//     {
//         id: "capri-geminis",
//         titulo: "Capri Geminis",
//         precio: 12000,
//         img: "./assets/capri_geminis.jpg", 
//         imgcar: "../assets/capri_geminis.jpg",   
//     }

// ];

// const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// const contenedorProductosDestacados = document.querySelector("#productos");
// const carritoVacio = document.querySelector("#carrito-vacio");
// const carritoProductos = document.querySelector("#carrito-productos");
// const carritoTotal = document.querySelector("#carrito-total");
// const vaciarCarrito = document.querySelector("#vaciar-carrito");
// const irAlCarrito = document.querySelector("#ir-al-carrito");


// productosDestacados.forEach((producto) => {

//     let div = document.createElement("div");
 
//     div.innerHTML = `
//         <img src="${producto.img}">
//         <div class="nameFlex">
//         <p class="titleCard">${producto.titulo}</p>
//         <ion-icon name="heart-outline" class="heartIcon"></ion-icon>
//         </div>
//         <p class="priceTypo marginPrice">$ ${producto.precio}</p>    
    
//     `;

//     let button = document.createElement("button");
//     button.classList.add("cardButton");
//     button.innerText = "Agregar al carrito";
//     button.addEventListener("click", () => {
//         agregarAlCarrito(producto);
//     })

//     div.append(button);
//     contenedorProductosDestacados.append(div);
// });

// const agregarAlCarrito = (producto) => {
//     let carritoConProductos = carrito.find((articulo) => articulo.id === producto.id);

//     if (carritoConProductos) {
//         carritoConProductos.cantidad++;
//     } else {
//         carrito.push({...producto, cantidad:1});
//     }

//     actualizarCarrito();

//     Toastify({
//         text: "Agregaste " + producto.titulo + " al carrito",
//         avatar: producto.img,
//         duration: 2500,
//         close: true,
//         className: "toastFormato",
//         className: "toastTypo",
//         style: {
//           background: "#B47F7D",
//           color: "#ffff"
//         },
//       }).showToast();
    
// }

// function actualizarCarrito() {
//     if (carrito.length === 0) {
//         carritoVacio.classList.remove("emptyclass");
//         carritoProductos.classList.add("emptyclass");
//         vaciarCarrito.classList.add("emptyclass");
//     } else {
//         carritoVacio.classList.add("emptyclass");
//         carritoProductos.classList.remove("emptyclass");
//         vaciarCarrito.classList.remove("emptyclass");

//         carritoProductos.innerHTML = "";
//         carrito.forEach((producto) => {
//             let div = document.createElement("div");
//             div.classList.add("productosFormato", "subtituloTypo");
//             div.innerHTML = `
//                 <p>${producto.titulo}</p>
//                 <p>${producto.cantidad}</p>
//                 <p>$${producto.precio}</p>
//                 <p>$${producto.cantidad * producto.precio}</p>
            
//             `;
//             let button = document.createElement("button");
//             button.classList.add("btnEliminar");
//             button.innerHTML = `
//                 <ion-icon name="trash-outline"></ion-icon>
//             `;
//             button.addEventListener("click", () => {
//                 eliminarDelCarrito(producto);
//             })

//             div.append(button);
//             carritoProductos.append(div);
//         })
//     }
//     actualizarTotal();

//     localStorage.setItem("carrito", JSON.stringify(carrito));
// }

// actualizarCarrito();

// function eliminarDelCarrito(producto) {
//     const indice = carrito.findIndex((articulo) => articulo.id === producto.id);
//     carrito.splice(indice, 1);
//     actualizarCarrito();
// }

// function actualizarTotal() {
//     let sumaTotal = carrito.reduce((acc, product) => acc + (product.precio * product.cantidad), 0 );
//     carritoTotal.innerText = "$" + sumaTotal;
// }

// vaciarCarrito.addEventListener("click", () => {
//     const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
//     Swal.fire({
//         title: "¿Estas seguro de dejar sin productos el carrito?",
//         text: "No podras revertir este proceso",
//         icon: "warning",        
//         showCancelButton: true,
//         confirmButtonColor: "#4A8FA5",
//         cancelButtonColor: "#B47F7D",
//         confirmButtonText: "Si, borrar todo!",
//         customClass: {
//             popup: "sweetFormat",
//             text: "sweetTypo"
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//             carrito.length = 0;
//             actualizarCarrito();
//           Swal.fire({
//             title: "Carrito Vacio!",
//             text: "El carrito quedo vacio",
//             icon: "success",
//             customClass: {
//                 popup: 'sweetFormat',
//                 text: "sweetTypo"
//               }
//           });
//         }
//       });
// })