import { Component } from "react";
import genericImage from '../../assets/image-not-found.png'
import style from './SpaceComponent.module.css';

interface SpaceComponentProps{
    spaceId:string,
    name:string,
    location:string,
    photoUrl?:string,
    reserveSpace: (spaceId:string)=> void
}

export class SpaceComponent extends Component<SpaceComponentProps>{
    private renderImage(){
        if(this.props.photoUrl){
            return <img className={style.spaceImage} src={this.props.photoUrl} alt={this.props.name}/>
        }else{
            return <img className={style.spaceImage} src={genericImage} alt={this.props.name}/>
        }
    }

    render(){
        return(
            <div className={style.spaceComponent}>
                {this.renderImage()}<br />
                <label className={style.name}>{this.props.name}</label><br/>
                <label className={style.spaceId}>{this.props.spaceId}</label><br/>
                <label className={style.location}>{this.props.location}</label><br/>
                <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>Reservar</button>
            </div>
        )
    }
}