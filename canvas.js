class Figures {
	constructor() {
		this.parent = document.getElementById('chessGame');
		this.sizeCanvas = 300;
		//alert(888)
		// this.ctx.beginPath();
		// this.ctx.moveTo(0, 0);
		// this.ctx.lineTo(300, 300);
		// this.ctx.stroke();
		// this.ctx.fillStyle = "#cc8833";
		// this.ctx.rect(100, 30, 100, 240);
		// this.ctx.fill();
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

	drawPoint(ctx, x, y, di) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(x, y, di, 0, 7);
		ctx.fill();
	}

	drawMathFunc(ctx, x1, y1, x2, y2) {
		let x = 0;
		let y;
		let z;
		let xMin = Math.min(x1, x2);
		let yMin = Math.min(y1, y2);

		let xx = x2 - x1;
		let yy = y2 - y1;
		let k = yy / xx;

		let x3 = Math.abs(xx / 2) + xMin;
		let y3 = Math.abs(yy / 2) + yMin;

		this.drawPoint(ctx, x3, y3, 4);


		let drawPoint = this.drawPoint;
		let stop = setInterval(function () {

			x++;
			y = k * x + (y1 - k * x1);
			z = -1 / k * x + 1 / k * x3 + y3;
			drawPoint(ctx, x, y, 1);
			drawPoint(ctx, x, z, 1);

			if (x === 500) {
				clearInterval(stop);
			}
		}, 10)
	}

	drawLine(ctx, x1, y1, x2, y2, mirror) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();

		if (mirror) {
			ctx.beginPath();
			ctx.moveTo(this.sizeCanvas - x1, y1);
			ctx.lineTo(this.sizeCanvas - x2, y2);
			ctx.stroke();
		}


	}

	drawArc(ctx, x1, y1, x2, y2, r) {

		let [x, y] = getCoordsCenter(x1, y1, x2, y2, r);
		let [angleFirst, angleSecond] = getArcAngles(x1, y1, x2, y2, r);
		console.log(angleFirst)
		console.log(angleSecond)

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(x, y, r, angleFirst, angleSecond);
		//ctx.stroke();
		ctx.fill();

	}

	createPawn(left, top, x1, y1, x2, y2, r) {
		let pawnCtx = this.createCanvas(left, top, this.sizeCanvas, this.sizeCanvas);
		//this.pawnCtx.fillStyle = "#cc8833";
		//this.pawnCtx.rect(100, 30, 100, 240, );
		//this.pawnCtx.fill();
		this.drawLine(pawnCtx, x1, y1, x2, y2, false);
		this.drawPoint(pawnCtx, x1, y1, 3);
		this.drawPoint(pawnCtx, x2, y2, 3);
		this.drawArc(pawnCtx, x1, y1, x2, y2, r);


		//this.drawMathFunc(pawnCtx, x1, y1, x2, y2);
	}
}
 // *************************************************************************


let fig = new Figures();
fig.createPawn('50px', '50px', 150, 0, 150, 101, 55);

function getObjValueTwoPoints(x1, y1, x2, y2) {
	let xMin = Math.min(x1, x2);
	let yMin = Math.min(y1, y2);
	let xDiff = x2 - x1;
	let yDiff = y2 - y1;
	let xMiddle = Math.abs(xDiff / 2) + xMin;
	let yMiddle = Math.abs(yDiff / 2) + yMin;
	let ctg = xDiff / yDiff;
	let lengthAB = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	return {
		xMin,
		yMin,
		xDiff,
		yDiff,
		xMiddle,
		yMiddle,
		ctg,
		lengthAB,
	}
}


function getCoordsCenter(x1, y1, x2, y2, r) {
	let o = getObjValueTwoPoints(x1, y1, x2, y2);

	let lengthMidPerpend = Math.sqrt(r * r - Math.pow(o.lengthAB / 2, 2));
	//console.log(o.xMiddle)


	let xCenter1 = o.xMiddle + (lengthMidPerpend / (Math.sqrt(Math.pow(o.ctg, 2) + 1)));
	let xCenter2 = o.xMiddle - (lengthMidPerpend / (Math.sqrt(Math.pow(o.ctg, 2) + 1)));
	let yCenter1 = -o.ctg * xCenter1 + o.ctg * o.xMiddle + o.yMiddle;
	let yCenter2 = -o.ctg * xCenter2 + o.ctg * o.xMiddle + o.yMiddle;

	let x00_1 = xCenter1 + r;
	let x00_2 = xCenter2 + r;
	let y00_1 = yCenter1;
	let y00_2 = yCenter2;

	let arResult = [];
	arResult.push(xCenter1, yCenter1, xCenter2, yCenter2);

	return arResult;
}

function getArcAngles(x1, y1, x2, y2, r) {
	let o = getObjValueTwoPoints(x1, y1, x2, y2);
	let [xCenter, yCenter] = getCoordsCenter(x1, y1, x2, y2, r);
	let xStart = xCenter + r;
	let yStart = yCenter;

	let angleFirst;
 //A - ближайшая точка
	let A = [];

	console.log(yCenter, y1, y2)

	if(y1 >= yCenter && y2 >= yCenter) {
		 A.push(x1 < x2 ? x2 : x1);
		 A.push(A[0] === x1 ? y1 : y2);
		 angleFirst = getAcos(A[0], A[1], xStart, yStart);
		console.log(1)
	} else if(y1 >= yCenter) {
		 A.push(x1, y1);
		angleFirst = getAcos(A[0], A[1], xStart, yStart);
		console.log(2)
	} else if(y2 >= yCenter) {
		 A.push(x2, y2);
		angleFirst = getAcos(A[0], A[1], xStart, yStart);
		console.log(3)
	} else {
		A.push(x1 < x2 ? x1 : x2);
		A.push(A[0] === x1 ? y1 : y2);
		angleFirst = 2 * Math.PI - getAcos(A[0], A[1], xStart, yStart);
		console.log(4)
	}

	let angleSecond = getAcos(x1, y1, x2, y2) + angleFirst;
	return [angleFirst, angleSecond]


	function getAcos(x1, y1, x2, y2) {
		let lengthAB = getLengthAB(x1, y1, x2, y2);
		let cos = 1 - (lengthAB * lengthAB) / (2 * r * r);
		return Math.acos(cos);


		function getLengthAB(x1, y1, x2, y2) {
			let xDiff = x2 - x1;
			let yDiff = y2 - y1;
			return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		}
	}
}




