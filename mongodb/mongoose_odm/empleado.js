const mongoose = require('./conexion.js');

const empleadoSchema = new mongoose.Schema({
    _id: { type: Number },
    nombre: String,
    jefeId: { type: Number, default: null },
    dptoId: { type: Number, default: null }
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;