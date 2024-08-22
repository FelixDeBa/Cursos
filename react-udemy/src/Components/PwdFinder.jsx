import { Fragment,Component } from "react";
import './css/cardElements.css'


class PwdFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    showPassword(){
        var x = document.getElementById("password_to_check");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() { 
        return ( <Fragment>
        <div class="pwdfinder-card">
            <p><label class="alternate-big-title" for="pwdCheck">Revisa la seguridad de tu contraseña</label></p>
            <p>
                <input class="password_box" id="password_to_check" type="password"/>
                <input type="checkbox" onClick={this.showPassword}/>Show Password
            </p>
            <p><button class="find-button">Find</button></p>
            <p class="password-result-area">
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