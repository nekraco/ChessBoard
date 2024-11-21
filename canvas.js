class Figures {
	constructor() {
		this.parent = document.getElementById('chessGame');
		this.sizeCanvas = 300;

	}

	createCanvas(x, y, w, h) {
		this.canvas = document.createElement('canvas');
		this.canvas.draggable = true;
		this.canvas.style.position = 'absolute';
		this.canvas.classList.add('canvasField');
		this.canvas.style.left = x;
		this.canvas.style.top = y;
		this.canvas.width = w;
		this.canvas.height = h;
		this.parent.appendChild(this.canvas);
		return this.canvas.getContext('2d');
	}


	drawArc(ctx, x1, y1, x2, y2, r) {
		let [x, y] = getCoordsCenter(x1, y1, x2, y2, r, '+');
		let [angleFirst, angleSecond] = getArcAngles(x1, y1, x2, y2, r, '+');

		let [xMirror, yyMirror] = getCoordsCenter(300 - x1, y1, 300 -x2, y2, r, '-');
		let [angleFirstMirror, angleSecondMirror] = getArcAngles(300 - x1, y1, 300 - x2, y2, r, '-');

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(x, y, r, angleFirst, angleSecond);
		ctx.stroke();
		//ctx.fill();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(xMirror, yyMirror, r, angleFirstMirror, angleSecondMirror);
		ctx.stroke();

	}


	createPawn(left, top) {
		let pawnCtx = this.createCanvas(left, top, this.sizeCanvas, this.sizeCanvas);
		//this.pawnCtx.fillStyle = "#cc8833";
		//this.pawnCtx.rect(100, 30, 100, 240, );
		//this.pawnCtx.fill();
		//pawnCtx.clearRect(0, 0, 300, 300);

		this.drawArc(pawnCtx, 50, 50, 150, 150, 180, '+');
		
	}
}

// *************************************************************************


let fig = new Figures();

fig.createPawn('50px', '50px');






