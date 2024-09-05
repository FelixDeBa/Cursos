import React,{createRef, Fragment} from 'react'
import './css/cardElements.css'

/*
##################################################################################
##################################################################################
##################################################################################
ESTE ES UN COMPONENTE FUNCIONAL DE FLECHA QUE VIENE A SER LA VERSION MAS RECIENTE
Y COMPLETA DE LOS COMPONENTES EN REACT
##################################################################################
##################################################################################
##################################################################################
*/
const FileHash = () => {
    function readbinaryfile(file){
        return new Promise((resolve,Object) => {
            var fr = new FileReader()
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsArrayBuffer(file);
        });
    }
    
    function Uint8ArrayToHexString(ui8array){
        var hexstring = '',
        h;
        for(var i= 0; i< ui8array.length; i++){
            h = ui8array[i].toString(16);
            if(h.length === 1){
                h = '0' + h;
            }
            hexstring += h
        }
        var p = Math.pow(2, Math.ceil(Math.log2(hexstring.length)));
        hexstring = hexstring.padStart(p,'0');
        return hexstring;
    }

    function getFileHash(){
        var fileToHash = document.getElementById('file-selector');
        readbinaryfile(fileToHash.files[0])
        .then(function(result){
            result = new Uint8Array(result)
            return window.crypto.subtle.digest('SHA-256', result);
        }).then(function(result){
            result = new Uint8Array(result);
            var restultHex = Uint8ArrayToHexString(result);
            nuevoHash.current.innerText = "SHA-256: " + restultHex;
        });
        // console.log(document.getElementById('file-selector').value)
    }
    const nuevoHash=createRef()
    //     cambioColor.current.style.color='red';

    return (
        <Fragment>
        <div class="filehasher-card">
            <p>
                <label class="descriptive-label" htmlFor="hash.box">Selecciona el archivo: </label>
                {/* <input id="hash-box" class="hash-box" type="text"/> */}
            </p>
            <p>
                <input type="file" id="file-selector" onChange={getFileHash}/>
            </p>
            <div id="hash-result" className="hash-result" ref={nuevoHash}>
                Selecciona un archivo para poder ver su hash
            </div>
        </div>
        </Fragment> 
    )
}

export default FileHash