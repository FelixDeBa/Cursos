import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const UserContext=createContext()

const UserProvider=(props)=>{
    const[users, setUsers]=useState([])

    useEffect(()=>{
        const obtenerUsuarios=async()=>{

        }
        obtenerUsuarios()

    })
}