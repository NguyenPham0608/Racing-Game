class MobileControls{
    constructor(){
        this.left=false
        this.right=false
        this.up=false
        this.down=false
        this.turnAcel=0.03
        this.rightSensor=new rightSensor(10,10)
    }
    update(){
        this.rightSensor.update()
        if(this.rightSensor.changeX>5){
            this.right=true
        }else{
            this.right=false
        }
        if(this.rightSensor.changeX<-5){
            this.left=true
        }else{
            this.left=false
        }
        if(this.rightSensor.changeY>10){
            this.up=true
        }else{
            this.up=false
        }
        if(this.rightSensor.changeY<-10){
            this.down=true
        }else{
            this.down=false
        }
        // this.turnAcel=(this.rightSensor.changeX/60)/100
        // this.turnAcel=Math.abs(this.turnAcel)
    }
}