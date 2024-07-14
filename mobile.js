class MobileControls{
    constructor(){
        this.left=false
        this.right=false
        this.up=false
        this.down=false

        this.rightSensor=new rightSensor(10,10)
    }
    update(){
        this.rightSensor.update()
        if(this.rightSensor.changeX>10){
            this.right=true
        }else{
            this.right=false
        }
        if(this.rightSensor.changeX<-10){
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
        console.log(this.right,this.up)

    }
}