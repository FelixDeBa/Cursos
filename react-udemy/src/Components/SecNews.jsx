import { Fragment, Component } from "react";
import parse from 'html-react-parser'

class SecNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"Brecha 1",
            breachDate:"20/08/2024",
            description:"Si estas viendo esta brecha generica significa que algo no cargo bien en el sitio, presiona f5, si los problemas persisten, consulta con un administrador",
            pwnCount:"1",
            dataClasses:["Correo Electronico", "Nombre de usuario", "contraseña", "test-item1"],
            evento: null
        };
        // this.hibpCall()        
    }

    
    

    hibpCall(){
        fetch('https://haveibeenpwned.com/api/v3/latestbreach')
        .then(data => {
            return data.json()}
        )
        .then(data => {
            this.setState({
                name: data['Name'],
                breachDate: data['BreachDate'],
                description: data['Description'],
                pwnCount: data['PwnCount'],
                dataClasses: data['DataClasses'],
                evento:null
            });
        });        
    }

    componentDidMount(){
        this.hibpCall()        
    }


    componentDidUpdate(prevProps,prevState){
        if(prevState.name===this.state.name){
            console.log('No hay actualizaciones, la brecha sigue siendo ' + prevState.name)
        }else{
            console.log('Hay una nueva brecha')
        }
    }

    // componentWillUnmount(){
    //     window.removeEventListener('resize',this.state.evento)
    // }

    render() { 
        return ( <Fragment>
        <div class="secnews-card">
            <div class="card-title">
                <div class="inner-title">Latest Breach</div>
                <div class="refresh-button" onClick={this.hibpCall.bind(this)}>
                    <i class="bi bi-arrow-clockwise btn-ref"></i>
                </div>
                
            </div>
            <div class="news-text">
                <p class="breach-title">{this.state.name}</p>
                <p class="breach-date">{this.state.breachDate}</p>
                <hr/>
                <p>{parse(this.state.description)}</p>
                <p>Cuentas Afectadas: {this.state.pwnCount}</p>
                <p>Datos exfiltrados:</p>
                <ul>
                {
                    (this.state.dataClasses).map((x) => (
                    <li class="breached-data">{x}</li>))
                }
                </ul>
            </div>
        </div>
        </Fragment> );
    }
}
 
export default SecNews;