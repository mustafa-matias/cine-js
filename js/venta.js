const carritoLocal = JSON.parse(localStorage.getItem("AcumulacionCarrito"));
const sumatoriaPrecioLocal = JSON.parse(localStorage.getItem("sumatoriaPrecioFinal"));
const contadorCarritoLocal = JSON.parse(localStorage.getItem("contadorCarrito"));

const contadorCompra = document.querySelector("#contadorCompra");
contadorCompra.textContent= contadorCarritoLocal;

const totalCompra = document.querySelector("#totalCompra");
totalCompra.textContent= `$${sumatoriaPrecioLocal}`;

const listaCaritoCompra = document.querySelector("#listaCaritoCompra");
const listaTotal = document.querySelector("#listaTotal");

let total = sumatoriaPrecioLocal;

for (const producto of carritoLocal) {
    const itemCompra = document.createElement("li");
    itemCompra.classList.add("list-group-item","d-flex","justify-content-between","lh-sm");
    if(producto.genero!="TIENDA"){
        itemCompra.innerHTML= `<div>
        <h6 class="my-0 fontTotal">${producto.nombre} (${producto.peliculaFecha} | ${producto.horario})</h6>
        <small class="text-muted ">${producto.unidad} x ${producto.tipoDeProducto} ➡ ${producto.sala} 💺(${producto.peliculaButaca}) </small>
        </div>
        <span class="text-muted">$${producto.totalParcial}</span>`
    }else{
        itemCompra.innerHTML= `<div>
        <h6 class="my-0 fontTotal">${producto.nombre}</h6>
        <small class="text-muted ">${producto.unidad} Unidad/es.</small>
        </div>
        <span class="text-muted">$${producto.totalParcial}</span>`
    }
    listaCaritoCompra.insertBefore(itemCompra ,listaTotal);
}

const inputDescuento = document.querySelector("#inputDescuento");
const formDescuento = document.querySelector("#formDescuento");
const spanTotal = document.querySelector("#spanTotal");
const listaDescuento = document.createElement("li");
listaDescuento.classList.add("list-group-item","d-flex","justify-content-between","lh-sm");
const PrecioDescuento = document.createElement("li");
PrecioDescuento.classList.add("list-group-item","d-flex","justify-content-between","lh-sm","bg-descuento");

const tipoTarjeta = document.querySelector("#tipoTarjeta");
const credit = document.querySelector("#credit");
const debit = document.querySelector("#debit");
const tipoTarjetaRadio = document.querySelector("#tipoTarjetaRadio");
const pagos = document.querySelector("#pagos");

formDescuento.addEventListener("click",(evt)=>{
    evt.preventDefault();
    const codigoDescuento = inputDescuento.value.toUpperCase();
        if(codigoDescuento === "CODER" || codigoDescuento === "CODERHOUSE"){
        spanTotal.textContent = "Sub-Total";
        spanTotal.classList.remove("fontTotal");
        totalCompra.classList.remove("fontTotal");
        listaCaritoCompra.appendChild(listaDescuento);
        listaDescuento.innerHTML=`<span class="fontTotal text-success">Descuento 10%</span>
        <span class="fontTotal text-success">-$${sumatoriaPrecioLocal*0.1}</span>`
        listaCaritoCompra.appendChild(PrecioDescuento);
        PrecioDescuento.innerHTML=`<span class="fontTotal">TOTAL</span>
        <span class="fontTotal">$${sumatoriaPrecioLocal-(sumatoriaPrecioLocal*0.1)}</span>`
        formDescuento.disabled=true;
        total= sumatoriaPrecioLocal-(sumatoriaPrecioLocal*0.1);
        if(credit.checked){
            pagos.innerHTML=`<option value="0" disabled selected>Eliga cuotas...</option>
            <option value="1">1° pago de $${total.toFixed(2)}</option>
            <option value="2">2° pagos de $${((total*1.10)/2).toFixed(2)}</option>
            <option value="3">3° pagos de $${((total*1.15)/3).toFixed(2)}</option>
            `;
        }   
        if(debit.checked){
            pagos.innerHTML=`<option value="1">1° pago de $${total.toFixed(2)}</option>`
        }}else{
        formDescuento.classList.add("bg-danger");
        formDescuento.textContent="Invalido";
        setTimeout(() => {
            formDescuento.classList.remove("bg-danger");
            formDescuento.textContent="Aplicar";
            }, "500")        
    }
})

