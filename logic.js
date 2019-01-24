window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    Board.start("canvas")

    document.getElementById("start-button").style.display = "none"
  };

 
} 