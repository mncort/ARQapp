const arrayFrom = (json, clase, key) =>  Array.from( getLocal(key) || json, item => new clase(item))

const sinoSosHacete = (array, clase) => array instanceof clase ? array : arrayFrom(array, clase)

var clientesArray = arrayFrom(false, Clientes, "clientes")

var tareasArray = arrayFrom(jasonTareas, Tareas, "tareas")

var presupuestos = arrayFrom(presupuestoPrueba, Presupuestos, "presupuestos")



