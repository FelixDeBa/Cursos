import React, { useEffect, useState } from 'react'
const urlBase='https://jsonplaceholder.typicode.com/users'


const Axios = () => {
  const[users,setUsers]=useState([])
  

  useEffect(()=>{
    const cargarUsuarios=async()=>{
      const res = await fetch(urlBase);
      if(res.status === 200){
        const data= await res.json();
        setUsers(data);
      }else{
        console.error("ERROR")
        console.log(res.status)
      }
    }

    cargarUsuarios();
  },[])
  
  return (
    <>
      <div id="" className="default-card">
          <p className="alternate-big-title">Llamada a API por Axios</p>
          <hr />
          <table className='users-Data-Axios'>
            <thead>
              <tr className="users-data-header">
                <th>Nombre</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody className='users-data'>
              {users.map(user=>(
                <tr key={user.id}>
                  <td className='users-name-row'>{user.name}</td>
                  <td className='users-email-row'>{user.email}</td>
                </tr>

              ))}
            </tbody>
          </table>
      </div>
      </>
  )
}

export default Axios