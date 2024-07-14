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
            if(mouseDownTime<1){
                startmouseX=mouseX
                startmouseY=mouseY
            }
            mouseDownTime++
            this.changeX=mouseX-startmouseX
            this.changeY=-(mouseY-startmouseY)

        }else{
            this.changeX=0
            this.changeY=0
            mouseDownTime=0
        }
        console.log(this.changeX)
    }
}

window.addEventListener('touchstart',function(){
    mouseDown=true
})

window.addEventListener('touchend',function(){
    mouseDown=false
})

window.addEventListener('touchmove',function(e){
    mouseX=e.x
    mouseY=e.y
})