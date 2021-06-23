//Class Tareas tiene generar objetos tarea que almacena nombre, precio

class Tareas{
    constructor(id,nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    getPrecioConIva(){
        return this.precio * 1.21;
    }
    aplicarDescuento(descuento){
        return this.precio * (1 - (descuento/100));
    }
}

class Presupuesto{
    constructor(id){
        this.id = id;
        this.total = 0;
        this.tareas=[]
    }

    agregarTarea(objetoTarea, cant){

        let cantidad = isNaN(cant) || !cant ? 1: cant;
        objetoTarea ? 
            this.tareas.find(tarea => tarea.id == objetoTarea.id) ?
                this.tareas[this.tareas.findIndex(tarea => tarea.id == objetoTarea.id)].cantidad += cantidad
                :
                this.tareas.push({...objetoTarea, cantidad: cantidad})
        : 
            alert(`Seleccione una tarea valida!`);
        
        this.calcularTotal();
        console.log(this);
    }

    calcularTotal(){
        this.total = this.tareas.reduce((subtotal,tarea) => tarea.cantidad * tarea.precio + subtotal, 0)
    }

}

let mamposteria = new Tareas(1,"Mamposteria", 150);
let piso = new Tareas(2,"Piso", 250);
let pintura = new Tareas(3,"Pintura", 350);
let demolicion = new Tareas(4,"Demolicion", 100);

let listTarea = [ 
                  mamposteria,
                  piso,
                  pintura,
                  demolicion
                ];

let presupuesto = new Presupuesto(1);


let msg ="¿Queres hacer un presupuesto?";

while(confirm(`Bienvenido a ARQapp!\n ${msg}`)){

    var idElegido = prompt("ingrese el numero de tarea que desea agregar \n" + 
                            listTarea.map(tarea => `${tarea.id}  -  ${tarea.nombre}`).join("\n"));

    var tareaElegida = listTarea.find(tarea => tarea.id == idElegido);

    var q = parseInt(prompt(`ingrese la cantidad de ${tareaElegida.nombre}`));

    console.log(q);

    presupuesto.agregarTarea(tareaElegida, q);

    msg = "¿Quiere seguir agregando tareas?";
}

alert(presupuesto.tareas.map(tarea => 
    `${tarea.id}  -  ${tarea.nombre}  subtotal: ${tarea.cantidad * tarea.precio}`
    ).join("\n")
    + `\n\nTotal: ${presupuesto.total}`
    )

