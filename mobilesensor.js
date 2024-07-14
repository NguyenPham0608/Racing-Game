let mouseDown=false
let mouseX=0
let mouseY=0
let startmouseX=0
let startmouseY=0
let mouseDownTime=0


class rightSensor{
    constructor(width,height){
        this.width=width
        this.height=height
        this.fill='green'
        this.changeX=0
        this.changeY=0
    }

    update(){
        if(mouseDown){
            // if(mouseDownTime<1){
            //     startmouseX=mouseX
            //     startmouseY=mouseY
            // }
            mouseDownTime++
            this.changeX=mouseX-startmouseX
            this.changeY=-(mouseY-startmouseY)

        }
        console.log(this.changeX)
    }
}

window.addEventListener('touchstart',function(){

    const touch2 = e.touches[0];

    // Get the current X and Y coordinates
    startmouseX = touch2.clientX;
    startmouseY = touch2.clientY;
    mouseDown=true

})
window.addEventListener('touchend',function(){
    mouseDown=false
    this.changeX=0
    this.changeY=0
    startmouseX = 0;
    startmouseY = 0;
    mouseDownTime=0
})
window.addEventListener('touchmove',handletouch)

function handletouch(e){
    mouseDown=true
    // Prevent default behavior (optional)
    e.preventDefault();

    // Get the first touch point
    const touch = e.touches[0];

    // Get the current X and Y coordinates
    mouseX = touch.x;
    mouseY = touch.x;

}

