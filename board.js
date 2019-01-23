Board = {
  canvas: undefined,
  ctx: undefined,
  squareSize: 35,
  totalRow : 13,
  nowRow: 12,
  column : 10, 
  x : 0,
  y : undefined,
  squaresContainer : [],
  rowClicked: undefined,
  colClicked: undefined,
  sameColorContainer: [],


  // El juego empieza a ejecutarse
  start: function (idCanvas) {
    this.canvas = document.getElementById(idCanvas)
    this.ctx = this.canvas.getContext("2d")
    this.update()
    this.squareGenerator() 
    
  },
  // Actualiza las filas a medida que avanza el juego. Crea la primera fila, la sube y crea otra aleatoria debajo y así sucesivamente.
  update: function () {
    var rowsCounter = 0;
    setInterval (function () {
      //
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      rowsCounter++
      if(rowsCounter % 200 == 0) {
        this.rowsGenerator()
      }
      this.drawSquares()
      // los cuadrados se eliminan // detectar los cuadrados que son iguales
      this.position()

    }.bind(this), 16);
  },
  
  // Crea X filas de cuadrados
  rowsGenerator: function () {
    this.updateRows()
    this.squareGenerator()
  },

  // Crea 1 fila de cuadrados 
  squareGenerator: function() {
    this.y = 455 - (this.totalRow - this.nowRow) * this.squareSize
    // Crea un array vacío
    this.squaresContainer.push([])
    // Crea un array de cuadrados del mismo número de su columna
    for (var i=0; i<this.column; i++) {
      this.squaresContainer[this.squaresContainer.length-1].push(new Squares (this.ctx,this.squareSize, i*this.squareSize, this.y))
    }
  },

  // Pinta los cuadrados de forma aleatoria
  drawSquares: function() {
    this.squaresContainer.forEach(function (rows) {
      rows.forEach(function (square){
        square.squaresColor()
      })
    }
  )},

  // Actualiza el número de filas 
  updateRows: function() {
    this.squaresContainer.forEach(function (rows) {
      rows.forEach (function (square) {
        square.y = square.y-this.squareSize
      }.bind(this))
    }.bind(this))
  },

  // Nos indica la posición clicada
  
  position: function() { 
        this.canvas.addEventListener("click", function(e) {
          for (var i = 0; i < this.squaresContainer.length; i++) {
            for (var j = 0; j < this.squaresContainer[i].length; j++){
              if (this.squaresContainer[i][j].x < e.layerX && e.layerX < this.squaresContainer[i][j].x+this.squareSize && this.squaresContainer[i][j].y < e.layerY && e.layerY < this.squaresContainer[i][j].y+this.squareSize) {
                this.rowClicked = i;
                this.colClicked = j;
                //this.checkSquares(this.rowClicked, this.colClicked);
                return;
              }                                                                    
          }
       }
    }.bind(this))
  },

  // Comprueba las posiciones true/false del cuadrado clicado
  squareDelimitation: function (row, col){
    var top, right, bottom, left;
  if (this.squaresContainer[row-1] != undefined) {
      if (this.squaresContainer[row][col].color[0] == this.squaresContainer[row-1][col].color[0]) {
        top = true
      }
      else {
        top = false
      } 
} else {
  top = undefined 
}

if (this.squaresContainer[row+1] != undefined) {
  if (this.squaresContainer[row][col].color[0] == this.squaresContainer[row+1][col].color[0]) {
    bottom = true
  }
  else {
    bottom = false
  } 
} else {
    bottom = undefined 
} 

if (this.squaresContainer[row][col-1] != undefined) {
  if (this.squaresContainer[row][col].color[0] == this.squaresContainer[row][col-1].color[0]) {
    left = true
  }
  else {
    left = false
  } 
} else {
    left = undefined 
} 

if (this.squaresContainer[row][col+1] != undefined) {
  if (this.squaresContainer[row][col].color[0] == this.squaresContainer[row][col+1].color[0]) {
    right = true
  }
  else {
    right = false
  } 
} else {
  right = undefined 
} 

console.log(top, right, bottom, left);

return {
  top: top,
  right: right,
  bottom: bottom,
  left: left
}


  },


  checkSquares: function (row, col) {


    //caso base: 4 false/undefined o 3 false/undefined && 1 checked == true 
    var result4false = Object.values(this.squareDelimitation(row,col)).every(function (e) {
      return !e
    })

    if (result4false || (countFalse(this.squareDelimitation(row, col)) == 3 && this.positionRight(row, col, this.squareDelimitation(row, col)))) {
      return;

    //else: checkSquares() cambiando row o col a donde sea true

    } else if (this.squareDelimitation(row, col)) {
      this.checkSquares(row+1, col) 
    } else if (this.squareDelimitation(row, col)) {
      this.checkSquares(row-1, col) 
    } else if (this.squareDelimitation(row, col).col+1) {
      this.checkSquares(col+1, col) 
    } else if (this.squareDelimitation(row, col).col-1) {

    }


    //if (this.squareDelimitation(row, col).top) {
        //this.sameColorContainer.push([rowClicked,colClicked])
   // }

    //if (this.squareDelimitation(row, col).right) {

    //}

    //if (this.squareDelimitation(row, col).bottom) {

   // } 
    //if (this.squareDelimitation(row, col).left) {

    //}


  },



  removeSquares: function (){
    // Splice method?

    },

    positionRight: function (row, col, obj) {
      var position = Object.keys(obj)[Object.values(obj).indexOf(true)];
      
      if (position == "top") {
        return this.squaresContainer[row-1][col].checked
      }

      if (position == "bottom") {
        return this.squaresContainer[row+1][col].checked
      }

      if (position == "right") {
        return this.squaresContainer[row][col+1].checked
      }

      if (position == "left") {
        return this.squaresContainer[row][col-1].checked
      }
  
    }

  }

  function countFalse (obj) {
    var count = 0;

    Object.values(obj).forEach(function (e) {
      if (!e) {
        count++
      }
      
    })
    return count
  }

