import React from "react";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Link } from "react-router-dom";

interface ProfileState{
    userAttributes: UserAttribute[]
}
interface ProfileProps{
    user: User | undefined
    authService: AuthService
}

export class Profile extends React.Component<ProfileProps, ProfileState>{
    state: ProfileState = {
        userAttributes:[]
    }

    async componentDidMount(){
        if (this.props.user){
            const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
            this.setState({
                userAttributes:userAttrs
            })
        }
    }

    private renderUserAttributes(){
        const rows =[]
        for(const userAttribute of this.state.userAttributes){
            rows.push(<tr key={userAttribute.name}>
                <td>{userAttribute.name}</td>
                <td>{userAttribute.value}</td>
                </tr>)
        }
        return <table>
            <tbody>{rows}
                </tbody></table>
    }

    render(){
        let profileSpace
        if(this.props.user){
            profileSpace= <div> <h3>Hello {this.props.user.userName}</h3>
            Tus caracteristicas:
            {this.renderUserAttributes()}
            </div>
        }else{
            profileSpace=<div>
                Please <Link to="/login">Login</Link>
            </div>
        }
        return(
            <div className="profile-card">
                <div className="profile-title">{profileSpace}</div>
            </div>
        )
    }
}