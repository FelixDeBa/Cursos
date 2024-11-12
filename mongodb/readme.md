> [!CAUTION]
> Se esta utilizando la version 4.4.0 ya que es la version que fue compatible con la raspberry

# Para crear una base de datos
```
use nueva_db
```
# PAra ver los stats de la base de datos
```
db.stats()
```

### La base de datos se crea pero realmente no se crea porque no contiene objetos/colecciones

#Para create una coleccion
```
db.createCollection("mi coleccion")
```

#Para listas las bases de datos existentes
Las bases de datos nuevas no aparecen hasta que tengan una coleccion creada
```
show dbs
```

#CRUD
###Agregar usuario (CREATE)
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

Esto agrega en automtico un ObjectID


##Buscar usuarios (READ)
```
db.usuarios.find()
```

###Aplicando filtros:
```
db.usuarios.find({edad:{$gt:20}})
```

##Actualizar un usuario (UPDATE)
####En este caso se actualiza solmente el primer registro que encuentre
```
db.usuarios.updateOne(
    {nombre:"Pablo"},
    {$set:{edad:25}}
)
```

##Eliminar Un registro (DELETE)
```
db.usuarios.deleteOne({
    nombre:"Pablo"
})
```

###En este caso borra la primera coincidencia que encuentre


#Gestion de tareas asignadas a un usuario (Union entre usuarios)
##Primero sacamos el ID del usuario
```
db.usuarios.findOne({nombre:'Felix'})

db.createCollection('tareas')
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

###PAara buscar en una tabla enlazada con otra
```
db.tareas.find({usuarioID:ObjectId("67328f7bc3db063357b20494")})
```

####Una manera que encontre un poco mas elegante de hacerlo
```
db.tareas.find({usuarioID:db.usuarios.findOne({nombre:"Mauro"})._id})
```

###Para actualizar una tarea de un usuario
```
db.tareas.updateOne(
    {_id:ObjectId("67329345d236bf8937730021")},
    {$set:{estado:"Completada"}}
)
```

###Agregar un nuevo campo a la tabla
```
db.tareas.updateOne(
    {_id:ObjectId("6732930dd236bf8937730020")},
    {$set:{comentario:"Esta tarea no corresponde este usuario"}}
)
```

##Si quisiera eliminar una tarea que corresponde a un usuario:
```
db.tareas.deleteOne(
    {_id:ObjectId("6732930dd236bf8937730020")}
)
```

#Comando insertMany()
####Para propositos del ejemplo primero vamos a crear una coleccion
```
db.createCollection("productos")

db.productos.insertMany([
    {nombre:"Zote",precio:19.99},
    {nombre:"Arroz",precio:16.99},
    {nombre:"Azucar",precio:38},
    {nombre:"Lechuga",precio:24}
])
```

####En este caso si ocurre un error no va a insertar nada, tienen que pasar todos

####Para ver lo que agregamos utilizamos db.productos.find()


#Agregar un registro con ID Personalizado
```
db.usuarios.insertMany([
    {_id:1,nombre:"Hector"},
    {_id:70,nombre:"Melchor"},
    {_id:19,nombre:"Edson"}
])
```

#Uso avanzado de find
####primero creamos datos dummy
```
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
```

##Para crear los filtrados
####Filtra por edades mayor a 30 años
```
db.usuarios.find({edad:{$gt:30}})
```

####Busqueda por un correo con coincidencia exacta
```
db.usuarios.find({correo:"andres@example.com"})
```

####Busqueda en un rango
```
db.usuarios.find({edad:{$gte:25,$lte:30}})
```

#Actualizaciones/Cambios en los datos
##updateOne
```
db.usuarios.updateOne(
    {nombre:'Juan Perez'},
    {$set:{edad:36}}
)
```

####Este actualizara solamente el primer registro que encuentre

##update
El modo de uso es "db.usuarios.update({filtro, actualizacion, opciones})"
```
db.usuarios.update(
    {edad:25},
    {$set:{edad:24}},
    {multi:true}
)
```

####Con esta opcion podemos elegir multi:true para que modifique todas las coincidencias
> [!CAUTION]
> ESTA FUNCION ESTA DEPRECIDA, HAY QUEUSAR UPDATE MANY

##updateMany
```
db.usuarios.updateMany(
    {edad:24},
    {$set:{edad:25}}
)
```

##replaceOne
```
db.usuarios.replaceOne(
    {nombre:'Juan Perez'},
    {nombre: 'Juan Gomez', edad:28, correo:'juan@indeciso.com'}
)
```

####Este reemplaza todo el documento/registro, si no pones todos los datos, borra los que no pusiste

> [!Info]
> Para limpiar la pantalla se usa cls