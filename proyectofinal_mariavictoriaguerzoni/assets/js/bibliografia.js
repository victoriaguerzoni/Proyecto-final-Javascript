/*LOS PRODUCTOS A VENDER SE ENCUENTRAN EN EL ARCHIVO TEMARIO.JSON esta pagina tiene la logica de el carritos de compras del temariojson y el boton de busqueda de temas dentro del nav*/
/* el temariojson es un array vacio que recibe lo de fetch y la variable dolarcompra me brinda los temas con precio dolar*/
let temarioJSON=[];
let dolarCompra;
let totalCarrito;
/*inicializacion para la toma mediante dom de los id de html*/
let sectionCards = document.getElementById("biblioCards");
let finalizarCompra = document.getElementById("compraFin");
/*se inicializa el carrito por un lado con el localstorage para que si hay un carrito y por otro un array vacio que va a ir alojando los temas seleccionados */
let carrito=JSON.parse(localStorage.getItem("misTemas"))||[];
/*mediante la sugarsintax (operador avanzado and) retorna algo verdadero en este caso la funcion tomarcarrito */
(carrito.length != 0)&&tomarTabla();
/*necesito de esta asincronia para poder actualizar precios segun dolar del dia en las cartas de los productos*/
obtenerDolar();
/* libreria LUXON para determinar la fecha de forma actualizada que requiere la api en el momento que se ingresa a la web*/
const DateTime = luxon.DateTime;
const ahora = DateTime.now();
/*la funcion tomarcarrito es un primer rederizado que toma si hay un carrito abandonado*/
function tomarTabla(){
    for(const bibliografia of carrito){
        document.getElementById("tabladeCompras").innerHTML += `
        <tr>
            <td>${bibliografia.id}</td>
            <td>${bibliografia.titulo}</td>
            <td>${bibliografia.precio}</td>
            <td><button class="btn btn-light" onclick="eliminar(event)">🗑️</button></td>
        </tr>
    `;
    }/*variable inicializada al principio de codigo para aplicarle al carrito la sumaria de los productos mediante el metodo de orden superior reduce*/
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    /*toma del id mediante dom para que se vea en pantalla el total a pagar*/
    let sumaTotal = document.getElementById("total");
    sumaTotal.innerText="Total a pagar $: "+totalCarrito;
}

/*dom de las cards de los temas**/
/*configuracion con dom de las cards con boostrap que toma a los temas a comprar desde el array de objetos del json cuenta con una funcion que dolariza la info que se encuentra y cada objeto*/

function renderizarTemario(){
    for(const tema of temarioJSON ){
        sectionCards.innerHTML += `
            <div class="card col-sm-2 mt-5">
                <img src=${tema.imagen} class="card-img-top" alt=${tema.titulo}>
                <div class="card-body">
                    <h5 class="card-title">${tema.titulo}</h5>
                    <p class="card-text">${tema.categoria}</p>
                    <p class="card-text">${(tema.precio/dolarCompra).toFixed(2)}</p>
                    <button id='btn${tema.id}'class="btn-primary">Comprar</button>           
                </div>
            </div>
        `;
    }
    /*eventos de productos*/
    temarioJSON.forEach((tema)=>{
        /*evento de cada boton al hacer click, cabe destacar que addEL no puede ejecutar un parametro como lo es agredar al carrito, por lo que necesita como mediador una fx anonima que se lo permita*/
        document.getElementById(`btn${tema.id}`).addEventListener("click",function(){
            agregarAlcarrito(tema);
        });
    });

}
renderizarTemario();
/*funcion que agrega los nuevos productos seleccionados y los aloja en el storage*/
function agregarAlcarrito(temaComprado){
    carrito.push(temaComprado);
    
    console.table(carrito);
    /*sweetalert con foto y confirmacion*/

    Swal.fire({
        title: temaComprado.titulo,
        text: 'Se agregó al carrito',
        imageUrl: temaComprado.imagen,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: temaComprado.titulo,
    });
    
    document.getElementById("tabladeCompras").innerHTML += `
    <tr>
        <td>${temaComprado.id}</td>
        <td>${temaComprado.titulo}</td>
        <td>${temaComprado.precio}</td>
        <td><button class="btn btn-light" onclick="eliminar(event)">🗑️</button></td>
    </tr>
`;
    let totalApagar=carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    document.getElementById("total").innerText="total a pagar en $ARS: "+totalApagar;
    /*storage que guarda y actualiza al carrito*/
    localStorage.setItem("carrito",JSON.stringify("carrito"));
}



