import { User, UserAttribute } from "../model/Model";


export class AuthService{
    public async login(userName:string, password:string):Promise<User | undefined>{
        if (userName==='user' && password === '123') {
            return {
                userName: userName,
                email:'correo@mail.com'
            }
            
        }else{
            return undefined
        }

    }

    public async getUserAttributes(user: User):Promise<UserAttribute[]>{
        const result: UserAttribute[]=[];
        result.push({
            name:'description',
            value:'Hello World!!'
        });
        result.push({
            name:'job',
            value:'Engineer'
        });
        result.push({
            name:'age',
            value:'25'
        });
        result.push({
            name:'experience',
            value:'3 years'
        });
        return result
    }
}