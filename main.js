





// const background = document.getElementById("stage")
// const player = document.getElementById('player')




// t)
// console.log(screenWidth)

class Player {
    constructor() {
        this.positionX = 100;
        this.positionY = 100;
        this.player = this.createPlayer()
    }

    createPlayer() {
        const container = document.createElement("div")
        document.body.appendChild(container)
        container.style.height = "40px";
        container.style.width = "40px";
        container.style.backgroundColor = "black"
        container.style.position = "absolute"
        container.style.left = `${this.positionX}px`
        container.style.bottom = `${this.positionY}px`

        return container
    }

    moveLeft() {
        this.positionX -= 3

        this.player.style.left = this.positionX + "px"
    }

    moveRight() {
        this.positionX += 3
        this.player.style.left = this.positionX + "px"


    }
    moveUp() {
        this.positionY += 3;
        this.player.style.bottom = this.positionY + "px"

    }
    moveDown() {
        this.positionY -= 3;
        this.player.style.bottom = this.positionY + "px"

    }
}

const myPlayer = new Player();
// myPlayer.createPlayer(400, 100)




document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        myPlayer.moveLeft();
    } else if (e.key === "ArrowRight") {
        myPlayer.moveRight();
    }
    else if (e.key === "ArrowUp") {
        myPlayer.moveUp();
    } else if (e.key === "ArrowDown") {
        myPlayer.moveDown();
    }

})