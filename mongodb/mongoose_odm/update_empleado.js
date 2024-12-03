const mongoose = require('./conexion');
const Empleado = require('./empleado');


const idEmpleadoAActualizar = 301;

Empleado.findByIdAndUpdate(
    idEmpleadoAActualizar,
    { nombre: "Prueba Update", jefeId: 2, dptoId: 2 },
    { new: true }
).then(resultado => {
    console.log('Empleado Actualizado: ', resultado);
}).catch(error => {
    console.error('Error ', error.message);
}).finally(() => {
    mongoose.connection.close()
})