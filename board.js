Board = {
  canvas: undefined,
  ctx: undefined,
  squareSize: 35,
  totalRow: 13,
  nowRow: 12,
  column: 10,
  x: 0,
  y: undefined,
  squaresContainer: [],
  rowClicked: undefined,
  colClicked: undefined,
  sameColorContainer: [],
  score: 0,

  // El juego empieza a ejecutarse
  start: function(idCanvas) {
    this.canvas = document.getElementById(idCanvas);
    this.ctx = this.canvas.getContext("2d");
    this.update();
    this.squareGenerator();
    this.position();
  },
  // Actualiza las filas a medida que avanza el juego. Crea la primera fila, la sube y crea otra aleatoria debajo y así sucesivamente.
  update: function() {
    var rowsCounter = 0;
    this.intervalID = setInterval(
      function() {
        //
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        rowsCounter++;
        if (rowsCounter % 150 == 0) {
          this.rowsGenerator();
        }         


        this.drawSquares();
        this.gameOver();
        this.drawScore();
        // los cuadrados se eliminan // detectar los cuadrados que son iguales
      }.bind(this),
      1000/60
    );
  },

  // Crea X filas de cuadrados
  rowsGenerator: function() {
    this.updateRows();
    this.squareGenerator();
  },

  // Crea 1 fila de cuadrados
  squareGenerator: function() {
    this.y = 455 - (this.totalRow - this.nowRow) * this.squareSize;
    // Crea un array vacío
    this.squaresContainer.push([]);
    // Crea un array de cuadrados del mismo número de su columna
    for (var i = 0; i < this.column; i++) {
      this.squaresContainer[this.squaresContainer.length - 1].push(
        new Squares(this.ctx, this.squareSize, i * this.squareSize, this.y)
      );
    }
  },

  // Pinta los cuadrados de forma aleatoria
  drawSquares: function() {
    this.squaresContainer.forEach(function(rows) {
      rows.forEach(function(square) {
        if (square) {
          square.squaresColor();
        }
      });
    });
  },

  // Actualiza el número de filas
  updateRows: function() {
    this.squaresContainer.forEach(
      function(rows) {
        rows.forEach(
          function(square) {
            if (square) square.y = square.y - this.squareSize;
          }.bind(this)
        );
      }.bind(this)
    );
  },

  // Nos indica la posición clicada
  position: function() {
    this.canvas.addEventListener(
      "click",
      function(e) {
        for (var i = 0; i < this.squaresContainer.length; i++) {
          for (var j = 0; j < this.squaresContainer[i].length; j++) {
            if (
              this.squaresContainer[i][j] &&
              this.squaresContainer[i][j].x < e.layerX &&
              e.layerX < this.squaresContainer[i][j].x + this.squareSize &&
              this.squaresContainer[i][j].y < e.layerY &&
              e.layerY < this.squaresContainer[i][j].y + this.squareSize
            ) {
              this.rowClicked = i;
              this.colClicked = j;
              this.checkSquares(this.rowClicked, this.colClicked);
              return;
            }
          }
        }
      }.bind(this)
    );
  },

  // Comprueba las posiciones true/false del cuadrado clicado
  squareDelimitation: function(row, col) {
    var top, right, bottom, left;
    if (
      this.squaresContainer[row - 1] != undefined &&
      this.squaresContainer[row - 1][col] != null &&
      this.squaresContainer[row]
    ) {
      //null && this.squaresContainer[row]) {
      if (
        this.squaresContainer[row][col].color[0] ==
        this.squaresContainer[row - 1][col].color[0]
      ) {
        top = true;
      } else {
        top = false;
      }
    } else {
      top = undefined;
    }

    if (
      this.squaresContainer[row + 1] != undefined &&
      this.squaresContainer[row + 1][col] != null &&
      this.squaresContainer[row]
    ) {
      if (
        this.squaresContainer[row][col].color[0] ==
        this.squaresContainer[row + 1][col].color[0]
      ) {
        bottom = true;
      } else {
        bottom = false;
      }
    } else {
      bottom = undefined;
    }

    if (
      this.squaresContainer[row][col - 1] != undefined &&
      this.squaresContainer[row][col - 1] != null &&
      this.squaresContainer[row][col]
    ) {
      if (
        this.squaresContainer[row][col].color[0] ==
        this.squaresContainer[row][col - 1].color[0]
      ) {
        left = true;
      } else {
        left = false;
      }
    } else {
      left = undefined;
    }

    if (
      this.squaresContainer[row][col + 1] != undefined &&
      this.squaresContainer[row][col + 1] != null &&
      this.squaresContainer[row][col]
    ) {
      if (
        this.squaresContainer[row][col].color[0] ==
        this.squaresContainer[row][col + 1].color[0]
      ) {
        right = true;
      } else {
        right = false;
      }
    } else {
      right = undefined;
    }

    // console.log(top, right, bottom, left);

    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left
    };
  },

  checkSquares: function(row, col) {
    var someTrue = Object.values(this.squareDelimitation(row, col)).some(
      function(e) {
        return e;
      }
    );
    var clickedRemoved = false; 
    // while(someTrue) {
    var checkTrueArray = checkTrue(this.squareDelimitation(row, col));
    if (checkTrueArray.length != 0) {
      checkTrueArray.forEach(
        function(e) {
          if (e == "top") {
            this.removeSquares(row - 1, col);
          } else if (e == "bottom") {
            this.removeSquares(row + 1, col);
          } else if (e == "right") {
            this.removeSquares(row, col + 1);
          } else if (e == "left") {
            this.removeSquares(row, col - 1);
          }
          if(!clickedRemoved) {
            this.removeSquares(row, col);
            clickedRemoved = true;
          }
        }.bind(this)
      );
    }

    /* someTrue = Object.values(this.squareDelimitation(row,col)).some(function (e) {
        return e
      })
      
    } */
  },

  removeSquares: function(row, col) {
    this.score += 100;
    this.squaresContainer[row][col] = null;
    this.downRow(row, col);
    //score++
  },
  downRow: function(row, col) {
    while (
      this.squaresContainer[row - 1] &&
      this.squaresContainer[row - 1][col]
    ) {
      this.squaresContainer[row][col] = this.squaresContainer[row - 1][col];
      this.squaresContainer[row - 1][col] = null;
      if (this.squaresContainer[row][col])
        this.squaresContainer[row][col].y += this.squareSize;
      row--;
    }
  },

  gameOver: function () {
    if(this.squaresContainer[0].some(function (e) {
      return e ? e.y <= 0 : false;
    })){
      clearInterval(this.intervalID)
      console.log('Game Over')
    }
  },

  drawScore: function (){
   this.ctx.font = "16px Arial";
   this.ctx.fillStyle = "#0095DD";
   this.ctx.fillText("Score: "+this.score, 50, 50);
  }

};

function countFalse(obj) {
  var count = 0;

  Object.values(obj).forEach(function(e) {
    if (!e) {
      count++;
    }
  });
  return count;
}

function checkTrue(obj) {
  return Object.entries(obj)
    .filter(function(e) {
      return e[1] == true;
    })
    .map(function(e) {
      return e[0];
    });
}
