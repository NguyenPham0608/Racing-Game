function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}

// function getRandomColor(){
//     const hue=200+getRandomArbitrary(0,500)
//     return "hsl("+hue+", 100%, 60%)";
// }

function getRandomColor() {
    // Loop until a non-green color is generated
    while (true) {
      const hue = Math.floor(Math.random() * 360); // Generate random hue between 0 and 359
      
      // Check if hue is not in the green range (roughly between 120 and 300)
      if (hue < 120 || hue > 300) {
        return `hsl(${hue}, 100%, 50%)`; // Fixed lightness to 50% for medium brightness
      }
    }
  }

            
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRoundRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

  function getRandomRed(){
    const hue=340+Math.random()*90;
    return "hsl("+hue+", 100%, 60%)";
}

function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

function removeAllFromArray(array){
    array.splice(0,array.length)
}

function splice(array,start,end){
    array.splice(start,end)
}

function restartGame(){
    removeAllFromArray(traffic)
    racecar.x=getLaneCenter(1)
    racecar.y=100
    racecar.damaged=false
}