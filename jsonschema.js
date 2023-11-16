/*
- Colecciones
	3 entidades (principales)
	colecciones
- JSON Schema validation
- Data model patterns

- No relational database management system
	Comparativo de base de datos no relaciones 
		firebase
		mongodb
		cassandra



alojamientos
- _id
- nombre: string
- descripcion: string
- servicios: array (object) -> principales
- ubicacion: object
	- latitud: decimal
	- longitud: decimal
	- ciudad: string
	- pais: string
- precio: decimal
- anfitrion: object
	- nombre: string 
	- verificacion: bool
- resenhas: array (object) -> recientes
- verificacion: bool
- imagen: string

subpattern
servicios
 - _id
 - nombre: string
 - imagen: string
 - ids_alojamiento: array (referencia)

subpattern
resenhas
 - _id
 - comentario
 - calificacion
 - usuario: object
 - id_alojamiento: "objectId" (referencia)


relaciones
alojamientos
- 1 a 1: ubicacion / anfitrion
- 1 a muchos: reseñas / servicios

servicios
- 1 a muchos: alojamientos

reseñas
- 1 a 1: usuario

patrones
- subpattern
- reference


json schema
*/


db.createCollection("alojamientos", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["nombre", "ubicacion", "anfitrion"],
			properties: {
				nombre: {
					bsonType: "string"
				},
				ubicacion: {
					bsonType: "object",
					required: ["latitud", "longitud"],
					properties: {
						latitud: {
							bsonType: "double"
						},
						longitud: {
							bsonType: "double"
						},
						ciudad: {
							bsonType: "string"
						}
					}
				},
				anfitrion: {
					bsonType: "object",
				},
				servicios: {
					bsonType: "array",
					minItems: 1,
					items: {
						bsonType: "string"
					}
				}
			}
		}
	}
})

db.alojamientos.insertOne({
    nombre: "Casa de campo",
    ubicacion: {
        latitud: 40.416775,
        longitud: -3.703790,
        ciudad: "Madrid"
    },
    anfitrion: {
        nombre: "Juan",
        apellido: "García",
        edad: 35
    },
    servicios: ["wifi", "piscina", "lavanderia"]
})
