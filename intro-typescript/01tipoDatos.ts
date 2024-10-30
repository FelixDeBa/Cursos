
//boolean
let esHombre:boolean=true

console.log(typeof esHombre)

//numbers (enteros y decimales)
let numero:number=35
numero=4.8

//strings
let frase:string="Hola mundo"

//Any nani?
let otrogato:any="Quien anda ahi"
otrogato=1
otrogato="gato"
otrogato=false

// tuplas y arrays
let lista:string[]=['pan', 'queso', 'tomate']
let tup:[string, number, boolean]=['pizza', 33.95, true]

tup.push('Quecho\'s')
console.log(tup)

//Enumerables o enum
enum Podium{
    Mexico,
    Espana, Alemania,
    Francia,
    Italia,
    Colombia
}

let posicion:number=Podium.Italia
console.log(posicion)


//void es equivalente a null o None pero para funciones

function saludo(palabra:string):void{
    console.log(`${palabra}`)
}

//Never devuelve error
function error(frase:string):never{
    throw new Error(frase)
}

error("Error, no se puede ejeuctar")

saludo("Buenas")

//tipos null y undefined
let nada:undefined=undefined
let nulo:null=null

//tsc tipoDatos.ts -w para compilar en modo live