class Game {
	constructor(sizeCell) {
		let leftChessBoard, lCB = 100;
		let topChessBoard, tCB = 20;
		let leftStorageBoard, lSB = lCB + sizeCell * 8 + sizeCell;
		let topStorageBoard, tSB = tCB + sizeCell;


		this.chessBoard  = new Field('twoColor', lCB, tCB, sizeCell);
		this.storageBoard =  new Field('oneColor', lSB, tSB, sizeCell);

		let figures = new Figures(sizeCell);
		this.sizeCell = sizeCell;

		this.arPawns = [];
		let figureColorFlag = '';
		for (let i = 0; i < 16; i++) {
			figureColorFlag = i < 8 ? '+' : '-';
			let left = i < 8 ? this.storageBoard.arCoordsX[0] : this.storageBoard.arCoordsX[1];
			let top = i < 8 ? this.storageBoard.arCoordsY[0] : this.storageBoard.arCoordsY[0];
			//this.arPawns(figures.createPawn(left, top, figureColorFlag));

			let pawn = figures.createPawn(left, top, figureColorFlag);
			this.moveElementDragAndDrop(pawn);
		}

		console.log(this.sizeCell)

		//figures.createPawn(50, 50, '+');
		//figures.createPawn(50, 200);

	}

	moveElementDragAndDrop(el) {
		let arCoordsX = this.chessBoard.arCoordsX;
		let arCoordsY = this.chessBoard.arCoordsY;
		let sizeCell = this.sizeCell;

		let startE;
		el.addEventListener('dragstart', function (e) {
			startE = e;
		});

		el.addEventListener('drag', function (e) {

		});

		el.addEventListener('dragend', function (endE) {
			let x = endE.clientX - startE.clientX + el.offsetLeft + sizeCell / 2;
			let y = endE.clientY - startE.clientY + el.offsetTop + sizeCell / 2;
			// put - ставить
			putsFigure(arCoordsX, x, 'left');
			putsFigure(arCoordsY, y, 'top');
			console.log(arCoordsY)
			console.log(y)

			function putsFigure(arCoords, coordClick, leftOrTop) {
				for (let i = 0; i < arCoords.length - 1; i++) {
					if (arCoords[i] < coordClick && coordClick < arCoords[i + 1]) {
						el.style[leftOrTop] = arCoords[i] + 'px';
					}
				}
			}
		});
	}


}

new Game(70);