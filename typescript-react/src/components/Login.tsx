import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { User } from "../model/Model";

interface LoginProps{
    authService:AuthService;
    setUser:(user:User) =>void
}
interface LoginState{
    userName:string,
    password:string,
    loginAttempted:boolean,
    loginSuccess:boolean,
}

interface CustomEvent{
    target:HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState>{
    state: LoginState={
        userName:'',
        password:'',
        loginAttempted:false,
        loginSuccess:false,
    }

    private setUserName(event: CustomEvent){
        this.setState({userName: event.target.value})
    }

    private setUserPassword(event: CustomEvent){
        this.setState({password: event.target.value})
    }
    
    private async handleSubmit(event: SyntheticEvent){
        event.preventDefault();
        this.setState({loginAttempted:true})
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if(result){
            console.log(result)
            this.setState({loginSuccess: true})
            this.props.setUser(result)
            // window.location.href='/profile'
        }else{
            console.error("Wrong Login")
            this.setState({loginSuccess: false})
        }
    }

    render(){
        let loginMessage: any;
        if(this.state.loginAttempted){
            if(this.state.loginSuccess){
                loginMessage=<label>Login successful</label>
            }else{
                loginMessage=<label>Login failed!!!</label>
            }
        }
        return(
            <div>
                <h2 className="login-title">Login into your Account</h2>
                <form onSubmit={e=> this.handleSubmit(e)}>
                    
                    <input value={this.state.userName} onChange={e=> this.setUserName(e)}/><br/>
                    <input value={this.state.password} onChange={e=> this.setUserPassword(e)}/><br/>
                    <input type='submit' value='Login'/>
                </form>
                {loginMessage}
            </div>
        )
    }
}