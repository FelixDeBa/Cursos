import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpacesComponents";
import { ConfirmModelComponent } from "./ConfirmModelComponent";

interface SpacesState{
    spaces: Space[],
    showModal: boolean,
    modalContent: string,
}

interface SpacesProps{
    dataService:DataService
}


export class Spaces extends Component<SpacesProps, SpacesState>{
    constructor(props: SpacesProps){
        super(props)
        this.state={
            spaces:[],
            showModal:false,
            modalContent:''
        }
        this.reserveSpace = this.reserveSpace.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    

    async componentDidMount(){
        const spaces= await this.props.dataService.getSpaces();
        this.setState({
            spaces: spaces
        })
    }

    private async reserveSpace(spaceId:string){
        const reserverationResult = await this.props.dataService.reserveSpace(spaceId)
        if(reserverationResult){
            this.setState({
                showModal: true,
                modalContent: `Tu numero de reservacion para el hotel ${spaceId} es ${reserverationResult}`
            })
        }else{
            this.setState({
                showModal: true,
                modalContent: `No puedes reservar el espacio con id ${spaceId}`
            })
        }
    }

    private closeModal(){
        this.setState({
            showModal: false,
            modalContent: ''
        })
    }

    private renderSpaces(): any{
        const rows: any[] = []
        for(const space of this.state.spaces){
            
            rows.push(
                <SpaceComponent  key={space.spaceId}
                    location={space.location}
                    name={space.name}
                    spaceId={space.spaceId}
                    photoUrl={(space.photoUrl)?space.photoUrl:undefined}
                    reserveSpace={this.reserveSpace}
                />
            )
        }
        // console.log(rows)
        return rows
    }
    render(){
        return(
            <div>
                <h2>Hoteles</h2>
                {this.renderSpaces()}
                <ConfirmModelComponent 
                    close={this.closeModal} 
                    content={this.state.modalContent} 
                    show={this.state.showModal} 
                />
            </div>
        );
    }
}