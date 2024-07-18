/**@type{HTMLCanvasElement} */

const carCanvas=document.getElementById("carCanvas");
carCanvas.width=500;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=1;
let score=0
var output = document.getElementById("scorecounter");
output.innerHTML = score;

const mobile=false
let frame=0



let restart=false
let reloadCars=false

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


let laneCount=7
const road=new Road(carCanvas.width/2,carCanvas.width*0.9,laneCount);
let centerLane=road.getLaneCenter(Math.ceil((laneCount-1)/2))


let bam=new Audio()
bam.src="explosion.wav"
let isMobile=null

let waitingForsetup=true

const particlesList=[]
let mobilePicture=new Image()
mobilePicture.src='Images/MOBILE.png'
let pcPicture=new Image()
pcPicture.src='Images/PC.png'
let textSy=0

let CARTYPE="KEYS"

let stage='intro'

let randomLane=0
let laneArray=[]
for(let i=0;i<200;i++){
    laneArray.push(getRoundRandomArbitrary(0,laneCount))
}


var button1 = document.getElementById("PC");
var button2 = document.getElementById("MOBILE");

const N=1;
const traffic=[]



let cars
function generateCars(N){
    cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(centerLane,100,60,90,CARTYPE,9,isMobile,"#00FF00"));
    }
    return cars;
}

function createTraffic(){
    for(let i =0;i<280*laneArray.length;i+=280){
        traffic.push(new Car(road.getLaneCenter(laneArray[i/280]),-i,60,90,"DUMMY",2))
    }
}

function setup(){
    cars=generateCars(N);
    createTraffic()
}







animate();



function changeCarType(type){
    window.location.reload()
    CARTYPE=type

}

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}




function animate(time){

    frame++
    carCanvas.height=(window.innerHeight);
    networkCanvas.height=window.innerHeight;

    output.innerHTML = Math.abs(Math.floor((score-100)));
    
    if(stage=='game'){
        for(let i=0;i<traffic.length;i++){
            traffic[i].update(road.borders,[]);
        }
        for(let i=0;i<cars.length;i++){
            cars[i].update(road.borders,traffic);
        }
        bestCar=cars.find(
            c=>c.y==Math.min(
                ...cars.map(c=>c.y)
            ));
    
    
        carCtx.save();
        carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    
        road.draw(carCtx);
        for(let i=0;i<traffic.length;i++){
            traffic[i].draw(carCtx);
        }
        carCtx.globalAlpha=0.2;
        for(let i=0;i<cars.length;i++){
            cars[i].draw(carCtx);
        }
        carCtx.globalAlpha=1;
        bestCar.draw(carCtx,true);
        score=bestCar.y
    
        carCtx.restore();
    
        networkCtx.lineDashOffset=-time/50;
        // Visualizer.drawNetwork(networkCtx,bestCar.brain);
    
    }else{
        carCtx.fillStyle='lightgray'
        carCtx.fillRect(0,0,carCanvas.width,carCanvas.height)
        // carCtx.drawImage(pcPicture,40,carCanvas.height/2)
        // carCtx.drawImage(mobilePicture,carCanvas.width-200,carCanvas.height/2)
        say('What device are you on?', carCanvas.width/2,carCanvas.height/3,30,frame/20)



    }
    carCtx.fillStyle='#444444'
    carCtx.fillRect(0,carCanvas.height,carCanvas.width,-50)

    if(reloadCars){
        createTraffic()
        reloadCars=false
    }
    requestAnimationFrame(animate);
}

function say(text,x,y,size,time){
    const yText=(Math.sin(time)*30)

    carCtx.fillStyle='black'

    carCtx.font=`bold ${size}px Arial`
    carCtx.textAlign='center'
    carCtx.fillText(text,x,yText+y-textSy**2,999)
    if(isMobile==true||isMobile==false){
        textSy--
    }
    if(textSy**2>600){
        setup()
        stage='game'
        button2.parentNode.removeChild(button2);
        button1.parentNode.removeChild(button1);
    }
}

function setDevice(mobile){
    if (mobile=='false') {
        isMobile=false 
    } else {
        isMobile=true 
        
    }
    // stage='game'


}

window.addEventListener('keydown',function(e){
    if(e.key=="r"){
        window.location.reload()
    }
})


