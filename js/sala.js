//traer datos de localStorage
const mostrarlocal = JSON.parse(localStorage.getItem("sala"));
const fechaCargada = localStorage.getItem("fechaDeFuncion");
const entradasCargadas = JSON.parse(localStorage.getItem("butacasSeleccionadas"));
const peliculasEnCarrito = JSON.parse(localStorage.getItem("AcumulacionCarrito"));
let contadorCarrito = JSON.parse(localStorage.getItem("contadorCarrito"));

const peliculaEnSala = mostrarlocal[0];
const carritoSala = [];

const butacas = document.querySelectorAll(".btnButacas");
const fecha = document.querySelector("#fecha");

//Traer la fecha que desea el usuario
if(fechaCargada){
    fecha.value = fechaCargada;
}

const entradas = document.querySelector("#entradas");
let butacasDisponibles = butacas.length;

//Cantidad de entradas disponibles que tiene la sala
for (let i=0; i <= butacasDisponibles;i+=1){
    if(i<=1){
        entradas.innerHTML+=`<option id="${i}" value="${i}">${i} Entrada</option>`;
    }else{
        entradas.innerHTML+=`<option id="${i}" value="${i}">${i} Entradas</option>`;
    }
}

// 2d, 3d,4d elegida en ixdex
const tipoSala = document.querySelector("#nombreSala");
tipoSala.innerHTML= `<h4>${peliculaEnSala.tipoDeProducto}</h4>`

let cantidadSeleccionar = 0; 

//guardar cantidad de entradas elegida
entradas.addEventListener("change",(e)=>{
    const cantidadEntradas = e.target.value;
    cantidadSeleccionar = cantidadEntradas;
})

//Pelicula y descripcion elegida en ixdex
const contenedorSala = document.querySelector("#contenedorSala");
contenedorSala.innerHTML=`<div class="estructuraPeliculaSala"><img src=".${peliculaEnSala.imagen}" class="imgSala"><img><h5 class="text-center">${peliculaEnSala.descripcion}</h5></div>`;

const salaEstructura = document.querySelector("#salaEstructura");
const pButacas = document.querySelector("#pButacas");

const butacasOcupadas = [];

//seleccion butacas (cambiar color butaca)
function seleccionButacas(e,nombreBtn) {
    e.preventDefault();
    pButacas.innerHTML="";
    console.log(nombreBtn)
    nombreBtn.active=true;
    if(butacasOcupadas.length < cantidadSeleccionar){
        if(nombreBtn.active){
            nombreBtn.innerHTML=`<img src="https://cdn-icons-png.flaticon.com/512/7451/7451757.png" width="60"alt="" srcset=""></img>`
            butacasOcupadas.push(nombreBtn);
            nombreBtn.classList.remove("butacasSala");
            nombreBtn.disabled=true;
            pButacas.innerHTML=`<span class="fw-bold">Butacas Seleccionadas: </span>`
            for(bucata of butacasOcupadas){
                const valor = bucata.value;
                let asiento = document.createElement("span");
                asiento.innerHTML+=`💺 ${valor} `;
                pButacas.appendChild(asiento);
            }
            salaEstructura.classList.remove("margin50Auto");
            salaEstructura.classList.add("margin50Auto0Auto");
        }
    }
        if(butacasOcupadas.length == cantidadSeleccionar && cantidadSeleccionar >0){
            Swal.fire({
                icon: 'success',
                title: "Elegiste de forma correcta tus butacas",
                color: 'antiquewhite',
                background: '#323232',
            })
            butacas.innerHTML+=`<img src="https://cdn-icons-png.flaticon.com/512/7451/7451864.png" width="50"alt="" srcset="">`;
        }
        if(cantidadSeleccionar === 0){
            Swal.fire({
                icon: 'error',
                title: "Seleccione la cantidad de entradas que desea!",
                color: 'antiquewhite',
                background: '#323232',
            })
        }
    }

// limpiar seleccion de butacas
const formSala =document.querySelector("#formSala");
const btnLimpiarButacas = document.querySelector("#btnLimpiarButacas");
btnLimpiarButacas.addEventListener("click",(e)=>{
    e.preventDefault();
    pButacas.innerHTML="";
    for(item of butacasOcupadas){
        item.innerHTML=`<img src="https://cdn-icons-png.flaticon.com/512/7451/7451741.png" width="60"alt="" srcset=""></img>`;
        item.removeAttribute("disabled");
    }
    butacasOcupadas.splice(0,butacasOcupadas.length);
    salaEstructura.classList.add("margin50Auto");
    salaEstructura.classList.remove("margin50Auto0Auto");
})

for (const butaca of butacas){
    butaca.addEventListener("click",(e)=>{seleccionButacas(e,butaca)});
}

//volver a index 
const btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click",(e)=>{
    e.preventDefault();
    document.location.href= "../index.html";
})

// contunuar, verificacion de seleccion fecha cantidad y butacas
const btnContinuarSala = document.querySelector("#btnContinuarSala");
btnContinuarSala.addEventListener("click",(e)=>{
    e.preventDefault();
    const butacasSeleccionadas = [];
    for(item of butacasOcupadas){
        butacasSeleccionadas.push(item.value);
    }
    if(fecha.value===""){
        Swal.fire({
            icon: 'error',
            title: "Seleccione el día de su función!",
            color: 'antiquewhite',
            background: '#323232',
        })
    }
    if(entradas.value==="0"){
        Swal.fire({
            icon: 'error',
            title: "Seleccione la cantidad de entradas que desea!",
            color: 'antiquewhite',
            background: '#323232',
        })
    }
    if(butacasSeleccionadas.length!=entradas.value){
        Swal.fire({
            icon: 'error',
            title: "Eliga sus asientos!",
            color: 'antiquewhite',
            background: '#323232',
        })
    }
    if(butacasSeleccionadas.length==entradas.value && entradas.value>0 && fecha.value!=""){
        Swal.fire({
            title: (entradas.value+" entrada/s "+peliculaEnSala.tipoDeProducto+" ✔"),
            text: (`💲${entradas.value*peliculaEnSala.precioProducto} - 📅 ${fecha.value} - 💺 ${butacasSeleccionadas}`),
            imageUrl: '.'+peliculaEnSala.imagen,
            imageWidth: 300,
            imageHeight: 400,
            imageAlt: peliculaEnSala.tipoDeProducto,
            color: 'antiquewhite',
            background: '#323232',
            showCancelButton: true,
            confirmButtonColor: '#0a6e19',
            cancelButtonColor: '#a30808',
            cancelButtonText: 'Volver',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Agregado a tu Carrito. No te olvidés pasar por la Tienda 🍿',
                    showConfirmButton: false,
                    showConfirmColor: '#0a6e19',
                    color: 'antiquewhite',
                    background: '#323232',
                    timer: 2000
                })
                peliculaEnSala.totalParcial = ((entradas.value)*(peliculaEnSala.precioProducto));
                peliculaEnSala.unidad = entradas.value;
                peliculaEnSala["peliculaFecha"]= fecha.value;
                peliculaEnSala["peliculaButaca"]= butacasSeleccionadas;
                contadorCarrito++;
                localStorage.setItem("contadorCarrito",JSON.stringify(contadorCarrito));
                
                carritoSala.push(peliculaEnSala);
                localStorage.setItem("compraSala",JSON.stringify(carritoSala));

                setTimeout(() => {
                    document.location.href="../index.html";
                }, "1500")
            }   
        })
    }
})

