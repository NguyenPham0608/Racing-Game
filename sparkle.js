class Sparkle{
    constructor(x,y,size){
        this.x=x
        this.y=y
        this.size=size
        this.frame=getRandomArbitrary(0,10)
        this.sine=Math.sin(this.frame/60)
        this.random=getRandomArbitrary(-2,2)
        this.img=new Image()
        this.img.src='sparkle2.png'
    }
    draw(ctx){
        ctx.save()
        ctx.translate(this.x,this.y)
        this.sine=Math.sin((this.frame/15))/2
        this.size=this.size+this.sine
        this.frame++
        ctx.rotate(Math.sin(this.frame/20)*2*this.random)
        ctx.drawImage(this.img,-(this.size/2),-(this.size/2),this.size,this.size)
        ctx.restore()
    }
}