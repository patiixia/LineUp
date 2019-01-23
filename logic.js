window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  Board.start("canvas")
 
} 