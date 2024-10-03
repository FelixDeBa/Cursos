import React from 'react'
import Plot from 'react-plotly.js'



const Graficos = () => {
  return (
    <>
        <div id="cartaGrafico" className="big-card">
            <p className='alternate-big-title'>Grafica con React Plotly</p>
            <hr />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width:400, title: 'Grafico por Defecto', autosize: true} }
                    config = { { responsive: true } }
                />
        </div>
    </>
  )
}

export default Graficos