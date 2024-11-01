
import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const ApodContext=createContext()

const NASA_API_KEY='2HTJp7FtljT2DXbGp5gTuglmoORHzZJLJpDjjonb'
// eslint-disable-next-line no-useless-escape
const urlRegex=/(?:(?:http|https):\/{2})?(?:www)?(?:[-a-zA-Z0-9@:%._\\+~#?&\/\/=]+)(?:\.(?:[-)a-zA-Z0-9@:%._\\+~#?&\/\/=]*))+/

const ApodProvider=(props)=>{
    const[apod, setApod]=useState({'status':'Error','type':'error','data':'error'})
    const fecha= new Date().toLocaleDateString('en-CA')
    // console.log(props)
    useEffect(()=>{
        const obtenerApod=async()=>{
            
            const apod=await axios.get('https://api.nasa.gov/planetary/apod?api_key='+NASA_API_KEY+'&date='+fecha)
            // console.log(apod)
            if(apod.status === 200){
                const data = apod.data
                if(data.hdurl){
                    setApod({
                        'status':'Ok',
                        'type':'image',
                        'data':data.hdurl
                    })
                }else if(data.url){
                    setApod({
                        'status':'Ok',
                        'type':'image',
                        'data':data.url
                    })
                }else{
                    Object.values(data).forEach((value)=>{
                        // const [key, value] = entry;
                        var urlImage = urlRegex.exec(value)
                        if(urlImage){
                            setApod({
                                'status':'Ok',
                                'type':'link',
                                'data':urlImage[0]
                            })
                            
                            return
                        }
                    })
                }
            }
        }
        obtenerApod()
    //eslint-disable-next-line
    },[])

    return(
        <ApodContext.Provider value={{apod}}>
            {props.children}
        </ApodContext.Provider>
    )
}

export default ApodProvider

// 'https://api.nasa.gov/planetary/apod?api_key={KEY}&date=1999-04-21'