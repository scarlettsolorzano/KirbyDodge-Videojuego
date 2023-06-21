class Serpiente {
	constructor(X, Y, largo, incremento) { //parametros de la serpiente
		this.img0_0 = new Image(); this.img0_0.src = "img/img-serpiente/serp01-0.png"; //cabeza
		this.img0_1 = new Image(); this.img0_1.src = "img/img-serpiente/serp01-1.png"; //cuerpo
		this.img0_2 = new Image(); this.img0_2.src = "img/img-serpiente/serp01-2.png";  //cola
		this.img0_3 = new Image(); this.img0_3.src = "img/img-serpiente/serp01-3.png"; //cuerpo
		this.img4 = new Image(); this.img4.src = "img/img-serpiente/serp02.png"; //cabeza
		this.img5 = new Image(); this.img5.src = "img/img-serpiente/serp03.png"; //cabeza
		this.posX = []; 
		this.posY = [];
		this.largo = largo; //largo de la serpiente
		for (let i = 0; i < largo; i++) { //posicion de la serpiente
			this.posX.push(X); 
			this.posY.push(Y); 
		}
		this.incremento = incremento; //velocidad de la  serpiente
		this.direccion = parseInt(Math.random() * 4); //direccion de la serpiente
		this.ii = 0; //contador para la animacion
		this.oscilacion = [0.0000, 0.3420, 0.6428, 0.8660, 0.9848, 0.9848, 0.8660, 
			0.6428, 0.3420, 0.0000, -0.3420, -0.6428, -0.8660, -0.9848,
			-0.9848, -0.8660, -0.6428, -0.3420, 0.0000]; //oscilacion de la serpiente
	}
	cambiodireccion(evitar) { //cambio de direccion de la serpiente
		var nuevadir; 
		do { //evitar que la serpiente se devuelva
			nuevadir = parseInt(Math.random() * 4); 
		} while (nuevadir == evitar); 
		this.direccion = nuevadir; 
	} 
	mover(ctx, ancho, alto) { //movimiento de la serpiente
		this.ii++; //contador para la animacion
		var P = this.oscilacion[this.ii % this.oscilacion.length]; //oscilacion de la serpiente
		P = P * 5;
		//-- recorrer la posición de cada segmento del cuerpo (exepto la cabeza)
		for (let i = this.largo - 1; i > 0; i--) {
			this.posX[i] = this.posX[i - 1];
			this.posY[i] = this.posY[i - 1];
		}
		//--- leemos el ancho de una de las imagenes (todas miden lo mismo)
		this.Ancho = this.img4.width;
		this.Alto = this.img4.height;
		//--- Incrementamos la posición de la cabeza segun la dirección
		if (this.direccion == 0) {
			this.posY[0] -= this.incremento; this.posX[0] += P;
		} else if (this.direccion == 1) {
			this.posX[0] += this.incremento; this.posY[0] += P;
		} else if (this.direccion == 2) {
			this.posY[0] += this.incremento; this.posX[0] -= P;
		} else if (this.direccion == 3) {
			this.posX[0] -= this.incremento; this.posY[0] -= P;
		}
		//---validar las fronteras de la cabeza---
		if (this.posX[0] > ancho - this.Ancho) { this.posX[0] = ancho - this.Ancho; this.cambiodireccion(1); }
		if (this.posY[0] > alto - this.Alto) { this.posY[0] = alto - this.Alto; this.cambiodireccion(2); }
		if (this.posX[0] < 0) { this.posX[0] = 0; this.cambiodireccion(3); }
		if (this.posY[0] < 0) { this.posY[0] = 0; this.cambiodireccion(0); }
		//-- pintar cuerpo (execepto cabeza y cola)
		for (let i = 1; i < this.largo - 1; i++) {
			ctx.drawImage(this.img4, this.posX[i], this.posY[i]);
		}
		//--- pintar cola
		ctx.drawImage(this.img5, this.posX[this.largo - 1], this.posY[this.largo - 1]);
		//-- pintar cabeza segun la dirección
		switch (this.direccion) {
			case 0: ctx.drawImage(this.img0_0, this.posX[0], this.posY[0]); break;
			case 1: ctx.drawImage(this.img0_1, this.posX[0], this.posY[0]); break;
			case 2: ctx.drawImage(this.img0_2, this.posX[0], this.posY[0]); break;
			case 3: ctx.drawImage(this.img0_3, this.posX[0], this.posY[0]); break;
		}
		//cambio de dirección aleatorio 
		if (parseInt(Math.random() * 50) == 0) this.cambiodireccion(-1);
	}
	contacto(X1, Y1, ancho, alto) {
		let R = false;
		//verificamos si hay contacto con todos los segmentos
		for (let i = this.largo - 1; i > 0; i--) {
			if (((this.posX[i] <= X1 && this.posX[i] + this.img4.width >= X1) || (this.posX[i] <= X1 + ancho && this.posX[i] + this.img4.width >= X1 + ancho)) && 
				((this.posY[i] <= Y1 && this.posY[i] + this.img4.height >= Y1) || (this.posY[i] <= Y1 + alto && this.posY[i] + this.img4.height >= Y1 + alto))) {
				R = true;
			}
		}
		return R;
	}
}