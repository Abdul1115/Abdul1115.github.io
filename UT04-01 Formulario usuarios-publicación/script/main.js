// Generar opciones dinámicamente para el año de nacimiento
document.addEventListener("DOMContentLoaded", () => {
    const anoNacimiento = document.getElementById("anoNacimiento");
    for (let year = 1860; year <= 2015; year++) {
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
        inputDocumento.placeholder = "Introduce tu DNI (ej: 12345678A)";
    } else if (tipo === "nie") {
        inputDocumento.placeholder = "Introduce tu NIE (ej: X1234567A)";
    }
}


