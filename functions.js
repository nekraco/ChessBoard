

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


function getCoordsCenter(x1, y1, x2, y2, r, vector) {
	let o = getObjValueTwoPoints(x1, y1, x2, y2);

	let lengthMidPerpend = Math.sqrt(r * r - Math.pow(o.lengthAB / 2, 2));


	let xCenter1 = o.xMiddle + (lengthMidPerpend / (Math.sqrt(o.ctg * o.ctg + 1)));
	let xCenter2 = o.xMiddle - (lengthMidPerpend / (Math.sqrt(o.ctg * o.ctg + 1)));
	let yCenter1 = -o.ctg * xCenter1 + o.ctg * o.xMiddle + o.yMiddle;
	let yCenter2 = -o.ctg * xCenter2 + o.ctg * o.xMiddle + o.yMiddle;

	let xCenter = vector === '+' ? xCenter1 : xCenter2;
	let yCenter = vector === '+' ? yCenter1 : yCenter2;

	//console.log(xCenter, yCenter)

	return [xCenter, yCenter];
}

function getArcAngles(x1, y1, x2, y2, r, vector) {
	let o = getObjValueTwoPoints(x1, y1, x2, y2);
	let [xCenter, yCenter] = getCoordsCenter(x1, y1, x2, y2, r, vector);
	let xStart = xCenter + r;
	let yStart = yCenter;

	let angleFirst;
	let angleSecond;
	//A - ближайшая точка
	let A = [];

//	console.log(yCenter, y1, y2)

	if (y1 >= yCenter && y2 >= yCenter) {
		A.push(x1 < x2 ? x2 : x1);
		A.push(A[0] === x1 ? y1 : y2);
		angleFirst = getAcos(A[0], A[1], xStart, yStart);
		angleSecond = getAcos(x1, y1, x2, y2) + angleFirst;
		//console.log(1)
	} else if (y1 >= yCenter) {
		A.push(x1, y1);
		angleFirst = getAcos(A[0], A[1], xStart, yStart);
		angleSecond = getAcos(x1, y1, x2, y2) + angleFirst;
		//console.log(2)
	} else if (y2 >= yCenter) {
		angleFirst = getAcos(x2, y2, xStart, yStart);
		angleSecond = getAcos(x1, y1, xStart, yStart);
		if (angleFirst + angleSecond >= Math.PI) {
			A.push(x2, y2);
			angleFirst = getAcos(A[0], A[1], xStart, yStart);
			angleSecond = getAcos(x1, y1, x2, y2) + angleFirst;
		} else {
			angleFirst = - angleSecond;
			angleSecond = getAcos(x2, y2, xStart, yStart);
		}

		//console.log(3)
	} else {
		A.push(x1 < x2 ? x1 : x2);
		A.push(A[0] === x1 ? y1 : y2);
		angleFirst = 2 * Math.PI - getAcos(A[0], A[1], xStart, yStart);
		angleSecond = getAcos(x1, y1, x2, y2) + angleFirst;
		//console.log(4)
	}
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

//неиспользуемые пока :)

function drawPoint(ctx, x, y, di) {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.arc(x, y, di, 0, 7);
	ctx.fill();
}

function drawMathFunc(ctx, x1, y1, x2, y2) {
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

function drawLine(ctx, x1, y1, x2, y2, mirror) {
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

