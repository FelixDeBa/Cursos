//funcion declarada
function saludo(frase:string):string{
    return frase;
}
console.log(saludo("hola"))


//funcion expresada
const despedida=function(frase:string):string{
    return frase;
}
console.log(despedida('bay'))

//funcion flecha
const salto = (posY:number, posX:number):string=>{
    return `Te moviste a la coordenada ${posX}, ${posY}\nDistancia recorrida ${(Math.sqrt((posX*posX) + (posY*posY))).toFixed(2)} metros Aprox`;
}

console.log(salto(5, 5))

//Parametros opcioneales o por defecto
const movimiento=(posX?:number,posY:number=1):any=>{
    return `Te moviste en un angulo de ${(Math.atan(posY/posX)/(Math.PI/180)).toFixed(2)}°`
}
console.log(movimiento(5))

//pasando arrays por medio del operador rest ...
function animales(...listaAnimales:string[]):string[]{
    return listaAnimales
}

console.log(animales('pato','vaca','gallina','mula'))

