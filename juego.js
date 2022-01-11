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
// Variable que cuenta tu puntuación
var score = 0;
// Variable que contiene las vidas restantes del jugador
var lives = 3;
// Se declara un array que será bidimensional que contendrá el numero de ladrillos según el numero de filas y columnas
// Al ladrillo como objeto se le añade un status para ver si han sido colisionados
var ladrillos = [];
for(c=0; c<brickColumnCount; c++) {
    ladrillos[c] = [];
    for(r=0; r<brickRowCount; r++) {
        ladrillos[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Event Listeners para que el navegador pueda interpretar la pulsación de teclas
// Estos llaman a las funciones keyDownHandler() y keyUpHandler() 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Similar a lo anterior pero con el ratón
document.addEventListener("mousemove", mouseMoveHandler, false);

// Funcion que en función del moviento del ratón mueve la pala horizontalmente
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

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

// Función que se encarga de la detección de colisiones entre la bola y ladrillos
// Importante el uso de status para llevar los ladrillos colisionados
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = ladrillos[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // El caso en el que derribes todos los ladrillos
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Muy bien");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Funcion que dibuja el marcador de puntuación
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Puntos: "+score, 8, 20);
}

// Función que dibuja el marcador de vidas retantes
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Esta funcion dibuja la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja la pala que controla el usuario
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja los ladrillos que el usuario golpeará con la bola
// Se agrega el status para verificar si ya han sido colisionados los ladrillos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(ladrillos[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                ladrillos[c][r].x = brickX;
                ladrillos[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.closePath();
            }
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
    // crear el marcador de puntos
    drawScore();
    // crear el marcador de vidas
    drawLives();
    // Necesario para que detecte las colisiones con los ladrillos
    collisionDetection();


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
            lives--;
            if(!lives) {
                alert("Fin, te has quedado sin vidas");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
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

    requestAnimationFrame(draw);
}

//con setInterval se dice cada cuanto tiempo
//se ejecuta la funcion draw()s en milisegundos ( 1 segundo = 1000 )
//Se puede decir que define la velocidad del juego
//setInterval(draw, 25);

draw();