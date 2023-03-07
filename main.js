





// const background = document.getElementById("stage")
// const player = document.getElementById('player')




// console.log(backgroundHeight)
// console.log(screenWidth)

class Player {
    constructor(){
        this.positionX = 100;
        this.positionY = 100;
        this.player = this.createPlayer()
    }

    createPlayer(){
        const container = document.createElement("div")
        document.body.appendChild(container)
        container.style.height = "40px";
    container.style.width = "40px";
    container.style.backgroundColor = "black"
    container.style.position = "absolute"
    
    container.style.left =`${this.positionX}px`
    container.style.bottom =`${this.positionY}px`
    
    return container
    }

    moveLeft(){
        this.positionX--
        console.log(this.positionX)
        this.player.style.left = this.positionX +"px"
        // console.log(this.player)
    }

    moveRight(){
        this.positionX++;
        this.player.style.left = this.positionX +"px"

        console.log(this.positionX)
    }

    moveRight(){
        this.positionX++;
        console.log(this.positionX)

    }
    moveUp(){
        this.positionY++;
        console.log(this.positionY)
    }
    moveDown(){
        this.positionY--;
        console.log(this.positionY)
    }
}

const myPlayer = new Player();
// myPlayer.createPlayer(400, 100)




document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        console.log("going left")
        myPlayer.moveLeft();
    } else if (e.key === "ArrowRight") {
        console.log("going right")
        myPlayer.moveRight();
    }
    else if (e.key === "ArrowUp") {
        console.log("going up")
        myPlayer.moveUp();
    } else if (e.key === "ArrowDown") {
        console.log("going down")
        myPlayer.moveDown();
    }

})