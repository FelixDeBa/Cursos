> [!CAUTION]
> Se esta utilizando la version 4.4.0 ya que es la version que fue compatible con la raspberry

# Para crear una base de datos
```
use nueva_db
```

Para ver las estadisticas de la base de datos
```
db.stats()
```

> [!IMPORTANT]
> La base de datos se crea pero realmente no se crea porque no contiene objetos/colecciones :shipit:

# Para create una coleccion
```
db.createCollection("mi coleccion")
```

## Para listar las bases de datos existentes
> [!NOTE]
> Las bases de datos nuevas no aparecen hasta que tengan una coleccion creada
```
show dbs
```

# CRUD
## Agregar usuario (CREATE)
Esto agrega en automtico un ObjectID como clave primaria del objeto
```
db.usuarios.insertOne({
    nombre:"Mauro",
    edad:25,
    ciudad:"El Carmen"
})

db.usuarios.insertOne({
    nombre:"Pablo",
    edad:24,
    ciudad:"Apodaca"
})

db.usuarios.insertOne({
    nombre:"Felix",
    edad:25,
    ciudad:"Juarez"
})
```

## Buscar usuarios (READ)
```
db.usuarios.find()
```

### Aplicando filtros:
```
db.usuarios.find({edad:{$gt:20}})
```

## Actualizar un usuario (UPDATE)
En este caso se actualiza solmente el primer registro que encuentre
```
db.usuarios.updateOne(
    {nombre:"Pablo"},
    {$set:{edad:25}}
)
```

## Eliminar Un registro (DELETE)
En este caso borra la primera coincidencia que encuentre por el "ONE"
```
db.usuarios.deleteOne({
    nombre:"Pablo"
})
```

# Operaciones entre dos Tablas/Colecciones
Aqui se utilizara un ejemplo con la coleccion de usuarios que ya se creo y una coleccion Tareas
```
db.createCollection('tareas')
```

### Conectar una clave principal y una clave foranea
Sacamos el ID del usuario para usarlo como la clave foranea en la coleccion de tareas
```
db.usuarios.findOne({nombre:'Felix'})

db.tareas.insertOne({
    usuarioID:ObjectId("6732909dc3db063357b20496"),
    descripcion:"Generar reportes mensuales",
    estado:"Pendiente"
})


db.tareas.insertOne({
    usuarioID:ObjectId("6732909dc3db063357b20496"),
    descripcion:"Conseguir regalos de navidad",
    estado:"Pendiente"
})


db.tareas.insertOne({
    usuarioID:ObjectId("67328f7bc3db063357b20494"),
    descripcion:"Hacer presentacion GenAI",
    estado:"Pendiente"
})
```

### Para buscar en una tabla enlazada con otra
```
db.tareas.find({usuarioID:ObjectId("67328f7bc3db063357b20494")})
```

### Una manera que encontre un poco mas elegante de buscar
```
db.tareas.find({usuarioID:db.usuarios.findOne({nombre:"Mauro"})._id})
```

### Para actualizar una tarea de un usuario
> [!TIP]
> El ID de mongoDB para un registro siempre va a ser _id, aunque nosotros lo asignemos tiene que tener ese nombre
```
db.tareas.updateOne(
    {_id:ObjectId("67329345d236bf8937730021")},
    {$set:{estado:"Completada"}}
)
```

### Agregar un nuevo campo a la tabla
```
db.tareas.updateOne(
    {_id:ObjectId("6732930dd236bf8937730020")},
    {$set:{comentario:"Esta tarea no corresponde este usuario"}}
)
```

## Si quisiera eliminar una tarea que corresponde a un usuario:
```
db.tareas.deleteOne(
    {_id:ObjectId("6732930dd236bf8937730020")}
)
```

# Comando insertMany()
En este caso crearemos una coleccion de productos y le agregamos un arreglo de Objetos bson/json
```
db.createCollection("productos")

db.productos.insertMany([
    {nombre:"Zote",precio:19.99},
    {nombre:"Arroz",precio:16.99},
    {nombre:"Azucar",precio:38},
    {nombre:"Lechuga",precio:24}
])
```

> [!WARNING]
> Si ocurre un error en cualquier registro no va a insertar nada, tienen que pasar todos

Para ver lo que agregamos utilizamos db.productos.find()


# Agregar un registro con ID Personalizado
```
db.usuarios.insertMany([
    {_id:1,nombre:"Hector"},
    {_id:70,nombre:"Melchor"},
    {_id:19,nombre:"Edson"}
])
```

