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
            
                <PwdFinder></PwdFinder>
                <SecNews></SecNews>
                <UserFinder></UserFinder>
            </div>
        </Fragment> );
    }
}
 
export default Dashboard;