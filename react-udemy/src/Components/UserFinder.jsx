import { Fragment,Component } from "react";
import './css/cardElements.css'

class UserFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return ( <Fragment>
        <div class="userfinder-card">
            <p>
                <label htmlFor="usr">API KEY: </label>
                <input id="usr" type="text"/>
            </p>
            <p>
                <label htmlFor="apikey">Username or E-mail: </label>
                <input id="apikey" type="text"/>
            </p>
            <p>
                <button class="find-button">Find</button>
            </p>
            <p>
                Estas son las brechas de tu usuario
            </p>
        </div>
        </Fragment> );
    }
}
 
export default UserFinder;