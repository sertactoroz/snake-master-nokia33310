// ANLAMADIM - ilk satırda tam olarak ne diyor ?
document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span#scoreBoard')
  const startBtn = document.querySelector('.start')
  const headerBox = document.getElementById('headerBox')
  
  const width = 16
  let currentIndex = 0 //so first div in our grid
  let appleIndex = 0 //so first div in our grid
  let currentSnake = [2,1,0] 
  let direction = 1
  let score = 0
  let speed = 1.5
  let intervalTime = 0
  let interval = 0

  //to start, and restart the game
  function startGame() {
    countDownBox.style.display = 'none';
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 100
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    
    // ANLAMADIM!
    interval = setInterval(moveOutcomes, intervalTime)
    
  }

  //function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {

    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      headerBox.style.display ="";
      return clearInterval(interval) //this will clear the interval if any of the above happen
     
    }
    // ANLAMADIM! NEDEN const? 
    const tail = currentSnake.pop() //removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }

  //generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
  }


  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      direction = - width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = + width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }

 
  document.addEventListener('keyup', control)

  
  function countDown(){
    
    headerBox.style.display = 'none';
    let counter = 0
    let list = ["Ready","Set","Go!"]
    let countDownBox = document.getElementById('countDownBox')
    countDownBox.style.display = '';
    countDownBox.innerHTML = list[0];

  function countDownTimer(){
      if(counter<2){
      counter++;
      countDownBox.innerHTML = list[counter];
    }else{
      clearInterval(myInterval);
      startGame();
    }
  }
  let myInterval = setInterval(countDownTimer,1000)
  }
  
  // Execute a function when the user releases a key on the keyboard
  document.addEventListener("keyup", (KeyboardEvent) => {
    if (KeyboardEvent.keyCode === 32 || KeyboardEvent.keyCode === 13){
  countDown();
    } 
  });

  startBtn.addEventListener('click', () => {
    countDown();
  });

// oyun başladığında keypressi simon gamedeki gibi deactive et. (var started = false;)
  



});
