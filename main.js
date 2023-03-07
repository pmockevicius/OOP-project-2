
class GameItem {

    createItem(x, y) {
        const container = document.createElement("div")
        document.body.appendChild(container)
        container.style.height = "40px";
        container.style.width = "40px";
        container.style.backgroundColor = "black"
        container.style.position = "absolute"
        container.style.left = `${x}px`
        container.style.bottom = `${y}px`
        container.style.backgroundColor = "green"
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
        this.changeDirectionAfter = 3000
        this.timesEllapsed = 0
        this.xValue = 0
        this.yValue = 0
        this.rotation = 0
        this.enemy.style.backgroundImage = "url('images/tank.png')"
    }

    changeDirection() {
        const randomDirection = [5, -5].sort(() => Math.random() - 0.5)
        const randomNumber = Math.random() // 0 - 1
        if (randomNumber <= 0.5) {
            this.xValue = randomDirection[0]
            this.yValue = 0
            this.rotation = (this.xValue + 2) * 90
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
        this.positionX -= this.xValue
        this.positionY -= this.yValue
        this.enemy.style.bottom = `${this.positionY}px`
        this.enemy.style.left = `${this.positionX}px`
        this.enemy.style.rotate = `${this.rotation}deg`

    }



}


class Player extends GameItem {
    constructor() {
        super()
        this.positionX = 100;
        this.positionY = 100;
        this.player = this.createItem(this.positionX, this.positionY)
        this.player.style.backgroundColor = "red"
        this.player.style.backgroundImage = "url('./images/tank.png')"

    }


    moveLeft() {
        this.positionX -= 19

        this.player.style.left = this.positionX + "px"
    }

    moveRight() {
        this.positionX += 19
        this.player.style.left = this.positionX + "px"


    }
    moveUp() {
        this.positionY += 19;
        this.player.style.bottom = this.positionY + "px"

    }
    moveDown() {
        this.positionY -= 19;
        this.player.style.bottom = this.positionY + "px"

    }
}

class Bullet {
    constructor(player) {
        this.player = player;
        // this.speed = 5;
    }

    speed = 5

    move(speed, direction, x) {
        if (direction === "left") {
            x.style.left = parseInt(x.style.left, 10) - speed + "px"
            console.log(x.style.left)
        } else if (direction === "right") {
            x.style.left = parseInt(x.style.left, 10) + speed + "px"
            console.log(x.style.left)
        }

        else if (direction === "up") {
            x.style.bottom = parseInt(x.style.bottom, 10) + speed + "px"
            console.log(x.style.left)
        }

        else if (direction === "down") {
            x.style.bottom = parseInt(x.style.bottom, 10) - speed + "px"
            console.log(x.style.left)
        }
    }

    createBullet(x, y) {
        const container = document.createElement("div")
        document.body.appendChild(container)
        container.style.height = "15px";
        container.style.width = "5px";
        container.style.backgroundColor = "black"
        container.style.position = "absolute"

        container.style.left = `${x}px`
        container.style.bottom = `${y}px`

        return container

    }

    shoot(posX, posY, direction) {
        console.log("shooting " + this.player.style )
        const square = this.createBullet(this.player.positionX + 17.5  , this.player.positionY + 40)

        setInterval(() => {
            this.move(this.speed, direction, square)
        }, 100)
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
    bullet = new Bullet(this.myPlayer)




    enemies = []

    start() {

        setInterval(() => {
            this.newEnemy.move()
        }, 100);
    }
    attachEventListeners() {
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
                this.bullet.shoot();
            }

        })
    }


}


const newGame = new Game()
newGame.attachEventListeners()
newGame.start()
this.newBullet.createBullet()
// bullet.shoot(100,100,"right")


// const background = document.getElementById("stage")
// const player = document.getElementById('player')




// t)
// console.log(screenWidth)
