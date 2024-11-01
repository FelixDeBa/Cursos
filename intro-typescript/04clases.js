var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Personaje = /** @class */ (function () {
    function Personaje(nombre, posX, posY, inteligencia, suerte, fuerza, vida) {
        this.nombre = nombre;
        this.posX = posX;
        this.posY = posY;
        this.inteligencia = inteligencia;
        this.suerte = suerte;
        this.fuerza = fuerza;
        this.vida = vida;
    }
    Personaje.prototype.saltar = function () {
        this.posY += 4;
        return this.posY;
    };
    Object.defineProperty(Personaje.prototype, "getSuerte", {
        get: function () {
            return this.suerte;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personaje.prototype, "setSuerte", {
        set: function (dato) {
            this.suerte = dato;
        },
        enumerable: false,
        configurable: true
    });
    Personaje.prototype.toString = function () {
        return "".concat(this.nombre, " (").concat(this.posX, ",").concat(this.posY, "):\nFuerza:").concat(this.fuerza, "\nInteligencia:").concat(this.inteligencia, "\nSuerte:").concat(this.suerte);
    };
    return Personaje;
}());
var felix = new Personaje('Felix', 0, 0, 4, 2, 1, 5);
var NPC = /** @class */ (function (_super) {
    __extends(NPC, _super);
    function NPC(nombre, posX, posY, inteligencia, suerte, fuerza, vida, trabajo) {
        var _this = _super.call(this, nombre, posX, posY, inteligencia, suerte, fuerza, vida) || this;
        _this.trabajo = trabajo;
        return _this;
    }
    return NPC;
}(Personaje));
var amal = new NPC('Amal', 1, 3, 5, 3, 1, 5, "Bibliotecario");
console.log(felix.toString());
