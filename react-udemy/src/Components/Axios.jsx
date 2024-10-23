import React, { useEffect, useState } from 'react'
import axios from 'axios'
const urlBase='https://jsonplaceholder.typicode.com/users'



const Axios = () => {
  const[users,setUsers]=useState([])
  

  useEffect(()=>{
    const cargarUsuarios=async()=>{
      const res = await axios.get(urlBase);
      if(res.status === 200){
        setUsers(res.data);
        // console.log(res.data)
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