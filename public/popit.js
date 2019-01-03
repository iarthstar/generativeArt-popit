/**
 * @file popit.js
 * @description scripting file of popit.html
 * 
 * @author Arth K. Gajjar <iarthstar@gmail.com>
 */



//
// ───────────────────────────────────────────────────────────── UTILS ────────
//

const getContext = (canvas) => canvas.getContext("2d");

const drawShadow = (ctx, x, y, r) => {
    ctx.beginPath();
    let a = x + (r * Math.cos(-Math.PI/4));
    let b = y + (r * Math.sin(-Math.PI/4)); 
    ctx.moveTo(a, b);
    
    let m = a+(2*r*Math.cos(Math.PI/4));
    let n = b+(2*r*Math.cos(Math.PI/4));
    ctx.lineTo(m, n);
    
    let grd = ctx.createLinearGradient(a,b,m,n);
    
    m = x + (r * Math.cos(Math.PI*3/4));
    n = y + (r * Math.sin(Math.PI*3/4));
    
    let q = m+(2*r*Math.cos(Math.PI/4));
    let w = n+(2*r*Math.cos(Math.PI/4));

    ctx.lineTo(q, w);
    ctx.lineTo(m, n);
    grd.addColorStop(0, 'rgba(0,0,0,0.1)');   
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
}

const drawCircle = (ctx, x, y, r, color = generateRandomColor("rgb"), fillType = "solid", shadow = true) => {
    circles.push({
        x,y,r,color,fillType,shadow
    });
    if(shadow) drawShadow(ctx, x, y, r);

    let fill = "";
    switch(fillType){
        case "solid":
            fill = color;
            break;
        case "pattern":
            let img = document.querySelector("#color_"+color.substr(1,6));
            fill = ctx.createPattern(img, "repeat");
            break;
        case "gradient":
            fill = ctx.createLinearGradient(x-r,y,x+r,y);
            let rgb = hex2rgba(color);
            fill.addColorStop(0, `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`);   
            fill.addColorStop(1, `rgb(${rgb[0]-80},${rgb[1]-80},${rgb[2]-80})`);
            break;
        default:
            fill = color;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.closePath();
} 

const generateRandomInt = (x = 1) => Math.floor(Math.random() * x);

const generateRandomColor = (type, alpha = false) => {

    let r = generateRandomInt(256);
    let g = generateRandomInt(256);
    let b = generateRandomInt(256);
    let color = "";

    switch(type.toLowerCase()){
        case "rgb":
        case "rgba":
            if(!alpha)
                color = `rgb(${r},${g},${b})`;
            else
                color = `rgba(${r},${g},${b},${generateRandomInt(100)*0.01})`;
        break;
        case "hex":
            if(!alpha)
                color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.toUpperCase();
            else
                color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${generateRandomInt(256).toString(16)}`.toUpperCase();
            break;
        default:
            color = `rgb(${r},${g},${b})`;
    }
    return color;
}

const hex2rgba = (hex) => {
    hex = hex.substr(1,hex.length-1);
	return hex.match(/.{1,2}/g).map(elem => parseInt(elem,16));
}

//
// ────────────────────────────────────────────────────────────────────────────
//




//
// ─────────────────────────────────────────────────────────── GLOBALS ────────
//

let bg = document.getElementById('popit-bg');
let popit = document.getElementById('popit');
let ctx = getContext(popit);

const range = [10,1500];

// const colors = ["#070d59", "#1f3c88", "#5893d4", "#ceddef"];
const colors = ["#08D9D6", "#252A34", "#FF2E63", "#EAEAEA"];

let circles = [];
let grids = [];
let rads = [];

//
// ────────────────────────────────────────────────────────────────────────────
//




//
// ───────────────────────────────────────────────────────────── LOGIC ────────
//



document.querySelector("#popit-bg").width = window.innerWidth;
document.querySelector("#popit-bg").height = "5000";

bg.style.backgroundColor = "whitesmoke";
popit.style.backgroundColor = "whitesmoke";
ctx.translate(50,50);

colors.forEach(color => {
    let img = document.createElement('img');
    let url = `http://api.thumbr.it/whitenoise-400x400.png?background=${color.substr(1,6)}00&noise=ffffff&density=10&opacity=33`;
    img.setAttribute("src",url);
    img.setAttribute("id","color_"+color.substr(1,6));
    img.style.display = "none";
    document.body.appendChild(img);
});

for(i=0; i<10000; i++){
    let x = generateRandomInt(40)*100;
    let y = generateRandomInt(40)*100;
    let rad = generateRandomInt(5)*10;
    
    drawCircle(ctx,x,y,rad,colors[generateRandomInt(4)],"gradient");
    drawCircle(ctx,x,y,rad,colors[generateRandomInt(4)],"pattern",false);
}

//
// ────────────────────────────────────────────────────────────────────────────
//