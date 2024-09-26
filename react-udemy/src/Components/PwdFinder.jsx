import { Fragment,Component } from "react";
import './css/cardElements.css'


async function passwordHash(passText){
    const msgUint8 = new TextEncoder().encode(passText); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-1", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

class PwdFinder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hackedTimes: 0
         };
    }

    showPassword(){
        var x = document.getElementById("password_to_check");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    async passwordFind(){
        var passwd = document.getElementById("password_to_check");
        var progressBar = document.createElement('progress');
        document.getElementById('progress-bar').appendChild(progressBar);
        if (passwd.value !== "" && passwd.value !== null){
            var passHash  = await passwordHash(passwd.value);
            var passHash_restante = passHash.substring(5);
            var url = "https://api.pwnedpasswords.com/range/"+(passHash.substring(0,5))
            fetch(url).then(data => {
                return data.text()
            }).then(data => {
                var hashes = (data.split('\r\n'));
                hashes.forEach((hashVal) => {
                    if (((hashVal.split(':')[0]).toLowerCase() === passHash_restante.toLowerCase())){
                        this.setState({
                            hackedTimes: hashVal.split(':')[1]
                        })
                        sessionStorage.setItem('passwdHacked', true);
                        sessionStorage.setItem('passwdHackedTimes', hashVal.split(':')[1])
                        return;
                    }
                });
            });
        }else{
            alert("Escribe una contraseña");
        }
        await sleep(2000);
        var result_box = document.getElementById("password-result-area");
        result_box.style.display ="inline";
        if(sessionStorage.getItem('passwdHacked') === 'true'){
            var times = sessionStorage.getItem('passwdHackedTimes');
            if(times >= 100){
                document.getElementById('passwordAdvice').innerHTML = "Es importante que cambies tu contraseña pronto, podria  ya haber sido vulnerada";
            }else if(times <= 100 && times >=10){
                document.getElementById('passwordAdvice').innerHTML = "Es ampliamente recomendable cambiar tu contraseña, puede ser vulnerada en cualquier momento";
            }else if(times < 10 && times>0){
                document.getElementById('passwordAdvice').innerHTML = "No ha sufrido muchas brechas, pero aun asi es importante cambiar la contraseña ya que puede ser adivinada con mucha facilidad";
            }else if (times <1){
                document.getElementById('passwordAdvice').innerHTML = "¡FELICIDADES! Tu contraseña no ha sido vulnerada, recuerda utilizar una contraseña robusta, cambiarla con frecuencia y evitar repetirlas en distintos sitios web. Ademas es altamente recomendable utilizar siempre un metodo de Multiple Factura de Autenticacion";
            }
        }else{
            document.getElementById('passwordAdvice').innerHTML = "¡FELICIDADES! Tu contraseña no ha sido vulnerada, recuerda utilizar una contraseña robusta, cambiarla con frecuencia y evitar repetirlas en distintos sitios web. Ademas es altamente recomendable utilizar siempre un metodo de Multiple Factura de Autenticacion";
            this.setState({
                hackedTimes: 0
            });
        }

        sessionStorage.removeItem('passwdHacked');
        sessionStorage.removeItem('passwdHackedTimes');
        progressBar.remove();
    }

    render() { 
        return ( <Fragment>
        <div class="default-card">
            <p><label class="alternate-big-title" htmlFor="pwdCheck">Revisa la seguridad de tu contraseña</label></p>
            <p>
                <input class="password-box" id="password_to_check" type="password"/>
                <input type="checkbox" onClick={this.showPassword}/>Show Password
            </p>
            <p><button class="find-button" onClick={this.passwordFind.bind(this)}>Find</button></p>
            <div id="progress-bar">

            </div>
            <p id="password-result-area" class="password-result-area">
                <p class="results-title">Your password has been cracked {this.state.hackedTimes} times</p>
                <hr />
                <p id="passwordAdvice" class="passwordAdvice">
                    More info..
                    Check at hibp.com
                </p>
            </p>

        </div>
        </Fragment> );
    }
}
 
export default PwdFinder;