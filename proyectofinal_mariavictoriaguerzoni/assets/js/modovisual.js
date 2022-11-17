//codigo para el cambio de modo claro a modo oscuro y cuardar la preferencia en el storage
let principal = document.getElementById("principal")
let miCheckbox=document.getElementById("flexSwitchCheckDefault")
let modo=localStorage.getItem("modo");

// con esto escuchamos cada vez que se cambia el checkbox

 miCheckbox.addEventListener("change",() => {
 console.log("Cambiando modo") 
// esto evalua si el checkbox está encendido o apagado

 if (miCheckbox.checked) {
    // checkbox chequeado
    document.body.className="dark";
    principal.classList.remove("light");
    principal.classList.add("dark");
    modo="dark";

  } else {
    //  checbox deschequeado
    document.body.className="light";
    principal.classList.remove("dark");
    principal.classList.add("light");    
    modo="light";
  }
localStorage.setItem("modo",modo)
}) 