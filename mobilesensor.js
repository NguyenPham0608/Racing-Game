let mouseDown=false
let mouseX=0
let mouseY=0
let startmouseX
let startmouseY
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

        }else{
            mouseDown=false
            this.changeX=0
            this.changeY=0
            startmouseX = 0;
            startmouseY = 0;
            mouseDownTime=0
        }
    }
}

window.addEventListener('touchstart',function(e){

    const touch2 = e.touches[0];

    // Get the current X and Y coordinates
    startmouseX = touch2.clientX;
    startmouseY = touch2.clientY;
    mouseX = startmouseX;
    mouseY = startmouseY;

    mouseDown=true


})
window.addEventListener('touchend',function(e){
    mouseDown=false
    this.changeX=0
    this.changeY=0
    startmouseX = 0;
    startmouseY = 0;
    
    mouseDownTime=0
})
window.addEventListener('touchmove',function(e){
    e.preventDefault()
    e.stopPropagation()

    mouseDown=true


    // Get the first touch point
    const touch = e.touches[0];

    // Get the current X and Y coordinates
    mouseX = touch.clientX;
    mouseY = touch.clientY;


}, { passive: false })



