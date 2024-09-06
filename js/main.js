
const contenedorProductosDestacados = document.querySelector("#productos");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botonCategoria = document.querySelectorAll(".btn-categoria");
const contenedorTituloPrincipal = document.querySelector("#titulo-principal");

let productosGenerales = [];


const pedirProductos = async function () {
    const resp = await fetch ("../data/productos.json");
    const data = await resp.json();  
    return data 
};

const cargarProductos = async function () {
    productosGenerales = await pedirProductos();
    obtenerProductos(productosGenerales);
    
};

function obtenerProductos (productos) {
    try{        
        const destacados = productos.slice(0, 9);
        contenedorProductosDestacados.innerHTML = " ";

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

// cargarProductos();
// obtenerProductos();

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

cargarProductos();

botonCategoria.forEach(boton => {


    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton => boton.classList.remove("seccion-on"))
        e.currentTarget.classList.add("seccion-on");
        
        const productosBoton = productosGenerales.filter(producto => producto.categoria === e.currentTarget.id);
        obtenerProductos(productosBoton);
    })
});










// const contenedorProductosDestacados = document.querySelector("#productos");
// const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// const botonCategoria = document.querySelectorAll(".btn-categoria");


// const pedirProductos = async function () {
//     const resp = await fetch ("../data/productos.json");
//     const data = await resp.json();  
//     return data 
// };

// const obtenerDestacados = async function () {
//     try{
//         const data = await pedirProductos();
//         const destacados = data.slice(0, 9);
        
//         destacados.forEach((producto) => {
//             let div = document.createElement("div");
//             div.innerHTML = `
//                 <img src="${producto.img}">
//                 <div class="nameFlex">
//                     <p class="titleCard">${producto.titulo}</p>
//                     <ion-icon name="heart-outline" class="heartIcon"></ion-icon>
//                 </div>
//                 <p class="priceTypo marginPrice">$ ${producto.precio}</p>
//             `;
    
//             let button = document.createElement("button");
//             button.classList.add("cardButton");
//             button.innerText = "Agregar al carrito";
//             button.addEventListener("click", () => {
//             agregarAlStorage(producto);
//             });
    
//             div.append(button);
//             contenedorProductosDestacados.append(div);
//         });
//     } catch (error){

//         let errorDiv = document.createElement("div");
             
//         errorDiv.innerHTML = `
//             <h3> Los productos se cargaran en un instante </h3>
//         `;

//         contenedorProductosDestacados.append(errorDiv);

//     }

// };

// obtenerDestacados();

// const agregarAlStorage = (producto) => {
//     let carritoConProductos = carrito.find((articulo) => articulo.id === producto.id);
//     if (carritoConProductos) {
//         carritoConProductos.cantidad++;
//     } else {
//         carrito.push({...producto, cantidad:1});
//     }

//     localStorage.setItem("carrito", JSON.stringify(carrito));
   

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
        
// };

// botonCategoria.forEach(boton => {
//     boton.addEventListener("click", (e) => {
//         botonCategoria.forEach(boton => boton.classList.remove("seccion-on"))
//         e.currentTarget.classList.add("seccion-on")
//     })
// })





