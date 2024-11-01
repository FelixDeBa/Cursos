///<reference path='02.clases.ts'/>



const canvas:any=document.querySelector('canvas')
const ctx=canvas.getContext('2d')
const cuerpo:any=document.querySelector('body')

canvas.width = 800
canvas.height = 608

canvas.style.border="4px solid black"
canvas.style.backgroundColor="grey"

cuerpo.style.backgroundColor="black"
cuerpo.style.display="flex"
cuerpo.style.justifyContent="center"

function pinta(){
    let escenario:number[][]=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    for(let y=0;y<19;y++){
        for(let x=0;x<25;x++){
            if(y>=15){
                ctx.fillStyle = 'darkgreen'
                ctx.fillRect(32*x,32*y,32,32)
            }else if(escenario[y][x]==0){
                ctx.fillStyle = 'lightblue'
                ctx.fillRect(32*x,32*y,32,32)
            }
        }
    }
    CLASES.listaBloques.map(bloque=>{
        let coordX:number=Math.round(bloque.posX/32)
        let coordY:number=Math.round(bloque.posY/31)
        bloque.dibujar()
        if(escenario[coordY][coordX]==0){
            bloque.mover()
        }
        
    })

    //Para dibujar el bloque del medio
    CLASES.block.dibujar(CLASES.block.color)

}

function principal(){
    requestAnimationFrame(principal)
    //Actualizar el dibujo de los cubos
    canvas.width=800
    canvas.height=608

    //actualizar el dibujo del escenario
    pinta()   
}
principal()