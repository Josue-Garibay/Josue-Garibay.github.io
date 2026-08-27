const form = document.getElementById('form-cita');
const contenedorCitas = document.getElementById('contenedorCitas');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const ahora = new Date();
    
    const cita = {
        medico: document.getElementById('medico').value,
        fecha: document.getElementById('fecha-cita').value,
        motivo: document.getElementById('motivo').value,
        hora: document.getElementById('hora-cita').value,
        timestampRegistro: ahora.getTime(),
        estado: 'activa'
    };

    const listaCitas = JSON.parse(localStorage.getItem('datosCita')) || [];
    listaCitas.push(cita);
    localStorage.setItem('datosCita', JSON.stringify(listaCitas));

    window.location.href = "comprobantes.html";
});
