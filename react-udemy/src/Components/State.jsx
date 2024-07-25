import React,{Component} from "react";

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"1.2",
            regla: "Regla def", 
            descripcion: "Sin descripcion",
            comando: "ls -la"
        }
    }

    hibpCall(){
        fetch('https://haveibeenpwned.com/api/v3/latestbreach')
        .then(response => response.json())
        .then(data => console.log(
            `Nombre de la Brecha: ${data['Name']}
Fecha: ${data['BreachDate']}
Descripcion: ${data['Description']}
Usuarios Afectados: ${data['PwnCount']}
Datos Extraidos: ${data['DataClasses']}`
        ))
        .then(escribirRespuesta(data));
        
    }

    escribirRespuesta(datos){
        this.setState({
            id: datos['Name'],
            regla: datos['Description'],
            descripcion: datos['PwnCount'],
            comando: datos['DataClasses']
        });
    }

    CambiarDatos(){
        if(this.state.id === "1.2" 
            && this.state.comando === "ls -la"){
                this.setState({
                    regla: "Asegurar que haya un mensaje de inicio de sesion", 
                    descripcion: "Lista el archivo /etc/banner",
                    comando: "cat /etc/banner"
                }); 
        }else{
            this.setState({
                regla: "Asegurar que haya un mensaje de inicio de sesion en ssh", 
                descripcion: "Lista el archivo /etc/issue.net",
                comando: "cat /etc/issue.net"
            });
        }

        
    }

    state = {  }
    render() { 
        return ( <>
        <div>
        Reglas de Hardening Redhat Enterprise Linux 7
         <ul>
                <p>
                <li>{this.state.regla}</li>
                </p>
                <p>
                <li>{this.state.descripcion}</li>
                </p>
                <p>
                <li>{this.state.comando}</li>
                </p>
         </ul>
         </div>
         <div class="button">
            <button onClick={this.CambiarDatos.bind(this)}>Siguiente</button>
            <button onClick={this.hibpCall}>Llamar a la API</button>
         </div>
        </> );
    }
}

export default State;