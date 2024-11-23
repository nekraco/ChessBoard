class Functions{

	getObjValueTwoPoints(x1, y1, x2, y2) {
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


	getCoordsCenter(x1, y1, x2, y2, r, vector) {
		let o = this.getObjValueTwoPoints(x1, y1, x2, y2);

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

	getArcAngles(x1, y1, x2, y2, r, vector) {
		let o = this.getObjValueTwoPoints(x1, y1, x2, y2);
		let [xCenter, yCenter] = this.getCoordsCenter(x1, y1, x2, y2, r, vector);
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

}



