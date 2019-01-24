// Constructor de cuadrados
function Squares(ctx, size, x, y) {
  var colors = [["#c7f254","#a1bc31"], ["#c550a0","#be3176"], ["#b8f4fc","#00b2da"], ["#f9a314","#f9a314"]];
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
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(this.x, this.y, this.height, this.width);
    this.ctx.strokeStyle = "rgb(29, 29, 29)";
    this.ctx.strokeRect(this.x, this.y, this.height, this.width)
    this.ctx.closePath();
  
    };

  //this.ctx.beginPath();
  //var gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
  //gradient.addColorStop(0, this.color[0]);
  //gradient.addColorStop(0, this.color[1]);
  //this.ctx.fillStyle = gradient;
  //this.ctx.fillRect(this.x, this.y, this.height, this.width);
  //this.ctx.closePath();



// Bordes negros alrededor de cada cuadrado

  //this.ctx.beginPath();
  //this.ctx.fillRect(this.x, this.y, this.height, this.width);
  //this.ctx.fillStyle = this.color;
  //this.ctx.fill ();
  //this.ctx.lineWidth = 3;
  //this.ctx.strokeStyle = 'black';
  //this.ctx.stroke();
  //};