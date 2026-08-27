window.addEventListener("DOMContentLoaded", () => {
    renderizarHistorial();
});

function renderizarHistorial() {
    const contenedor = document.getElementById("contenedorHistorial");
    contenedor.innerHTML = "";

    const datosGuardados = localStorage.getItem("datosCita");
    let citas = datosGuardados ? JSON.parse(datosGuardados) : [];

    if (!Array.isArray(citas)) {
        citas = [citas];
    }

    citas.forEach((cita, index) => {
        const timestampAgendado = cita.timestampRegistro || Date.now();
        const fechaLimite = new Date(timestampAgendado + 5 * 60 * 1000);
        const horaLimiteFormateada = fechaLimite.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const tarjeta = document.createElement("div");
        // tarjeta.style.marginBottom = "25px";

        tarjeta.innerHTML = `
            <div class="juntos" style="display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
                <div>
                    <h2 class="letras-op2" style="margin: 0;">Cita el día ${cita.fecha || 'Sin fecha'}</h2>
                    ${cita.estado === 'cancelada' ? '<p style="color: red; font-weight: bold; margin: 5px 0 0 0;">Cancelada</p>' : ''}
                </div>
                
                <span style="font-size: 0.95rem; color: #555;">
                    (La cita se puede modificar hasta las ${horaLimiteFormateada})
                </span>

                <div>
                    <button class="empuja-derecha" type="button" onclick="intentarReagendar(${index})">Reagendar</button>
                    <button class="empuja-izquierda" type="button" onclick="intentarCancelar(${index})" style="color: red;">Cancelar</button>
                </div>
            </div>

            <div id="seccion-reprogramar-${index}" style="margin-top: 10px;"></div>

            <p class="linea-hist"></p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function puedeModificarse(timestampRegistro) {
    if (!timestampRegistro) return true; 
    const tiempoTranscurrido = Date.now() - timestampRegistro;
    const limite5Minutos = 5 * 60 * 1000;
    return tiempoTranscurrido <= limite5Minutos;
}

window.intentarCancelar = function(index) {
    let citas = JSON.parse(localStorage.getItem("datosCita")) || [];
    const cita = citas[index];

    if (!puedeModificarse(cita.timestampRegistro)) {
        console.log("Cita confirmada, no se puede modificar");
        alert("Cita confirmada, no se puede modificar");
        return;
    }

    cita.estado = 'cancelada';
    localStorage.setItem("datosCita", JSON.stringify(citas));
    renderizarHistorial();
};

// Acción del botón Reagendar (despliega calendario temporal)
window.intentarReagendar = function(index) {
    let citas = JSON.parse(localStorage.getItem("datosCita")) || [];
    const cita = citas[index];

    if (!puedeModificarse(cita.timestampRegistro)) {
        console.log("Cita confirmada, no se puede modificar");
        alert("Cita confirmada, no se puede modificar");
        return;
    }

    const contenedorForm = document.getElementById(`seccion-reprogramar-${index}`);
    
    contenedorForm.innerHTML = `
        <div style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <label for="nueva-fecha-${index}"><strong>Elige nueva fecha:</strong> </label>
            <input type="date" id="nueva-fecha-${index}" required>
            <button type="button" onclick="confirmarReprogramacion(${index})" style="margin-left: 10px;">Confirmar Reprogramación</button>
        </div>
    `;
};

window.confirmarReprogramacion = function(index) {
    const inputFecha = document.getElementById(`nueva-fecha-${index}`);
    if (!inputFecha.value) {
        alert("Por favor selecciona una fecha");
        return;
    }

    let citas = JSON.parse(localStorage.getItem("datosCita")) || [];
    const citaAnterior = citas[index];

    citaAnterior.estado = 'cancelada';

    const nuevaCita = {
        medico: citaAnterior.medico,
        fecha: inputFecha.value,
        motivo: citaAnterior.motivo,
        hora: citaAnterior.hora,
        horaRegistro: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        timestampRegistro: Date.now(), // Inicia su propia ventana de 5 minutos
        estado: 'activa'
    };

    citas.push(nuevaCita);
    localStorage.setItem("datosCita", JSON.stringify(citas));
    renderizarHistorial();
};
