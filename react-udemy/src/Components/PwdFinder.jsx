import { Fragment,Component } from "react";
import './css/cardElements.css'


class PwdFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( <Fragment>
        <div class="pwdfinder-card">
            <p><label for="pwdCheck">Revisa la seguridad de tu contraseña</label></p>
            <p><input class="pwdcheck" type="password"/></p>
            <p><button class="find-button">Find</button></p>
            <p class="text-area">
                <p class="results-title">Your password has been cracked N times</p>
                <hr />
                <p class="results-area">
                    More info..
                    <br/>
                    Check at hibp.com
                </p>
            </p>

        </div>
        </Fragment> );
    }
}
 
export default PwdFinder;