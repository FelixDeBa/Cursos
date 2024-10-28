//acciones
export const INCREMENT='INCREMENT'
export const DECREMENT='DECREMENT'

//constructores
export const increment=()=>{
    return{
        type:INCREMENT
    }
}

export const decrement=()=>{
    return{
        type:DECREMENT
    }
}