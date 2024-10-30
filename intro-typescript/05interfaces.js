var mauro = {
    nombre: "Mauro",
    apellido1: "Baez",
    apellido2: "Acosta",
    edad: 25,
    isCasado: false,
    pensionado: function (edad) {
        if (edad >= 65) {
            return true;
        }
        else {
            return false;
        }
    }
};
console.log(mauro.pensionado(mauro.edad));
var Adulto = /** @class */ (function () {
    function Adulto(nombre, apellido1, apellido2, edad, isCasado, empleo) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.edad = edad;
        this.isCasado = isCasado;
        this.empleo = empleo;
    }
    Adulto.prototype.pensionado = function () {
        return true;
    };
    return Adulto;
}());
