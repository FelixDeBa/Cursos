const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/nuevadb2', { useNewUrlParser: true, useUnifiedTopology: true });

const EmpleadoSchema = new mongoose.Schema({
    _id:Number,
    nombre:String,
    jefeId: { type: Number, default: null },
    dptoId: { type: Number, default: null }
});

const Empleado = mongoose.model('Empleado', EmpleadoSchema);

app.get('/empleados', async (req, res) =>{
    try {
        const empleados = await Empleado.find({}, '_id nombre jefeId dptoId');
        res.json(empleados);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

app.post('/empleados', async(req, res) => {
    try{
        const { _id, nombre, jefeId, dptoId } = req.body;
        console.log(req.body)
        if(!nombre) {
            return res.status(400).json({ error:'No se encontro un nombre de empleado' });
        }

        const nuevoEmpleado = new Empleado({
            _id,
            nombre,
            jefeId: jefeId || null,
            dptoId: dptoId || null
        });

        const resultado = await nuevoEmpleado.save();
        res.json(resultado);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

app.get('/empleados/:id', async(req, res)=>{
    try{
        const empleado = await Empleado.findById(req.params.id, '_id nombre jefeId, dptoId');
        if(!empleado){
            return res.status(400).json({ error: "El empleado no tiene nombre o no existe" })
        }
        res.json(empleado);
    }catch(error){
        res.status(500).json({ error: error.message })
    }
});

app.put('/empleados/:id', async(req, res)=>{
    try{
        const { nombre, jefeId, dptoId } = req.body;

        if(!nombre){
            return res.status(400).json({ error: "El nombre no puede ser nulo" });
        }

        const empleadoAct = await Empleado.findByIdAndUpdate(
            req.params.id,
            { nombre, jefeId, dptoId },
            { new: true } //para que regrese el documento actualizado
        );

        if(!empleadoAct){
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        res.json(empleadoAct);
    }catch(error) {
        res.status(500).json({ error: error.message })
    }
});

app.delete('/empleados/:id', async(req, res)=>{
    try{
        const empleadoBorrado = await Empleado.findByIdAndDelete(req.params.id);

        if(!empleadoBorrado){
            return res.status(404).json({ error:"No se encontro al empleado" });
        }

        res.json(empleadoBorrado);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Servidor ejecutando en http://localhost:'+PORT)  
});