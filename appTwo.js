const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('#results')
const startGame = document.querySelector('#start-game')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,10,
  15,16,17,18,19,20,21,22,23,24,25,
  30,31,32,33,34,35,36,37,38,39,40,
  45,46,47,48,49,50,51,52,53,54,55
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
 
    if (currentLaserIndex > 15) {
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        setTimeout(()=> squares[currentLaserIndex].classList.remove('laser'), 35)
    
        if (squares[currentLaserIndex].classList.contains('invader')) {
          squares[currentLaserIndex].classList.remove('laser')
          squares[currentLaserIndex].classList.remove('invader')
          squares[currentLaserIndex].classList.add('boom')
    
          setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
          clearInterval(laserId)
    
          const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
          aliensRemoved.push(alienRemoved)
          results++
         } 
         if (resultsDisplay.innerHTML === 'GAME OVER') {
          resultsDisplay.innerHTML === 'GAME OVER'
         } else if (resultsDisplay.innerHTML === 'YOU WON') {
          resultsDisplay.innerHTML === 'YOU WON'
         } else {
          resultsDisplay.innerHTML = results
         }
        }
    }
    
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
    startGame.innerHTML = 'Play again'
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
      startGame.innerHTML = 'Play again'
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WON'
    clearInterval(invadersId)
    startGame.innerHTML = 'Play again'
  }
}

function start() {
  
       if (startGame.innerHTML === 'Play again') {
        location.reload();
        return false;
       } else {
        invadersId = setInterval(moveInvaders, 600)
        document.addEventListener('keydown', shoot)
       }
      
}

startGame.addEventListener('click', start)