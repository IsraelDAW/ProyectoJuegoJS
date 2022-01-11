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
var alturaPala = 15;
var anchoPala = 100;
var posicionPalaX = (canvas.width-anchoPala)/2;
// Variables para comprobar si el usuario está pulsando los botones que controla la pala
var pulsarDerecha = false;
var pulsarIzquierda = false;
// Variables para controlar los ladrillos, numero de filas, columnas, cantidad, tamaño...
var filasLadrillo = 4;
var columnasLadrillo = 5;
var alturaLadrillo = 75;
var anchoLadrillo = 20;
var espaciadoEntreLadrillos = 10;
var margenSuperiorLadrillos = 30;
var margenIzquierdoLadrillos = 30;
// Variable que cuenta la puntuación
var puntos = 0;
// Variable que contiene las vidas restantes del jugador
var vidas = 3;
// Se declara un array que será bidimensional que contendrá el numero de ladrillos según el numero de filas y columnas
// Al ladrillo como objeto se le añade un golpeado para ver si han sido colisionados
var ladrillos = [];
for(c=0; c<columnasLadrillo; c++) {
    ladrillos[c] = [];
    for(r=0; r<filasLadrillo; r++) {
        ladrillos[c][r] = { x: 0, y: 0, golpeado: 1 };
    }
}

// Event Listeners para que el navegador pueda interpretar la pulsación de teclas
// Estos llaman a las funciones pulsarTecla() y dejarPulsarTecla() 
document.addEventListener("keydown", pulsarTecla, false);
document.addEventListener("keyup", dejarPulsarTecla, false);
// Similar a lo anterior pero con el ratón y la funcion controladorRaton()
document.addEventListener("mousemove", controladorRaton, false);

// Función que dependiendo del moviento del ratón mueve la pala horizontalmente
function controladorRaton(raton) {
    var relativeX = raton.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        posicionPalaX = relativeX - anchoPala/2;
    }
}

// Función que comprueba si se está pulsando las teclas izquierda (37) y derecha (39)
function pulsarTecla(tecla) {
    if(tecla.keyCode == 39) {
        pulsarDerecha = true;
    }
    else if(tecla.keyCode == 37) {
        pulsarIzquierda = true;
    }
}

// Función que comprueba si se ha dejado de pulsar las teclas izquierda (37) y derecha (39)
function dejarPulsarTecla(tecla) {
    if(tecla.keyCode == 39) {
        pulsarDerecha = false;
    }
    else if(tecla.keyCode == 37) {
        pulsarIzquierda = false;
    }
}

// Función que se encarga de la detección de colisiones entre la bola y ladrillos
// Importante el uso de golpeado para llevar los ladrillos colisionados
function deteccionColisiones() {
    for(c=0; c<columnasLadrillo; c++) {
        for(r=0; r<filasLadrillo; r++) {
            var b = ladrillos[c][r];
            if(b.golpeado == 1) {
                if(x > b.x && x < b.x+alturaLadrillo && y > b.y && y < b.y+anchoLadrillo) {
                    dy = -dy;
                    b.golpeado = 0;
                    puntos++;
                    // El caso en el que derribes todos los ladrillos
                    if(puntos == filasLadrillo*columnasLadrillo) {
                        alert("Muy bien");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Funcion que dibuja el marcador de puntuación
function dibujarPuntos() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Puntos: "+puntos, 8, 20);
}

// Función que dibuja el marcador de vidas retantes
function dibujarVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
}

// Esta funcion dibuja la bola
function dibujarBola() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja la pala que controla el usuario
function dibujarPala() {
    ctx.beginPath();
    ctx.rect(posicionPalaX, canvas.height-alturaPala, anchoPala, alturaPala);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Esta función dibuja los ladrillos que el usuario golpeará con la bola
// Se agrega el golpeado para verificar si ya han sido colisionados los ladrillos
function dibujarLadrillos() {
    for(c=0; c<columnasLadrillo; c++) {
        for(r=0; r<filasLadrillo; r++) {
            if(ladrillos[c][r].golpeado == 1) {
                var brickX = (c*(alturaLadrillo+espaciadoEntreLadrillos))+margenIzquierdoLadrillos;
                var brickY = (r*(anchoLadrillo+espaciadoEntreLadrillos))+margenSuperiorLadrillos;
                ladrillos[c][r].x = brickX;
                ladrillos[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, alturaLadrillo, anchoLadrillo);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



// Esta funcion se encarga de lo siguiente 
function tablero() {
    // que la bola no deje un rastro (una linea) a su paso con clearRect()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // crea los ladrillos definidos anteriormente
    dibujarLadrillos();
    // crea la bola definida anteriormente
    dibujarBola();
    // crea la pala definida anteriormente
    dibujarPala();
    // crear el marcador de puntos
    dibujarPuntos();
    // crear el marcador de vidas
    dibujarVidas();
    // Necesario para que detecte las colisiones con los ladrillos
    deteccionColisiones();


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
        if(x > posicionPalaX && x < posicionPalaX + anchoPala) {
            dy = -dy;
        }
        // En caso contrario resta vidas hasta finalizar el juego, muestra un mensaje y reinicia el juego
        else {
            vidas--;
            if(!vidas) {
                alert("Fin, te has quedado sin vidas");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                posicionPalaX = (canvas.width-anchoPala)/2;
            }
        }
    }

    // Este if comprueba que si la tecla izquieda o la derecha esta
    // pulsada se mueva horizontalmente por la pantalla
    // También se verifica el valor de paddleX para que no se salga de la pantalla (del canvas)
    // Modificando aquí el valor de paddleX cambiará la velocidad de desplazamiento de la pala
    if(pulsarDerecha && posicionPalaX < canvas.width-anchoPala) {
        posicionPalaX += 15;
    }
    else if(pulsarIzquierda && posicionPalaX > 0) {
        posicionPalaX -= 15;
    }

    //se modifican los valores de x e y para
    // hacer ese efecto de movimiento de la bola
    x += dx;
    y += dy;

    // Nuevo modelo que sustituye al metodo setInterval() para hacer el efecto de animación
    requestAnimationFrame(tablero);
}

// Se llama recursivo a la funcion para seguir ejecutando el juego
tablero();