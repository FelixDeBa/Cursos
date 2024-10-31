///<reference path='02.clases.ts'/>

const colores:string[]=['red','blue','orangered','yellow', 'wheat']
let c:number=0

document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'w': case 'W':{
            CLASES.block.posY-=5
            break;
        }
        case 'a': case 'A':{
            CLASES.block.posX-=5
            break;
        }
        case 's': case 'S':{
            CLASES.block.posY+=5
            break;
        }
        case 'd': case 'D':{
            CLASES.block.posX+=5
            break;
        }
        case 'Enter':{
            c>=4?c=0:c+=1
            CLASES.block.color!=colores[c]?CLASES.block.color=colores[c]:null
            
            break;
        }
        default: {
            break;
        }
    }
})

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