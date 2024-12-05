// Generar opciones dinámicamente para el año de nacimiento
document.addEventListener("DOMContentLoaded", () => {
    const anoNacimiento = document.getElementById("anoNacimiento");
    for (let year = 1960; year <= 2015; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        anoNacimiento.appendChild(option);
    }
});

// Mostrar u ocultar la contraseña
function togglePassword() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
document.addEventListener("DOMContentLoaded", () => {
    const selectDocumento = document.getElementById("tipoDocumento");
    const inputDocumento = document.getElementById("dniNie");

    // Inicialmente deshabilitamos el campo de DNI/NIE
    inputDocumento.disabled = true;

    // Escuchar cambios en el select para habilitar el campo
    selectDocumento.addEventListener("change", () => {
        const tipoSeleccionado = selectDocumento.value;

        if (tipoSeleccionado === "dni" || tipoSeleccionado === "nie") {
            inputDocumento.disabled = false;
            actualizarPlaceholder(tipoSeleccionado);
        } else {
            inputDocumento.disabled = true;
        }
    });


});

// Cambiar el placeholder según el tipo de documento
function actualizarPlaceholder(tipo) {
    const inputDocumento = document.getElementById("dniNie");

    if (tipo === "dni") {
        inputDocumento.placeholder = "Introduce tu DNI";
    } else if (tipo === "nie") {
        inputDocumento.placeholder = "Introduce tu NIE";
    }
}

function maximo(input) {
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5); // Limita a 5 caracteres
    }
}
(function () {
    // Obtener los elementos del DOM
    const tituloInput = document.getElementById("titulo");
    const tituloCounter = document.getElementById("tituloCounter");
    const descripcionTextarea = document.getElementById("descripcion");
    const descripcionCounter = document.getElementById("descripcionCounter");

    // Actualizar contador para Título
    tituloInput.addEventListener("input", (e) => {
        const currentLength = e.target.value.length;
        const maxLength = e.target.getAttribute("maxlength");
        tituloCounter.textContent = `${currentLength} / ${maxLength}`;
    });

    // Actualizar contador para Descripción
    descripcionTextarea.addEventListener("input", (e) => {
        const currentLength = e.target.value.length;
        const maxLength = e.target.getAttribute("maxlength");
        descripcionCounter.textContent = `${currentLength} / ${maxLength}`;
    });
})();
