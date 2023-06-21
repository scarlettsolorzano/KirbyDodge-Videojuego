//se declaran las variables de las imagenes y sonidos
const logo = new Image();
logo.src = 'img/Logo.png';
const img = new Image();
img.src = 'img/Mario.png';
const ouch = new Image();
ouch.src = 'img/Hurt.png';
const death = new Image();
death.src = 'img/Mario Death.png';
const supra = new Image();
supra.src = 'img/Mario 2.png';
const GameOver = new Image();
GameOver.src = 'img/Game Over.png';
const Success = new Image();
Success.src = 'img/level complete.png';
const Complete = new Image();
Complete.src = 'img/thanks for playing.png';
const sound = new Audio();
sound.src = 'aud/Peaches [8-bit Cover] Bowser.mp3';
const power = new Audio();
power.src = 'aud/smb_powerup.wav';
const pipe = new Audio();
pipe.src = 'aud/smb_pipe.wav';
const stageclear = new Audio();
stageclear.src = 'aud/smb_stage_clear.wav';
const gameclear = new Audio();
gameclear.src = 'aud/smb_world_clear.wav';
const gameover = new Audio();
gameover.src = 'aud/smb_mariodie.wav';
//creacion de los objetos
fantasma = new Array();
for (var i = 0; i < 2; i++) {
    fantasma[i] = new Fantasma(parseInt(Math.random() * 5 + 5), parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200));
}
champiñon = new Array();
for (var i = 0; i < 1; i++) {
    champiñon[i] = new Champiñon(parseInt(Math.random() * 5 + 10), parseInt(Math.random() * 5 + 10), parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200));
}
serpiente = new Array();
for (var i = 0; i < 3; i++) {
    serpiente[i] = new Serpiente(parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200), parseInt(Math.random() * 25 + 75), parseInt(Math.random() * 5 + 5));
}
//se declara la variable de la vida
var vida = 100;
//se declara la variable del contador
var contador = 0;
var tiempo = 300;
var porcentaje = 0;
//se declara una variable de niveles completados
var nivel = 0;
//se declara la variable de la animación
var animacion;
//variables
var posX;
var posY;
var anchoBase;
var altoBase;
var anchoBola;
var altoBola;
var incrementoAr = 0;
var incrementoAb = 0;
var incrementoAt = 0;
var incrementoAd = 0;
/*función que inicia el juego colocando al personaje en la posición inicial
tambien llama a la función que actualiza el juego*/
function Iniciar() {
    const canvas = document.getElementById('panel');
    canvas.getContext;
    var anchoBase = canvas.width;
    var altoBase = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(logo, anchoBase / 2 - logo.width / 2, 150);
    //escribir mi nombre en el canvas abajo del logo
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Por: David Aranda", anchoBase / 2 - 110, 600);
    //se detiene la musica
    sound.currentTime = 0;
    stageclear.pause();
    var form = document.getElementById("boton");
    form.style.display = "none";
    var telonSuperior = document.getElementById("telon-superior");
    telonSuperior.style.display = "none";
    var telonInferior = document.getElementById("telon-inferior");
    telonInferior.style.display = "none";
    var mario = document.getElementById("mario");
    mario.style.display = "none";
    var fantasma1 = document.getElementById("fantasma1");
    fantasma1.style.display = "none";
    var fantasma2 = document.getElementById("fantasma2");
    fantasma2.style.display = "none";
    var nota = document.getElementById("nota");
    nota.style.display = "none";
    setTimeout(function () {
        posX = 100;
        posY = 100;
        anchoBola = img.width;
        altoBola = img.height;
        animacion = setInterval(Actualiza, 20);
        var barra = document.getElementById("barra-vida");
        barra.style.display = "block";
        var barrac = document.getElementById("barra-contador");
        barrac.style.display = "block";
        var br = document.getElementById("br");
        br.style.display = "block";
    }, 1000);
}
/*función que actualiza el juego
dibuja los objetos y detecta las colisiones*/
function Actualiza() {
    //se aumenta el contador
    contador += 1;
    //se reproduce la musica
    sound.play();
    //se declaran las variables del canvas
    const canvas = document.getElementById('panel');
    canvas.getContext;
    var anchoBase = canvas.width;
    var altoBase = canvas.height;
    //se declara el contexto del canvas
    const ctx = canvas.getContext('2d');
    //se limpia el canvas
    ctx.clearRect(0, 0, anchoBase, altoBase);
    //se dibuja el personaje
    posX = posX + incrementoAd - incrementoAt;
    posY = posY + incrementoAb - incrementoAr;
    //se declaran las condiciones de los limites del canvas
    if (posX + anchoBola > anchoBase) posX = anchoBase - anchoBola;
    if (posX <= 0) posX = 0;
    if (posY + altoBola > altoBase) posY = altoBase - altoBola;
    if (posY <= 0) posY = 0;
    ctx.drawImage(img, posX, posY);
    //se declaran las funciones de los objetos
    for (var i = 0; i < fantasma.length; i++) {
        fantasma[i].Animar(ctx, anchoBase, altoBase);
    }
    for (var i = 0; i < champiñon.length; i++) {
        champiñon[i].Animar(ctx, anchoBase, altoBase);
    }
    for (var i = 0; i < serpiente.length; i++) {
        serpiente[i].mover(ctx, anchoBase, altoBase);
    }
    //se declaran las condiciones de colisiones
    for (var i = 0; i < champiñon.length; i++) {
        if (champiñon[i].colision(posX, posY, anchoBola, altoBola)) {
            if (vida < 100) {
                vida += 1
                ctx.drawImage(supra, posX, posY);
                power.play();
            };
        }
    }
    for (var i = 0; i < fantasma.length; i++) {
        if (fantasma[i].colision(posX, posY, anchoBola, altoBola)) {
            ctx.drawImage(ouch, posX, posY);
            vida -= 2;
            pipe.play();
        }
    }
    for (var i = 0; i < serpiente.length; i++) {
        if (serpiente[i].contacto(posX, posY, anchoBola, altoBola)) {
            ctx.drawImage(ouch, posX, posY);
            vida -= 1;
            pipe.play();
        }
    }
    if (vida <= 0) {
        ctx.clearRect(0, 0, anchoBase, altoBase);
        ctx.drawImage(death, posX, posY);
        clearInterval(animacion);
        ctx.drawImage(GameOver, anchoBase / 2 - GameOver.width / 2, 200);
        sound.pause();
        pipe.pause();
        power.pause();
        gameover.play();
        //se muestra un boton de reinicio que recarga la pagina
        var form = document.getElementById("boton");
        form.style.pointerEvents = "auto";
        form.style.display = "block";
        form.innerHTML = "<input type='button' value='Reiniciar' onclick='location.reload()'>";
        //se oculta la barra de vida
        var barra = document.getElementById("barra-vida");
        barra.style.display = "none";
        //se oculta el contador
        var barrac = document.getElementById("barra-contador");
        barrac.style.display = "none";
        var br = document.getElementById("br");
        br.style.display = "none";
    }
    if (contador == tiempo) {
        //se aumenta el nivel
        nivel += 1;
        if (nivel < 3) {
            //se muestra un mensaje de victoria
            ctx.clearRect(0, 0, anchoBase, altoBase);
            ctx.drawImage(Success, anchoBase / 2 - Success.width / 2, altoBase / 2 - Success.height / 2);
            clearInterval(animacion);
            stageclear.currentTime = 0;
            stageclear.play();
            sound.pause();
            pipe.pause();
            power.pause();
            //se muestra un boton que inicia el siguiente nivel
            var form = document.getElementById("boton");
            form.style.pointerEvents = "auto";
            form.style.display = "block";
            form.innerHTML = "<input type='button' value='Siguiente nivel' onclick='LevelUp()'>";
            //se oculta la barra de vida
            var barra = document.getElementById("barra-vida");
            barra.style.display = "none";
            //se oculta el contador
            var barrac = document.getElementById("barra-contador");
            barrac.style.display = "none";
            var br = document.getElementById("br");
            br.style.display = "none";
        }
        else {
            //se muestra un mensaje agradecimiento
            ctx.clearRect(0, 0, anchoBase, altoBase);
            ctx.drawImage(Complete, anchoBase / 2 - Complete.width / 2, altoBase / 2 - Complete.height / 2 - 100);
            clearInterval(animacion);
            gameclear.currentTime = 0;
            gameclear.play();
            sound.pause();
            pipe.pause();
            power.pause();
            //se muestra un boton que recarga la pagina
            var form = document.getElementById("boton");
            form.style.pointerEvents = "auto";
            form.style.display = "block";
            form.innerHTML = "<input type='button' value='Reiniciar' onclick='location.reload()'>";
            //se muestra un botón que termina el juego
            var form = document.getElementById("boton2");
            form.style.pointerEvents = "auto";
            form.style.display = "block";
            form.innerHTML = "<input type='button' value='Salir' onclick='Final()'>";
            var br2 = document.getElementById("br2");
            br2.style.display = "block";
            //se oculta la barra de vida
            var barra = document.getElementById("barra-vida");
            barra.style.display = "none";
            //se oculta el contador
            var barrac = document.getElementById("barra-contador");
            barrac.style.display = "none";
            var br = document.getElementById("br");
            br.style.display = "none";
            // se muestra el telon inferior
            var telonInferior = document.getElementById("telon-inferior");
            telonInferior.style.display = "block";
            // se muestra el mario
            var mario = document.getElementById("mario");
            mario.style.display = "block";
            // se muestra el fantasma
            var fantasma1 = document.getElementById("fantasma1");
            fantasma1.style.display = "block";
        }
    }
    porcentaje = 100 / tiempo * contador;
    //se actualiza la barra de vida
    var barraVida = document.getElementById("barra-vida");
    barraVida.style.setProperty("--vida", vida);
    //se actualiza la barra de progreso
    var barraContador = document.getElementById("barra-contador");
    barraContador.style.setProperty("--porcentaje", porcentaje);
}
//función que detecta las teclas presionadas
function Lol1(event) {
    if (event.keyCode == 38 || event.keyCode == 87) incrementoAr = 10;
    if (event.keyCode == 37 || event.keyCode == 65) incrementoAt = 10;
    if (event.keyCode == 39 || event.keyCode == 68) incrementoAd = 10;
    if (event.keyCode == 40 || event.keyCode == 83) incrementoAb = 10;
}
//función que detecta las teclas soltadas
function Lol2(event) {
    if (event.keyCode == 38 || event.keyCode == 87) incrementoAr = 0;
    if (event.keyCode == 37 || event.keyCode == 65) incrementoAt = 0;
    if (event.keyCode == 39 || event.keyCode == 68) incrementoAd = 0;
    if (event.keyCode == 40 || event.keyCode == 83) incrementoAb = 0;
}
//se declaran las funciones de las teclas
window.onkeydown = Lol1;
window.onkeyup = Lol2;
function Logo() {
    //quitar barra de vida
    var barraVida = document.getElementById("barra-vida");
    barraVida.style.display = "none";
    //quitar contador
    var barraContador = document.getElementById("barra-contador");
    barraContador.style.display = "none";
    var br = document.getElementById("br");
    br.style.display = "none";
    var br2 = document.getElementById("br2");
    br2.style.display = "none";
    //quitar boton terminar
    var form = document.getElementById("boton2");
    form.style.display = "none";
    const canvas = document.getElementById('panel');
    canvas.getContext;
    var anchoBase = canvas.width;
    var altoBase = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(logo, anchoBase / 2 - logo.width / 2, 150);
    //escribir mi nombre en el canvas abajo del logo
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Por: David Aranda", anchoBase / 2 - 110, 600);
}
function LevelUp() {
    //añadir mas enemigos a los arrays existentes
    for (var i = 0; i < 2; i++) {
        fantasma.push(new Fantasma(parseInt(Math.random() * 5 + 5), parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200)));
    }
    for (var i = 0; i < 1; i++) {
        champiñon.push(new Champiñon(parseInt(Math.random() * 5 + 10), parseInt(Math.random() * 5 + 10), parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200)));
    }
    for (var i = 0; i < 3; i++) {
        serpiente.push(new Serpiente(parseInt(Math.random() * 1400 + 200), parseInt(Math.random() * 600 + 200), parseInt(Math.random() * 25 + 75), parseInt(Math.random() * 5 + 5)));
    }
    //reiniciar variables
    vida = 100;
    contador = 0;
    //ocultar boton
    var form = document.getElementById("boton");
    form.style.display = "none";
    Iniciar();
}
function Final() {
    // se muestra el telon superior
    var telonSuperior = document.getElementById("telon-superior");
    telonSuperior.style.top = "-90vh";
    telonSuperior.style.display = "block";
    telonSuperior.style.animation = "bajarTelon 3s forwards";
}