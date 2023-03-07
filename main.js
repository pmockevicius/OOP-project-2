
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
        container.style.backgroundColor = "blue"
        container.style.backgroundImage = "url('images/tank.png')"
        return container
    }

}

class Enemy extends GameItem {

    constructor() {
        super()
        this.positionX = Math.floor(Math.random() * 500);
        this.positionY = 200;
        this.enemy = this.createItem(this.positionX, this.positionY)
        this.counter = 0
        this.timeWindow = 0
        this.changeDirectionAfter = 0
        this.timesEllapsed = 0
        this.xValue = 0
        this.yValue = 0
        this.rotation = 0
        this.enemy.style.backgroundImage = "url('tank.png')"
        this.screenHeight = screen.height
        this.screenWidth = screen.width
        

    }

    changeDirection() {
        const randomDirection = [45, -45].sort(() => Math.random() - 0.5)
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

    setTimeWindow(time) {
        this.timeWindow = time
        this.timesEllapsed = this.changeDirectionAfter / this.timeWindow
    }

    manageCounter() {
        if (this.counter <= this.timesEllapsed) {
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
        // this.detectCollision()
        this.manageCounter()
        this.detectWalls()
        this.positionX -= this.xValue
        this.positionY -= this.yValue
        this.enemy.style.bottom = `${this.positionY}px`
        this.enemy.style.left = `${this.positionX}px`
        this.enemy.style.rotate = `${this.rotation}deg`
        // console.log(this.screenHeight)

    }

    detectWalls() {
        if (this.positionX > this.screenWidth - 50 || this.positionX < 50) {
            this.xValue *= -1
            this.yValue *= -1
            this.rotation = 90 * this.xValue * -1
        } else if (this.positionY > this.screenHeight -40 || this.positionY < 400) {
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
        this.player.style.backgroundColor = "red"
        this.player.style.backgroundImage = "url('images/tank.png')"
        

    }


    moveLeft() {
        this.positionX -= 19
        this.player.style.left = this.positionX + "px"
        this.rotate = -90
        this.player.style.rotate = `${this.rotation}deg`
    }

    moveRight() {
        this.positionX += 19
        this.player.style.left = this.positionX + "px"
        this.rotate = 90
        this.player.style.rotate = `${this.rotation}deg`

    }
    moveUp() {
        this.positionY += 19;
        this.player.style.bottom = this.positionY + "px"
        this.rotate = 0
        this.player.style.rotate = `${this.rotation}deg`

    }
    moveDown() {
        this.positionY -= 19;
        this.player.style.bottom = this.positionY + "px"
        this.rotate = 180
        this.player.style.rotate = `${this.rotation}deg`
    }
}

class Bullet {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.bullets = []
    }
    


    speed = 10

    move(speed, direction, x) {
        if (direction === "left") {
            x.style.left = parseInt(x.style.left, 10) - speed + "px"
           
        } else if (direction === "right") {
            x.style.left = parseInt(x.style.left, 10) + speed + "px"
            
        }

        else if (direction === "up") {
            x.style.bottom = parseInt(x.style.bottom, 10) + speed + "px"
            
        }
 
        else if (direction === "down") {
            x.style.bottom = parseInt(x.style.bottom, 10) - speed + "px"
           
        }
    }

    createBullet(x, y) {
        const container = document.createElement("div")
        document.body.appendChild(container)
        this.bulletHeight = container.style.height = "10px";
        this.bulletWidth = container.style.width = "10px";
        container.style.backgroundColor = "red"
        container.style.position = "absolute"

        this.positionX = container.style.left = `${x}px`
        this.positionY = container.style.bottom = `${y}px`

        return container

    }
 
    shoot(posX, posY, direction) {
        const bullet = this.createBullet(this.player.positionX + 17.5  , this.player.positionY + 20)
        setInterval(() => {
            this.move(this.speed, direction, bullet)
            this.positionY= parseInt(this.positionY, 10) + this.speed + "px"
            this.detectCollision(this.enemy)
        }, 100)
    }

    detectCollision(enemy) {
        if (
            this.positionX < enemy.positionX + enemy.width &&
            this.positionX + this.bulletWidth > enemy.positionX &&
            this.positionY < enemy.positionY + enemy.height &&
            this.bulletHeight + this.positionY > enemy.positionY
        ) {
            console.log(true)
            
            return true
        } else { 
            console.log(false)
            console.log(this.positionX)
            return false }
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
        }, 1000);
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
                console.log(this.myPlayer.rotate)
            } else if (e.key === "ArrowRight") {
                this.myPlayer.moveRight();
                console.log(this.myPlayer.rotate)
            }
            else if (e.key === "ArrowUp") {
                this.myPlayer.moveUp();
                console.log(this.myPlayer.rotate)
            } else if (e.key === "ArrowDown") {
                this.myPlayer.moveDown();
                console.log(this.myPlayer.rotate)
            } else if (e.key === " ") {
                if (this.myPlayer.rotate == 0){
                    this.bullet.shoot(100,100, "up");
                } else if (this.myPlayer.rotate == -90){
                    this.bullet.rotate = "90deg"
                    this.bullet.shoot(100,100, "left")
                } else if (this.myPlayer.rotate == 90){
                    this.bullet.shoot(100,100, "right")
                }else if (this.myPlayer.rotate == 180){
                    this.bullet.shoot(100,100, "down")
                }
                
            }

        })
    }


}


const newGame = new Game()
newGame.attachEventListeners()
newGame.start()
// this.bullet.createBullet()
// bullet.shoot(100,100,"right")


// const background = document.getElementById("stage")
// const player = document.getElementById('player')




// t)
// console.log(screenWidth)


//   