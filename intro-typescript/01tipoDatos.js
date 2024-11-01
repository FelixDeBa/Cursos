//boolean
var esHombre = true;
console.log(typeof esHombre);
//numbers (enteros y decimales)
var numero = 35;
numero = 4.8;
//strings
var frase = "Hola mundo";
//Any nani?
var otrogato = "Quien anda ahi";
otrogato = 1;
otrogato = "gato";
otrogato = false;
// tuplas y arrays
var lista = ['pan', 'queso', 'tomate'];
var tup = ['pizza', 33.95, true];
tup.push('Quecho\'s');
console.log(tup);
//Enumerables o enum
var Podium;
(function (Podium) {
    Podium[Podium["Mexico"] = 0] = "Mexico";
    Podium[Podium["Espana"] = 1] = "Espana";
    Podium[Podium["Alemania"] = 2] = "Alemania";
    Podium[Podium["Francia"] = 3] = "Francia";
    Podium[Podium["Italia"] = 4] = "Italia";
    Podium[Podium["Colombia"] = 5] = "Colombia";
})(Podium || (Podium = {}));
var posicion = Podium.Italia;
console.log(posicion);
//void es equivalente a null o None pero para funciones
function saludo(palabra) {
    console.log("".concat(palabra));
}
//Never devuelve error
function error(frase) {
    throw new Error(frase);
}
error("Error, no se puede ejeuctar");
saludo("Buenas");
//tipos null y undefined
var nada = undefined;
var nulo = null;
//tsc tipoDatos.ts -w para compilar en modo live
