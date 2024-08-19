import { Fragment,Component } from "react";

class UserFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return ( <>
        <p>
            <label for="usr">Usuario: </label>
            <input id="usr" type="text"/>
        </p>
        <p>
            <label for="apikey">API KEY: </label>
            <input id="apikey" type="text"/>
        </p>
        <p>
            <button>Buscar</button>
        </p>
        <p>
            Estas son las brechas de tu usuario
        </p>
        </> );
    }
}
 
export default UserFinder;