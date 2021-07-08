var tareasArray = [];

jasonTareas.forEach(item => tareasArray.push(new Tareas(item)));

var presupuestoTest = new Presupuestos({id: 1, nombre: "Presupuesto de Prueba"})

presupuestoTest.pushCategoria("Categoria Prueba2")

presupuestoTest.addTarea(0,tareasArray[2],5)
presupuestoTest.addTarea(0,tareasArray[1],3)
presupuestoTest.addTarea(0,tareasArray[3],7)

presupuestoTest.pushCategoria("Categoria Prueba3")

presupuestoTest.addTarea(1,tareasArray[0],5)
presupuestoTest.addTarea(1,tareasArray[2],3)
presupuestoTest.addTarea(1,tareasArray[1],7)

presupuestoTest.calcTotal()
console.log(presupuestoTest.total)