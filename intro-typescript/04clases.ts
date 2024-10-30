class Personaje{
    public posX:number
    private posY:number
    protected inteligencia:number
    private suerte:number
    private fuerza:number
    private vida:number
    public nombre:string

    constructor(nombre:string, posX:number, posY:number, inteligencia:number, suerte:number, fuerza:number, vida:number){
    this.nombre=nombre
    this.posX = posX
    this.posY = posY
    this.inteligencia = inteligencia
    this.suerte = suerte
    this.fuerza = fuerza
    this.vida=vida
    }
    public saltar(){
        this.posY+=4
        return this.posY
    }
    protected get getSuerte(){
        return this.suerte
    }

    protected set setSuerte(dato:number){
        this.suerte=dato
    }

    public toString():string{
        return `${this.nombre} (${this.posX},${this.posY}):\nFuerza:${this.fuerza}\nInteligencia:${this.inteligencia}\nSuerte:${this.suerte}`
    }
    
}

let felix:Personaje=new Personaje('Felix',0,0,4,2,1,5)

class NPC extends Personaje{
    trabajo:string
    constructor(nombre:string, posX:number, posY:number, inteligencia:number, suerte:number, fuerza:number, vida:number, trabajo:string){
        super(nombre,posX, posY, inteligencia, suerte, fuerza, vida)
        this.trabajo=trabajo
    }
}

let amal:NPC=new NPC('Amal', 1,3,5,3,1,5,"Bibliotecario")

console.log(felix.toString())
