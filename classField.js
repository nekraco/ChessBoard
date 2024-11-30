let bo = document.querySelector('body');

//console.log(document.body === bo)


class Field {
	// typeField === oneColor || twoColor;
	constructor(typeField, left, top, sizeCell) {
		this.chessGame = document.getElementById('chessGame');

		this.left = left;
		this.top = top;
		this.sizeCell = sizeCell;
		this.firstCellColor = 0;

		if(typeField === 'oneColor') {
			this.xNumCells = 2;
			this.yNumCells = 6;
		}
		if(typeField === 'twoColor') {
			this.xNumCells = 8;
			this.yNumCells = 8;
		}

		this.createFieldCells(typeField, this.left, this.top, this.firstCellColor);

		this.arCoordsX = this.fillArCoords(this.left);
		this.arCoordsY = this.fillArCoords(this.top);

	}

	createElement(parent, classAdd) {
		let el = document.createElement('div');
		parent.appendChild(el);
		el.classList.add(classAdd);
		return el;
	}

	createCell(x, y, colorCell) {
		this.cell = this.createElement(this.chessGame, 'cell');
		this.cell.classList.add(colorCell);

		this.cell.style.left = x + 'px';
		this.cell.style.top = y + 'px';

		this.cell.style.width = this.sizeCell + 'px';
		this.cell.style.height = this.sizeCell + 'px';

	}

	createStringCells(typeField, x, y, firstCellColor) {  //firstCellColor: 0 || 1
		let cellColor;
		for (let i = x, j = 0; j < this.xNumCells; i += this.sizeCell, j++) {
			if (typeField === 'oneColor') {
				cellColor = 'oneColor';
			}
			if (typeField === 'twoColor') {
				cellColor = j % 2 === firstCellColor ? 'lightColor' : 'darkColor';
			}
			this.createCell(i, y, cellColor);
		}
	}

	createFieldCells(typeField, x, y, firstCellColor) {

		for (let i = y, j = 0; j < this.yNumCells; i += this.sizeCell, j++) {
			let cellColor = j % 2 === firstCellColor ? 0 : 1;
			this.createStringCells(typeField, x, i, cellColor);
		}
	}

	fillArCoords(coordStart) {
		let ar = [coordStart];
		for (let i = 0; i < this.xNumCells; i++) {
			ar.push(coordStart += this.sizeCell);
		}
		return ar;
	}

	createVVV(xxx, yyy, bg, text) {
		this.vvv = this.createElement(this.field, 'vvv');
		this.vvv.draggable = true;
		this.vvv.style.background = bg;
		this.vvv.style.width = this.sizeCell + 'px';
		this.vvv.style.height = this.sizeCell + 'px';
		this.vvv.innerHTML = text;
		this.vvv.style.left = this.arCoordsX[xxx] + 'px';
		this.vvv.style.top = this.arCoordsY[yyy] + 'px';

		return this.vvv;
	}

}

// let fi = new Field(20, 20);
// //
// //
// let shash1 = fi.createVVV(2,2,'#0a0', 'G');
// let shash2 = fi.createVVV(5,6,'#0af', 'B');
// let shash3 = fi.createVVV(1,7,'#fac', 'J');
// let shash4 = fi.createVVV(4,3,'#c00', 'S');
// moveElementDragAndDrop(shash1);
// moveElementDragAndDrop(shash2);
// moveElementDragAndDrop(shash3);
// moveElementDragAndDrop(shash4);
//
// function moveElementDragAndDrop(el) {
// 	let startE;
// 	el.addEventListener('dragstart', function (e) {
// 		startE = e;
// 	});
//
// 	el.addEventListener('drag', function (e) {
//
// 	});
//
// 	el.addEventListener('dragend', function (endE) {
// 		let x = endE.clientX - startE.clientX + el.offsetLeft;
// 		let y = endE.clientY - startE.clientY + el.offsetTop;
//
// 		fff(fi.arCoordsX, x, 'left')
// 		fff(fi.arCoordsY, y, 'top')
//
// 		function fff(arCoords, coordClick, leftOrTop) {
// 			for (let i = 0; i < arCoords.length - 1; i++) {
// 				if(arCoords[i] < coordClick && coordClick < arCoords[i + 1]) {
// 					el.style[leftOrTop] = arCoords[i] + 'px';
// 				}
// 			}
// 		}
// 	});
// }
//
