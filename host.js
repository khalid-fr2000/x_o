let btnRef = document.querySelectorAll('.button-option');
let popupRef = document.querySelector('.popup');
let newgameBtn = document.getElementById('new-game');
let restartBtn =  document.getElementById('restart');
let msgRef = document.getElementById('message');
//Winning Pattern Array
let WinningPattern = [
[0, 1, 2],
[0, 3, 6],
[2, 5, 8],
[6, 7, 8],
[3, 4, 5],
[1, 4, 7],
[0, 4, 8],
[2, 4, 6],
];
//Player 'x' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true))
  //enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
}

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if(letter == "x") {
    msgRef.innerHTML = "&#x1F389; <br> 'x' Wins";
  }
  else{
    msgRef.innerHTML = "&#x1F389; <br> '0' Wins"
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It´s a Draw"
}

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//win logic
const winChecker = () => {
  //Loop thorugh all win patterns
  for(let i of WinningPattern){
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty element are same and would give win as would
    if(element1 != '' && element2 != '' && element3 != ''){
      if(element1 == element2 && element2 == element3){
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
}

//Display x/o on click
btnRef.forEach((element) => {
  element.addEventListener('click', () => {
    if(xTurn){
      xTurn = false;
      //display x
      element.innerText = 'x';
      element.disabled = true;
    } else {
      xTurn = true
      //display y
      element.innerText = 'o';
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if(count === 9){
      drawFunction();
      //It´s a draw since there are a total of 9 boxed
    }
    //check for win on every click
    winChecker();
  });
});
//Enable Buttons and disbale popup on page load
window.onload = enableButtons;