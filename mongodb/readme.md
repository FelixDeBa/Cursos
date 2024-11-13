> [!CAUTION]
> Se esta utilizando la version 4.4.0 ya que es la version que fue compatible con la raspberry

# Tabla de Contenidos
<details>
<summary><b>I. Introduccion</b></summary>

1. [Crear Base de Datos](#titulo.create-bd)
   - [Listar Bases de Datos](#sub.list-bd)
2. [Crear coleccion](#titulo.create-collection)
   - [Listas Colecciones](#sub.list-collection)
3. [Operaciones CRUD](#titulo.CRUD)
   - [Create](#sub.create)
   - [Read](#sub.read)
      - [Filtros basicos](#third.filtros1)
   - [Update](#sub.update)
   - [Delete](#sub.delete)
4. [Uniones (Joins)](#titulo.joins)
   - [Conectar dos Colecciones/Tablas](#sub.connectJoin)
   - [Buscar en Colecciones Unidas (HARDCODED)](#sub.findJoin)
   - [Buscar en Colecciones Unidas (Mas dinamico)](#sub.findJoin2)
   - [Actualizar Colecciones Unidas](#sub.updateJoin)
   - [Agregar registros en colecciones Unidas](#sub.createJoin)
   - [Eliminar registros en coleccions unidas](#sub.deleteJoin)
5. [InsertMany](#titulo.insertMany)
6. [Agregar una ID Personalizada](#titulo.customId)
7. [Find](#titulo.findExteded)
   - [Filtros Basicos](#sub.findExtended)
8. [Tipos de Updates](#titulo.updateExtended)
   - [updateOne](#sub.updateOne)
   - [update (multi: true)](#sub.updateExtended)
   - [updateMany](#sub.updateMany)
   - [replaceOne](#sub.replaceOne)
9. [Cursores](#titulo.cursores)
10. [Proyecciones](#titulo.proyecciones)
    - [Ejemplos Proyecciones](#sub.exampleProy)
11. [Crear Respaldos](#titulo.backupCreate)
12. [Restaurar Respaldos](#titulo.backupRestore)
13. [Eliminar colecciones](#titulo.deleteCollection)
14. [Eliminar Base de Datos](#titulo.deleteBD)
15. [Esquemas](#titulo.schemas)
    - [Esquema Fijo](#sub.fixedSchema)
16. [Tipos de Datos](#titulo.dataTypes)
    - [Cadenas/String](#sub.string)
    - [Entero/int](#sub.int)
    - [Entero/NumberInt()](#sub.numberInt)
    - [Flotante/float](#sub.float)
    - [Boleano/bool](#sub.bool)
    - [Fecha/ISODate()](#sub.date)
    - [Lista/Arreglo/array](#sub.array)
    - [Objetos anidados/Json](#sub.json)
    - [Datos Binarios/BinData()](#sub.binaryData)
17. [Ejemplo Coleccion con Esquema Fijo](#sub.fixedSchemaExample)

- [Como limpiar terminal MongoDB](#note.cls)
</details>

<details>
<summary><b>II. Relaciones en MongoDB</b></summary>

1. [Relaciones](#titulo.introRels)
   - [1 a 1 con Objetos Incurstados](#sub.1a1incrustado)
   - [1 a 1 con Objetos Referencias](#sub.1a1referencia)
   - [1 a Muchos con Referencias](#sub.1aMincrustado)
   - [1 a Muchos con Referencias](#sub.1aMreferencia)
   - [Muchos a Muchos con Referencias](#sub.MaMincrustado)
   - [Muchos a Muchos con Referencias](#sub.MaMreferencia)
</details>

# Para crear una base de datos <a name='titulo.create-bd'></a>
```
use nueva_db
```

Para ver las estadisticas de la base de datos
```
db.stats()
```

> [!IMPORTANT]
> La base de datos se crea pero realmente no se crea porque no contiene objetos/colecciones :shipit:

## Para listar las bases de datos existentes <a name='sub.list-bd'></a>
> [!NOTE]
> Las bases de datos nuevas no aparecen hasta que tengan una coleccion creada
```
show dbs
```

# Para create una coleccion <a name='titulo.create-collection'></a>
```
db.createCollection("mi coleccion")
```

## Para listar las colecciones/tablas existentes <a name='sub.list-collection'></a>
```
show collections
```

# CRUD <a name='titulo.CRUD'></a>
## Agregar usuario (CREATE) <a name='sub.create'></a>
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

## Buscar usuarios (READ) <a name='sub.read'></a>
```
db.usuarios.find()
```

### Aplicando filtros: <a name='third.filtros1'></a>
```
db.usuarios.find({edad:{$gt:20}})
```

## Actualizar un usuario (UPDATE) <a name='sub.update'></a>
En este caso se actualiza solmente el primer registro que encuentre
```
db.usuarios.updateOne(
    {nombre:"Pablo"},
    {$set:{edad:25}}
)
```

## Eliminar Un registro (DELETE) <a name='sub.delete'></a>
En este caso borra la primera coincidencia que encuentre por el "ONE"
```
db.usuarios.deleteOne({
    nombre:"Pablo"
})
```

# Operaciones entre dos Tablas/Colecciones <a name='titulo.joins'></a>
Aqui se utilizara un ejemplo con la coleccion de usuarios que ya se creo y una coleccion Tareas
```
db.createCollection('tareas')
```

## Conectar una clave principal y una clave foranea <a name='sub.connectJoin'></a>
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

## Para buscar en una tabla enlazada con otra <a name='sub.findJoin'></a>
```
db.tareas.find({usuarioID:ObjectId("67328f7bc3db063357b20494")})
```

## Una manera que encontre un poco mas elegante de buscar <a name='sub.findJoin2'></a>
```
db.tareas.find({usuarioID:db.usuarios.findOne({nombre:"Mauro"})._id})
```

## Para actualizar una tarea de un usuario <a name='sub.updateJoin'></a>
> [!TIP]
> El ID de mongoDB para un registro siempre va a ser _id, aunque nosotros lo asignemos tiene que tener ese nombre
```
db.tareas.updateOne(
    {_id:ObjectId("67329345d236bf8937730021")},
    {$set:{estado:"Completada"}}
)
```

## Agregar un nuevo campo a la tabla <a name='sub.createJoin'></a>
```
db.tareas.updateOne(
    {_id:ObjectId("6732930dd236bf8937730020")},
    {$set:{comentario:"Esta tarea no corresponde este usuario"}}
)
```

## Si quisiera eliminar una tarea que corresponde a un usuario: <a name='sub.deleteJoin'></a>
```
db.tareas.deleteOne(
    {_id:ObjectId("6732930dd236bf8937730020")}
)
```

# Comando insertMany() <a name='titulo.insertMany'></a>
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


# Agregar un registro con ID Personalizado <a name='titulo.customId'></a>
```
db.usuarios.insertMany([
    {_id:1,nombre:"Hector"},
    {_id:70,nombre:"Melchor"},
    {_id:19,nombre:"Edson"}
])
```

# Uso de find <a name='titulo.findExtended'></a>
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

## find <a name='sub.findExtended'></a>
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

# Actualizaciones/Cambios en los datos <a name='titulo.updateExtended'></a>
Este actualizara solamente el primer registro que encuentre
## updateOne <a name='sub.updateOne'></a>
```
db.usuarios.updateOne(
    {nombre:'Juan Perez'},
    {$set:{edad:36}}
)
```

## update <a name='sub.updateExtended'></a>
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

## updateMany <a name='sub.updateMany'></a>
Es lo mismo que el anterior con multi:true pero es la version mas reciente y la correcta a usar
```
db.usuarios.updateMany(
    {edad:24},
    {$set:{edad:25}}
)
```

## replaceOne <a name='sub.replaceOne'></a>
Este reemplaza todo el documento/registro, si no pones todos los datos, borra los que no pusiste
```
db.usuarios.replaceOne(
    {nombre:'Juan Perez'},
    {nombre: 'Juan Gomez', edad:28, correo:'juan@indeciso.com'}
)
```
# Cursores (Aplicar funciones de javascript) <a name='titulo.cursores'></a>
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

# Proyecciones <a name='titulo.proyecciones'></a>
Nos sirve para indicar que elementos o atributos queremos obtener, es como el SELECT
Para esto indicamos con un 0 los campos que no nos interesa consultar
Si no encuentra el campo que indicamos con un 1 de todos modos trae los datos
```
db.usuarios.find({}, {_id:0, nombre:1, correo:1})
```

### Ejemplo de Proyecciones <a name='sub.exampleProy'></a>
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

# Crear backups de bases de datos <a name='titulo.backupCreate'></a>
mongodump --db <base_de_datos> --out <ruta_archivo>
En este ejemplo te crea la carpeta backups
```
Ejemplo: mongodump --db nueva_db --out ./backups/
```

# Restaurar una base de datos <a name='titulo.backupRestore'></a>
mongorestore --db <base_de_datos> <ruta_archivo>
En este caso especificamos un nuevo nombre para la base de datos, ya que si lo dejamos con el nombre de una BD existente, da error de duplicados. En versions mas recientes crea automaticamente la copia de la BD. Aun asi es importante saber de esta copia
```
mongorestore --db nueva_db_bak ./backups/nueva_db
```

> [!NOTE]
> Los archivos generados son de tipo bson, que vienen a ser archivos json pero en formato binario, Tambien genera un archivo .metadata.json para cada coleccion

# Eliminar una coleccion <a name='titulo.deleteCollection'></a>
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
# Eliminar una base de datos <a name='titulo.delteBD'></a>
En este caso usaremos la base de datos que se restauro
```
use nueva_db_bak
db.stats()
db.dropDatabase()
show dbs
```

# Esquemas (Schema) <a name='titulo.schemas'></a>
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

## Crear documentos/tablas con esquema fijo <a name='sub.fixedSchema'></a>
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

# Tipos de Datos <a name='titulo.dataTypes'></a>
#### Cadenas <a name='sub.string'></a>
```
nombre = "Edson"
```
#### Entero <a name='sub.int'></a>
```
edad = 30
```
#### Objeto int de mongoDB <a name='sub.numberInt'></a>
```
matricula = NumberInt(1746025)
```
#### Float <a name='sub.float'></a>
```
precio = 19.99
```
#### Booleano <a name='sub.bool'></a>
```
datos_ok=true
```
#### Fecha <a name='sub.date'></a>
```
fecha = ISODate('2024-11-12T00:00:00Z')
```
#### Listas <a name='sub.array'></a>
```
lenguajes = ['Python', 'Javascript','C++', C#']
```
#### Objetos anidados <a name='sub.json'></a>
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
#### Datos Binarios <a name='sub.binaryData'></a>
```
LogoApp = BinData(0,"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAUAQEAAAAAAAAAAAAAAAAAAAAH/9oADAMBAAIQAxAAAAGIIUj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEPv/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==")
```

## Ejemplo de Coleccion con esquema fijo (Fixed schema) <a name='sub.fixedSchemaExample'></a>
db.productos.drop()
db.createCollection("productos",{
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','cantidad','precio','perecedero'],
            properties:{
                nombre:{
                    bsonType:'string',
                    description:'Es el nombre del producto'
                },
                cantidad:{
                    bsonType:'int',
                    minimum:0,
                    description: 'Debe ser un entero positivo'
                },
                precio:{
                    bsonType:'double',
                    minimum:0,
                    description:'Precio del producto, admite decimales no menores a 0'
                },
                perecedero:{
                    bsonType: 'bool',
                    description:'Puede ser verdadero o falso'
                },
                fechaCaducidad:{
                    bsonType:'date',
                    description:'Fecha en formato ISO de la fecha maxima de consumo preferente'
                }
            }
        }
    }
})

# Relaciones <a name='titulo.introRels'></a>
LAs relaciones pueden ser de una a una, una a muchas y muchas a una como cualquier otro motor de base de datos

## 1 a 1 (Con ojetos incrustados) <a name='sub.1a1incrustado'></a>
Se puede simplemente incrustar un objeto bson dentro de otro y tener la relacion de 1 a 1
```
db.usuarios.insertOne({
    "nombre": 'usr2',
    'email':'usr2@ejemplo.com',
    'perfil':{
        'nombre_perfil':'Administrador solo Lectura',
        'permisos':'read_all',
        'expiracion':'31-12-2024'
    }
})

db.usuarios.find({"perfil.permisos":'read_all'})
```
## 1 a 1 (Con referencias) <a name='sub.1a1referencia'></a>
ESte tipo de relaciones tienen el problema de que pueden generar consultas mas complejas
primero creamos una coleccion para hacer la referencia en este caso una coleccion de departamentos y le asignamos el departamento a ciertos grupos de usuario, aqui se asigna de manera arbitraria basandose en edad por facilidad
```
db.departamentos.insertMany([
    {
        _id:50,
        nombre:'RH'
    },
    {
        _id:51,
        nombre:'TI'
    }
])

db.empleados.insertMany([
    { nombre:'Felix', correo: 'felix.d@datadoor.com', edad:NumberInt(25) },
    { nombre:'Samuel', correo: 'samuel.l@datadoor.com', edad:NumberInt(19) },
    { nombre:'Mauro', correo: 'mauro.d@datadoor.com', edad:NumberInt(25) },
    { nombre:'Pablo', correo: 'pablo.r@datadoor.com', edad:NumberInt(24) }
])

db.empleados.updateMany({edad:{$gt:20}}, {$set:{id_dpto:51}})
db.empleados.updateMany({edad:{$lte:20}}, {$set:{id_dpto:50}})
```
Una vez hecho esto podemos buscar usuarios basandonos en el departamento y asignarlos en variables
```
const usuarioRH = db.empleados.findOne({'nombre':'Samuel'})
const rh = db.departamentos.findOne({'_id': primerUsuarioTI.id_dpto})
```

## 1 a Muchos (Con ojetos incrustados) <a name='sub.1aMincrustado'></a>
Estas relaciones tienen el problema de que pueden generar objetos demasiado grandes que pueden incluso superar el limite del tamaño del objeto
```
db.programas.insertOne({
    '_id':1000,
    nombre:'Office Word',
    version: '365',
    arquitectura:'x64',
    vulnerabilidades:[{cve:'CVE-2024-15546', parcheDisp:true},
    {cve:'CVE-2024-84651', parcheDisp:false},
    {cve:'CVE-2023-64521', parcheDisp:false}]
})
```

## 1 a Muchos (Con referencias) <a name='sub.1aMreferencia'></a>
ESte tipo de relaciones tienen el problema de que pueden generar consultas mas complejas
Creamos una coleccion de desarrolladores que podra ir enlazada a muchos pogramas
```
db.desarrolladoras.insertMany([
    {'_id':1, nombre:'Microsoft'},
    {'_id':2,nombre:'Zoom'},
    {'_id':3,nombre:'Zoho'}
])
```


## Muchos a Muchos (Con ojetos incrustados) <a name='sub.MaMincrustado'></a>
Vamos a incrustar un array en un documento con otros documentos
Estas relaciones tienen el problema de que pueden generar objetos demasiado grandes que pueden incluso superar el limite del tamaño del objeto
```
db.programas.update({_id:1000},{$set:{
    opiniones:[
        {estrellas:4,comentario:'Excelente'},
        {estrellas:1,comentario:'No me gusto'},
    ]
}})

db.programas.update({_id:1001},{$set:{
    opiniones:[
        {estrellas:5,comentario:'Cubre todo'}
    ]
}})

db.programas.find({},{_id:0,nombre:1,opiniones:1})
```

insertamos el id de la desarrolladora en la tabla de programas y consultamos todos los programas ligados a esa ID
```
db.programas.updateMany({},{$set:{idDesarrollador: 1}})
var micId = db.desarrolladoras.findOne({nombre:'Microsoft'})
db.programas.find({idDesarrollador:mic._id},{nombre:1})
```

## Muchos a Muchos (Con referencias) <a name='sub.MaMreferencia'></a>
Este tipo de relaciones tienen el problema de que pueden generar consultas mas complejas
aprovecharemos agrgaremos un campo soCompatibles que agregamos en el programa OfficeWord y agregaremos otro registro de Office Excel

```

db.programas.update({_id:1000},{$set:{soCompatibles: [1,2]}})
db.programas.insertOne({
    '_id':1001,
    nombre:'Office Excel',
    version: '365',
    arquitectura:'x64',
    soCompatibles: [1,2],
    vulnerabilidades:[{cve:'CVE-2024-15546', parcheDisp:true},
    {cve:'CVE-2024-84651', parcheDisp:false},
    {cve:'CVE-2023-64521', parcheDisp:false}
})

db.soProgs.insertMany([
    {'_id':1, nombre:'Windows', version:'11', programas:[1000, 1001]},
    {'_id':2,nombre:'MacOS', version:'16.5', programas:[1000, 1001]},
    {'_id':3,nombre:'RedHat', version:'9.0', programas:[]},
    {'_id':4,nombre:'Ubuntu', version:'24.04', programas:[]},
])

db.programas.insertOne({
    '_id':1000,
    nombre:'Office Word',
    version: '365',
    arquitectura:'x64',
    vulnerabilidades:[{cve:'CVE-2024-15546', parcheDisp:true},
    {cve:'CVE-2024-84651', parcheDisp:false},
    {cve:'CVE-2023-64521', parcheDisp:false}]
})
```

> [!TIP]
> Para limpiar la pantalla se usa cls <a name='note.cls'></a>