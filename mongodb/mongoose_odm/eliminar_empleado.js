const mongoose = require('./conexion');
const Empleado = require('./empleado');

const idEmpleadoAEliminar = 300;

Empleado.findByIdAndDelete(idEmpleadoAEliminar).then(empleadoEliminado => {
    console.log('Empleado Eliminado', empleadoEliminado);
}).catch( error => {
    console.error('Error ', error.message);
}).finally(() => {
    mongoose.connection.close();
})