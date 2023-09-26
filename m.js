let contador = 4;

// Define la función que se incrementará cada vez que se llame
function incrementarContador() {
  contador++;
}

function votarColorAleatorio() {
    if (contador === 4) {
        contador = 0;
    }
  const colores = ["#2890E9", "#E0296A", "#51AB55", "#FD9912"];
  const colorAleatorio = colores[contador];
  return colorAleatorio;
}

const colorElegido = votarColorAleatorio();
console.log(`El color elegido aleatoriamente es: ${colorElegido}`);
