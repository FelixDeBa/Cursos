const mongoose = require('./conexion');
const Empleado = require('./empleado');

(async() => {
    try{
        const empleados = await Empleado.find({}, '_id nombre jefeId dptoId').exec();
        console.log(empleados);
    }catch(error){
        console.error('Error al obtener los empleados', error.message);
    }finally {
        mongoose.connection.close();
    }
})();