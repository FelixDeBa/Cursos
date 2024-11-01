interface Persona{
    nombre:string,
    edad:number,
    apellido1:string,
    apellido2:string,
    isCasado:boolean,
    pensionado(edad:number):boolean,
}

let mauro:Persona ={
    nombre:"Mauro",
    apellido1:"Baez",
    apellido2:"Acosta",
    edad:25,
    isCasado:false,
    pensionado:(edad:number):boolean=>{
        if(edad >= 65){
            return true
        }else{
            return false
        }
    }
}
console.log(mauro.pensionado(mauro.edad))

class Adulto implements Persona{
    nombre:string
    apellido1:string
    apellido2:string
    edad:number
    isCasado:boolean
    empleo:string
    constructor(nombre:string, apellido1:string,apellido2:string, edad:number, isCasado:boolean, empleo:string){
        this.nombre=nombre
        this.apellido1=apellido1
        this.apellido2=apellido2
        this.edad=edad
        this.isCasado=isCasado
        this.empleo=empleo
    }

    public pensionado(){
        return true
    }

}

interface Movimiento{
    (valor:boolean):boolean

}

let salto:Movimiento;
salto=function(valor:boolean):any{
    return valor ? "Se movio" : "No se movio"
}

console.log(salto(true))