import { Fragment, Component } from "react";
import PwdFinder from "./PwdFinder";
import SecNews from "./SecNews";
import './css/dashboard.css'
import FileHash from "./FileHash";
import Hooks from "./Hooks";
import Formularios from "./Formularios";
import Eventos from "./Eventos";
import RenderizadoCondicional from "./RenderizadoCondicional";
import SpreadOperator from "./SpreadOperator";
import Graficos from "./Graficos";
import Fetch from "./Fetch";
import Axios from "./Axios";
import PadreRutas from "./PadreRutas";
import CustomHooks from "./CustomHooks";

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
            <div className="main-screen">
                <div className="title-container">
                    <h1 className="dashboard-title">Dashboard</h1>
                </div>
                <div className="card-row">
                    <PwdFinder/>
                    <SecNews/>
                </div>
                <div className="card-row">
                    <FileHash />
                    <Hooks />
                    <Formularios />
                </div>
                <div className="card-row">
                    <Eventos />
                    <RenderizadoCondicional />
                    {/* {this.cards.map(card=>( */}
                        {/* <SpreadOperator cardName={card}/> */}
                    {/* ))} */}
                    <SpreadOperator/>
                </div>
                <div className="card-row">
                    <Graficos/>
                    <Fetch />
                </div>
                <div className="card-row">
                    <Axios />
                    <PadreRutas />
                </div>
                <div className="card-row">
                    <CustomHooks />
                </div>
            </div>
        </Fragment> );
    }
}
 
export default Dashboard;