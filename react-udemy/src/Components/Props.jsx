import React,{Component} from 'react'

class Props extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    state = {  }
    render() { 
        return ( 
            <>
                {this.props.msg}
            </>
         );
    }
}
 


export default Props;