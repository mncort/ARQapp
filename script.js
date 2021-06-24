//Class Tareas tiene generar objetos tarea que almacena nombre, precio

class Tareas{
    constructor(id,nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    //en desarrollo
    getPrecioConIva(){
        return this.precio * 1.21;
    }
    //en desarrollo
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

        let cantidad = isNaN(cant) || !cant ? 1: cant; //valido si me envian una cantidad sino por defecto es 1
        objetoTarea ? //valido que se haya enviado una tarea correcta
            this.tareas.find(tarea => tarea.id == objetoTarea.id) ?  //valido si la tarea enviada ya esta cargada
                this.tareas[this.tareas.findIndex(tarea => tarea.id == objetoTarea.id)].cantidad += cantidad //si esta cargada la busco en el array y solo le sumo la cantidad enviada
                :
                this.tareas.push({...objetoTarea, cantidad: cantidad}) //si no esta cargada la cargo en el array con la cantidad ingresada
        : 
            alert(`Seleccione una tarea valida!`);
        
        this.calcularTotal();
    }

    calcularTotal(){
        this.total = this.tareas.reduce((subtotal,tarea) => tarea.cantidad * tarea.precio + subtotal, 0);
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
                            listTarea.map(tarea => `${tarea.id}  -  ${tarea.nombre}`).join("\n")); //listo las tareas posibles

    var tareaElegida = listTarea.find(tarea => tarea.id == idElegido); //busco en el array con el numero ingresado si hay una tarea

    var q = parseInt(prompt(`ingrese la cantidad de ${tareaElegida.nombre}`));//pido cantidad de tarea a agregar

    console.log(q);

    presupuesto.agregarTarea(tareaElegida, q);

    msg = "¿Quiere seguir agregando tareas?";
}

alert(presupuesto.tareas.map(tarea => 
    `${tarea.id}  -  ${tarea.nombre}  subtotal: ${tarea.cantidad * tarea.precio}`
    ).join("\n")
    + `\n\nTotal: ${presupuesto.total}`
    );

