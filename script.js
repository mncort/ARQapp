const arrayFrom = (json, clase, key) =>  Array.from( getLocal(key) || json, item => new clase(item) )

const sinoSosHacete = (array, clase) => array instanceof clase ? array : arrayFrom(array, clase)

var tareasArray = arrayFrom(jasonTareas, Tareas, "tareas")

console.log(tareasArray)

var presupuestos = arrayFrom(presupuestoPrueba, Presupuestos, "presupuestos")

console.log(presupuestos)

//setLocal("tareas", tareasArray)


