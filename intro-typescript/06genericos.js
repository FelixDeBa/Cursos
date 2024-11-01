//``Es una alternativa al any para que salte el error al momento de depurar y no al momento de ejecutar
function saludar() {
    return "Hola";
}
console.log(saludar()); //.floor() va a dar error porque no es un numero, pero si arriba tuviera un any no daria error
