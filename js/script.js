window.onload = function () {
    //задаем стартовые координаты коровы

    let cowX = 600;
    let cowY = 400;
    let cow = document.getElementById("cow");

    //сохраняем лучший счёт    
    let score = 5020;
    let bestScore = 0;
    
    if(localStorage.getItem("bestCowScore")!=undefined) {
        bestScore = localStorage.getItem("bestCowScore");
    }; 

    //localStorage
    let reloads;
    function reloadPage() {
        if (localStorage.getItem("reloads") == undefined) {
            localStorage.setItem("reloads", 1);
            reloads = localStorage.getItem("reloads");

        } else {
            reloads = localStorage.getItem("reloads");
            reloads++;
            localStorage.setItem("reloads", reloads);
        }
        console.log("reloads = " + reloads);

    };
    
    // if (score > bestScore) {
    //     bestScore = score;
    // } ;
    //генерируем положение коровы
    function dislocationCow() {
        //получить размеры окна
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;
        // console.log(windowHeight);
        // console.log(windowWidth);
        //в пределах размера окна сгенерировать точку
        function myRandom(from, to) {
            return Math.floor((Math.random() * (to - from + 1)) + from);
        };

        cowX = myRandom(40, windowWidth-128);
        console.log(cowX);
        cowY = myRandom(40, windowHeight-128);
        console.log(cowY);
        console.log(document.documentElement.clientHeight)

        //применяем рандомные координаты к картинке коровы
        cow.style.top = cowY-60 + "px";
        cow.style.left = cowX-60 + "px";

    };
    dislocationCow();

    //по клику получаем координаты щелчка и записываем их в переменную
    document.addEventListener("click", getCoordinates);

    let coordX;
    let coordY;
    let distance;

    function getCoordinates(event) {
        coordX = event.clientX;
        coordY = event.clientY;
        //    console.log(coordX);
        // считаем расстояние от клика до коровы
        let x = cowX - coordX;
        let y = cowY - coordY;

        distance = Math.ceil(Math.sqrt((x * x) + (y * y)));
        console.log(distance);
    };

    let audioCow1 = new Audio();
    audioCow1.preload = 'auto';
    audioCow1.volume = 0.2;
    audioCow1.src = 'audio/cow1.wav';

    let audioCow2 = new Audio();
    audioCow2.preload = 'auto';
    audioCow2.volume = 0.2;
    audioCow2.src = 'audio/cow2.wav';

    let audioCow3 = new Audio();
    audioCow3.preload = 'auto';
    audioCow3.volume = 0.2;
    audioCow3.src = 'audio/cow3.wav';

    let audioCow4 = new Audio();
    audioCow4.preload = 'auto';
    audioCow4.volume = 0.2;
    audioCow4.src = 'audio/cow4.wav';

    let audioMu = new Audio();
    audioMu.preload = 'auto';
    audioMu.volume = 0.2;
    audioMu.src = 'audio/mu.wav';


    //генерим каждые пол секунды сообщение в консоль в зависимости от текущего значения координат
    //которое записано в переменной после щелчка
    let inter = setInterval(function () {

        if (distance < 80) {
            // cow.addEventListener("click", makeCowVisible);
            // cow.addEventListener("click", createButton);
            if (bestScore<score) {
                bestScore = score;	
                localStorage.setItem("bestCowScore", bestScore);
            };
            createButton();
            makeCowVisible();
            console.log("cow");
            audioMu.play();
            clearInterval(inter);
            clearInterval(scoreTimer);
            console.log("Лучший счёт: "+bestScore);
        } else if (distance < 120) {
            console.log("cow 2");
            audioCow4.play();
        } else if (distance < 200) {
            console.log("cow 3");
            audioCow3.play();
        } else if (distance < 300) {
            console.log("cow 4");
            audioCow2.play();
        } else {
            console.log("cow 5");
            audioCow1.play();
        }
    }, 600);

    //корова

    function makeCowVisible() {
        cow.style.visibility = "visible";
        // cow.style.opacity = 1;
    };

    //кнопка

    function createButton() {
        reloadPage();
        let finalDiv = document.createElement("div");
        finalDiv.setAttribute("id", "finalDiv");
        finalDiv.innerHTML = "<button id = 'refreshButton'>Перезагрузить страницу</button> <p>Коров вы нашли "+reloads+
        ".<br> Ваш счёт: "+score+". <br> Ваш лучший счёт "+bestScore+".</p>";
        finalDiv.style.top = 35+"%";
        finalDiv.style.left = 40+"%";
        document.body.appendChild(finalDiv);
        let refreshButton = document.getElementById("refreshButton");
        refreshButton.addEventListener("click", refresh);

    };

    function refresh() {
        location.reload();
    };
    //счётчик очков

    let scoreTimer = setInterval( 
        function() {
            score--;
        }, 50);
 
}