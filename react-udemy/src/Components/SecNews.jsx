import { Fragment, Component } from "react";
// import arrowclockwise from './icons/arrow-clockwise.svg'

class SecNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"Brecha 1",
            breachDate:"20/08/2024",
            description:"Si estas viendo esta brecha generica significa que algo no cargo bien en el sitio, presiona f5, si los problemas persisten, consulta con un administrador",
            pwnCount:"1",
            dataClasses:["Correo Electronico", "Nombre de usuario", "contraseña", "test-item1"]
        };
        
    }
    state = {
        name:"",
        breachDate:"",
        description:"",
        pwnCount:"",
        dataClasses:""
    }
    render() { 
        return ( <Fragment>
        <div class="secnews-card">
            <div class="card-title">
                <div class="inner-title">Latest Breach</div>
                <div class="refresh-button">
                    <i class="bi bi-arrow-clockwise btn-ref"></i>
                </div>
                
            </div>
            <div class="news-text">
                <p class="breach-title">{this.state.name}</p>
                <p class="breach-date">{this.state.breachDate}</p>
                <hr/>
                <p>{this.state.description}</p>
                <p>{this.state.pwnCount}</p>
                {
                    (this.state.dataClasses).map((x) => (
                    <li class="breached-data">{x}</li>))
                }
            </div>
        </div>
        </Fragment> );
    }
}
 
export default SecNews;