import React from 'react'

const SpreadOperator = (props) => {
    const reales=['Termo', 'Camioneta', 'Losa', 'Computadora']
    const abstrac=['Saludo', 'Paciencia', 'Internet', 'Miedo', 'Cansancio']
    // eslint-disable-next-line no-unused-vars
    const objetos=[...reales, ...abstrac]
    // console.log(objetos)

    const paisesEuropa=[
        {
            id:'ES',
            nombre:'España'
        },
        {
            id:'PT',
            nombre:'Portugal'
        },
        {
            id:'GR',
            nombre:'Groenlandia'
        }
    ]
    const paisesAmerica=[
        {
            id:'US',
            nombre:'Estados Unidos'
        },
        {
            id:'MX',
            nombre:'Mexico'
        }
    ]

    const paises=[...paisesEuropa, ...paisesAmerica]

    const animal={
        nombre:'Milaneso',
        especie: 'Perro',
        edad:5,
        raza:'Xoloitzcuincle'
    }

    const key=Object.keys(animal)
    //console.log(paises)
    return (
    <>
        <div className="default-card">
        <p className='alternate-big-title'>{props.cardName}</p>
        <hr />
        <table>
            <tbody>
                <td>
                    <ul>
                        {objetos.map(objeto =>(
                        <li key={objeto}>{objeto}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <ul>
                    {paises.map(pais =>(
                        <li key={pais.id}>
                            {pais.id}: {pais.nombre}
                        </li>
                    ))}
                    </ul>
                </td>
                <td>
                    <ul>
                    {key.map(k =>(
                        <li key={k}>
                            {k}: {animal[k]}
                        </li>
                    ))}
                    </ul>
                </td>
            </tbody>
        </table>
        </div>
    </>
  )
}

export default SpreadOperator