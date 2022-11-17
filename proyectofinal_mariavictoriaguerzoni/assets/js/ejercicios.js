/*LOGICA PARA EL FUNCIONAMIENTO DEL CHOICE DEL JUEGO DE PREGUNTAS Y RESPUESTAS DE LA PAGINA EJERCICIOS*/
/*tomo mediante dom los ejercicios*/
let container=document.getElementById("contenedor");
let header=document.getElementById("encabezado");
let category=document.getElementById("categoria");
let question=document.getElementById("pregunta");
let boton1=document.getElementById("btn1");
let boton2=document.getElementById("btn2");
let boton3=document.getElementById("btn3");
let boton4=document.getElementById("btn4");
function renderizarEjercicio(){
    Choice.forEach((ejercicio) => {
        Choice.sort(()=>Math.random()-0.5)/*para hacer aleatoria las preguntas*/
        category.innerHTML=ejercicio.categoria;
        question.innerHTML=ejercicio.pregunta;
        boton1.innerHTML=ejercicio.respuesta;
        boton2.innerHTML=ejercicio.incorrecta1;
        boton3.innerHTML=ejercicio.incorrecta2;
        boton4.innerHTML=ejercicio.incorrecta3

        boton1.onclick=()=>{
            console.log("has elegido la respuesta correcta");
            Swal.fire({title:'has contestado correctamente',icon:'success',footer: '<a href="">quieres jugar de nuevo?</a>'})
            boton1.style.background="green";
            boton1.style.color="white"
            setTimeout(()=>(
                console.log("se han removido las opciones no elegidas"),
                boton2.remove("btn2"),
                boton3.remove("btn3"),
                boton4.remove("btn4")
            ),1500)
        
        }
        boton2.onclick=()=>{
            location.href;
            console.log("has elegido la respuesta incorrecta");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Respuesta incorrecta!',
                footer: '<a href="">quieres jugar de nuevo?</a>'
            })
           
            boton2.style.background="red";
            boton2.style.color="white";
            setTimeout(()=>(
                console.log("se han removido las opciones no elegidas"),
                boton1.remove("btn1"),
                boton3.remove("btn3"),
                boton4.remove("btn4")
            ),1500)
            
        }  
        boton3.onclick=()=>{
            location.href;
            console.log("has elegido la respuesta incorrecta");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Respuesta incorrecta!',
                footer: '<a href="">quieres jugar de nuevo?</a>'
            })
           
            boton3.style.background="red";
            boton3.style.color="white";
            setTimeout(()=>(
                console.log("se han removido las opciones no elegidas"),
                boton1.remove("btn1"),
                boton2.remove("btn2"),
                boton4.remove("btn4")
            ),1500)
        }  
        boton4.onclick=()=>{
            location.href;
            console.log("has elegido la respuesta incorrecta");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Respuesta incorrecta!',
                footer: '<a href="">quieres jugar de nuevo?</a>'
            })
           
            boton4.style.background="red";
            boton4.style.color="white";
            setTimeout(()=>(
                console.log("se han removido las opciones no elegidas"),
                boton1.remove("btn1"),
                boton2.remove("btn2"),
                boton3.remove("btn3")
            ),1500)
        }      
    });
}      
renderizarEjercicio();