const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost/nuevadb2', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexion con Mongo: '));
db.once('open', () => {
    console.log('Conexion exitosa');
});

module.exports = mongoose;