# Uso de find
Primero creamos datos dummy
<details>
    <summary>Ver insert</summary>

    
    db.usuarios.insertMany([ 
        { nombre: "Juan Perez", edad: 35, correo: "juan@example.com" }, 
        { nombre: "Maria Gonzalez", edad: 28, correo: "maria@example.com" },
        { nombre: "Pedro Ramirez", edad: 42, correo: "pedro@example.com" }, 
        { nombre: "Ana Rodriguez", edad: 31, correo: "ana@example.com" }, 
        { nombre: "Luisa Martinez", edad: 25, correo: "luisa@example.com" }, 
        { nombre: "Carlos Sanchez", edad: 40, correo: "carlos@example.com" }, 
        { nombre: "Sofia Lopez", edad: 22, correo: "sofia@example.com" }, 
        { nombre: "Andres Torres", edad: 33, correo: "andres@example.com" }, 
        { nombre: "Elena Garcia", edad: 29, correo: "elena@example.com" }, 
        { nombre: "Diego Jimenez", edad: 38, correo: "diego@example.com" }
    ])
    
</details>

## find
Filtra por edades mayor a 30 años
```
db.usuarios.find({edad:{$gt:30}})
```

Busqueda por un correo con coincidencia exacta
```
db.usuarios.find({correo:"andres@example.com"})
```

Busqueda en un rango
```
db.usuarios.find({edad:{$gte:25,$lte:30}})
```

# Actualizaciones/Cambios en los datos
Este actualizara solamente el primer registro que encuentre
## updateOne
```
db.usuarios.updateOne(
    {nombre:'Juan Perez'},
    {$set:{edad:36}}
)
```

## update
> [!CAUTION]
> ESTA FUNCION ESTA DEPRECIDA, HAY QUEUSAR UPDATE MANY
El modo de uso es "db.usuarios.update({filtro, actualizacion, opciones})"
Con esta opcion podemos elegir multi:true para que modifique todas las coincidencias
```
db.usuarios.update(
    {edad:25},
    {$set:{edad:24}},
    {multi:true}
)
```

## updateMany
Es lo mismo que el anterior con multi:true pero es la version mas reciente y la correcta a usar
```
db.usuarios.updateMany(
    {edad:24},
    {$set:{edad:25}}
)
```

## replaceOne
Este reemplaza todo el documento/registro, si no pones todos los datos, borra los que no pusiste
```
db.usuarios.replaceOne(
    {nombre:'Juan Perez'},
    {nombre: 'Juan Gomez', edad:28, correo:'juan@indeciso.com'}
)
```
## Cursores (Aplicar funciones de javascript)
Practicamente es mezclar javascript con mongodb, se hace una consulta o find y sobre este se crea una funcion
En el ejemplo se aplica un filtro a find, pero pueder un find sin parametros, aunque no es recomendable
```
db.usuarios.find({edad:25}).forEach(function(usuario){
    print(usuario.nombre)
})
```

se puede aplicar un limite a la consulta
```
db.usuarios.find({}).limit(2).forEach(function(usuario){
    print(usuario.nombre)
})
```

Se puede aplicar paginacion tambien a la consulta indicando con skip cuantos registros se va a saltar
```
db.usuarios.find({}).skip(1).limit(2).forEach(function(usuario){
    print(usuario.nombre)
})
```

Se pueden ordenar los datos con sort, en este caso el -1 indica que es de mayor a menor (descendente)
En este caso, el skip lo aplica obviamente despues del sort, por lo que en el ejemplo se brincara el registro con la edad mayor
```
db.usuarios.find({}).skip(1).limit(2).sort({edad:-1}).forEach(function(usuario){
    print(usuario.nombre)
})
```

## Proyecciones
Nos sirve para indicar que elementos o atributos queremos obtener, es como el SELECT
Para esto indicamos con un 0 los campos que no nos interesa consultar
Si no encuentra el campo que indicamos con un 1 de todos modos trae los datos
```
db.usuarios.find({}, {_id:0, nombre:1, correo:1})
```