//Para eliminar prods del carro
function eliminar(ev){
    console.log(ev);
    let fila = ev.target.parentElement.parentElement;
    console.log(fila);
    let id = fila.children[0].innerText;
    console.log(id);
    let indice = carrito.findIndex(producto => producto.id == id);
    console.log(indice)
    //remueve el producto del carro
    carrito.splice(indice,1);
    console.table(carrito);
    //remueve la fila de la tabla
    fila.remove();
    //recalcular el total
    let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    total.innerText="Total a pagar $: "+preciosAcumulados;
    //storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}
//Obtener valor dolar
function obtenerDolar(){
    const URLDOLAR="https://api.bluelytics.com.ar/v2/latest";
    fetch(URLDOLAR)
        .then( respuesta => respuesta.json())
        .then( cotizaciones => {
            const dolarBlue = cotizaciones.blue;
            console.log(dolarBlue);
            document.getElementById("infoDeDolarHoy").innerHTML+=`
                <p>Dolar compra: $ ${dolarBlue.value_buy} Dolar venta: $ ${dolarBlue.value_sell}</p>
            `;
        dolarCompra=dolarBlue.value_buy;
        obtenerJSON();
    })

}
/*GETJSON de temario.json. hay que tener el cuenta la ruta de la urljson en este caso debido a que habia muchas carpetas dentro 
carpetas se tuvo que reorganizar el codigo y generar un nuevo repositorio github*/

async function obtenerJSON() {
    const URLJSON="../temario.json";
    const resp = await fetch(URLJSON);
    const data = await resp.json();
    temarioJSON = data;
    //ya tengo el dolar y los productos, renderizo las cartas
    renderizarTemario();
}
//Cerrando al compra
finalizarCompra.onclick = () => {
    if(carrito.length==0){
        Swal.fire({
            title: 'El carro está vacío',
            text: 'compre algun producto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        carrito = [];
        document.getElementById("tabladeCompras").innerHTML="";
        let infoTotal = document.getElementById("total");
        infoTotal.innerText="Total a pagar $: ";
        Toastify({
            text: "Su compra esta siendo procesada",
            duration: 3000,
            gravity: 'bottom',
            position: 'center',
        }).showToast();

        //Quiero medir intevalo
        const cierreDeCompra=DateTime.now();
        const Interval = luxon.Interval;
        const tiempo = Interval.fromDateTimes(ahora,cierreDeCompra);
        console.log("Tardaste "+tiempo.length('seconds')+" en comprar");
        localStorage.removeItem("carrito");
    }
}
/*CODIGO PARA QUE FUNCIONE EL BUSCADOR DE TEMAS DA UNA TOSTIFY DE ALERTA PARA COLOCAR EL TEMA A BUSCAR Y ARROJE SU PRESENCIA O AUSENCIA DENTRO DEL TEMARIOJSON
/*aplicacion de dom para el boton de busqueda de termario*/
let buscadorDeTema = document.getElementById("buscador");
let botonDebusqueda= document.getElementById("btn-seach");
/*escuchador de eventos para el boton de busqueda de temas, la funcion filtar busca los temas en el temario.js y arroja distintas respuestas mediante tostify*/
botonDebusqueda.addEventListener("click",filtrar);

/*primera funcion para filtrar los tema segun la condicion a cumplir y envia las tostifys*/
function filtrar() {
    console.log("buscando")
    const opcionDeUsuario = buscadorDeTema.value;
    if (opcionDeUsuario === "") {
        console.log("escriba el tema a buscar");
        Toastify({
            text: "Escriba el tema a buscar",
            duration: 3000
        }).showToast();

    }else if (temarioJSON.find(e => e.titulo === opcionDeUsuario)) {
        console.log("se encontro tema");
        console.log(opcionDeUsuario);
        Toastify({
            text: "se ha encontrado el tema",
            duration: 3000
        }).showToast();

      

    } else {
        console.log("no se encontro tema");
        console.log(opcionDeUsuario);
        Toastify({
            text: " no se ha encontrado tema",
            duration: 3000
        }).showToast();
    }
    

}filtrar();
