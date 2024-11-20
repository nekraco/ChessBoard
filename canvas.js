class Figure{
	constructor() {
		this.parent = document.getElementById('chessGame');

		this.canvas = document.createElement('canvas');
		this.canvas.draggable = true;
		this.canvas.classList.add('canvas');
		this.canvas.width = parseInt('300vw');
		this.canvas.height = parseInt('300vw');
		this.parent.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		// this.ctx.beginPath();
		// this.ctx.moveTo(0, 0);
		// this.ctx.lineTo(300, 300);
		// this.ctx.stroke();
		this.ctx.fillStyle = "#cc8833";
		this.ctx.rect(100, 30, 100, 240);
		this.ctx.fill();
	}
}

let fig = new Figure();

