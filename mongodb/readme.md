> [!CAUTION]
> Se esta utilizando la version 4.4.0 ya que es la version que fue compatible con la raspberry

> [!TIP]
> Para limpiar la pantalla se usa cls

# Tabla de Contenidos
<details>
<summary><b>Mostrar Tabla de contenido</b></summary>

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
4. [Uniones](#titulo.joins)
   - [Conectar dos Colecciones o Tablas](#sub.connectJoin)
   - [Buscar en Colecciones Unidas](#sub.findJoin)
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

II. Relaciones en MongoDB

1. [Introduccion a las Relaciones en MongoDB](#titulo.intro-rels)
   - [1 a 1 con Objetos Incurstados](#sub.1a1incrustado)
   - [1 a 1 con Objetos Referencias](#sub.1a1referencia)
   - [1 a Muchos con Referencias](#sub.1aMincrustado)
   - [1 a Muchos con Referencias](#sub.1aMreferencia)
   - [Muchos a Muchos con Referencias](#sub.MaMincrustado)
   - [Muchos a Muchos con Referencias](#sub.MaMreferencia)

III. Operadores

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
```
db.productos.drop()
db.createCollection("productos",{
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre','existencia','precio','perecedero'],
            properties:{
                nombre:{
                    bsonType:'string',
                    description:'Es el nombre del producto'
                },
                existencia:{
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
```

# Tipos de Relaciones <a name='#titulo.intro-rels'></a>
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
var mic = db.desarrolladoras.findOne({nombre:'Microsoft'})
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


# Operadores
Empiezan siempre con el simbolo de dolar o moneda $

## Operadores de comparacion
- $eq: igual que
- $ne: no igual que
- $gt: Mayor que
- $lt: Menor que 
- $gte: Mayor que o igual
- $lte: Menor que o igual

### Ejemplos
Primero vamos a insertar a nuestra coleccion de productos una serie de elementos
```
db.productos.insertMany([
    {nombre:"Laptop", precio: 12000, existencia: NumberInt(15), perecedero: false},
    {nombre:"Telefono", precio: 4000, existencia: NumberInt(5), perecedero: false},
    {nombre:"Tablet", precio: 6000, existencia: NumberInt(18), perecedero: false},
    {nombre:"TV", precio: 16000, existencia: NumberInt(50), perecedero: false},
    {nombre:"Impresora", precio: 2500, existencia: NumberInt(65), perecedero: false},
])
```

Para aplicar operadores
```
//eq
db.productos.find({precio:{$eq:4000}})
//gt
db.productos.find({precio:{$gt:10000}})
//lt
db.productos.find({precio:{$lt:10000}})
//gte
db.productos.find({existencia:{$gte:50}})
//lte
db.productos.find({existencia:{$lte:15}})
//ne
db.productos.find({precio:{$ne:2500}})
```

## Operadores Logicos
- $and: Permite evaluar multiples experesiones y devolver un documento cuando todas cumplen
- $or: Permite evaluar multiples experesiones y devolver un documento cuando al menos una cumple
- $not: Invierte el valor booleano de una expresion
- $nor: Permite evaluar multiples experesiones y devolver aquellos que no cumplan las excepciones, devuelve el contrario de or

Ejemplo de AND
```
db.productos.find({$and:[
    {precio:{$gt:10000}},
    {existencia:{$lte:15}}
]})
```

Ejemplo de OR
```
db.productos.find({$or:[
    {precio:{$gt:10000}},
    {existencia:{$lte:15}}
]})
```

Ejemplo de NOT
```
db.productos.find({$or:[
    {precio:{$gt:10000}},
    {existencia:{$lte:50}}
]})
```
Ejemplo de NOR
```
db.productos.find({$and:[
    {precio:{$not:{$gt:10000}}},
    {existencia:{$lte:50}}
]})
```

## Operadores de elemento
Son utiles debido al esquema flexible ya que nos permite confirmar la existencia y tipo de los elementos
- $exists: Comprueba si un campo existe.
- $type: Filtra por tipo de datos

Primero insertamos algunos datos para trabajar con ellos
```
db.productos.insertMany([
    {nombre:"Papa",existencia:NumberInt(40), precio:39.99 ,perecedero:true, fechaCaducidad:ISODate('2026-12-31T23:59:59Z')},
    {nombre:"Leche Condensada",existencia:NumberInt(14), precio:24.5 ,perecedero:true, fechaCaducidad:ISODate('2028-12-31T23:59:59Z')},
    {nombre:"Grenetina",existencia:NumberInt(29), precio:19.99 ,perecedero:true, fechaCaducidad:ISODate('2025-12-31T23:59:59Z')},
])
```

Operador Exists nos permite revisar si el campo existe
```
db.productos.find({fechaCaducidad:{$exists:true}})
```
```
db.productos.find({perecedero:{$type:"bool"}})
```

Operador $type

## Operadores de evaluacion
- $regex: Nos permite utilizar expresiones regulares para evaluar un campo
- $expr: Realiza evaluaciones de expresiones
- $jsonSchema: Valida socumentos segun un esquema en formato JSON, util para hacer que los esquemas sean fijos

Primero insertamos algunos objetos
```
db.productos.insertMany([
    {nombre:"TV Samsung", precio: 18000, existencia: NumberInt(12), perecedero: false},
    {nombre:"TV LG", precio: 12000, existencia: NumberInt(5), perecedero: false},
    {nombre:"Celular LG", precio: 6500, existencia: NumberInt(17), perecedero: false},
    {nombre:"TV Roku", precio: 600, existencia: NumberInt(43), perecedero: false},
])
```

Regex
```
db.productos.find({nombre:{$regex:/^TV (Samsung|LG)$/}})
```

expr Nos permite hacer consultas mas complejas
```
db.productos.find({
    $expr: {
        $and: [
            {$gt: ["$existencia", 10]},
            {$lt: ["$precio", 5000]}
        ],
    }
})
```

## Operadores de arreglo o matriciales
Sirven para afectar a multiples documentos anidados
- $all: Devuelve un arreglo con todos los documentos especificados
- $elemMatch: encuentra documentos donde al menos uno satisface una condicion
- $size: Compara el tamaño de un arregla con un valor especifico
- $slice: Permite hacer paginacion en el resultado dentro de la matriz

### Size
```
db.programas.find({opiniones:{$size:2}},{_id:0,nombre:1,opiniones:1})
```

### all
Deben cumplir con todo lo que hay en all para coincidir, como vemos este ejemplo no trae de resultado el registro recien agregado
```
db.soProgs.insertOne({_id:5,nombre:"Arch", version:"4.0", programas:[1000]})
db.soProgs.find({programas:{$all:[1000,1001]}})
```

### ElemMatch
Sirve para traer objetos que cumplan con una o mas condiciones dentro del objeto
```
db.programas.find({vulnerabilidades:{$elemMatch:{parcheDisp:true, cve:"CVE-2024-15546"}}})
db.programas.find({opiniones:{$elemMatch:{estrellas:5}}})
```

### Slice
```
db.programas.find({},{vulnerabilidades:{$slice:1}})
db.soProgs.find({},{programas:{$slice:1}})
```

# Sort
```
db.productos.find({
    $expr: {
        $and: [
            {$gt: ["$existencia", 10]},
            {$lt: ["$precio", 5000]}
        ],
    }
}).sort({existencia:-1})
```

# Framework de agregacion
Nos permiten realizar operaciones mas avanzadas y suelen estar optimizados para grandes volumenes de datos

Para propsitos de ejemplo vamos a crear una nueba base de Datos
```
use nuevadb2
```
Posteriormente le insertamos una coleccion y varios documentos a esta misma

```
db.productos.insertMany([
    {nombre:"Papa",existencia:NumberInt(40), precio:39.99 ,perecedero:true, fechaCaducidad:ISODate('2026-12-31T23:59:59Z'), categoria:"Abarrotes"},
    {nombre:"Leche Condensada",existencia:NumberInt(14), precio:24.5 ,perecedero:true, fechaCaducidad:ISODate('2028-12-31T23:59:59Z'), categoria:"Abarrotes"},
    {nombre:"Grenetina",existencia:NumberInt(29), precio:19.99 ,perecedero:true, fechaCaducidad:ISODate('2025-12-31T23:59:59Z'), categoria:"Abarrotes"},
    {nombre:"TV Samsung QLED 65\"",existencia:NumberInt(29), precio:19999 ,perecedero:false, categoria:"Electronicos"},
    {nombre:"TV Samsung OLED 65\"",existencia:NumberInt(29), precio:17999 ,perecedero:false, categoria:"Electronicos"},
    {nombre:"TV LG 65\"",existencia:NumberInt(29), precio:19999 ,perecedero:false, categoria:"Electronicos"},
])
```

## $match
Es como un find
```
db.productos.aggregate([
    {
        $match:{
            categoria:"Electronicos"
        }
    }
])


db.productos.aggregate([
    {
        $match:{
            fechaCaducidad:{
                $lte:ISODate('2026-31-31T23:59:59Z')
            }
        }
    }
])

db.productos.aggregate([
    {
        $match:{
            $and:[
                {fechaCaducidad:{$lte:ISODate('2026-31-31T23:59:59Z')}},
                {existencia:{$lte: 30}}
            ]
        }
    }
])

db.productos.aggregate([
    {
        $match:{
            nombre:{$regex: /TV.*65/i }
        }
    }
])
```

## $group
Nos permite agrupar los registros segun condiciones especificas
```
db.productos.aggregate([
    {
        $group:{
            _id:"$categoria",
            existencias_totales: { $sum:"$existencia" }
        }
    }
])

db.productos.aggregate([
    {
        $group:{
            _id:"$categoria",
            precio_promedio: { $avg:"$precio" }
        }
    }
])


db.productos.aggregate([
    {
        $group:{
            _id:{
                $switch:{
                    branches:[
                        {case: {$lte:["$precio", 1000]}, then: "Barato"},
                        {case: {$gte:["$precio", 10000]}, then: "Caro"}
                    ],
                    default: "Intermedio"
                }
            },
            existencia: { $sum:1 }
        }
    }
])
```

## $sort
Nos ayuda a ordenar segun una columna o atributo
```
db.productos.aggregate([{
    $sort:{
        precio:1
    }
}])

db.productos.aggregate([
    {$sort:{fechaCaducidad:-1}},
    {$limit:3}
])

db.productos.aggregate([
    {$match:{nombre:{$regex: /TV.*65/i }}},
    {$sort:{precio:1}}
])
```

## $project
Ayuda a consultar solo los campos que nos interesan
```
db.productos.aggregate([
    {$project:{
        _id:1,
        nombre:1,
        precio:1

    }}
])

db.productos.aggregate([
    {$project:{
        _id:0,
        nombre:1,
        precio:1,
        existencia:1,
        precioTotalInv:{$multiply:["$existencia","$precio"]}
    }}
])

db.productos.aggregate([
    {$project:{
        _id:0,
        nombre:1,
        precio:1,
        fecha_de_Caducidad:{$dateToString:{ format:"%d-%m-%Y", date:"$fechaCaducidad"}}
    }}
])

```
# PipeLines

primero vamos a agregar unos registros a una nueva coleccion de libros
```
use nuevadb2
db.libros.insertMany([
    { "titulo" : "El Llano en Llamas", "autor" : "Juan Rulfo", fechaPublicacion: ISODate('1953-09-01') },
    { "titulo" : "Persuacion", "autor" : "Jane Austen", fechaPublicacion: ISODate('1817-12-20') },
    { "titulo" : "Cronica de una muerta anunciada", "autor" : "Gabriel Garcia Marquez", fechaPublicacion: ISODate('1981-01-01') },
    { "titulo" : "El Cuervo", "autor" : "Edgar Allan Poe", fechaPublicacion: ISODate('1845-01-29')},
    { "titulo" : "Cien años de soledad", "autor" : "Gabriel Garcia Marquez", fechaPublicacion: ISODate('1967-05-01') },
    { "titulo" : "El Corazon Delator", "autor" : "Edgar Allan Poe", fechaPublicacion: ISODate('1843-01-01')},
    { "titulo" : "La abadia de Northanger", "autor" : "Jane Austen", fechaPublicacion: ISODate('1817-12-20') },
    { "titulo" : "Relato de un naufrago", "autor" : "Gabriel Garcia Marquez", fechaPublicacion: ISODate('1955-01-01') },
    { "titulo" : "El Amor en los tiempos del colera", "autor" : "Gabriel Garcia Marquez", fechaPublicacion: ISODate('1985-01-01') },
    { "titulo" : "Orgullo y prejuicio", "autor" : "Jane Austen", fechaPublicacion: ISODate('1813-01-28') },
    { "titulo" : "Pedro Paramo", "autor" : "Juan Rulfo",fechaPublicacion: ISODate('1955-07-18') },
    { "titulo" : "Una casa de Granadas", "autor" : "Oscar Wilde", fechaPublicacion: ISODate('1891-01-01') },
    { "titulo" : "Rayuela", "autor" : "Julio Cortazar", fechaPublicacion: ISODate('1963-06-28') },
    { "titulo" : "El retrato de Dorian Gray", "autor" : "Oscar Wilde", fechaPublicacion: ISODate('1890-01-01') },
    { "titulo" : "El escarabajo de oro", "autor" : "Edgar Allan Poe", fechaPublicacion: ISODate('1843-06-21')},
    { "titulo" : "La caida de la casa Usher", "autor" : "Edgar Allan Poe", fechaPublicacion: ISODate('1839-09-01')},
])


db.pedidos.insertMany([
    { pedidoId: 1, clienteId:5001, producto:ObjectId("67410eb198014eb8f284650c"), cantidad:1, total:17999, pagado:false, deuda:15000, credito:true},
    { pedidoId: 2, clienteId:5002, producto:ObjectId("67410eb198014eb8f284650a"), cantidad:2, total:39.98, pagado:true, credito:false},
    { pedidoId: 2, clienteId:5002, producto:ObjectId("67410eb198014eb8f2846509"), cantidad:1, taotal:24.50, pagado:true, credito:false},
])

db.clientes.insertMany([
    {_id:5001, nombre:"Pedro Ramirez"},
    {_id:5002, nombre:"Juan Ortiz"},
    {_id:5003, nombre:"Martin Lopez"},
    {_id:5004, nombre:"Carlos Ruiz"},
])

db.empleados.insertMany([
    {_id:1, nombre:"Pedro Ramirez", jefeId:2, dptoId:3},
    {_id:2, nombre:"Juan Ortiz", jefeId:7, dptoId:2},
    {_id:3, nombre:"Martin Lopez", jefeId:1, dptoId:4},
    {_id:4, nombre:"Carlos Ruiz", jefeId:3, dptoId:1},
    {_id:6, nombre:"Mauricio Hernandez", jefeId:7, dptoId:1},
    {_id:7, nombre:"Josue Gomez", jefeId:2, dptoId:4},
    {_id:8, nombre:"Eduardo Ortiz", jefeId:6, dptoId:2},
])

db.departamentos.insertMany([
    {_id:1, nombre:"Ventas"},
    {_id:2, nombre:"Tecnologias de Informacion"},
    {_id:3, nombre:"Nominas"},
    {_id:4, nombre:"Recursos Humanos"},
])

```


## $facet

```
db.libros.aggregate([
    {
        $facet: {
            "totalLibros":[
                { $count: "total"}
            ],
            "autoresUnicos":[
                { $group: {_id:"$autor", libros:{ $push: "$titulo" } } },
                { $project: { autor: "$_id", libros:1, _id:0 } }
            ]
        }
    }
])
```

## $lookup
```
db.pedidos.aggregate([
    {
        $lookup:{
            from: "clientes",
            localField:"clienteId",
            foreignField:"_id",
            as:"infoCliente"
        }
    }
])
```

## $graphLookup
```
db.empleados.aggregate([
    {
        $graphLookup: {
            from: "empleados",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "jefeId",
            as: "subordinados"
        }
    }
])
```

## Ejemplos de operaciones en multiples colecciones

```
db.empleados.aggregate([
    {
        $lookup:{
            from: "departamentos",
            localField: "dptoId",
            foreignField: "_id",
            as: "infoDpto"
        }
    },
    {
        $unwind: "$infoDpto"
    }
])

```
En este caso el unwind nos sirve para que la info de departamenos nos llegue como un diccionario y no como una lista, ya que en este caso sabemos que nunca tiene que ser un array


Ejemplo con 3 colecciones
```
db.pedidos.aggregate([
    {
        $lookup:{
            from: "clientes",
            localField: "clienteId",
            foreignField: "_id",
            as: "infoCliente"
        }
    },
    {
        $lookup:{
            from: "productos",
            localField: "producto",
            foreignField: "_id",
            as: "infoProducto"
        }
    },
    {
        $unwind:"$infoCliente"
    }
])
```
## Operadores de acumulacion avanzados
```
db.pedidos.aggregate([
    {
        $group:{
            _id: "$clienteId",
            totalProductos: { $sum: "$cantidad" },
            promedioProductos: { $avg: "$cantidad" }
        }
    },
    {
        $lookup: {
            from: "clientes",
            localField: "_id",
            foreignField: "_id",
            as: "infoCliente"
        }
    },
    {
        $unwind: "$infoCliente"
    },
    {
        $project: {
            cliente: "$infoCliente.nombre",
            totalProductos: 1,
            promedioProductos: 1
        }
    }
])
```

## Min y Max
```
db.pedidos.aggregate([
    {
        $group: {
            _id: "$pedidoId",
            cantidadProductos: { $sum: "$cantidad" }
        }
    },
    {
        $group:{
            _id: null,
            maxCantidad: { $max: "$cantidadProductos" },
            minCantidad: { $min: "$cantidadProductos" }
        }
    },
    {
        $project: {
            maxCantidad: 1,
            minCantidad: 1
        }
    }
])
```

### Indices
Optimizamos la busqueda para que no procese tantos documentos y sea mas rapida
```
db.pedidos.createIndex({ clienteId:1 })

db.pedidos.aggregate([
    {
        $match: {
            clienteId: { $in: [5002] }
        }
    }
])
```

### sample
Optimizamos la cantidad de datos que consultamos
```
db.pedidos.aggregate([
    {
        $sample: { size: 1000 }
    }
])
```

### project
Optimizamos los pedidis transferidos de etapa a etapa
```
db.pedidos.aggregate([
    {
        $project:{
            clienteId:1,
            productoId:1,
            cantidad:1
        }
    }
])
```
### sort
Nos permite organizar los datos que vamos a tratar, es recomendable organizalros antes de agruparlos y utilizar indices para hacer mas eficiente la busqueda
```
db.pedidos.createIndex({ clienteId: 1, productoId: 1 });

db.pedidos.aggregate([
    {
        $sort: { clienteId: 1, productoId: 1}
    },
    {
        $group: {
            _id: "$clienteId",
            totalProductos: { $sum: "$cantidad" }
        }
    }
])
```

otro ejemplo
```
db.pedidos.createIndex({ clienteId: 1 });

db.pedidos.aggregate([
    {
        $sort: { clienteId: 1 }
    },
    {
        $group: {
            _id: "$clienteId",
            totalProductos: { $sum: "$cantidad" }
        }
    }
])
```

# Indices Avanzados
El uso de indices puede hacer mucho mas eficientes las busquedas cuando se trabajan con muchos datos, pero en el caso de una operacion de escritura lo puede hacer mas lenta.
La estructura de un indice es la siguiente:

db.coleccion.createIndex({ campo:1, campo2:-1})

## Indices unicos 
un solo documento esta relacionado al indice. Se utilizan para cuando tenemos campos unicos como los ID o correo electronico
La estructura para crearlo es la siguiente:

db.Coleccion.createIndex({ campoUnico:1 }, { unique:true })

## Indices parciales
Con este podemos aplicar el indice solo a algunos documentos, por ejemplo, en los productos que estan activos en una coleccion, esto para que el indice sea mas pequeño y sea mas eficiente

db.Coleccion.createIndex({ campo:1 }, { partialFilterExpression: { estado: "activo" } })

## Obtener estadisticas de eficiencia de indices
En este ejemplo estamos buscando que el tiempo de  ejecucion que se encuentra dentro de executionStats. Ejemplo de resultado de ejecucion.

"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 0,
		"executionTimeMillis" : 0,
		"totalKeysExamined" : 7,
		"totalDocsExamined" : 0,
        ...
}

el comando

```
db.libros.createIndex({ fechaPublicacion: 1, autor: 1})

db.libros.find({
    fechaPublicacion: { $gt: ISODate('1900-01-01') }
}).explain("executionStats");
```

## Mantenimiento de indices
### Ver la informacion de unos indices en una coleccion
Dentro de la informacion de la coleccion se pueden ver los indices
```
db.libros.stats()
```
Casi al final de la informacion habra un parametro llamado "nindexes"

### Listar de manera mas exacta los indices de una coleccion
```
db.libros.getIndexes()
```

### ver el uso de indices en una consulta especifica
Se agrega ".explain()" al final de una consulta

### Rehacer los indices
```
db.libros.reIndex()
```

### Eliminar los indices no utilizados
Los indices que tienen  un _id no se pueden eliminar ya que son escenciales y propios de mongodb

Ejemplo de codigo para un incide compuesto:
db.coleccion.dropIndex({ campo1:1, campo2: -1})

# Transacciones
Las transacciones tienen:
- Atomicidad: Se tienen que ejecutar todas las operaciones o ninguna, si una falla se revierte todo
- Consistencia: Siempre tienen que estar consistentes los datos antes y despues de la transaccion
- Aislamiento: Los cambios no son visibles para otras transacciones hasta que ya se termino de confirmar
- Durabilidad: Una vez que se confirma la transaccion los cambios se quedan

Ejemplo de como crearuna transaccion
Es importante saber que en este punto la transaccion no va a funcionar porque no tenemos una sesion activa tal cual
Pero esta es la sintaxis
```
use nuevadb2:

session.startTransaction();

try{
    db.productos.updateOne({ nombre: "Papa"}, { $inc: { existencia: 10 } })
    var papa = db.productos.findOne({nombre:"Papa"})

    db.pedidos.insertOne({
        pedidoId:3,
        clienteId:5002,
        producto: papa._id,
        cantidad: 4,
        total: 159.96
        pagado: true,
        credito:false
    })
    
    session.commitTransaction();
}catch (error){
    session.abortTransaction();
    print("Error en la transaccion" + error)
}
```

## Transacciones distribuidas
Estas involucran multiples nodos o servidores, son muy utiles para entornos escalables.

La preocupacion de la lectura se tiene que especificar que se usa un snapsot para evitar que otras transacciones puedan afectar a la misma, ya que al tener un entorno distribuido, pueden ser mas de dos colecciones diferentes

La preocupacion de la escritura se decide como majority, de modo que en un cluster la mayoria tiene que confirmar que las transacciones se confirmaron para confirmar la transaccion en todos lados, no es al primero


```
session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" }
});

try{
    //Modificamos el inventario en un nodo
    db.inventarioCEDIS1({ producto: "prod1", cantidad: { $gte: 5 }},{ $inc: { cantidad: -5 }});
    //Modificamos el inventario en otro nodo
    db.inventarioCEDIS2({ producto: "prod1", cantidad: { $gte: 5 }},{ $inc: { cantidad: -5 }});

    //Confirmamos la transaccion
    session.commitTransaction();
}catch (error){
    session.abortTransaction();
    print("Hubo un error con la transaccion "+ error)
}
```

## uso de transacciones en operaciones complejas
Este es un ejemplo tal cual javascript, es la logica lo importante del ejemplo, no es funcional con la base de datos que llevamos al momento

```
session.startTransaction();
try{
    const asientosDisponibles = db.eventos.findOne({_id: eventId}).asientosDisponibles
    if (asientosDisponibles >= cantidadAsientos){
        db.usuarios.updateOne({ _id:userId }, { $push: { reservas: { eventoId, cantidadAsientos } } } );
        db.eventos.updateOne({ _id:eventoId, asientosDisponbiles: { $gte: cantidadAsientos } },
            { $inc: { asientosDisponibles: -cantidadAsientos } });
    }else{
        print("No hay asientos disponibles")
    }

}catch (error){
    session.abortTransaction();
    print("Error en la transaccion" + error)
}

```

# Estrategias para el modelado de Datos
Identificar las consultas mas frecuentes que se van a realizar en la aplicacion y crear el esquema alrededor de esas consultas aun si hay que duplicar datos

Considerar cuano es mas practico si vamos a utilizar referencias o documentos incrustados

Normalizar solamente los datos que no sean beneficioso hacerlo, en general los que cambian con mucha frecuencia y no afecten negativamente el rendimiento

El tamaño maximo de un documento es de 16MB, por lo que si estos van a crecer mas alla de este limite hay que utilizar referencias

# Modelado de relaciones entre documentos
Se usan relaciones con referencias cuando hay que datos que puedan cambiar con relativa facilidad.

Cuando los datos no van a cambiar con frecuencia, como el autor de un libro, podemos usar relaciones con datos incrustadas sin problema

# Modelado para optimizar consultas y agregaciones (Aggregate)
Las consultas no necesitan mucho de la normalizacion de los datos, ya que las consultas se vuelven complejas y el mantenimiento complicado y tedioso, ademas de lento. Aun asi siempre dependera de los requerimientos de la base de datos

Se utilizan indices en campos que se utilizan con mucha frecuencia en consultas y agregaciones.
Crear indices aumenta el tamaño de la base de datos, pero mejoran mucho la velocidad de recuperacion de datos.

# Datos geoespaciales
MongoDB tiene soporte nativo para datos geoespaciales, es decir, de coordenadas en un mapa
Existen principalmente dos tipos, indices de esfera y de plano.

Los datos se deben insertar en formato [ longitud, latitud ], a diferencia de la mayoria de los mapas que te entregan latitud,longiud

```
use geoDatos;

db.lugares.createIndex({ubicacion: "2dsphere" })

db.lugares.insertOne({
    nombre: "Macro Plaza",
    ubicacion: { type:"Point", coordinates: [-100.3099, 25.66918]} 
});

db.lugares.insertOne({
    nombre: "Lugar de enfrentamiento de Nacho Libre y el Esqueleto",
    ubicacion: { type:"Point", coordinates: [-97.2934629, 17.3480916]} 
});

```

## Consulta con un indice geoespacial
```
db.lugares.find({
    ubicacion:{
        $near:{
            $geometry: { type: "Point", coordinates: [-97.2934625, 17.3480916]},
            $maxDistance: 500
        }
    }
})
```

## Consultas de ubicaciones geoespaciales
Primero vamos a cargar datos
```
db.lugares.insertMany([
    {
    nombre: "Santuario las Peñitas (Iglesia Nacho Libre)",
    ubicacion: { type:"Point", coordinates: [-97.2934629, 17.3480916]} 
    },
    {
    nombre: "Faro de Chiltepec",
    ubicacion: { type:"Point", coordinates: [-93.0919736, 18.4370539]} 
    },
    {
    nombre: "Parque Central de Tapilula, Chiapas",
    ubicacion: { type:"Point", coordinates: [-93.0165505, 17.2481129]} 
    },
    {
    nombre: "Hacienda Real, Atenco, Edo. Mex",
    ubicacion: { type:"Point", coordinates: [-99.5130767, 19.1847926]} 
    },
    {
    nombre: "Puerto Lobos, Isla Carmen, BCS",
    ubicacion: { type:"Point", coordinates: [-111.0519148, 26.0740119]} 
    }
])
```

Una vez agregados los datos podemos hacer una consulta para buscar un lugar segun sus coordenadas

En este caso se hace una consulta con near, para poder especificar un rango de busqueda de modo que si no se encuentra un lugar registrado en la BD en ese rango, no devuelve nada
```
db.lugares.find({
    ubicacion:{
        $near:{
            $geometry:{ type: "Point", coordinates:[-99.5109, 19.1850] },
            $maxDistance: 1000
        }
    }
})
```

Tipos de geometrias para insertar

## Geometria tipo punto:
Ubica un punto en el mapa
{ type: "Point", coordinates:[ longitud, latitud ] }

## Geometria tipo LineString
Ubica una linea conectando los puntos agregados en las coordinaradas, como si fueran direcciones
{ type: "LineString", coordinates:[ [ longitud1, latitud1 ],[ longitud2, latitud2 ], [ longitud3, latitud3 ] ] }

## Geomtria tipo Polygon
Ubica varios puntos y los conecta pero incluyendo la conexion del ultimo con el primero para generar un poligono, por ejemplo, si le pasamos 3 puntos genera un triangulo
{ type: "Polygon", coordinates:[ [ longitud1, latitud1 ],[ longitud2, latitud2 ], [ longitud3, latitud3 ] ] }

## Geomtria tipo MultiPoint
Ubica varios puntos en el mapa pero no los conecta
{ type: "MultiPoint", coordinates:[ [ longitud1, latitud1 ],[ longitud2, latitud2 ], [ longitud3, latitud3 ] ] }

## Geometria tipo MultiLineString
Ubica varias lineas, es un arregla de arreglos
{ type: "MultiLineString", coordinates:[ [[ longitud1_1, latitud1_1 ],[ longitud1_2, latitud1_2 ]], [[ longitud2_1, latitud2_1 ],[ longitud2_2, latitud2_2 ]] ] }

## Geometria tipo MultiPolygon
Ubica varios poligonos en un arreglo de arreglos en el mapa, el siguiente ejemplo te agrega un triangulo y un cuadrado
{ type: "MultiPolygon", coordinates:[ [[ lng1_1, lat1_1 ],[ lng1_2, lat1_2 ], [ lng1_3, lat1_3 ]], [[ lng2_1, lat2_1 ],[ lng2_2, lat2_2 ], [ lng2_3, lat2_3 ], [ lng2_4, lat2_4 ]], ] }


Otro ejemplo de consultas
## geoIntersect
Podemos consultar si un punto intersecta en la geometria de algun punto, 
Por ejemplo, esta consulta devolveria un valor si encuentra el punto dentro del perimetro un poligono o en alguna parte de una linea
db.lugares.find({
    ubicacion:{
        $geoIntersect:{
            $geometry: { type: "Point", coordinates: [ longitud, latitud ] }
        }
    }
})

## geoWithin
Esta consulta nos devuelve los documentos con polygonos los cuales dentro de su area se encuentre el poligono especificado
db.lugares.find({
    ubicacion:{
        $geoWithin:{
            $geometry: {
                tyoe: "Polygon",
                coordinates: [
                    [[1,1], [2,2], [3,3] ]
                ]
            }
        }
    }
})

# Seguridad y Alta Disponibilidad
## Autenticacion por usuario local
Es el metodo comun en el que creamos un usuario local para que tenga permisos de acceder a la base de datos

## Autenticacion basada en roles
Le podemos asignar roles con determinados perisos a los usuarios como rol de lectura, escritura, dbadmin

## Autenticacion x.509
Consta de una capa extra de seguridad en la que podemos utilizar certificados para validar las identidades

## Crear un usuario local con un rol especifico
```
use admin;
db.createUser({
    user: "dbUser",
    pwd: "toor",
    roles:[
        { role: "readWrite", db:"nuevadb2" },
        { role: "clusterAdmin", db:"admin" },
    ]
})
```

### Habilitar autenticacion  x.509
```
security:
    clusterAuthMode:x509
    x509:
        clientCertificateKeyFile:"ruta/archivo/calve.pem"
        bindIp:"0.0.0.0"
```

## Roles y permisos personalizados
Para empezar tenemos roles predefinidos como read, readWirte,dbAdmin, etc.
Podemos tambien crear un rol personalizado con el comando

```
use admin 

db.createRole({
    role: "rolP",
    privileges: [
        {resource: {db: "nuevadb2", collection:"" }, actions: ["find", "insert", "update"] },
        {resource: {db: "nueva_db", collection:"empleados" }, actions: ["remove"] },
    ],
    roles:[]
});

```

Dentro de los parametros especificacremos permisos como lectura, escritura,dbadmin, etc.
Para asignar este nuevo rol a un usuario debemos se utiliza el siguiente comando
```
use admin;
db.grantRolesToUser("dbUser", ["rolP"])
```

## Integracion con sistemas de Autenticacion Externos
Para configurar tanto LDAP como kerberos se utilizan archivos yaml que contienen los parametros de configuracion

### LDAP
Tales como un directorio activo o openldap, etc.

### Kerberos
Autenticacion SSO como la usada en Microsoft


# Replicas para alta Disponibilidad
Generalmente se usan dos o ms nodos, en los cuales un nodo primario maneja las operaciones mientrs que los otros replican los datos solamente 

Se puede agregar un nodo arbitro que ayuda en la toma de decisiones en caso de que el primario falle, generalmente no almacena datos, solo participa en la toma de decisiones


Ejemplo de un archivo de configuracion con Replicas

replSetName: "MiReplica"
rs.add("nodoSec1:27017")
rs.add("nodoSec2:27017")

rs.addArb("nodoArb:27017"))

## Monitore de Replicas
Se pueden utilizar herramientas como MongoDB Management Service (MMS), MongoDB Atlas o cualquiera de software de tercero que nos permite visualizar el estado de las replicas en tiempo real

### Compactacion de bases de datos
Generalmente se hace un reindex() a las colecciones para compactar un poco los datos

### Respaldos de bases de datos
ustilizando mongodump y mongorestore se pueden mantener respaldos periodicos y restaurarlos si sucede un siniestro

### Resincronizar
En caso de que un servidor secudario falle podemos resincronizarlo utilizando el comando:
rs.syncFrom("nodoPrimario:27017")

### Elegir un nuevo nodo primario
En caso de un fallo en el nodo primario se puede forzar la eleccion de uno nuevo que actue como prmiario utilizando el comando
use admin
rs.stepDown()


# Optimizacion de consultas
## explain
Este comando nos da informacion  sobre como el gestor de la base de datos planea la consulta, lo que considera y como accede a los datos, asi como los tiempos de las operaciones

Por ejemplo tomemos una consulta cualquiera
```
use nuevadb2
db.libros.find({autor: "Edgar Allan Poe"}).explain("executionStats")
```
Si queremos traer toda la informacion de ejecucion
```
use nuevadb2
db.libros.find({autor: "Edgar Allan Poe"}).explain("allPlansExecution")
```

## Perfil de consultas
Este nos permite obtener informacion mas detallada del rendimiento de las consultas.

Por ejemplo podemos especificar un perfil que registre las consultas que superen los 100 ms
```
use nuevadb2
db.setProfilingLevel(2, { slowms: 100 });
db.libros.find({autor: "Edgar Allan Poe"}).pretty();
```

Para volver al perfil por defect hay que usar:
```
db.setProfilingLevel(0);
```

## Indices y agregaciones
como utilizar un indice en una consulta
db.collection.find({campo:"valor"}).hint({campo:1})

# Estrategias de respaldos
## Respaldos completos
Se respalda la base de datos en su totalidad con el comando
mongodump --db nombre_db --out /ruta/archivo

## Respaldos incrementales
Solamente se respaldan los datos que han cambiado desde el ultimo respaldo incremental 
mongodump --db nombre_db --out /ruta/archivo --oplog

El oplog lo que hace es el registro de operaciones, por eso actualiza solamente las operaciones en el respaldo

## Snapshots
Tomar una instantanea del sistema de archivos en el que se encuentra mongoDB

## Respaldos en Caliente
Se utilizan herramientas de Terceros para ejecutar respaldos mientras la base de datos se estan ejecutando

## Respaldar una coleccion en especifico
Para respaldar solamente una coleccion se usa el comando
mongodump --db nombre_db --collection coleccion --out /ruta/archivo

### Restauracion de respaldos
Para restaurar una base de datos completa
mongorestore --db nombre_db /ruta/directorio/respaldo

### Restaurar una coleccion en especifico de la base de datos
Para restaurar solamente una coleccion
mongorestore --db nombre_db --collection coleccion /ruta/directorio/respaldo

### Programacion de Respaldos
tal cual al ser comandos se pueden automatizar a traves de cron de linux, tareas programadas de windows, o naturalmente, utilizando los servicios en la nube de mongodb Atlas

# Herramientas de administracion y monitoreo

## MongoDB Compass
Es la herramienta por defecto que podemos encontrar en el sitio web de MongoDB, nos permite realizar la gran mayoria si no es que todas las operaciones que hariamos desde una terminal de comandos desde una interfaz grafica sencilla

## Robot 3T
Es una opcion con version open source igualmente nos otorga una interfaz grafica, realmente utilizarla es mas por gustos o si estas muy interesado en las funciones de customizacion con las que cuenta puede ser tambien una buena opcion

## MongoDB Atlas
Es el servicio en la nube de MongoDB, es similar a mongoDB Compass solamente que al ser un servicio en linea, la consola se encuentra en el navegador y obbviamente tiene funciones diferentes, por ejemplo, no hay bases de datos locales, por lo que hay que pagar al levantar una BD ya que por defecto te permite montarlo en AWS, Google Clou o Azure.