namespace CLASES{
class Bloque{
    public posX:number
    public posY:number
    public ancho:number
    public alto:number
    public color:string
    constructor(posX:number, posY:number, ancho:number, alto:number, color:string){
        this.posX=posX
        this.posY=posY
        this.ancho=ancho
        this.alto=alto
        this.color=color
    }

    public dibujar(color:string='red'){
        ctx.fillStyle=color
        ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
    }

    public mover(){
        this.posY+=1;
    }
}

export let listaBloques:any[]=[]
 listaBloques.push(new Bloque(32,0,32,32,'red'))
 listaBloques.push(new Bloque(170,0,32,32,'red'))
 listaBloques.push(new Bloque(207,0,32,32,'red'))
 listaBloques.push(new Bloque(344,0,32,32,'red'))
 listaBloques.push(new Bloque(481,0,32,32,'red'))
 listaBloques.push(new Bloque(569,0,32,32,'red'))
 listaBloques.push(new Bloque(702,0,32,32,'red'))
 listaBloques.push(new Bloque(780,0,32,32,'red'))

 export let block = new Bloque(400,0,32,32,'blue')

}