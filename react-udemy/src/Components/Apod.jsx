import React, { useContext } from 'react'
import { ApodContext } from './context/ApodContext'

const Apod = (props) => {
    const{apod}=useContext(ApodContext)
    
    // const urlDeHoy=apod
    // console.log(apod)

    return (
        <>
        <div className="default-card">
            <p className='alternate-big-title'>Astronomy Picture of Day: API NASA</p>
            <hr />
            {/* <input type='text' placeholder="introduce la fecha"/>
            <button onClick={}>Consultar</button> */}
            <div className="apod-container">
                {apod.type==='link' ? 
                    <div className="url-image">
                        <p>
                        No hay URL directa, te compartimos el enlace de Twitter con la imagen
                        </p>
                        <p>
                            <a href={"https://"+apod.data} target="_blank" rel="noopener noreferrer">
                                {apod.data}
                            </a>
                            
                        </p>
                    </div> : 
                    apod.type==='image'?
                    <div className='image-of-the-day-by-NASA'>
                        <img 
                          alt="Imagen del dia"
                          src={apod.data}
                        />
                    </div>:
                    <h3>Error al obtener la imagen</h3>
                }
                {/* <img 
                 alt="imagen Astronomica del dia"
                 href={urlDeHoy}

                /> */}
            </div>
        </div>
        </>
    )
}

export default Apod