### Ejemplo de colecciones
Para este crearmemos una coleccion de biblioteca y le insertamos 20 registros
```
db.createCollection('biblioteca')
```
<details>
    <summary>Ver inserts</summary>

    
    db.biblioteca.insertMany([     
        {         
            libro: { titulo: "El Gran Gatsby", 
                autor: "F. Scott Fitzgerald" },         
            year: 1925,         
            type: "Ficcion"     
        },
        {         
            libro: { titulo: "Los Pilares de la Tierra", 
                autor: "Ken Follett" },         
            year: 1989,         
            type: "Historica"     
        },     
        {         
            libro: { titulo: "La Sombra del Viento", 
                autor: "Carlos Ruiz Zafan" },         
            year: 2001,         
            type: "Misterio"     
        },     
        {         
            libro: { titulo: "Cien años de soledad", 
                autor: "Gabriel Garcia Marquez" },         
            year: 1967,         
            type: "Realismo magico"     
        },     
        {         
            libro: { titulo: "1984", 
                autor: "George Orwell" },         
            year: 1949,         
            type: "Ciencia ficcion"    
        },     
        {         
            libro: { titulo: "Matar a un ruiseñor", 
                autor: "Harper Lee" },         
            year: 1960,         
            type: "Novela"     
        },     
        {         
            libro: { titulo: "El Hobbit", 
                autor: "J.R.R. Tolkien" },         
            year: 1937,         
            type: "Fantasia"     
        },     
        {         
            libro: { titulo: "Crimen y castigo", 
                autor: "Fyodor Dostoevsky" },         
            year: 1866,         
            type: "Novela"     
        },     
        {         
            libro: { titulo: "Don Quijote de la Mancha", 
                autor: "Miguel de Cervantes" },         
            year: 1605,         
            type: "Novela"    
        },     
        {         
            libro: { titulo: "Ulises", 
                autor: "James Joyce" },         
            year: 1922,         
            type: "Novela"     
        },     
        {         
            libro: { titulo: "Orgullo y prejuicio", 
                autor: "Jane Austen" },         
            year: 1813,        
            type: "Novela"    
        },     
        {         
            libro: { titulo: "En busca del tiempo perdido", 
                autor: "Marcel Proust" },         
            year: 1913,         
            type: "Novela"     
        },     
        {        
            libro: { titulo: "Cumbres Borrascosas", 
                autor: "Emily Bront" },         
            year: 1847,         
            type: "Novela"     
        },     
        {         
            libro: { titulo: "Moby-Dick", 
                autor: "Herman Melville" },         
            year: 1851,         
            type: "Aventura"     
        },     
        {         
            libro: { titulo: "El Conde de Montecristo", 
                autor: "Alexandre Dumas" },         
            year: 1844,         
            type: "Aventura"    
        },     
        { 
            libro: { titulo: "Rayuela", 
                autor: "Julio Cortazar" }, 
            year: 1963, 
            type: "Experimental" 
        }, 
        {
            libro: { titulo: "Cronica de una muerte anunciada", 
                autor: "Gabriel Garcia Marquez" }, 
            year: 1981, 
            type: "Novela" 
        },
        {
            libro: { titulo: "El retrato de Dorian Gray", 
                autor: "Oscar Wilde" }, 
            year: 1890, 
            type: "Novela"
        },
        {
            libro: { titulo: "El Señor de los Anillos", 
                autor: "J.R.R. Tolkien" }, 
            year: 1954, 
            type: "Fantasia"
        },
        {
            libro: { titulo: "Cien años de soledad", 
                autor: "Gabriel Garcia Marquez" }, 
            year: 1967, 
            type: "Realismo magico"
        }
    ]);
    
</details>

Puedes acceder a un objeto anidado al usar una proyeccion
```
db.biblioteca.find({},{_id:0,"libro.titulo":1,"libro.autor":1})
```
Si utilizamos solo 0's en la proyeccion entonces trae todo menos los 0
```
db.biblioteca.find({},{_id:0,"libro.titulo":0})
```

# Crear backups de bases de datos
mongodump --db <base_de_datos> --out <ruta_archivo>
En este ejemplo te crea la carpeta backups
```
Ejemplo: mongodump --db nueva_db --out ./backups/
```

# Restaurar una base de datos
mongorestore --db <base_de_datos> <ruta_archivo>
En este caso especificamos un nuevo nombre para la base de datos, ya que si lo dejamos con el nombre de una BD existente, da error de duplicados. En versions mas recientes crea automaticamente la copia de la BD. Aun asi es importante saber de esta copia
```
mongorestore --db nueva_db_bak ./backups/nueva_db
```

> [!NOTE]
> Los archivos generados son de tipo bson, que vienen a ser archivos json pero en formato binario, Tambien genera un archivo .metadata.json para cada coleccion

# Eliminar una coleccion
Para eliminar una coleccion hay dos maneras, la primera y mas simple es usando drop
Para esto crearemos una coleccion de pruebas
```
db.createCollection('pruebas')
show collections
db.pruebas.drop()
show collections
```
Hay otra manera de eliminar una coleccion que es particularmente util cuando esta tiene caracteres no permitidos en el nombre como un espacio, usaremos de ejemplo la coleccion "mi coleccion"
```
show collections
db.getCollection('mi coleccion').drop()
show collections
```
# Eliminar una base de datos
En este caso usaremos la base de datos que se restauro
```
use nueva_db_bak
db.stats()
db.dropDatabase()
show dbs
```

