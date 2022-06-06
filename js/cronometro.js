const minutos = document.querySelector("#minutos");
const segundos = document.querySelector("#segundos");

let inicioMinutos = 3;
let inicioSegundos = 0;
minutos.innerHTML=`0${inicioMinutos}`;

function cargarTiempo(){
    inicioSegundos-=1;
    if(inicioSegundos<0){
        inicioSegundos=59;
        segundos.innerHTML=inicioSegundos;
    if(inicioSegundos==59){
        minutos.innerHTML=`0${inicioMinutos-=1}`;
    }
    }else if(inicioSegundos<10){
        segundos.innerHTML=`0${inicioSegundos}`;
    }else{
        segundos.innerHTML=inicioSegundos;
    }
    if(inicioMinutos === 0 && inicioSegundos === 0){
        clearInterval(inicionInterval);
        Swal.fire({
            icon: 'warning',
            title: 'El tiempo para realizar la compra ha finalizado!',
            color: 'antiquewhite',
            background: '#323232',
        })
        setTimeout(() => {
            document.location.href="../index.html";
        }, "1500")
    }
}
let inicionInterval = setInterval(cargarTiempo,1000);




