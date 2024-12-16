const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparkles = [];

class Sparkle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedY = Math.random() * 3 + 2;
        this.opacity = Math.random();
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        sparkles.push(new Sparkle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let sparkle of sparkles) {
        sparkle.update();
        sparkle.draw();
    }
    requestAnimationFrame(animate);
}

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });


// $('#background').mousemove(function(e){
//     var moveX = (e.pageX* -1/2) + 450;
//     var moveY = (e.pageY* -1/3) + 150;
//     $("#drone-box").css({
//         'transform' : 'translate3d('+moveX+'px, '+moveY+'px, 0)'
//     });
// });

window.onload = function () {
    const droneBox = document.getElementById('drone-box');
    const mainDrone = document.getElementById('main-drone');
    const leftDrone = document.getElementById('left-drone');
    const rightDrone = document.getElementById('right-drone');
    const droneSound = document.getElementById('droneSound');

   

    // Play audio when cursor touches any drone
    function playDroneSound(event) {
        if (event.target === mainDrone || event.target === leftDrone || event.target === rightDrone) {
            droneSound.currentTime = 0; 
            droneSound.play();
        }
    }

    function stopDroneSound(event) {
        if (event.target === mainDrone || event.target === leftDrone || event.target === rightDrone) {
            droneSound.pause();
        }
    }

    droneBox.addEventListener('mouseover', playDroneSound);
    droneBox.addEventListener('mouseout', stopDroneSound);
};



init();
animate();


