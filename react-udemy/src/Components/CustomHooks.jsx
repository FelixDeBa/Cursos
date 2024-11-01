import React from 'react'
import { useCount } from './hooks/useCount'

const CustomHooks = () => {
    const[contador]=useCount(0)
    return (
        <>
        <div className="default-card">
        <p className='alternate-big-title'>Timer con CustomHook</p>
        <hr />
        <p>{contador}</p>
        </div>
        </>
    )
}

export default CustomHooks