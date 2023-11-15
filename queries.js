use demo-sv42
/*
Ejercicio 01:
Mostrar todas las ventas
*/
/*
- filtros 
- campos que quieres mostrar por cada documento (proyección)
*/
db.sales.find()

/*
Ejercicio 02:
Mostrar las ventas realizadas en línea.
*/
db.sales.find({purchaseMethod: "Online"})

/*
Ejercicio 03:
Mostrar las ventas realizadas en líneas y en la ubicación de Denver.
*/
db.sales.find({purchaseMethod: "Online", storeLocation: "Denver"})

/*
Ejercicio 04:
Mostrar las ventas realizadas en Denver o Seattle.
*/
db.sales.find({$or: [{storeLocation: "Denver"},
					{storeLocation: "Seattle"}
					]})

db.sales.find({storeLocation:{ $in: ["Denver", "Seattle"] }})

/*
Ejercicio 05:
Mostrar por cada venta solo el lugar donde se realizó.
*/
db.sales.find({},{storeLocation: 1, _id: 0})

/*
Ejercicio 06:
Mostrar por cada venta el género y la edad del cliente.
*/
db.sales.find({}, {"customer.gender": 1, "customer.age": 1, _id: 0})

/*
Ejercicio 07
Mostrar las ventas cuyos clientes tenga una edad mayor a 30.
*/
db.sales.find({"customer.age": {$gt: 30}})


/*
Ejercicio 08
Mostrar las ventas que hayan sido realizados en Denver o Seattle, y 
cuyos clientes tengan una edad menor a 50
*/
db.sales.find({$and:[ {storeLocation: {$in: ["Denver", "Seattle"]}},
					{"customer.age": {$lt: 50}}	
					] })

/*
Ejercicio 09
Indicar la cantidad de ventas que hayan sido realizados en Denver o Seattle, y 
cuyos clientes tengan una edad menor a 50.
*/
db.sales.find({$and:[ {storeLocation: {$in: ["Denver", "Seattle"]}},
					{"customer.age": {$lt: 50}}	
					] }).count()

/*
Ejercicio 10
Indicar los distintos puntos de ventas
*/
db.sales.distinct("storeLocation")

/*
Ejercicio 11
Indicar los distintos métodos de pago
*/
db.sales.distinct("purchaseMethod")

/*
Ejercicio 12
Indicar la cantidad ventas realizadas por cada método de pago

*/
db.sales.aggregate([
	{ $group: {
		_id: "$purchaseMethod",
		quantity: {$count: {}} 
		}}
	])

/*
Ejercicio 13
Indicar la cantidad ventas realizadas por cada método de pago
en la ubicación de Seattle.
*/
db.sales.aggregate([
	{ $match: {storeLocation: "Seattle"}},
	{ $group: {
		_id: "$purchaseMethod",
		quantity: {$count: {}} 
		}}
	])

/*
Ejercicio 14
Indicar la cantidad ventas realizadas por cada método de pago
en la ubicación de Seattle, que superen las 50 ventas.
*/
db.sales.aggregate([
	{ $match: {storeLocation: "Seattle"}},
	{ $group: {
		_id: "$purchaseMethod",
		quantity: {$count: {}} 
		}},
	{ $match: {quantity: {$gt: 100}}}
	])
