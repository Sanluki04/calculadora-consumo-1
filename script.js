// 1. Seleccionamos los elementos del DOM y los guardamos en constantes
// Usamos getElementById para vincular el HTML con nuestro código JS
const formulario = document.getElementById('calc-form');
const inputKmInicio = document.getElementById('km-inicio');
const inputKmFin = document.getElementById('km-fin');
const inputLitros = document.getElementById('litros');
const divResultado = document.getElementById('resultado');

//Array que guarda todas las cargas
let cargas = [];

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    const kmInicio = parseFloat(inputKmInicio.value);
    const kmFin = parseFloat(inputKmFin.value);
    const litros = parseFloat(inputLitros.value);

    const distancia = kmFin - kmInicio;

    if (distancia <= 0) {
        divResultado.innerHTML = '<p style="color: red;">Error: Los Km finales deben ser mayores a los iniciales.</p>';
        return;
    }

    // 👉 Guardamos la carga en vez de calcular
    const nuevaCarga = {
        kmInicio: kmInicio,
        kmFin: kmFin,
        distancia: distancia,
        litros: litros
    };

    cargas.push(nuevaCarga);

    mostrarCargas();

    formulario.reset();
});

function mostrarCargas() {
    divResultado.innerHTML = "";

    cargas.forEach((carga, index) => {
        divResultado.innerHTML += `
            <p>
                Carga ${index + 1}: 
                ${carga.kmInicio} → ${carga.kmFin} km | 
                ${carga.litros} L
            </p>
        `;
    });
}