// FORMULARIO

// ----------------- DATOS DEL COMPRADOR ------------
const firstName = document.querySelector("#firstName");
firstName.addEventListener("keyup",(e)=>{
    const primerNombre = e.target.value;
    firstName.value = primerNombre.replace(/[0-9]/g,"").replace(/[^\w\s]/gi, '').trim();;
})

const firstNameValor = firstName.value;

const lastName = document.querySelector("#lastName");

lastName.addEventListener("keyup",(e)=>{
    const apellido = e.target.value;
    lastName.value = apellido.replace(/[0-9]/g,"").replace(/[^\w\s]/gi, '').trim();;
})

const lastNameVAlor = lastName.value;

const email = document.querySelector("#email");
const emailValor = email.value;


//------------------ DATOS DE LA TARJETA ----------------------

// seleccion de tarjeta + cantidad de pagos sengun si es tarjeta de credito o debito
credit.addEventListener("click",()=>{
    tipoTarjetaRadio.innerHTML=`<p class="fontTipoTarjeta">TARJETA DE CREDITO</p>`;
    pagos.innerHTML=`<option value="0" disabled selected>Eliga cuotas...</option>
    <option value="1">1° pago de $${total.toFixed(2)}</option>
    <option value="2">2° pagos de $${((total*1.10)/2).toFixed(2)}</option>
    <option value="3">3° pagos de $${((total*1.15)/3).toFixed(2)}</option>
    `
})

debit.addEventListener("click",()=>{
    tipoTarjetaRadio.innerHTML=`<p class="fontTipoTarjeta">TARJETA DE DEBITO</p>`;
    pagos.innerHTML=`<option value="1">1° pago de $${total.toFixed(2)}</option>`
})

// Entidad bancaria
const entidad = document.querySelector("#entidad");
const entidadCard= document.querySelector("#entidadCard");

entidad.addEventListener("change",()=>{
    const bancoElegido = entidad.options[entidad.selectedIndex].value;
    console.log(bancoElegido);
    if(bancoElegido==="1"){
        entidadCard.innerHTML=`<img src="../assets/images/visa.png" alt="visa logo" width="80" srcset="">`;
    }
    if(bancoElegido==="2"){
        entidadCard.innerHTML=`<img src="../assets/images/mastercard.png" alt="mastercard logo" width="100" srcset="">`;
    }
    if(bancoElegido==="3"){
        entidadCard.innerHTML=`<img src="../assets/images/american.jpg" alt="mastercard logo" width="80" srcset="">`;
    }
    if(bancoElegido==="4"){
        entidadCard.innerHTML=`OTRO BANCO`;
    }
})

// Nombre titular tarjeta
const titularTarjeta = document.querySelector("#titularTarjeta");
const nombreCard = document.querySelector("#nombreCard");

titularTarjeta.addEventListener("keyup",(e)=>{
    const nombreTarjeta = e.target.value;
    titularTarjeta.value = nombreTarjeta.replace(/[0-9]/g,"").replace(/[^\w\s]/gi, '').trim();
    nombreCard.innerHTML = titularTarjeta.value;
    if(nombreTarjeta==="" || titularTarjeta.value ===""){
        nombreCard.innerHTML = "NOMBRE DEL TITULAR";
    }
})

