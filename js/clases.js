class Tareas{
    constructor({id, nombre, precio,unidad,peso}){
        this.id = parseInt(id)
        this.nombre = nombre
        this.precio = parseInt(precio)
        this.unidad = unidad
        this.peso = parseInt(peso)
    }
}

class Categorias{
    constructor(nombre){
        this.nombre = nombre 
        this.tareas = []
        this.subtotal = 0
    }
    /*
    addTarea(tarea,cantidad = 1){

        let index = this.tareas.findIndex(item => item.id === tarea.id)

        index == -1 ?         
        this.tareas.push({...new Tareas(tarea), cantidad: cantidad}) :
        this.tareas[index].cantidad += cantidad
      
        this.calcSubtotal()
    }
    calcSubtotal(){
        this.subtotal = this.tareas.reduce((acum, item) => acum + (item.precio * item.cantidad), 0)
    }*/
}

class Presupuestos{
    constructor({id,nombre}){
        this.id = parseInt(id)
        this.nombre = nombre
        this.categorias= []
        this.total = 0
    }
    pushCategoria(nombre){
        this.categorias.push(new Categorias(nombre))
    }
    addTarea(indxCat,tarea,cantidad = 1){

        let index = this.categorias[indxCat].tareas.findIndex(item => item.id === tarea.id)

        index == -1 ?         
        this.categorias[indxCat].tareas.push({...new Tareas(tarea), cantidad: cantidad}) :
        this.categorias[indxCat].tareas[index].cantidad += cantidad
      
        this.calcSubtotal(indxCat)
    }
    calcSubtotal(indxCat){
        this.categorias[indxCat].subtotal = this.categorias[indxCat].tareas.reduce((acum, item) => acum + (item.precio * item.cantidad), 0)
    }
    calcTotal(){
        this.total = this.categorias.reduce((acum, item) => acum + item.subtotal, 0)
    }
}