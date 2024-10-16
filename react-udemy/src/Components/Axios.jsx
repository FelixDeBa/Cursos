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
          <div className='users-Data-Axios'> 
            <ul>
              {users.map(user=>(
                <li key={user.id}>
                  <p>Nombre: {user.name}</p>
                  <p>Correo: {user.email}</p>
                </li>

              ))}
            </ul>
          </div>
      </div>
      </>
  )
}

export default Axios