class Controls{
    constructor(type,mobile){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;
        this.isMobile=mobile
        this.turnAcel=0

        if(mobile){
            console.log(type)
            if(type=="KEYS"){
                this.mobile=new MobileControls();
            }
        }else{
            switch(type){
                case "KEYS":
                    this.#addKeyboardListeners();
                    break;
                case "DUMMY":
                    this.forward=true;
                    break;
            }
        }


    }

    update(ctx){
        if(this.mobile){
            this.mobile.update()
            this.left=this.mobile.left
            this.right=this.mobile.right
            this.forward=this.mobile.up
            this.reverse=this.mobile.down
            this.turnAcel=this.mobile.turnAcel
        }

    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
        }
    }
}