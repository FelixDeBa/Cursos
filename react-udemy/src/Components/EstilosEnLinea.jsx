import React,{Component,Fragment} from "react";

class EstilosEnLinea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorFuente:'black',
            textoBtn:'O'
        }
    }
    cambiarFooter(){
        if(this.state.colorFuente === "black"){
            this.setState({
                colorFuente:'white',
                textoBtn:'/'
        })
        }else{
            this.setState({
                colorFuente:'black',
                textoBtn:'O'
            })
        }
    }

    render() {
        const footerBox={
            display:'flex',
            width:'100%',
            textAlign:'center',
            backgroundColor:this.state.colorFuente==='black'? 'beige' : 'black',
            color:this.state.colorFuente
        };
        const footer={
            textAlign:'center',
            marginLeft:'auto',
            marginRight:'auto'
        };
        const btnFooter={
            align:'right',
            width:'25px',
            marginLeft:'1px',
            marginRight:'0px'
        }
        return ( <>
        <footer>
            <div style={footerBox}>
                <p style={footer}>Footer con estilo hecho en Javascript</p>
                <button onClick={this.cambiarFooter.bind(this)} style={btnFooter}>{this.state.textoBtn}</button>
            </div>
        </footer>
        </> );
    }
}
 
export default EstilosEnLinea;