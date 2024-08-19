import { Fragment,Component } from "react";
import './css/cardElements.css'


class PwdFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( <Fragment>
        <div class="dashboard-card">
            <label for="pwdCheck">Revisa la seguridad de tu contraseña</label>
            <input class="pwdcheck" type="password"/>
        </div>
        </Fragment> );
    }
}
 
export default PwdFinder;