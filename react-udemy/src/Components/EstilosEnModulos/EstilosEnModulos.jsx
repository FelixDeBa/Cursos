import React,{Fragment, Component} from "react";
import styles from './EstilosEnModulo.module.css'

class EstilosEnModulos extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <h1 className={styles.piepag}>Ya por fin el ultimo estilo... ahh no falta otro</h1>
            </Fragment>
        );
    }
}
 
export default EstilosEnModulos;