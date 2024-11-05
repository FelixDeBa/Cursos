import { Component } from "react";
import style from './ConfirmModelComponent.module.css'

interface ConfirmModelComponentProps{
    show: boolean,
    content: string,
    close: ()=> void
}

export class ConfirmModelComponent extends Component<ConfirmModelComponentProps>{
    render(){
        if(!this.props.show){
            return null
        }else{
            return(
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <h2>Intentaste Reservar..</h2>
                        <h3 className="modelText">{this.props.content}</h3>
                        <button onClick={()=>this.props.close()}>Cerrar</button>
                    </div>
                </div>
        )}
    }
}