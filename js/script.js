//задаем стартовые координаты коровы
let cowX = 600;
let cowY = 400; 

//генерируем положение коровы
function dislocationCow(){
    //получить размеры окна
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    // console.log(windowHeight);
    // console.log(windowWidth);
    //в пределах размера окна сгенерировать точку
    function myRandom(from,to){
        return Math.floor((Math.random()*(to-from+1)) + from);
    }

    cowX = myRandom(0,windowWidth);
    // console.log(cowX);
    cowY = myRandom(0,windowHeight);
    // console.log(cowY);
}
dislocationCow();

//по клику получаем координаты щелчка и записываем их в переменную
document.addEventListener("click",getCoordinates);

let coordX;
let coordY;
let distance;

function getCoordinates(event){
    coordX = event.clientX;
    coordY = event.clientY;
//    console.log(coordX);
// считаем расстояние от клика до коровы
    let x = cowX - coordX;
    let y = cowY - coordY;

    distance = Math.ceil( Math.sqrt((x*x)+(y*y)));
    console.log(distance);
}

let audioCow1 = new Audio();
audioCow1.preload = 'auto';
audioCow1.src = 'audio/cow1.wav';

let audioCow2 = new Audio();
audioCow2.preload = 'auto';
audioCow2.src = 'audio/cow2.wav';

let audioCow3 = new Audio();
audioCow3.preload = 'auto';
audioCow3.src = 'audio/cow3.wav';

let audioCow4 = new Audio();
audioCow4.preload = 'auto';
audioCow4.src = 'audio/cow4.wav';

let audioMu = new Audio();
audioMu.preload = 'auto';
audioMu.src = 'audio/mu.wav';


//генерим каждые пол секунды сообщение в консоль в зависимости от текущего значения координат
//которое записано в переменной после щелчка
let inter = setInterval(function(){
    
     if (distance < 50) {
        console.log("cow");
        audioMu.play();
        clearInterval(inter);
     } else if(distance < 100) {
        console.log("cow 2");
        audioCow4.play();
     } else if(distance < 350) {
        console.log("cow 3");
        audioCow3.play();
     } else if(distance < 500) {
        console.log("cow 4");
        audioCow2.play();
     } else {
        console.log("cow 5");
        audioCow1.play();
     }
    
    
    },600);