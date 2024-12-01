class Figures {
	constructor(sizeCanvasFinal) {
		this.fs = new Functions();
		this.chessGame = document.getElementById('chessGame');

		//sizes
		this.sizeCanvasInitial = 300;
		this.sizeCanvasFinal = sizeCanvasFinal;
		this.coeffSize = this.sizeCanvasFinal / this.sizeCanvasInitial;
		this.lineWidthInitial = 12;
		this.lineWidthFinal = this.lineWidthInitial * this.coeffSize;

		//colorsFill
		this.colorLightFill = '#b94';
		this.colorDarkFill = '#000';

		//colorsStroke
		this.colorLightStroke = '#333';
		this.colorDarkStroke = '#000';

	}

	createCanvas(x, y, w, h) {
		let canvas = document.createElement('canvas');
		canvas.draggable = true;
		canvas.style.position = 'absolute';
		canvas.classList.add('canvasField');
		canvas.style.left = x + 'px';
		canvas.style.top = y + 'px';
		canvas.width = w;
		canvas.height = h;
		this.chessGame.appendChild(canvas);
		return canvas;
	}

	getArCoordsMirror(arCoords) {
		let arMirrorCoords = [];
		for (let i = 0; i < arCoords.length; i++) {
			arMirrorCoords.push(i % 2 === 1 ? arCoords[i] : (this.sizeCanvasInitial - arCoords[i]));
		}
		return arMirrorCoords;
	}

	draw(name, ctx, arCoords, radius, vector, typeDraw, color) {
		arCoords = [...arCoords];

		for (let i = 0; i < arCoords.length; i++) {
			arCoords[i] = arCoords[i] * this.coeffSize;
		}
		radius = radius * this.coeffSize;

		ctx.beginPath();
		if (name === 'POLYGON') {
			ctx.moveTo(arCoords[0], arCoords[1]);
			for (let x = 2, y = 3; x < arCoords.length; x += 2, y += 2) {
				ctx.lineTo(arCoords[x], arCoords[y]);
			}
		}
		if (name === 'ARC') {
			let [x1, y1, x2, y2] = [...arCoords];
			let [x, y] = this.fs.getCoordsCenter(x1, y1, x2, y2, radius, vector);
			let [angleFirst, angleSecond] = this.fs.getArcAngles(x1, y1, x2, y2, radius, vector);
			ctx.arc(x, y, radius, angleFirst, angleSecond);
		}
		if (typeDraw === 'stroke' || typeDraw === 'stroke+') {
			ctx.strokeStyle = color;
			ctx.lineWidth = this.lineWidthFinal;

			if (typeDraw === 'stroke+') {
				ctx.closePath();
			}

			ctx.stroke();
		}
		if (typeDraw === 'fill') {
			ctx.fillStyle = color;
			ctx.fill();
		}
	}

	drawPolygon(arCoords, typeDraw, mirror, color) {
		let ctx = this.ctx;
		this.draw('POLYGON', ctx, arCoords, '', '', typeDraw, color);
		let arMirrorCoords = this.getArCoordsMirror(arCoords);

		if (mirror) {
			this.draw('POLYGON', ctx, arMirrorCoords, '', '', typeDraw, color);
		}
	}

	drawArc(arCoords, radius, typeDraw, mirror, vector, color, old) {
		let ctx = this.ctx;
		let vector1 = vector[0];
		let vector2 = vector[1];

		this.draw('ARC', ctx, arCoords, radius, vector1, typeDraw, color, old);
		let arMirrorCoords = this.getArCoordsMirror(arCoords);
		if (mirror) {
			this.draw('ARC', ctx, arMirrorCoords, radius, vector2, typeDraw, color, old);
		}
	}

	createPawn(left, top, color) {
		let colorFill = color === '+' ? this.colorLightFill : this.colorDarkFill;
		let colorStroke = color === '+' ? this.colorDarkStroke : this.colorLightStroke;
		let size = this.sizeCanvasFinal;

		let canvas = this.createCanvas(left, top, size, size);
		this.ctx = canvas.getContext('2d');
		//drawPolygon(arCoords, typeDraw, mirror, color, lineWidth)
		//drawArc(arCoords, radius, typeDraw, mirror, vector, color, lineWidth)

		//Сначала закрашиваем, потом рисуем контур!!!
		//стрела вверх - закраска
		this.drawPolygon([115, 240, 150, 110, 150, 240], 'fill', true, colorFill);
		//стрела вверх - контур
		this.drawPolygon([115, 240, 150, 110, 150, 240], 'stroke+',
			true, colorFill);

		//раскрашивание головы
		this.drawArc([153, 64, 140, 120], 29, 'stroke+', true, '+-', colorFill);
		this.drawArc([153, 64, 140, 120], 29, 'fill', true, '+-', colorFill);
		//рисуем контур головы
		this.drawArc([152, 62, 130, 123], 35, 'stroke', true, '+-', colorStroke);

		//раскрашивание тела
		let x1 = 131;
		let x2 = 91;
		for (let i = 0; i < 6; i++) {
			x1 += this.lineWidthFinal / 5;
			x2 += this.lineWidthFinal / 5;
			this.drawArc([x1, 120, x2, 240], 150, 'stroke', true, '-+', colorFill);
		}
		//рисуем контур туловища
		this.drawArc([130, 120, 89, 240], 150, 'stroke', true, '-+',
			colorStroke);

		//закрашиваем подставку
		this.drawPolygon([85, 260, 90, 240, 210, 240, 215, 260], 'fill',
			false, colorFill);
		//рисуем контур подставки
		this.drawPolygon([85, 260, 90, 240, 210, 240, 215, 260], 'stroke+',
			false, colorStroke);

		return canvas;
	}

}

// *************************************************************************


//let fig = new Figures(50);

//fig.createPawn('50px', '50px', '+');
//fig.createPawn('50px', '200px');





