class Estrella { 
    constructor(avX, avY, posX, posY) {
        //parametros de la pelota
        this.incrementoX = avX;
        this.incrementoY = avY;
        this.posX = posX;
        this.posY = posY;
        this.imgp = new Image();
        this.imgp.src = 'img/estrella-de-poder.png';
    }
    //metodo para animar la pelota
    Animar(ctx, ancho, alto) { 
        this.anchoBola = this.imgp.width; //estp es que 
        this.altoBola = this.imgp.height;
        this.posX = this.posX + this.incrementoX;
        this.posY = this.posY + this.incrementoY;
        //colisiones con los bordes
        if (this.posX + this.anchoBola > ancho) { this.incrementoX = -Math.abs(this.incrementoX) };
        if (this.posX < 0) { this.incrementoX = -this.incrementoX };
        if (this.posY + this.altoBola > alto) { this.incrementoY = -Math.abs(this.incrementoY) };
        if (this.posY < 0) { this.incrementoY = -this.incrementoY };
        //dibujar la pelota
        ctx.drawImage(this.imgp, this.posX, this.posY)
    }
    //metodo para detectar colisiones
    colision(X1, Y1, ancho, alto) { 
        let R = false;
        if (((this.posX <= X1 && this.posX + this.imgp.width >= X1) || (this.posX <= X1 + ancho && this.posX + this.imgp.width >= X1 + ancho)) && ((this.posY <= Y1 && this.posY + this.imgp.height >= Y1) || (this.posY <= Y1 + alto && this.posY + this.imgp.height >= Y1 + alto))) { R = true }
        return R;
    }
}