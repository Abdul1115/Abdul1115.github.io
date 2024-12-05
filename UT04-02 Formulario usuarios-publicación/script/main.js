const DOM = {
    contraseña: document.getElementById("password"),
    tipoDocumentoSelect: document.getElementById("tipoDocumento"),
    inputDocumento: document.getElementById("dniNie"),
    tituloInput: document.getElementById("titulo"),
    tituloCounter: document.getElementById("tituloCounter"),
    descripcionTextarea: document.getElementById("descripcion"),
    descripcionCounter: document.getElementById("descripcionCounter"),
    anoNacimiento: document.getElementById("anoNacimiento"),
    showPassword: document.getElementById("showPassword"),
    maxpostal: document.getElementById("codigoPostal")
};

document.addEventListener("DOMContentLoaded", () => {
    // Actualizar contador para Título
    DOM.tituloInput.addEventListener("input", (e) => {
        const currentLength = e.target.value.length;
        const maxLength = e.target.getAttribute("maxlength");
        DOM.tituloCounter.textContent = `${currentLength} / ${maxLength}`;
    });

    // Actualizar contador para Descripción
    DOM.descripcionTextarea.addEventListener("input", (e) => {
        const currentLength = e.target.value.length;
        const maxLength = e.target.getAttribute("maxlength");
        DOM.descripcionCounter.textContent = `${currentLength} / ${maxLength}`;
    });

    // Mostrar u ocultar la contraseña
    DOM.showPassword.addEventListener("click", togglePassword);

    //Maximo Codigo Postal
    DOM.maxpostal.addEventListener("input", () => maximo(DOM.maxpostal))
    // Inicialmente deshabilitamos el campo de DNI/NIE
    DOM.inputDocumento.disabled = true;

    // Escuchar cambios en el select para habilitar el campo
    DOM.tipoDocumentoSelect.addEventListener("change", () => {
        const tipoSeleccionado = DOM.tipoDocumentoSelect.value;
        if (tipoSeleccionado === "dni" || tipoSeleccionado === "nie") {
            DOM.inputDocumento.disabled = false;
            actualizarPlaceholder(tipoSeleccionado);
        } else {
            DOM.inputDocumento.disabled = true;
        }
    });

    // Generar opciones dinámicamente para el año de nacimiento
    for (let year = 1960; year <= 2015; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        DOM.anoNacimiento.appendChild(option);
    }
});

// Mostrar u ocultar la contraseña
function togglePassword() {
    DOM.contraseña.type = DOM.contraseña.type === "password" ? "text" : "password";
}

// Cambiar el placeholder según el tipo de documento
function actualizarPlaceholder(tipo) {
    if (tipo === "dni") {
        DOM.inputDocumento.placeholder = "Introduce tu DNI";
    } else if (tipo === "nie") {
        DOM.inputDocumento.placeholder = "Introduce tu NIE";
    }
}

// Función que limita la longitud de caracteres de un input
function maximo(input) {
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5);
    }
}
