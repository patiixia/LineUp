window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {



  // Esta función crea una cuadrícula de cuadrados de colores aleatorios cada vez que se clica el botón start.
  function draw() {
  
  var ctx = document.getElementById('canvas').getContext('2d');

  // Crea los rectángulos.
  for (var i = 0; i < 15 ; i++) {
    for (var j = 0; j < 10; j++) {

  // Pinta color a los cuadrados, cada vez que se clica el botón start cambian de color.
    ctx.fillStyle = 'hsl(' + 1000 * Math.random() + ', 90%, 45%)';

                      //ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
                      //Math.floor(255 - 42.5 * j) + ', 100)';
      
  // Define las coordenadas X e Y y el tamaño de los rectángulos en pixeles
  //ctx.fillRect(j *31.5, i * 31.5, 30, 30);
  ctx.fillRect(j * 35.2, i * 35.2, 32, 32);




    
    }
  }
} draw();





// Constructor de cuadrados
//function Square(color, height, width) {
//this.color = color,
//this.height = height,
//this.width  = width;
this.x = x;
this.y = y;

//}

//var green = new Square ( 50, 50);
//var fucsia = new Square ("fucsia", 50, 50);
//var blue = new Square ("blue", 50, 50)
//ar orange = new Square ("orange", 50, 50)




  }
};

