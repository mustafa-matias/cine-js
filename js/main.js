let carrito=[];
let sumatoriaTotal = 0;
// cargando funciones al iniciar el sitio
document.addEventListener('DOMContentLoaded', () => { mostrarProductos(productos)});
document.addEventListener('DOMContentLoaded', () => { mostrarLocal()});
document.addEventListener('DOMContentLoaded', () => { actualizarCarrito()});

//estructura boton carrito
const contadorCarrito = document.querySelector("#contadorCarrito");
const listasCarrito = document.querySelector("#listasCarrito");
const listaCarrito = document.createElement("li");
const divBotonesCarrito = document.querySelector("#divBotonesCarrito");
const divPrecioTotal = document.querySelector("#divPrecioTotal");
listasCarrito.insertBefore(listaCarrito, divPrecioTotal);
const anuncioCarrito = document.createElement("p");

// estructura publicidad 
const contenedorPublicidad = document.querySelector("#contenedorPublicidad");
const publicidadEstrenos = document.querySelector("#publicidadEstrenos");

// datos desde fetch para la publicidad
const obtenerJson = async () => {
    try{
        const resultado = await fetch("./data.json")
        const estrenos = await resultado.json()
        console.log(estrenos)
        for(pelicula of estrenos){
            publicidadEstrenos.innerHTML+=`<div class="card mb-5 animate__animated animate__fadeInLeftBig" style="width: 15%">
            <img src="${pelicula.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-light">${pelicula.nombre}</h5>
            <p class="card-text text-secondary">${pelicula.descripcion}</p>
            </div>
        </div>`
        }
        
    }catch(error){
        console.log(error)
    }
}

//Aparece publicidad
setTimeout(() => {
    obtenerJson()
    contenedorPublicidad.classList.remove("displayNone");
}, "10000")   
const cancelPublicidad=document.querySelector("#cancelPublicidad");
cancelPublicidad.addEventListener("click",(e)=>{
    e.preventDefault();
    contenedorPublicidad.classList.add("displayNone");
})

//funciones carrito: Actualizar, eliminar, vaciar
function actualizarCarrito(){
    divPrecioTotal.innerHTML= `Precio Total: $0`;
    sumatoriaTotal =0;
    listaCarrito.innerHTML="";
        if(carrito.length>0){
        for (item of carrito){
            listaCarrito.innerHTML+=
            `<div class="d-flex justify-content-around align-items-center marginCarritoLleno"> 
            <div class="d-flex flex-column">
            <span class="fontCarritoLleno text-center ">${item.unidad}</span>
            <span class="fontCarritoLleno text-center">(${item.tipoDeProducto})</span>
            </div>
            <img src="${item.imagen}" width="80" height="80" class="d-inline "></img>
            <p class="fontCarritoLleno d-inlne text-center">$${item.totalParcial}</p>
            <button onclick="eliminarDelCarrito(${item.id})"  class="imgBasura"><img src="./assets/images/trash.png" class="" ></img></button>
            </div>`
            sumatoriaTotal += item.totalParcial;
            divPrecioTotal.innerHTML= `Precio Total: $${sumatoriaTotal}`;
        }
    }if(carrito.length===0){
        anuncioCarrito.classList.add("pBeige", "fontCarritoVacio");
        listasCarrito.insertBefore(anuncioCarrito, divPrecioTotal);
        anuncioCarrito.textContent="No hay productos en el Carrito.";
    }
    localStorage.setItem("sumatoriaPrecioFinal", JSON.stringify(sumatoriaTotal));
    localStorage.setItem("AcumulacionCarrito", JSON.stringify(carrito));
}

const eliminarDelCarrito = (productoId)=>{
    const item = carrito.find((producto)=>producto.id===productoId);
    const indice= carrito.indexOf(item);
    item.totalParcial = 0;
    item.unidad = 1;
    carrito.splice(indice,1);
    
    localStorage.setItem("AcumulacionCarrito", JSON.stringify(carrito));
    localStorage.setItem("contadorCarrito", carrito.length);
    actualizarCarrito();
    contadorCarrito.innerHTML = carrito.length;
}

function vaciarCarrito() {
    for (item of carrito){
        item.totalParcial = 0;
        item.unidad = 1;
    }
    carrito.splice(0,carrito.length);
    contadorCarrito.textContent = carrito.length;
    localStorage.setItem("AcumulacionCarrito", JSON.stringify(carrito));
    localStorage.setItem("contadorCarrito", carrito.length);
    actualizarCarrito();
}
const botonVaciar=document.querySelector("#botonVaciar");
botonVaciar.addEventListener("click",vaciarCarrito);

