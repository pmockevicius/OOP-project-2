
class GameItem {

    createItem(x, y) {
        const container = document.createElement("div")
        document.body.appendChild(container)
        this.height = container.style.height = "40px";
        this.width = container.style.width = "40px";
        container.style.backgroundColor = "black"
        container.style.position = "absolute"
        container.style.left = `${x}px`
        container.style.bottom = `${y}px`
        // container.style.backgroundColor = "blue"
        // container.style.backgroundImage = "url('images/tank.png')"
        return container
    }

}

class Enemy extends GameItem {

    constructor() {
        super()
       this.createEnemy()
       this.enemyArr = []
       console.log(this.enemyArr)
    }



    createEnemy(){
        this.positionX = Math.floor(Math.random() * 500);
        this.positionY = Math.floor(Math.random() * 300);
        this.enemy = this.createItem(this.positionX, this.positionY)
        this.counter = 0
        this.timeWindow = 0
        this.changeDirectionAfter = 0
        this.timesEllapsed = 100
        this.xValue = 1
        this.yValue = 0
        this.rotation = -90
        this.enemy.style.backgroundImage = "url('./images/enemy.png')"
        this.enemy.style.backgroundSize = "contain"
        this.screenHeight = screen.height
        this.screenWidth = screen.width 
        
    }


    removeEnemy(){
        this.enemy.remove()
    }

    changeDirection() {
        const randomDirection = [1, -1].sort(() => Math.random() - 0.5)
        const randomNumber = Math.random() // 0 - 1
        if (randomNumber <= 0.5) {
            this.xValue = randomDirection[0]
            this.yValue = 0
            this.rotation = (this.xValue + 2) * 90
        } else {
            this.xValue = 0
            this.yValue = randomDirection[0]
            this.rotation = (this.yValue + 1) * 90
        }
    }

    manageCounter() {
        if (this.counter < this.timesEllapsed) {
            this.counter += 1
        } else {
            this.changeDirection()
            this.resetCounter()
            
        }

    }
    resetCounter() {
        this.counter = 0
    }

    move() {
        this.manageCounter()
        this.detectWalls()
        this.positionX -= this.xValue
        this.positionY -= this.yValue
        this.enemy.style.bottom = `${this.positionY}px`
        this.enemy.style.left = `${this.positionX}px`
        this.enemy.style.rotate = `${this.rotation}deg`
       

    }

    detectWalls() {
        if (this.positionX > this.screenWidth - 40 || this.positionX < 5) {
            this.xValue *= -1
            this.yValue *= -1
            this.rotation = 90 * this.xValue * -1
        } else if (this.positionY > this.screenHeight - 40 || this.positionY < 5) {
            this.xValue *= -1
            this.yValue *= -1
            this.rotation = this.yValue == 1 ? 180 : 0
        }
    }

}

class Player extends GameItem {
    constructor() {
        super()
        this.positionX = 280;
        this.positionY = 400;
        this.player = this.createItem(this.positionX, this.positionY)
        this.player.style.backgroundColor = "transparent"
        this.player.style.backgroundImage = "url('./images/tank.png')"
        this.player.style.backgroundSize = "contain"
        this.rotation = 0


    }


    moveLeft() {
        this.positionX -= 19
        this.player.style.left = this.positionX + "px"
        this.rotation = -90
        this.player.style.rotate = `${this.rotation}deg`
    }

    moveRight() {
        this.positionX += 19
        this.player.style.left = this.positionX + "px"
        this.rotation = 90
        this.player.style.rotate = `${this.rotation}deg`

    }
    moveUp() {
        this.positionY += 19;
        this.player.style.bottom = this.positionY + "px"
        this.rotation = 0
        this.player.style.rotate = `${this.rotation}deg`

    }
    moveDown() {
        this.positionY -= 19;
        this.player.style.bottom = this.positionY + "px"
        this.rotation = 180
        this.player.style.rotate = `${this.rotation}deg`
    }
}

