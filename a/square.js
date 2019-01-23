// Constructor de cuadrados
function Squares(ctx, size, x, y) {
var colors = [["#c7f254","#a1bc31"], ["#c550a0","#be3176"], ["#b8f4fc","#00b2da"], ["#ffa530","#ffa530"]];
this.ctx = ctx;
this.color = colors[Math.floor(Math.random()*colors.length)];
this.height = size;
this.width  = size;
this.x = x;
this.y = y;

}

// Gradientes
Squares.prototype.squaresColor = function() {
  this.ctx.beginPath();
  var gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
  gradient.addColorStop(0, this.color[0]);
  gradient.addColorStop(0, this.color[1]);
  //this.ctx.fill();
  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(this.x, this.y, this.height, this.width);
  //this.ctx.lineWidth = 5;
  //this.ctx.strokeStyle = "white";
  //this.stroke();
  this.ctx.closePath();

  };

  //this.ctx.beginPath();
  //var gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
  //gradient.addColorStop(0, this.color[0]);
  //gradient.addColorStop(0, this.color[1]);
  //this.ctx.fillStyle = gradient;
  //this.ctx.fillRect(this.x, this.y, this.height, this.width);
  //this.ctx.closePath();