// Numero de tarjeta
const serieTarjeta = document.querySelector("#serieTarjeta");
const numeroCard0 = document.querySelector("#numeroCard0");
const numeroCard1 = document.querySelector("#numeroCard1");
const numeroCard2 = document.querySelector("#numeroCard2");
const numeroCard3 = document.querySelector("#numeroCard3");
const numeroCard4 = document.querySelector("#numeroCard4");
const numeroCard5 = document.querySelector("#numeroCard5");
const numeroCard6 = document.querySelector("#numeroCard6");
const numeroCard7 = document.querySelector("#numeroCard7");
const numeroCard8 = document.querySelector("#numeroCard8");
const numeroCard9 = document.querySelector("#numeroCard9");
const numeroCard10 = document.querySelector("#numeroCard10");
const numeroCard11 = document.querySelector("#numeroCard11");
const numeroCard12 = document.querySelector("#numeroCard12");
const numeroCard13 = document.querySelector("#numeroCard13");
const numeroCard14 = document.querySelector("#numeroCard14");
const numeroCard15 = document.querySelector("#numeroCard15");

serieTarjeta.addEventListener("keyup",(e)=>{
    const valorTarjeta = e.target.value;
    serieTarjeta.value = valorTarjeta.replace(/\s/g,"").replace(/\D/g,"").replace(/([0-9]{4})/g,"$1 ").trim();

    document.querySelector("#numeroCard0").innerHTML = serieTarjeta.value.charAt(0);
    document.querySelector("#numeroCard1").innerHTML = serieTarjeta.value.charAt(1);
    document.querySelector("#numeroCard2").innerHTML = serieTarjeta.value.charAt(2);
    document.querySelector("#numeroCard3").innerHTML = serieTarjeta.value.charAt(3);
    
    document.querySelector("#numeroCard4").innerHTML = serieTarjeta.value.charAt(5);
    document.querySelector("#numeroCard5").innerHTML = serieTarjeta.value.charAt(6);
    document.querySelector("#numeroCard6").innerHTML = serieTarjeta.value.charAt(7);
    document.querySelector("#numeroCard7").innerHTML = serieTarjeta.value.charAt(8);
    
    document.querySelector("#numeroCard8").innerHTML = serieTarjeta.value.charAt(10);
    document.querySelector("#numeroCard9").innerHTML = serieTarjeta.value.charAt(11);
    document.querySelector("#numeroCard10").innerHTML = serieTarjeta.value.charAt(12);
    document.querySelector("#numeroCard11").innerHTML = serieTarjeta.value.charAt(13);
    
    document.querySelector("#numeroCard12").innerHTML = serieTarjeta.value.charAt(15);
    document.querySelector("#numeroCard13").innerHTML = serieTarjeta.value.charAt(16);
    document.querySelector("#numeroCard14").innerHTML = serieTarjeta.value.charAt(17);
    document.querySelector("#numeroCard15").innerHTML = serieTarjeta.value.charAt(18);
    if(valorTarjeta===""){
        document.querySelector("#numeroCard0").innerHTML = 0;
        document.querySelector("#numeroCard1").innerHTML = 0;
        document.querySelector("#numeroCard2").innerHTML = 0;
        document.querySelector("#numeroCard3").innerHTML = 0;
        document.querySelector("#numeroCard4").innerHTML = 0;
        document.querySelector("#numeroCard5").innerHTML = 0;
        document.querySelector("#numeroCard6").innerHTML = 0;
        document.querySelector("#numeroCard7").innerHTML = 0;
        document.querySelector("#numeroCard8").innerHTML = 0;
        document.querySelector("#numeroCard9").innerHTML = 0;
        document.querySelector("#numeroCard10").innerHTML = 0;
        document.querySelector("#numeroCard11").innerHTML = 0;
        document.querySelector("#numeroCard12").innerHTML = 0;
        document.querySelector("#numeroCard13").innerHTML = 0;
        document.querySelector("#numeroCard14").innerHTML = 0;
        document.querySelector("#numeroCard15").innerHTML = 0;
    }
})

