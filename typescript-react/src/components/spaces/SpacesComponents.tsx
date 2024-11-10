import { Component } from "react";
import genericImage from '../../assets/image-not-found.png'
import './SpaceComponent.module.css';

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
            return <img className='spaceImage' src={this.props.photoUrl} alt={this.props.name}/>
        }else{
            return <img className='spaceImage' src={genericImage} alt={this.props.name}/>
        }
    }

    render(){
        return(
            <div className='spaceComponent'>
                {this.renderImage()}<br />
                <label className='name'>{this.props.name}</label><br/>
                <label className='spaceId'>{this.props.spaceId}</label><br/>
                <label className='location'>{this.props.location}</label><br/>
                <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>Reservar</button>
            </div>
        )
    }
}