window.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = localStorage.getItem("datosCita");

    if (datosGuardados) {
        const citas = JSON.parse(datosGuardados);
        const contenedor = document.getElementById("contComprobante");

        citas.forEach(cita => {
            const nuevoDiv = document.createElement("div");
            nuevoDiv.innerHTML = `
                <div class="marco-op" style="margin-bottom: 20px;">
                    <p><strong>Médico:</strong> ${cita.medico}</p>
                    <p><strong>Fecha:</strong> ${cita.fecha}</p>
                    <p><strong>Hora:</strong> ${cita.hora}</p>
                    <p><strong>Motivo:</strong> ${cita.motivo}</p>
                </div>
            `;
            contenedor.appendChild(nuevoDiv);
        });
    }
});
