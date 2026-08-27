const form = document.getElementById("form");
const inputCorreo = document.getElementById("correo");
const inputContrasena = document.getElementById("contrasena");
const msg = document.getElementById("mensaje");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    try{
        if(inputCorreo.value.trim()==="" || inputContrasena.value.trim()===""){
            throw new Error("Ingresa tu correo y/o contraseña");
        }

        window.location.href="pages/paginaPrincipal.html";

    }catch(error){
        msg.textContent = `${error.message}`;
        msg.style.color = "red";
    }    
}
);
