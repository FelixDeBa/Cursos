var CLASES;
(function (CLASES) {
    var Bloque = /** @class */ (function () {
        function Bloque(posX, posY, ancho, alto, color) {
            this.posX = posX;
            this.posY = posY;
            this.ancho = ancho;
            this.alto = alto;
            this.color = color;
        }
        Bloque.prototype.dibujar = function (color) {
            if (color === void 0) { color = 'red'; }
            ctx.fillStyle = color;
            ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);
        };
        Bloque.prototype.mover = function () {
            this.posY += 1;
        };
        return Bloque;
    }());
    CLASES.listaBloques = [];
    CLASES.listaBloques.push(new Bloque(32, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(170, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(207, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(344, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(481, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(569, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(702, 0, 32, 32, 'red'));
    CLASES.listaBloques.push(new Bloque(780, 0, 32, 32, 'red'));
    CLASES.block = new Bloque(400, 0, 32, 32, 'blue');
})(CLASES || (CLASES = {}));
///<reference path='02.clases.ts'/>
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cuerpo = document.querySelector('body');
canvas.width = 800;
canvas.height = 608;
canvas.style.border = "4px solid black";
canvas.style.backgroundColor = "grey";
cuerpo.style.backgroundColor = "black";
cuerpo.style.display = "flex";
cuerpo.style.justifyContent = "center";
function pinta() {
    var escenario = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    for (var y = 0; y < 19; y++) {
        for (var x = 0; x < 25; x++) {
            if (y >= 15) {
                ctx.fillStyle = 'darkgreen';
                ctx.fillRect(32 * x, 32 * y, 32, 32);
            }
            else if (escenario[y][x] == 0) {
                ctx.fillStyle = 'lightblue';
                ctx.fillRect(32 * x, 32 * y, 32, 32);
            }
        }
    }
    CLASES.listaBloques.map(function (bloque) {
        var coordX = Math.round(bloque.posX / 32);
        var coordY = Math.round(bloque.posY / 31);
        bloque.dibujar();
        if (escenario[coordY][coordX] == 0) {
            bloque.mover();
        }
    });
    //Para dibujar el bloque del medio
    CLASES.block.dibujar(CLASES.block.color);
}
function principal() {
    requestAnimationFrame(principal);
    //Actualizar el dibujo de los cubos
    canvas.width = 800;
    canvas.height = 608;
    //actualizar el dibujo del escenario
    pinta();
}
principal();
///<reference path='02.clases.ts'/>
var colores = ['red', 'blue', 'orangered', 'yellow', 'wheat'];
var c = 0;
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'w':
        case 'W': {
            CLASES.block.posY -= 5;
            break;
        }
        case 'a':
        case 'A': {
            CLASES.block.posX -= 5;
            break;
        }
        case 's':
        case 'S': {
            CLASES.block.posY += 5;
            break;
        }
        case 'd':
        case 'D': {
            CLASES.block.posX += 5;
            break;
        }
        case 'Enter': {
            c >= 4 ? c = 0 : c += 1;
            CLASES.block.color != colores[c] ? CLASES.block.color = colores[c] : null;
            break;
        }
        default: {
            break;
        }
    }
});
//Para mover el resto de bloques
// CLASES.listaBloques.map(bloque=>{
//     document.addEventListener('keydown', (e)=>{
//         if(e.key=='d' || e.key=='D'){
//             bloque.posX+=5
//         }else if(e.key=='a' || e.key=='A'){
//             bloque.posX-=5
//         }else if(e.key=='s' || e.key=='S'){
//             bloque.posY+=5
//         }else if(e.key=='w' || e.key=='W'){
//             bloque.posY-=5
//         }
//     })
// })
