class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3,color=getRandomColor()){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.controlType=controlType

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged=false;
        this.exploded=0
        this.turnAcel=0.03

        this.useBrain=this.controlType=="AI";

        if(this.controlType!="DUMMY"){
            this.sensor=new Sensor(this);
            this.brain=new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );
        }
        if(this.controlType!="DUMMY"){
            this.controls=new Controls(controlType,true);
        }else{
            this.controls=new Controls(controlType,false);
        }
        this.particlesArray=[]

        this.img=new Image();
        this.img.src="car.png"

        this.mask=document.createElement("canvas");
        this.mask.width=width;
        this.mask.height=height;

        const maskCtx=this.mask.getContext("2d");
        this.img.onload=()=>{
            maskCtx.fillStyle=color;
            maskCtx.rect(0,0,this.width,this.height);
            maskCtx.fill();

            maskCtx.globalCompositeOperation="destination-atop";
            maskCtx.drawImage(this.img,0,0,this.width,this.height);
        }
    }

    update(roadBorders,traffic){

        this.controls.update(2)
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged=this.#assessDamage(roadBorders,traffic);

            if(this.sensor){
                this.sensor.update(roadBorders,traffic);
                const offsets=this.sensor.readings.map(
                    s=>s==null?0:1-s.offset
                );
                const outputs=NeuralNetwork.feedForward(offsets,this.brain);
    
                if(this.useBrain){
                    this.controls.forward=outputs[0];
                    this.controls.left=outputs[1];
                    this.controls.right=outputs[2];
                    this.controls.reverse=outputs[3];
                }
            }
        }

    }

    #assessDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){
        this.turnAcel=this.controls.turnAcel
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=this.turnAcel*flip;
            }
            if(this.controls.right){
                this.angle-=this.turnAcel*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx,drawSensor=false){
        this.particlesArray.forEach((particle)=>particle.drawParticle(ctx,this.particlesArray))

        if(!this.damaged){
            if(this.sensor && drawSensor){
                // this.sensor.draw(ctx);
            }

            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(-this.angle);
            ctx.drawImage(this.mask,
                -this.width/2,
                -this.height/2,
                this.width,
                this.height);
            ctx.globalCompositeOperation="multiply";

            if(this.sensor){
                this.particlesArray.push(new Particle(this.x,this.y,this.controlType,1))
                this.particlesArray.push(new Particle(this.x,this.y,this.controlType,1))
            }else{
                this.particlesArray.push(new Particle(this.x,this.y,this.controlType,1))
            }

            ctx.drawImage(this.img,
                -this.width/2,
                -this.height/2,
                this.width,
                this.height);
            ctx.restore();

        }else{
            if(this.exploded<2){
                for(let i=0;i<20;i++){
                    this.particlesArray.push(new Particle(this.x-3,this.y,this.controlType,2))
                    this.particlesArray.push(new Particle(this.x+3,this.y,this.controlType,2))
                    this.particlesArray.push(new Particle(this.x,this.y-3,this.controlType,2))
                    this.particlesArray.push(new Particle(this.x,this.y+3,this.controlType,2))
                }
            }
            if(this.exploded<1){
                bam.play()
            }
            this.exploded++
        }



    }
}