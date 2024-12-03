const mongoose = require('./conexion');
const Empleado = require('./empleado');

const nuevoEmpleado = new Empleado({
    _id: 301,
    nombre: "Prueba create",
    jefeId: 2,
    dptoId: 2
});

nuevoEmpleado.save().then(resultado => {
    console.log('Empleado Guardado: ', resultado);
}).catch(error => {
    console.error('Error ', error.message);
}).finally(() => {
    mongoose.connection.close()
})