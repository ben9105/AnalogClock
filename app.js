
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

let clockRadius = 95;
let clockOriginX = canvas.width / 2;
let clockOriginY = canvas.height / 2;
let hourMarkLength = 20;
let minuteMarkLength = hourMarkLength / 2;

drawClock()
setInterval(draw, 1000); 
function draw() {
    drawTime(ctx)
}

function drawClock() {
    ctx.beginPath()
    ctx.arc(clockOriginX, clockOriginY, clockRadius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fillStyle = 'white'
    ctx.fill()


    for (let i = 0; i < 60; i++) {
        ctx.save()

        ctx.translate(clockOriginX, clockOriginY)
        let calcRotate = (Math.PI / 180) * (360 / 60) * i;
        ctx.rotate(calcRotate);
        ctx.translate(-clockOriginX, -clockOriginY);
        
        ctx.beginPath();
        ctx.moveTo(clockOriginX, clockOriginY - clockRadius);
        let markLength;
        if (i % 5 === 0) {
            ctx.lineWidth = 2;
            markLength = clockOriginY - clockRadius + hourMarkLength;
        } else {
            ctx.lineWidth = 1;
            markLength = clockOriginY - clockRadius + minuteMarkLength;
        }

        ctx.lineTo(clockOriginX, markLength)
        ctx.stroke();
        ctx.restore();    
    }
}

function drawTime(ctx) { 
    let radius = canvas.height / 2
    ctx.translate(radius, radius)
    radius = radius * 0.90

    const today = new Date(); 
    let hour = today.getHours() 
    let minute = today.getMinutes() 
    let second = today.getSeconds()
    // hour hand 
    hour = hour % 12; hour = (hour * Math.PI / 6) + (minute * Math.PI /(6*60)) + (second * Math.PI / (360*60)); 
    drawHand(ctx, hour, radius*0.5,radius*0.07) 
    //minute hand 
    
    minute = (minute * Math.PI / 30) + (second * Math.PI/ (30*60)) 
    drawHand(ctx, minute, radius*0.8, radius*0.07) 

    // second hand 
    second = (second * Math.PI / 30) 
    drawHand(ctx, second, radius*0.9, radius*0.02) 
}

function drawHand(ctx, pos, length, width) { 
    ctx.beginPath(); 
    ctx.lineWidth = width; 
    ctx.lineCap = 'round'; 
    ctx.moveTo(0, 0); 
    ctx.rotate(pos); 
    ctx.lineTo(0,-length); 
    ctx.stroke() 
    ctx.rotate(-pos) 
}
