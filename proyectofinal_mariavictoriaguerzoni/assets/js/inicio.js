Swal.fire({
    title: 'HOLA! soy Victoria estoy dando mis primeros pasos en programación JS y espero que este contenido te sea util',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
})
/*funcion constructora*/
class Actividad {
    constructor(imagen, titulo, objetivo) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.objetivo = objetivo;
    }
}
const actividad1 = new Actividad("./assets/imagenes/bibliografiaportada.jpg", "Bibliografia", "La biblioteca de TAVO tiene un amplio compendio de temas divididos en 3 jerarquias, los mismo estan conformados por las mejores bibliografia en el campo de la Obstetricia.");
const actividad2 = new Actividad("./assets/imagenes/ejerciciosportada.png", "Ejercicios", "Los ejercicios de TAVO tienen como objetivo favorecer la autoevaluacion, generando un refuerzo positivo en los conceptos a incorporar.");
const actividad3 = new Actividad("./assets/imagenes/simuladoresportada.jpg", "Simuladores", "Los Simuladores de TAVO estan pensados para reforzar los conocmientos de forma interactiva, a traves de este sistema ludico tiene como objetivo reforzar los algoritmos asistencia en el sistema de Salud");

/*configuracion con dom de las cards con boostrap*/
let sectionCards = document.getElementById("cards");
sectionCards.innerHTML = `
    <div class="card m-2" style="width: 18rem;">
        <img src=${actividad1.imagen} class="card-img-top" alt=${actividad1.titulo}>
        <div class="card-body">
            <h5 class="card-title">${actividad1.titulo}</h5>
            <p class="card-text">${actividad1.objetivo}</p>
            <a class="btn btn-primary" href="./pages/bibliografia.html" role="button">Ir a la pagina</a>
        </div>
    </div>
    <div class="card m-2" style="width: 18rem;">
        <img src=${actividad2.imagen} class="card-img-top" alt=${actividad2.titulo}>
        <div class="card-body">
            <h5 class="card-title">${actividad2.titulo}</h5>
            <p class="card-text">${actividad2.objetivo}</p>
            <a class="btn btn-primary" href="./pages/ejercicios.html" role="button">Ir a la pagina</a>
           
        </div>
    </div>
    <div class="card m-2" style="width: 18rem;">
        <img src=${actividad3.imagen} class="card-img-top" alt=${actividad3.titulo}>
        <div class="card-body">
            <h5 class="card-title">${actividad3.titulo}</h5>
            <p class="card-text">${actividad3.objetivo}</p>
            <a class="btn btn-primary" href="./pages/simulador.html" role="button">Ir a la pagina</a>
        </div>
    </div>
`;

/*toma de variables mediante dom*/

let campoNombre = document.getElementById("inputNombre");
let campoApellido = document.getElementById("inputApellido");
let contrasenia = document.getElementById("contrasena");

let btnRegistrar = document.getElementById("btnRegistrar");
btnRegistrar.addEventListener("click", validarFormulario);/*funcion mediadora para el evento click*/
/*evento de teclado para controlar los caracteres alfa del campo nombre y apellido*/
campoNombre.onchange = () => (controladorDeCaracteresNum(campoNombre));
campoApellido.onchange = () => (controladorDeCaracteresNum(campoApellido));

function controladorDeCaracteresNum(campo) {
    console.log("controlador de caracteres")
    if (isNaN(campo.value)) {
        campo.style.color = "black"
    } else { campo.style.color = "red" }
}

function validarFormulario() {
    console.log("esta en funcionamiento")
    let valido = true;/* creacion de la variable valido para que no se envie el formulario en caso de que no se complete los campos nombre y/o apellido y/o contrasenia*/
    if (campoNombre.value == "") {
        console.log("complete el campo vacio")
        Toastify({
            text: "debe completar el campo nombre",
            duration: 3000,
            className: "warning",
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
        }).showToast();
        valido=false
    } 
    if (campoApellido.value == "") {
        console.log("complete el campo vacio")
        Toastify({
            text: "debe completar el campo apellido",
            duration: 3000,
            className: "warning",
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
        }).showToast();
        valido=false
    } 



    /*validacion de contraseña*/
    console.log("se ha cambiado el contenido a " + contrasenia.value);
    /*condicional que manifiesta la necesidad de que los caracteres alfanumericos sean estrictamente 8*/
    if (contrasenia.value.length != 8) {
        Toastify({
            text: "debe completar el campo contraseña con 8 digitos alfanumericos",
            duration: 3000,
            className: "warning",
        }).showToast();
        valido=false;
    } 

    
    if (valido) {
        alojarDatos(campoNombre,campoApellido,contrasenia);
        console.log("formulario enviado")
        Toastify({
            text: "Formulario enviado",
            duration: 3000,
            gravity: "bottom", 
            position: "center",
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback despues de click
        }).showToast();
    }
}

/*enviar datos a la api placeholder y que la api simule que guardo los datos de usuario*/
function alojarDatos(campoNombre,campoApellido,contrasenia){
    const URLPOST='https://jsonplaceholder.typicode.com/posts';
    const nuevoRegistro={
        nombre:campoNombre.value,
        apellido:campoApellido.value,
        contrasenia:contrasenia
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(nuevoRegistro),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((retornoDeDatos) => console.log(retornoDeDatos));
}
