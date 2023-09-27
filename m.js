let contador = 0;

  function votarColorAleatorio() {
    if (contador === 3) {
      contador = 0;
    }
    const colores = ["#2890E9", "#E0296A", "#51AB55", "#FD9912"];
    const colorAleatorio = colores[contador];
    contador++;
    return colorAleatorio;
  }

  console.log(votarColorAleatorio());