# Esquemas (Schema)
Un esquema es el conjunto de reglas que define la estructura de documentos en la base de datos, puede ser fijo pero tambien puede ser dinamico
MongoDB no tiene un esquema fijo, es flexible.
Eso quiere decir que no todos van a tener los mismos campos/columnas/atributos, lo cual muy util cuando la estructura de datos va a variar con el tiempo, pero no mucho cuando necesitamos datos fijos
```
use nueva_db
db.createCollection('pruebas')
db.pruebas.insertOne({
    nombre:"Felix",
    edad:25,
    lenguajes:["Python", "Javascript"]
})

db.pruebas.insertOne({
    nombre:"Mauro",
    edad:25,
    especializacion:"ServiceNow"
})
```

# Crear documentos/tablas con esquema fijo
Para especificar un esquema, al momento de crear la coleccion le pasamos un jsonSchema
```
db.createCollection("empleados",{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            required: ['nombre','correo','edad'],
            properties:{
                nombre:{
                    bsonType: 'string',
                    description: 'Debe ser un nombre valido'
                },
                correo:{
                    bsonType: 'string',
                    pattern: "^[^@]+@[^@]+\.[^@]+$",
                    description: 'Debe ser un correo electronico valido'
                },
                edad:{
                    bsonType: 'int',
                    minimum: 16,
                    description: 'Debe ser mayor a 16'
                }
            }
        }
    }
})
```

Para insertar datos en esta coleccion con esquema fijo tenemos restricciones, por ejemplo, el nombre debe ser un string, el correo tiene un patron expresado a traves de una regex, el minimo de edad debe ser 16 y los 3 campos son obligatorios
por ejemplo, los siguiente regsitros generar errores de tipo Write Error:
```
//Error por el minimo de edad
db.empleados.insertOne({
    nombre:"Alexis Nicolas",
    edad: NumberInt(15),
    correo: "alexis@nvr.com"
})
//Error por el correo que no cumple la regex
db.empleados.insertOne({
    nombre:"Alexis Nicolas",
    edad: NumberInt(20),
    correo: "alexis"
})
//error por no contar con todos los campos
db.empleados.insertOne({
    nombre:"Alexis Nicolas",
    edad:NumberInt(20)
})
```

Hay que cumplir con todos los requisitos que establecimos para poder insertar un registro
```
db.empleados.insertOne({
    nombre:"Alexis",
    correo:"alexis@nvm.com",
    edad:NumberInt(20)
})
```
> [!NOTE]
> Los errores al insertar datos en nuevas versiones han mejorado, en la version que se esta trabajando en la raspberry (4.4.1) siempre da un error 121

# Tipos de Datos
#### Cadenas
```
nombre = "Edson"
```
#### Entero
```
edad = 30
```
#### Objeto int de mongoDB
```
matricula = NumberInt(1746025)
```
#### Float
```
precio = 19.99
```
#### Booleano
```
datos_ok=true
```
#### Fecha
```
fecha = ISODate('2024-11-12T00:00:00Z')
```
#### Listas
```
lenguajes = ['Python', 'Javascript','C++', C#']
```
#### Objetos anidados
```
wp = {
    nombre:"Wordpress",
    version:"6.6.1",
    plugins: ["Elementor", "WP-Statistics", "Robo Gallery"],
    vulnerabilidades: [
        {
            cve: "CVE-2024-31928",
            descripcion: "XSS en la implementacion de objetos de tipo text area",
            url: ["www.wordpress.com/security/news/vulneravility/?id=34582"],
            tipoSolucion:"Actualizacion",
            solucion:{
                descripcion: "Actualizacion a la version 6.6.2",
                instrucciones: ["Descarga la version mas reciente del sitio oficial de wordpress o usa la funcion de actualizar desde el dashboard", "Valida que te encuentres en la version 6.6.2 desde el Dashboard en HOME>Actualizaciones"],
                url: "www.wordpress.com/downloads/release6.6.2.zip"
            }
        },
        {
            cve: "CVE-2024-11224",
            descripcion: "DDoS en el componente de conexion a la base de datos en bases de datos MYSQL",
            url: ["www.wordpress.com/security/news/vulneravility/?id=34620","www.mysql.com/news/cve-2024-11224"],
            tipoSolucion:"No Disponible",
            solucion:{
                descripcion: "Sin solucion al momento"
            }
        }
    ]
}
```
#### Datos Binarios
LogoApp = BinData(0,"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUAQEAAAAAAAAAAAAAAAAAAAAH/9oADAMBAAIQAxAAAAGIIUj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEPv/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==")

> [!TIP]
> Para limpiar la pantalla se usa cls