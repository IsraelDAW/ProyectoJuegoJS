// Variables globales para tomar el canvas
// Y poder dibujar objetos 2d en él
var canvas = document.getElementById("elcanvas");
var ctx = canvas.getContext("2d");
// Variables x e y que sirven para decir donde aparecera la bola
var x = canvas.width/2;
var y = canvas.height-30;
// Variables dx y dy para marcar la direccion y velocidad de la bola
var dx = 4;
var dy = -4;
// Variable radioBola para indicar el radio (el tamaño) de la bola
var radioBola = 10;

// Esta funcion dibuja la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Esta funcion se encarga que la bola no deje
// un rastro (una linea) a su paso con clearRect()
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    // Con este if se corrige que la bola no desaparezca por la derecha e izquierda
    // Hace falta usar la variable radioBola porque sino la bola no chocaria,
    // sino que desapareceria media bola antes de rebotar
    if(x + dx > canvas.width-radioBola || x + dx < radioBola) {
        dx = -dx;
    }

    // Similiar al if de arriba, pero corrrigiendo que no desaparezca tanto por arriba como por abajo
    // Tambien necesario usar radioBola porque sino rebotaria cuando esté media bola fuera
    if(y + dy > canvas.height-radioBola || y + dy < radioBola) {
        dy = -dy;
    }

    //se modifican los valores de x e y para
    // hacer ese efecto de movimiento de la bola
    x += dx;
    y += dy;
}

//con setInterval se dice cada cuanto tiempo
//se ejecuta la funcion draw()s en milisegundos ( 1 segundo = 1000 )
setInterval(draw, 10);