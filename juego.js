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

// Esta funcion dibuja la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Esta funcion se encarga de la bola no deje un rastro (una linea) a su paso
// con clearRect() y se modifican los valores de x e y para
// hacer ese efecto de movimiento de la bola
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

//con setInterval se dice cada cuanto tiempo
//se ejecuta la funcion draw()s en milisegundos ( 1 segundo = 1000 )
setInterval(draw, 100);