// Variables globales para tomar el canvas
// Y poder dibujar objetos 2d en el
var canvas = document.getElementById("elcanvas");
var ctx = canvas.getContext("2d");


// Los 3 siguientes bloques de codigo sirven para crear
// objectos 2d de distinta forma, color, tamaño...

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();