class Bullet {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.bulletsArr = []
        this.rotation = 0
    }

    speed = 50

    move(speed, direction, x) {
        if (direction === "left") {
            this.rotation = -90
            x.style.rotate = this.rotation + "deg"
            x.style.left = parseInt(x.style.left, 10) - speed + "px"
        } else if (direction === "right") {
            this.rotation = 90
            x.style.rotate = this.rotation + "deg"
            x.style.left = parseInt(x.style.left, 10) + speed + "px"

        }
        else if (direction === "up") {
            this.rotation = 0
            x.style.rotate = this.rotation + "deg"
            x.style.bottom = parseInt(x.style.bottom, 10) + speed + "px"

        }
        else if (direction === "down") {
            this.rotation = 180
            x.style.rotate = this.rotation + "deg"
            x.style.bottom = parseInt(x.style.bottom, 10) - speed + "px"

        }
    }

    createBullet(x, y) {
        const container = document.createElement("div")
        document.body.appendChild(container)
        this.bulletHeight = container.style.height = "10px";
        this.bulletWidth = container.style.width = "10px";
        container.style.position = "absolute"
        this.bulletsArr.push(container)
        container.style.backgroundImage = "url('./images/bullet_up.png')"
        container.style.backgroundSize = "contain"
        container.style.backgroundColor = "transparent"
        container.style.rotate = this.rotation + "deg"
        
    
        

        this.positionX = container.style.left = `${x}px`
        this.positionY = container.style.bottom = `${y}px`
        return container

    }

    shoot(posX, posY, direction) {
        audioElement.play();
        const bullet = this.createBullet(this.player.positionX + 16, this.player.positionY + 16)
        setInterval(() => {
            this.move(this.speed, direction, bullet)
            this.detectCollision(this.enemy)
            this.bulletsArr.forEach((bullet) => {
                const bulletIndex = this.bulletsArr.indexOf(bullet)
                if (parseInt(this.bulletsArr[bulletIndex].style.left) < 0 || parseInt(this.bulletsArr[bulletIndex].style.bottom) < 0
                    || parseInt(this.bulletsArr[bulletIndex].style.bottom) > parseInt(screen.height) 
                    || parseInt(this.bulletsArr[bulletIndex].style.left) > parseInt(screen.width)) {
                    this.bulletsArr.splice(bulletIndex, 1)
                    bullet.remove()
                    


                }


            })
        }, 100)
    }

    detectCollision(enemy) {
        this.enemyTank = enemy

    this.bulletsArr.forEach((bullet)=>{
        if (
            parseInt(bullet.style.left) < enemy.positionX + parseInt(enemy.width) &&
            parseInt(bullet.style.left) + parseInt(this.bulletWidth) > enemy.positionX &&
            parseInt(bullet.style.bottom) < enemy.positionY + parseInt(enemy.height) &&
            parseInt(this.bulletHeight) + parseInt(bullet.style.bottom) > enemy.positionY

            
        ) {
            this.enemy.removeEnemy()
            this.enemy.createEnemy()
            bulletHit.play()
            return true
        } else {
            return false
        }


    })
        
    }


}

// class Bullet extends GameItem {
//     constructor(){
//         super()
//         this.positionX = 50
//         this.positionY = 50

//     }


//      createBullet() {
//         this.createItem(this.positionX, this.positionY)
// }
// }
// myPlayer.createPlayer(400, 100)






class Game {

    myPlayer = new Player();
    newEnemy = new Enemy()
    bullet = new Bullet(this.myPlayer, this.newEnemy)



    start() {

        setInterval(() => {
            this.newEnemy.move()
        }, 10);
    }
    attachEventListeners() {

        window.addEventListener("keydown", function (e) {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.myPlayer.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.myPlayer.moveRight();
            }
            else if (e.key === "ArrowUp") {
                this.myPlayer.moveUp();
            } else if (e.key === "ArrowDown") {
                this.myPlayer.moveDown();
            } else if (e.key === " ") {
                if (this.myPlayer.rotation == 0) {
                    this.bullet.shoot(0, 0, "up");
                } else if (this.myPlayer.rotation == -90) {
                    this.bullet.rotation = "90deg"
                    this.bullet.shoot(100, 100, "left")
                } else if (this.myPlayer.rotation == 90) {
                    this.bullet.shoot(100, 100, "right")
                } else if (this.myPlayer.rotation == 180) {
                    this.bullet.shoot(100, 100, "down")
                }

            }

        })
    }  


}


const audioElement = document.getElementById("shooting")
const bulletHit = document.getElementById("hit")

const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination)

const newGame = new Game()
newGame.attachEventListeners()
newGame.start()
// this.bullet.createBullet()
// bullet.shoot(100,100,"right")


// const background = document.getElementById("stage")
// const player = document.getElementById('player')




