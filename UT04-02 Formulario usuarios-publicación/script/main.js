// Constantes y Configuración Global
const LETRAS_CONTROL = [
    "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X",
    "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"
];

const AFICIONES_MAP = {
    "Musica": "MU",
    "Deporte": "DE",
    "Video Juegos": "VI",
    "Manualidades": "MA",
    "Artes": "AR",
    "Lectura": "LE"
};

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
    maxpostal: document.getElementById("codigoPostal"),
    telefono: document.getElementById("telefono"),
    aficiones: document.querySelectorAll('input[name="aficiones"]'),
    validationMessages: document.getElementById("messagesList"),
    hiddenAficiones: document.getElementById("hiddenAficiones"),
};

// Eventos y Configuración Inicial
document.addEventListener("DOMContentLoaded", () => {
    // Configurar contadores de caracteres
    DOM.tituloInput.addEventListener("input", (e) => actualizarContador(e, DOM.tituloCounter));
    DOM.descripcionTextarea.addEventListener("input", (e) => actualizarContador(e, DOM.descripcionCounter));

    // Configurar eventos de longitud máxima
    DOM.maxpostal.addEventListener("input", () => {
        maximo(DOM.maxpostal, 5);
        validarCodigoPostal();
    });

    DOM.telefono.addEventListener("input", () => {
        maximo(DOM.telefono, 12);
        validarTelefono();
    });

    DOM.inputDocumento.addEventListener("input", () => {
        maximo(DOM.inputDocumento, 9);
        validarDniNie();
    });

    // Configurar eventos específicos
    DOM.showPassword.addEventListener("click", togglePassword);
    DOM.tipoDocumentoSelect.addEventListener("change", () => {
        const tipoSeleccionado = DOM.tipoDocumentoSelect.value;
        DOM.inputDocumento.disabled = !(tipoSeleccionado === "dni" || tipoSeleccionado === "nie");
        actualizarPlaceholder(tipoSeleccionado);
    });

    document.querySelectorAll('input[name="aficiones"]').forEach((checkbox) => {
        checkbox.addEventListener("change", validarAficiones);
    });

    document.querySelectorAll("input, select, textarea").forEach((input) => {
        input.addEventListener("input", actualizarMensajes);
    });

    // Generar opciones para el año de nacimiento
    for (let year = 1920; year <= 2010; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        DOM.anoNacimiento.appendChild(option);
    }

    // Deshabilitar los checkboxes de aficiones al enviar
    document.querySelector("form").addEventListener("submit", () => {
        DOM.aficiones.forEach((checkbox) => {
            checkbox.disabled = true; // Deshabilitar para evitar duplicación
        });
    });

    // Validar mensajes iniciales
    actualizarMensajes();
});

// Validaciones Específicas
function validarCodigoPostal() {
    const value = DOM.maxpostal.value;
    if (!/^38\d{3}$/.test(value)) {
        DOM.maxpostal.setCustomValidity("El código postal debe comenzar con 38 y tener 5 dígitos.");
    } else {
        DOM.maxpostal.setCustomValidity("");
    }
    DOM.maxpostal.reportValidity();
}

function validarTelefono() {
    const value = DOM.telefono.value;
    if (!/^\+34\d{9}$/.test(value)) {
        DOM.telefono.setCustomValidity("El teléfono debe tener el formato (+34) seguido de 9 dígitos.");
    } else {
        DOM.telefono.setCustomValidity("");
    }
    DOM.telefono.reportValidity();
}

function validarDniNie() {
    const tipoDocumento = DOM.tipoDocumentoSelect.value;
    const dniNie = DOM.inputDocumento.value.toUpperCase().trim();

    let mensajeError = "";
    if (tipoDocumento === "dni") {
        mensajeError = validarDNI(dniNie);
    } else if (tipoDocumento === "nie") {
        mensajeError = validarNIE(dniNie);
    }

    if (mensajeError) {
        DOM.inputDocumento.setCustomValidity(mensajeError);
    } else {
        DOM.inputDocumento.setCustomValidity("");
    }
    DOM.inputDocumento.reportValidity();
}

function validarDNI(dni) {
    const numero = dni.slice(0, -1);
    const letra = dni.slice(-1);

    if (!/^\d{8}[A-Z]$/.test(dni)) {
        return "El formato del DNI debe ser 8 números seguidos de una letra.";
    }

    const resto = parseInt(numero, 10) % 23;
    const letraCorrecta = LETRAS_CONTROL[resto];

    if (letra !== letraCorrecta) {
        return `La letra del DNI es incorrecta. Debe ser ${letraCorrecta}.`;
    }

    return "";
}

function validarNIE(nie) {
    const letraInicial = nie.charAt(0);
    let numeros = nie.slice(1, -1);
    const letraFinal = nie.slice(-1);

    if (!/^[XYZ]\d{7}[A-Z]$/.test(nie)) {
        return "El formato del NIE no es válido. Debe comenzar con X, Y o Z.";
    }

    if (letraInicial === "X") numeros = "0" + numeros;
    if (letraInicial === "Y") numeros = "1" + numeros;
    if (letraInicial === "Z") numeros = "2" + numeros;

    const resto = parseInt(numeros, 10) % 23;
    const letraCorrecta = LETRAS_CONTROL[resto];

    if (letraFinal !== letraCorrecta) {
        return `La letra del NIE es incorrecta. Debe ser ${letraCorrecta}.`;
    }

    return "";
}

function validarAficiones() {
    const seleccionadas = Array.from(DOM.aficiones).filter((checkbox) => checkbox.checked);

    if (seleccionadas.length < 2) {
        DOM.aficiones.forEach((checkbox) => checkbox.setCustomValidity("Debes seleccionar al menos 2 aficiones."));
    } else {
        DOM.aficiones.forEach((checkbox) => checkbox.setCustomValidity(""));
    }

    const listaAficiones = seleccionadas
        .map((checkbox) => AFICIONES_MAP[checkbox.value])
        .join(", ");

    if (DOM.hiddenAficiones) {
        DOM.hiddenAficiones.value = listaAficiones;
    }

    DOM.aficiones[0].reportValidity();
}

// Funciones Auxiliares
function maximo(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

function actualizarMensajes() {
    DOM.validationMessages.innerHTML = "";
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
        if (!input.checkValidity()) {
            const li = document.createElement("li");
            li.textContent = `${input.name || input.id}: ${input.validationMessage}`;
            DOM.validationMessages.appendChild(li);
        }
    });
}

function actualizarContador(event, counter) {
    const currentLength = event.target.value.length;
    const maxLength = event.target.getAttribute("maxlength");
    counter.textContent = `${currentLength} / ${maxLength}`;
}

function togglePassword() {
    DOM.contraseña.type = DOM.contraseña.type === "password" ? "text" : "password";
}

function actualizarPlaceholder(tipo) {
    if (tipo === "dni") {
        DOM.inputDocumento.placeholder = "Introduce tu DNI";
    } else if (tipo === "nie") {
        DOM.inputDocumento.placeholder = "Introduce tu NIE";
    }
}