// Vencimiento
const mes = document.querySelector("#mes");
const vencimientoM1 = document.querySelector("#vencimientoM1");
const vencimientoM2 = document.querySelector("#vencimientoM2");

mes.addEventListener("change",()=>{
    const mesValor = mes.options[mes.selectedIndex].value;
    const mesVAlorA = mesValor.charAt(0);
    vencimientoM1.innerHTML= mesVAlorA;
    const mesVAlorB = mesValor.charAt(1);
    vencimientoM2.innerHTML= mesVAlorB;
})

const anio = document.querySelector("#anio");
const vencimientoA1 = document.querySelector("#vencimientoA1");
const vencimientoA2 = document.querySelector("#vencimientoA2");

anio.addEventListener("change",()=>{
    const anioValor = anio.options[anio.selectedIndex].value;
    const AnioValorA = anioValor.charAt(0);
    console.log(AnioValorA)
    vencimientoA1.innerHTML=AnioValorA;
    const AnioValorB = anioValor.charAt(1);
    console.log(AnioValorB)

    vencimientoA2.innerHTML=AnioValorB;
})

// codigo de seguridad
const cvv = document.querySelector("#cc-cvv");
const cvv1 = document.querySelector("#cvv1");
const cvv2 = document.querySelector("#cvv2");
const cvv3 = document.querySelector("#cvv3");

cvv.addEventListener("keyup",(e)=>{
    const cvvValor = e.target.value;
    cvv.value = cvvValor.replace(/\s/g,"").replace(/\D/g,"")

    const cvvA = cvv.value.charAt(0);
    const cvvB = cvv.value.charAt(1);
    const cvvC = cvv.value.charAt(2);
    cvv1.innerHTML= cvvA;
    cvv2.innerHTML= cvvB;
    cvv3.innerHTML= cvvC;
    if(cvvA ===""){
        cvv1.innerHTML="-";
    }
    if(cvvB ===""){
        cvv2.innerHTML="-";
    }
    if(cvvC ==="" ){
        cvv3.innerHTML="-";
    }
    if(cvv.value===""){
        cvv1.innerHTML="-";
    }
})

const formularioCompra = document.querySelector("#formularioCompra");
formularioCompra.addEventListener("submit",(e)=>{
    console.log(pagos.value)
    e.preventDefault();
    if(entidad.value<1){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Ingrese la Entidad Bancaria de su Tarjeta',
            showConfirmButton: false,
            background: '#323232',
            timer: 1500
        })
    }
    else if(cvv.value.length<3){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Código de Seguridad Incorrecto',
            showConfirmButton: false,
            background: '#323232',
            timer: 1500
        })
    }else if(serieTarjeta.value.length<19){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Número de Tarjeta Incorrecto',
            showConfirmButton: false,
            background: '#323232',
            timer: 1500
        })
    }else if(pagos.value<1){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Ingrese la Cantidad de Pagos',
            showConfirmButton: false,
            background: '#323232',
            timer: 1500
        })
    }else if(mes.value<1 || anio.value<1){
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Fecha de Vencimiento Incorrecta',
            showConfirmButton: false,
            background: '#323232',
            timer: 1500
        })
    }else{
    Swal.fire({
        title: '¿Está seguro/a que quiere realizar la compra?',
        icon: 'warning',
        color: 'antiquewhite',
        background: '#323232',
        showCancelButton: true,
        confirmButtonColor: '#0a6e19',
        cancelButtonColor: '#a30808',
        cancelButtonText: 'Volver',
        confirmButtonText: 'Comprar'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
            firstName.value, 
            `Muchas gracias por tu compra!. Recibirás tus tickets y factura de compra a: <strong>${email.value}</strong>. `,
            )
            formularioCompra.reset();
            localStorage.removeItem("AcumulacionCarrito");
            localStorage.removeItem("contadorCarrito");
            setTimeout(()=>{
                document.location.href="../index.html";
            },2000)
        }
    })
}
})