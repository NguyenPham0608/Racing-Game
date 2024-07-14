const carCanvas=document.getElementById("carCanvas");
carCanvas.width=270;



const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=1;
let score=0
var output = document.getElementById("scorecounter");
output.innerHTML = score;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
let bam=new Audio()
bam.src="explosion.wav"

const particlesList=[]

let CARTYPE="KEYS"


let randomLane=0
let laneArray=[
    0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,1,2,2,1,0,2,0,0,0,0,0,1,2,2,1,2,2,1,0,2,1,0,0,1,2,2,0,0,0,2,
    0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,0,1,2,2,0,0,0,1,2,0,1,2,2,1,0
]

const N=1;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}


const traffic=[]

// const traffic=[
//     new Car(road.getLaneCenter(1),-100,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(0),-300,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(2),-300,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(0),-500,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(1),-500,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(1),-700,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(2),-700,40,60,"DUMMY",2),
// ]

for(let i =0;i<220*laneArray.length;i+=220){
    traffic.push(new Car(road.getLaneCenter(laneArray[i/220]),-i,40,60,"DUMMY",2))
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

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,40,60,CARTYPE,9,"#00FF00"));
    }
    return cars;
}



function animate(time){


    output.innerHTML = Math.abs(Math.floor((score-100)));
    
    carCanvas.height=(window.innerHeight);
    networkCanvas.height=window.innerHeight;


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

    carCtx.fillStyle='#444444'
    carCtx.fillRect(0,carCanvas.height,carCanvas.width,-50)

    // if(mouseDown){
    //     carCtx.fillStyle='red'
    //     carCtx.fillRect(0,0,999,999)
    // }
    requestAnimationFrame(animate);
}

window.addEventListener('keydown',function(e){
    if(e.key=="r"){
        window.location.reload()
    }
})


