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
// Las siguientes variables definen el tamaño de la pala que controla el usuario
var paddleHeight = 15;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
// Variables para comprobar si el usuario está pulsando los botones que controla la pala
var rightPressed = false;
var leftPressed = false;
// Variables para controlar los ladrillos, numero de filas, columnas, cantidad, tamaño...
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// Se declara un array que será bidimensional que contendrá el numero de ladrillos según el numero de filas y columnas
var ladrillos = [];
for(c=0; c<brickColumnCount; c++) {
    ladrillos[c] = [];
    for(r=0; r<brickRowCount; r++) {
        ladrillos[c][r] = { x: 0, y: 0 };
    }
}

// Event Listeners para que el navegador pueda interpretar la pulsación de teclas
// Estos llaman a las funciones keyDownHandler() y keyUpHandler() 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Función que comprueba si se está pulsando las teclas izquierda (37) y derecha (39)
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
// Función que comprueba si se ha dejado de pulsar las teclas izquierda (37) y derecha (39)
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Esta funcion dibuja la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja la pala que controla el usuario
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja los ladrillos que el usuario golpeará con la bola
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            ladrillos[c][r].x = brickX;
            ladrillos[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
        }
    }
}


// Esta funcion se encarga de lo siguiente 
function draw() {
    // que la bola no deje un rastro (una linea) a su paso con clearRect()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // crea los ladrillos definidos anteriormente
    drawBricks();
    // crea la bola definida anteriormente
    drawBall();
    // crea la pala definida anteriormente
    drawPaddle();

    // Con este if se corrige que la bola no desaparezca por la derecha e izquierda
    // Hace falta usar la variable radioBola porque sino la bola no chocaria,
    // sino que desapareceria media bola antes de rebotar
    if(x + dx > canvas.width-radioBola || x + dx < radioBola) {
        dx = -dx;
    }
    // Similiar al if de arriba, pero corrrigiendo que no desaparezca SOLO por arriba
    // Tambien necesario usar radioBola porque sino rebotaria cuando esté media bola fuera
    if(y + dy < radioBola) {
        dy = -dy;
    }
    // Este es el caso en el que la bola llege a la parte inferior donde está la pala
    else if(y + dy > canvas.height-radioBola) {
        // Si golpea la pala, rebota
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        // En caso contrario finaliza el juego, muestra un mensaje y reinicia el juego
        else {
            alert("Fin del juego");
            document.location.reload();
        }
    }

    // Este if comprueba que si la tecla izquieda o la derecha esta
    // pulsada se mueva horizontalmente por la pantalla
    // También se verifica el valor de paddleX para que no se salga de la pantalla (del canvas)
    // Modificando aquí el valor de paddleX cambiará la velocidad de desplazamiento de la pala
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 15;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 15;
    }

    //se modifican los valores de x e y para
    // hacer ese efecto de movimiento de la bola
    x += dx;
    y += dy;
}

//con setInterval se dice cada cuanto tiempo
//se ejecuta la funcion draw()s en milisegundos ( 1 segundo = 1000 )
setInterval(draw, 10);