function mostrarLocal(){
    let localSala= JSON.parse(localStorage.getItem("compraSala"));
    const localCarrito = JSON.parse(localStorage.getItem("AcumulacionCarrito"));
    if(localSala!=undefined){
        const existe = localCarrito.some(producto =>producto.id==localSala[0].id);
        if(existe){
        const producto = localCarrito.map(producto =>{
            if(producto.id==localSala[0].id ){
                producto.unidad=parseInt(producto.unidad) + parseInt(localSala[0].unidad);
                producto.totalParcial=parseInt(producto.totalParcial) + parseInt(localSala[0].totalParcial);
                producto.peliculaButaca= producto.peliculaButaca+","+localSala[0].peliculaButaca;
            }})
            }else{
            carrito.push(localSala[0]);
            }
        }
    for(const item of localCarrito){
            carrito.push(item);
        }   
    localSala = localStorage.removeItem("compraSala");
    contadorCarrito.textContent= carrito.length;
    localStorage.setItem("contadorCarrito",carrito.length)
    actualizarCarrito();
}

//Generar tarjeta para cada pelicula y productos de tienda
function generarCard(arrayProducto) {
    arrayProducto.forEach(item=>{
        const divProducto = document.createElement("div");
        divProducto.classList.add("card","card:hover");
        const imagenProducto = document.createElement("img");
        imagenProducto.src= item.imagen;
        imagenProducto.classList.add("imgProducto");
        imagenProducto.addEventListener("click",()=>{
            Swal.fire({
                text: item.descripcion,
                imageWidth: 250,
                imageHeight: 350,
                imageAlt: `img ${item.nombre}`,
                color: 'antiquewhite',
                background: '#323232',
                imageUrl: item.imagen,
            })
        })
        const nombreProducto = document.createElement("h4");
        nombreProducto.textContent = item.nombre;

        const generoPelicula = document.createElement("h5");
        generoPelicula.textContent = ("Tipo: "+item.genero);

        const salaPelicula = document.createElement("h5");
        salaPelicula.textContent = (item.sala+" Precio: $"+item.precioProducto);
        
        const formulario = document.createElement("form");
        formulario.classList.add("form");

        const AgregarCarrito = document.createElement("button");
        AgregarCarrito.value= (item.id-1);
        AgregarCarrito.id= item.id;
        AgregarCarrito.classList.add("botonAgregar");
        AgregarCarrito.type= "submit";
        divProducto.appendChild(imagenProducto);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(generoPelicula);
        divProducto.appendChild(salaPelicula);
        const horarioPelicula = document.createElement("h5");
        divProducto.appendChild(horarioPelicula);
        divProducto.appendChild(formulario);
        if(item.genero!="TIENDA"){
            horarioPelicula.textContent = (item.horario);
            AgregarCarrito.textContent="Seleccionar butacas y fecha💺";
            AgregarCarrito.addEventListener("click",(evt)=>{
                evt.preventDefault();
                const PeliculaElegidaSala = parseInt(evt.target.id);
                console.log(PeliculaElegidaSala);
                const peliculaEnsala = arrayProducto.filter((item)=>item.id===PeliculaElegidaSala);
                localStorage.setItem("sala",JSON.stringify(peliculaEnsala))
                document.location.href= "./pages/sala.html";
        })
        }else{
            const selectCantidad= document.createElement("input");
            selectCantidad.type="number";
            selectCantidad.min="1";
            selectCantidad.placeholder="Seleccione cantidad"
            selectCantidad.classList.add("botonSeleccionar","fontSeleccionar");
            formulario.appendChild(selectCantidad);
            AgregarCarrito.textContent="Agregar al Carrito 🛒";

            AgregarCarrito.onclick=(evt)=>{
                evt.preventDefault();
                if((selectCantidad.value!="")&&(selectCantidad.value>0)){
                const cantidad = selectCantidad.value;
                productos[AgregarCarrito.value].totalParcial += (cantidad*productos[AgregarCarrito.value].precioProducto);
                Swal.fire({
                    title: (productos[AgregarCarrito.value].nombre+" ✔"),
                    text: ("Agregaste "+cantidad+" "+productos[AgregarCarrito.value].tipoDeProducto+". Precio parcial: $"+(cantidad*productos[AgregarCarrito.value].precioProducto)+"👏"),
                    imageUrl: productos[AgregarCarrito.value].imagen,
                    imageWidth: 300,
                    imageHeight: 400,
                    imageAlt: productos[AgregarCarrito.value].tipoDeProducto,
                    color: 'antiquewhite',
                    background: '#323232',
                })
                for(let i=0;i<cantidad;i+=1){
                AgregarCarrito.addEventListener("click", sumarAlCarrito(item.id));
        
                contadorCarrito.textContent = carrito.length;
                localStorage.setItem("AcumulacionCarrito", JSON.stringify(carrito));
                localStorage.setItem("contadorCarrito", carrito.length);
                actualizarCarrito();
                anuncioCarrito.innerHTML="";
            }
                formulario.reset()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Atención!',
                    text: 'Complete cantidad requerida!',
                    color: 'antiquewhite',
                    background: '#323232',
                })
                formulario.reset()
            }
            }
            const sumarAlCarrito= (productoId)=>{
                const existe = carrito.some(producto =>producto.id===productoId);
                if(existe){
                    const producto = carrito.map(producto =>{
                        if(producto.id===productoId ){
                            producto.unidad+=1;
                        }
                    })
                }else{
                    const id = productos.find((producto)=>producto.id===productoId);
                    carrito.push(id);
                }
            }
        }
        contenedorProductos.append(divProducto);
        formulario.appendChild(AgregarCarrito);
    })
}

