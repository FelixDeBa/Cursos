import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../Redux/Actions/CounterAction'


const Contador = ({increment, decrement, counter}) => {
  return (
    <>
    <div className="default-card">
        <p className='alternate-big-title'>Contador con Redux</p>
        <hr />
        <button onClick={decrement}>-</button>
        {counter}
        <button onClick={increment}>+</button>

    </div>
    </>
  )
}

const mapStateToProps = (state) =>{
    return{
        counter:state.contador
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        increment: ()=> dispatch(increment()),
        decrement: ()=> dispatch(decrement())
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Contador)