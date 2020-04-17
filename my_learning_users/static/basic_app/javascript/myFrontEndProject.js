var player1 = prompt("Player one name? (You will be blue)")
var player1Color = {
  'background-color': 'rgb(86, 151, 255)',
  'background-image': 'url("willow.jpg")',
  'background-position': 'center',
  'background-size': 'contain'
}


var player2 = prompt("Player two name? (You will be red)")
var player2Color = {
  'background-color': 'rgb(237, 45, 73)',
  'background-image': 'url("bruce.jpg")',
  'background-position': 'center',
  'background-size': 'contain'
}

$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.")

var board = $('table tr')

function changeColor(rowIndex,colIndex,color){
  return board.eq(rowIndex).find('td').eq(colIndex).find('button').css(color);
}

function checkColor(rowIndex,colIndex){
  return board.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorCell = checkColor(5,colIndex);
  for (var row = 5; row > -1; row--){
    colorCell = checkColor(row,colIndex);
    if (colorCell === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatch(one,two,three,four) {
  if (one == two && one == three && one == four && one !== 'rgb(128, 128, 128)' && one !== undefined){
    return true;
  }
}

function winRow() {
  for (var row = 0; row < 6; row++){
    for (var col = 0; col < 4; col++){
      if (colorMatch(checkColor(row,col),checkColor(row,col+1),checkColor(row,col+2),checkColor(row,col+3))){
        return true;
      }else{
        continue;
      }
    }
  }
}

function winCol() {
  for (var col = 0; col < 7; col++){
    for (var row = 0; row < 3; row++){
      if (colorMatch(checkColor(row,col),checkColor(row+1,col),checkColor(row+2,col),checkColor(row+3,col))){
        console.log("Column win")
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagWin() {
  for (var row = 0; row < 6; row++){
    for (var col = 0; col < 7; col++){
      if (colorMatch(checkColor(row,col),checkColor(row+1,col+1),checkColor(row+2,col+2),checkColor(row+3,col+3))){
        console.log("diag1 win")
        return true;
      }else if (colorMatch(checkColor(row,col),checkColor(row-1,col+1),checkColor(row-2,col+2),checkColor(row-3,col+3))){
        console.log("diag2 win")
        return true;
      }else {
        continue;
      }
    }
  }
}


function gameEnd(winner) {
  $('h1').text(winner+' Wins, Refresh to start again.');
  $('h2').fadeOut("fast");
  $('h3').fadeOut("fast");

}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;



$('.board button').on('click',function() {
  // var row = $(this).closest("tr").index();
  var col = $(this).closest("td").index();

  changeColor(checkBottom(col),col,currentColor);

  if (winRow() || winCol() || diagWin()){
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }

})
