import { Space } from "../model/Model";
import hotelTeotihuacan from '../assets/hotel-teotihuacan.jpg'
import hotelMallorca  from '../assets/hotel-mallorca.jpg'
// import hotalCatalina from '../assets/hotel-catalina.jpg'

export class DataService{
    public async getSpaces():Promise<Space[]>{
        const result: Space[]= []
        result.push({
            location: "Mallorca",
            name: "Ubicado en el centro de la ciudad",
            spaceId: "111",
            photoUrl: hotelMallorca
        })
        result.push({
            location: "Teotihuacan",
            name: "Cerca de las piramides",
            spaceId: "112",
            photoUrl: hotelTeotihuacan
        })
        result.push({
            location: "Catalina",
            name: "Ubicado a escasos metros del Zocalo de la ciudad",
            spaceId: "113",
            // photoUrl: '../assets/hotel-catalina.jpg'
        })
        
        return result;

    }

    public async reserveSpace(spaceId:string):Promise<string | undefined>{
        if(spaceId==='111'){
            return('5555')
        }else{
            return undefined
        }
    }

}
