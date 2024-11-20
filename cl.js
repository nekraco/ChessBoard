let bo = document.querySelector('body');

//console.log(document.body === bo)


class Field {
	constructor(xInitial, yInitial) {
		let chessGame = document.querySelector('#chessGame');
		this.field = this.createElement(chessGame, 'field')

		this.sizeCell = this.getSizeCellFromCss();
		this.xInitial = xInitial;
		this.yInitial = yInitial;
		this.num = 8;
		this.firstCellColor = 0;
		this.createFieldCells(this.xInitial, this.yInitial, this.num, this.firstCellColor);
		this.arCoordsX = this.fillArCoords(this.xInitial);
		this.arCoordsY = this.fillArCoords(this.xInitial);
		
	}

	getSizeCellFromCss() {
		let spareElement = this.createElement(this.field, 'cell');
		let sizeCell = spareElement.offsetWidth;
		this.field.removeChild(spareElement)
		return sizeCell;
	}

	createElement(parent, classAdd) {
		let el = document.createElement('div');
		parent.appendChild(el);
		el.classList.add(classAdd);
		return el;
	}

	createCell(x, y, col) {
		this.cell = this.createElement(this.field, 'cell');
		this.cellColorClass = col === 'dark' ? 'darkColor' : 'lightColor';
		this.cell.classList.add(this.cellColorClass);

		this.cell.style.left = x + 'px';
		this.cell.style.top = y + 'px';

	}

	createStringCells(x, y, num, firstCellColor) {  //firstCellColor: 0 || 1
		let lengthString = x + this.sizeCell * num;
		for (let i = x, j = 0; i < lengthString, j < num; i += this.sizeCell, j++) {
			let cellColor = j % 2 === firstCellColor ? 'light' : 'dark';
			this.createCell(i, y, cellColor);
		}
	}

	createFieldCells(x, y, num, firstCellColor) {
		let heightColumn = y + this.sizeCell * num;
		for (let i = y, j = 0; i < heightColumn, j < num; i += this.sizeCell, j++) {
			let cellColor = j % 2 === firstCellColor ? 0 : 1;
			this.createStringCells(x, i, num, cellColor);
		}
	}

	fillArCoords(coordStart) {
		let ar = [coordStart];
		for (let i = 0; i < this.num; i++) {
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
//
//
// let shash1 = fi.createVVV(2,2,'#0a0', 'G');
// let shash2 = fi.createVVV(5,6,'#0af', 'B');
// let shash3 = fi.createVVV(1,7,'#fac', 'J');
// let shash4 = fi.createVVV(4,3,'#c00', 'S');
// moveElementDragAndDrop(shash1);
// moveElementDragAndDrop(shash2);
// moveElementDragAndDrop(shash3);
// moveElementDragAndDrop(shash4);

function moveElementDragAndDrop(el) {
	let startE;
	el.addEventListener('dragstart', function (e) {
		startE = e;
	});

	el.addEventListener('drag', function (e) {

	});

	el.addEventListener('dragend', function (endE) {
		let x = endE.clientX - startE.clientX + el.offsetLeft;
		let y = endE.clientY - startE.clientY + el.offsetTop;

		fff(fi.arCoordsX, x, 'left')
		fff(fi.arCoordsY, y, 'top')

		function fff(arCoords, coordClick, leftOrTop) {
			for (let i = 0; i < arCoords.length - 1; i++) {
				if(arCoords[i] < coordClick && coordClick < arCoords[i + 1]) {
					el.style[leftOrTop] = arCoords[i] + 'px';
				}
			}
		}
	});
}