//Mostrar las distintas Card de cada producto
function mostrarProductos(arrayProducto){
    contenedorProductos.innerHTML="";
    generarCard(arrayProducto);
}

//FILTROS
//Filtrar peliculas por genero: TODAS.
const todas = document.querySelector("#todas");
const todasPeliculas = productos.filter(producto=>producto.genero==="ACCION"|| producto.genero==="DRAMA"||producto.genero==="COMEDIA");
todas.textContent=`▪ Todas (${todasPeliculas.length})`;
todas.addEventListener('click', () => { mostrarProductos(todasPeliculas);})

//Filtrar peliculas por genero: ACCION
const accion = productos.filter(producto=>producto.genero==="ACCION");
PeliculasAccion = document.querySelector("#accion");
PeliculasAccion.textContent=`▪ Acción (${accion.length})`;
PeliculasAccion.addEventListener('click', () => { mostrarProductos(accion)});

//Filtrar peliculas por genero: COMEDIA
const comedia = productos.filter(producto=>producto.genero==="COMEDIA");
PeliculasComedia = document.querySelector("#comedia");
PeliculasComedia.textContent= `▪ Comedia (${comedia.length})`;
PeliculasComedia.addEventListener('click', () => { mostrarProductos(comedia)});

//Filtrar peliculas por genero: DRAMA
const drama = productos.filter(producto=>producto.genero==="DRAMA");
PeliculasDrama = document.querySelector("#drama");
PeliculasDrama.textContent= `▪ Drama (${drama.length})`;
PeliculasDrama.addEventListener('click', () => { mostrarProductos(drama)});

//Filtrar peliculas por 2d
const dosD = productos.filter(producto=>producto.tipoDeProducto==="2D");
pelicula2D = document.querySelector("#dosD");
pelicula2D.textContent= `▪ 2D (${dosD.length})`;
pelicula2D.addEventListener('click', () => { mostrarProductos(dosD)});

//Filtrar peliculas por 3d
const tresD = productos.filter(producto=>producto.tipoDeProducto===funciones[1].nombre);
pelicula3D = document.querySelector("#tresD");
pelicula3D.textContent= `▪ 3D (${tresD.length})`;
pelicula3D.addEventListener('click', () => { mostrarProductos(tresD)});

//Filtrar peliculas por 4d
const cuatroD = productos.filter(producto=>producto.tipoDeProducto===funciones[2].nombre);
pelicula4D = document.querySelector("#cuatroD");
pelicula4D.textContent= `▪ 4D (${cuatroD.length})`;
pelicula4D.addEventListener('click', () => { mostrarProductos(cuatroD)});

// filtrar los combos
const combosLink=document.querySelector("#combosLink"); 
const combos = productos.filter(producto=>producto.genero==="TIENDA");
combosLink.textContent= `▪ Combos (${combos.length})`;
combosLink.addEventListener("click",(e)=>{
    e.preventDefault();
    mostrarProductos(combos)}
);

//BUSCADOR DE PELICULAS
const buscador = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");
const resultadoFinal = document.querySelector("#resultado");

botonBuscar.addEventListener("click",(evt)=>{
    evt.preventDefault();
    const valor = buscador.value;
    const porNombre = productos.filter(producto=>producto.nombre.includes(valor.toUpperCase()));
    if (porNombre.length>0){
        mostrarProductos(porNombre);
        }else{
            Swal.fire({
                imageUrl: `https://cdn-icons.flaticon.com/png/512/4160/premium/4160691.png?token=exp=1653082414~hmac=32afd2b6aded180b54326a03d44f5acb`,
                title: 'No se encontró ninguna coincidencia!',
                color: 'antiquewhite',
                background: '#323232',
            })
        }
})

const buscar = () =>{
    resultadoFinal.innerHTML = "";
    resultadoBusqueda = buscador.value.toUpperCase();
    for(producto of productos){
        let nombre = producto.nombre;
        if(nombre.indexOf(resultadoBusqueda) !== -1){
            resultadoFinal.innerHTML+=`<li>${producto.nombre}</li>`
    }
}
    if(resultadoFinal.innerHTML === ""){
        resultadoFinal.innerHTML+=`<li>No se encontró coincidencia...</li>`;
    }
}
buscador.addEventListener("keyup",buscar);

// ir a comprar
const BotonComprar = document.querySelector("#comprar");
function irComprar() {
    if(carrito.length>0){
        document.location.href= "./pages/venta.html";
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Su carrito se encuentrá vacio!',
            color: 'antiquewhite',
            background: '#323232',
        })
    }
}
BotonComprar.addEventListener("click",irComprar);

//Link combos y peliculas
const irTienda = document.querySelectorAll(".irTienda");

for(let item of irTienda){
    item.addEventListener("click",()=>{
        mostrarProductos(combos);
    })
}

const irCartelera = document.querySelectorAll(".irCartelera"); 
for(let item of irCartelera){
    item.addEventListener("click",()=>{
        mostrarProductos(todasPeliculas);
    })
}
