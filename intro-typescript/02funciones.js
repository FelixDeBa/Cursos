//funcion declarada
function saludo(frase) {
    return frase;
}
console.log(saludo("hola"));
//funcion expresada
var despedida = function (frase) {
    return frase;
};
console.log(despedida('bay'));
//funcion flecha
var salto = function (posY, posX) {
    return "Te moviste a la coordenada ".concat(posX, ", ").concat(posY, "\nDistancia recorrida ").concat((Math.sqrt((posX * posX) + (posY * posY))).toFixed(2), " metros Aprox");
};
console.log(salto(5, 5));
//Parametros opcioneales o por defecto
var movimiento = function (posX, posY) {
    if (posY === void 0) { posY = 1; }
    return "Te moviste en un angulo de ".concat((Math.atan(posY / posX) / (Math.PI / 180)).toFixed(2), "\u00B0");
};
console.log(movimiento(5));
//pasando arrays por medio del operador rest ...
function animales() {
    var listaAnimales = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        listaAnimales[_i] = arguments[_i];
    }
    return listaAnimales;
}
console.log(animales('pato', 'vaca', 'gallina', 'mula'));
