import { Fragment, Component } from "react";
import PwdFinder from "./PwdFinder";
import SecNews from "./SecNews";
import UserFinder from "./UserFinder";
import './css/dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"1.2",
            fecha: "",
            regla: "Regla def", 
            descripcion: "Sin descripcion",
            comando: "ls -la"
        }
    }

    render() { 
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
                    <UserFinder />
                </div>
            </div>
        </Fragment> );
    }
}
 
export default Dashboard;