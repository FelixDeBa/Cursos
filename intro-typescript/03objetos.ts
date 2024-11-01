let persona:{nombre:string,apellido:string,edad:number,accion():string}={
    nombre:"mauro",
    apellido:"baeez",
    edad:25,
    accion:():string=>{
        return "Hola"
    }
}

//tipos
type Asignaturas={
    matematicas:boolean,
    cienciasNaturales:boolean,
    fisica:boolean,
    artisticas:boolean,
    espanol:boolean,
    coro:boolean,
    grupoGlobal:()=>string
}

//Se puede crear un objeto a partir de un tipo
let Pablo:Asignaturas={
    matematicas:false,
    cienciasNaturales:true,
    fisica:false,
    artisticas:true,
    espanol:true,
    coro:true,
    grupoGlobal():string{
        return "302"
    }
}