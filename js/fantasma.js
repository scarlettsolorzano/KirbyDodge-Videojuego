class Fantasma {
    constructor(incremento, posX, posY) {  
        //parametros de el fantasma
        this.img0 = new Image();
        this.img0.src = "img/img-fantasma/pac00.png";
        this.img1 = new Image();
        this.img1.src = "img/img-fantasma/pac01.png";
        this.img2 = new Image();
        this.img2.src = "img/img-fantasma/pac02.png";
        this.img3 = new Image();
        this.img3.src = "img/img-fantasma/pac03.png";
        this.incremento = incremento;
        this.posX = posX;
        this.posY = posY;
        this.direccion = parseInt(Math.random() * 4)
    }
    //metodo para animar el fantasma
    Animar(ctx, ancho, alto) {
        this.anchoBola = this.img0.width;
        this.altoBola = this.img0.height;
        //movimiento del fantasma
        switch (this.direccion) {
            case 0: this.posY -= this.incremento;
                break;
            case 1: this.posX += this.incremento;
                break;
            case 2: this.posY += this.incremento;
                break;
            case 3: this.posX -= this.incremento;
                break;
        }
        //colisiones con los bordes
        if (this.posX + this.anchoBola > ancho) { this.posX = ancho - this.anchoBola; this.cambiarMovimiento(1) };
        if (this.posX < 0) { this.posX = 0; this.cambiarMovimiento(2) };
        if (this.posY + this.altoBola > alto) { this.posY = alto - this.altoBola; this.cambiarMovimiento(3) };
        if (this.posY < 0) { this.posY = 0; this.cambiarMovimiento(0) };
        //dibujar el fantasma volteando a la direccion que va
        switch (this.direccion) {
            case 0: ctx.drawImage(this.img0, this.posX, this.posY);
                break;
            case 1: ctx.drawImage(this.img1, this.posX, this.posY);
                break;
            case 2: ctx.drawImage(this.img2, this.posX, this.posY);
                break;
            case 3: ctx.drawImage(this.img3, this.posX, this.posY);
                break;
        }
        //cambio de direccion aleatorio
        if (parseInt(Math.random() * 50) == 0) {
            this.cambiarMovimiento(-1)
        }
    }
    //metodo para cambiar la direccion del fantasma
    cambiarMovimiento(evitar) {
        do {
            this.direccion = parseInt(Math.random() * 4)
        } while (this.direccion == evitar)
    }
    //metodo para detectar colisiones
    colision(X1, Y1, ancho, alto) {
        let R = false;
        if (((this.posX <= X1 && this.posX + this.img0.width >= X1) || (this.posX <= X1 + ancho && this.posX + this.img0.width >= X1 + ancho)) && ((this.posY <= Y1 && this.posY + this.img0.height >= Y1) || (this.posY <= Y1 + alto && this.posY + this.img0.height >= Y1 + alto))) { R = true }
        return R;
    }
}