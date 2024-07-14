class Particle{
    constructor(x,y,car,type){
        this.x=x
        this.y=y
        this.lifetime=0
        this.type=car
        this.particleType=type
        this.opacity=getRandomArbitrary(0,60)
        if (type=="1") {
            this.sx=getRandomArbitrary(-0.5,0.5)  
        } else {
            this.sx=getRandomArbitrary(-2,2)
        }
        this.randomX=getRandomArbitrary(-1,1)
        this.randomY=getRandomArbitrary(-2,2)

        this.sy=getRandomArbitrary(3,7)
        if(this.type=="AI"||this.type=="KEYS"){
            this.fill=getRandomRed()
            // this.fill="#FFFFFF"
        }else{
            this.fill='#000000'
        }

        if(this.particleType==2){
            this.fill=getRandomColor()
        }

        

        this.lifeSpan=getRandomArbitrary(36,52)
        
        this.radius=7
    }

    drawParticle(ctx,array){


        if(this.particleType==1){
            this.radius-=Math.random()/3
            if(this.radius<0){
                this.radius=0
            }


    
            if(this.type=="AI"||this.type=="KEYS"){
                // this.x+=getRandomArbitrary(-3-(this.lifetime/15),3+(this.lifetime/15))
                this.x+=this.sx
            }else{
                this.fill=increase_brightness(this.fill,this.lifetime/2)
                this.x+=getRandomArbitrary(-3,3)
    
            }
            
            
    
            ctx.beginPath()
            ctx.fillStyle=this.fill
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            ctx.fill()
            
            this.lifetime++
            if(this.lifetime>this.lifeSpan){
                array.shift()
            }
        }else{
            this.randomX=getRandomArbitrary(-1,1)
            this.randomY=getRandomArbitrary(-2,2)

            this.sy-=Math.random()/5
            this.x+=this.sx+this.randomX
            this.y-=this.sy+this.randomY
            this.radius-=0.05
            if(this.radius<0){
                this.radius=0
            }
            ctx.fillStyle=this.fill
            ctx.beginPath()
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            ctx.fill()
            this.lifetime++
        }

    }
}