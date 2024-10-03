import { Fragment, Component } from "react";
import PwdFinder from "./PwdFinder";
import SecNews from "./SecNews";
// import FileHasher from "./FileHasher";
import './css/dashboard.css'
import FileHash from "./FileHash";
import Hooks from "./Hooks";
import Formularios from "./Formularios";
import Eventos from "./Eventos";
import RenderizadoCondicional from "./RenderizadoCondicional";
import SpreadOperator from "./SpreadOperator";
import Graficos from "./Graficos";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    cards=['Operacions con Arreglos']

    render() { 
        if(this.props.nuevoEstado === true){
            console.log("Se cambio el estado a verdadero desde las notificaciones");
        }

        return ( <Fragment>
            <div class="main-screen">
                <div class="title-container">
                    <h1 class="dashboard-title">Dashboard</h1>
                </div>
                <div class="card-row">
                    <PwdFinder/>
                    <SecNews/>
                </div>
                <div class="card-row">
                    {/* <FileHasher /> */}
                    <FileHash />
                    <Hooks />
                    <Formularios />
                </div>
                <div class="card-row">
                    <Eventos />
                    <RenderizadoCondicional />
                    {this.cards.map(card=>(
                        <SpreadOperator cardName={card}/>
                    ))}
                </div>
                <div class="card-row">
                    <Graficos/>
                </div>
            </div>
        </Fragment> );
    }
}
 
export default Dashboard;