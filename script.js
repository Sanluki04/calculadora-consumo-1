/*
 REGISTRO DE CARGAS
Se utiliza un array llamado "cargas" para almacenar múltiples registros.
Cada registro es un objeto con:
- kmInicio
- kmFin
- distancia
- litros

1ro Se capturan los datos del formulario
2do Se validan los valores ingresados
3ro Se crea un objeto "carga"
4to Se guarda en el array "cargas"
5to Se renderiza la lista en pantalla

Esto permite registrar múltiples cargas sin perder información previa.
*/

// 1. Seleccionamos los elementos del DOM y los guardamos en constantes
// Usamos getElementById para vincular el HTML con nuestro código JS
const formulario = document.getElementById('calc-form');
const inputKmInicio = document.getElementById('km-inicio');
const inputKmFin = document.getElementById('km-fin');
const inputLitros = document.getElementById('litros');
const divResultado = document.getElementById('resultado');

//Array que guarda todas las cargas
let cargas = [];

//cuando addEventListener escucha que el usuario toca el boton ejecuta la funcion
formulario.addEventListener('submit', function(event){
    // Evita que la pagina se recargue 
    event.preventDefault();

    //convierte de string a numero decimal
    const kmInicio = parseFloat(inputKmInicio.value);
    const kmFin = parseFloat(inputKmFin.value);
    const litros = parseFloat(inputLitros.value);

    const distancia = kmFin - kmInicio;

    // Si distancia es menor o igual a 0 hace que modifique el div del html con ayuda del .innertHTML
    if (distancia <= 0) {
        divResultado.innerHTML = '<p style="color: red;">Error: Los Km finales deben ser mayores a los iniciales.</p>';
        return;
    }

    // Guardamos la carga en vez de calcular
    const nuevaCarga = {
        kmInicio: kmInicio,
        kmFin: kmFin,
        distancia: distancia,
        litros: litros
    };

    // Agrega cargas nuevas al Array
    cargas.push(nuevaCarga);

    // Actualiza la pantalla con todas las cargas
    mostrarCargas();

    // Limpia inputs mejorando UX
    formulario.reset();
});

function mostrarCargas() {
    divResultado.innerHTML = "";

    // Recorre el Array y muestra cada carga
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