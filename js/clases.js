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
    constructor({nombre, tareas = [], subtotal = 0}){
        this.nombre = nombre 
        this.tareas = tareas
        this.subtotal = subtotal
    }
}

class Presupuestos{
    constructor({id,nombre,categorias = [], total = 0, cliente = ""}){
        this.id = parseInt(id)
        this.nombre = nombre
        this.categorias = sinoSosHacete(categorias, Categorias)
        this.total = total
        this.cliente = cliente
    }
    pushCategorias(categorias){
        categorias.forEach(item => this.categorias.push(new Categorias(item)))
    }
    pushCategoria(nombre){
        this.categorias.push(new Categorias({"nombre": nombre}))
    }
    addTarea(indxCat,tarea,cantidad = 1){

        let id = tarea?.id ? tarea.id : tarea

        let index = this.categorias[indxCat].tareas.findIndex(item => item.id === parseInt(id))

        index == -1 ?         
        this.categorias[indxCat].tareas.push({...new Tareas(tarea), cantidad: cantidad}) :
        this.categorias[indxCat].tareas[index].cantidad += cantidad
        this.calcSubtotal(indxCat)
    }
    deleteCat(indxCat){
        this.categorias.splice(indxCat, 1)
        this.calcTotal()
    }
    deleteTarea(indxCat, idTarea){
        let indexTarea = this.categorias[indxCat].tareas.findIndex(item => item.id == idTarea)

        this.categorias[indxCat].tareas.splice(indexTarea, 1)
        this.calcSubtotal(indxCat)
    }
    calcSubtotal(indxCat){
        this.categorias[indxCat].subtotal = this.categorias[indxCat].tareas.reduce((acum, item) => acum + (item.precio * item.cantidad), 0)
        this.calcTotal()
    }
    calcTotal(){
        this.total = this.categorias.reduce((acum, item) => acum + item.subtotal, 0)
        setLocal("presupuestos", presupuestos)
    }
    dibujarRenglonesTareas(indexCat){
        return this.categorias[indexCat].tareas.map( tarea => ` 
            <tr id="tarea-${indexCat + `-` + tarea.id}">
                <td class="col-1">${tarea.id}</td>
                <td class="col-3">${tarea.nombre}</td>
                <td class="col-1">${tarea.unidad}</td>
                <td class="col-1">${tarea.peso}</td>
                <td class="cantidad-item col-1" >
                    <i onclick="recibirOnclick(event)"name="-1" class="icon ion-md-remove"></i>
                    <span name="cantidad">${tarea.cantidad}</span>
                    <i onclick="recibirOnclick(event)" name="+1" class="icon ion-md-add"></i>
                </td>
                <td class="col-1">${tarea.precio}</td>
                <td class="columna-accion col-1"" >
                    <i onclick="recibirOnclick(event)" name="trash" class="icon ion-md-trash lead"></i>
                </td>
            </tr>
        `).join("")
    }
    titulosTabla(titulos, clase){
        return `<tr>
            ${titulos.map( titulo => `<th scope="col" class="col-`+ clase +`">`+ titulo ).join("</th>")}
        </tr>`
    }
    dibujarPresupuesto(){
        return `
        <div class="boton-container mb-3"
             id="tarea-categoria">
            <i name="addCategoria"
                class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" 
                onclick="recibirOnclick(event)"> 
                    Categoria
            </i>
        </div>
        <div id="accordion-cat" class="accordion" >
        ${this.categorias.map( (categoria, indexCat) =>`
        <div id="categoria-${indexCat}" class="accordion-item">
          <h2 class="accordion-header" id="heading${indexCat}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${indexCat}" aria-expanded="true" aria-controls="collapse${indexCat}">
              <span class="d-flex w-100 justify-content-between pe-2">
              <span>${categoria.nombre}</span>
              <span id="cat-subtotal-${indexCat}">$ ${categoria.subtotal}</span>
              </span>
            </button>
          </h2>
          <div id="collapse${indexCat}" class="accordion-collapse collapse show" aria-labelledby="heading${indexCat}">
            <div class="accordion-body">
                <table class="table table-sm">
                    <thead>
                        ${this.titulosTabla(
                            ["ID", "Nombre", "Un", "Hs", "Cant", "Valor", "Accion"],
                            ['1', '3', '1','1','1', '1','1'],
                        )}
                    </thead>
                    <tbody id="tbody-${indexCat}">
                        ${this.dibujarRenglonesTareas(indexCat)}
                    </tbody>
                </table>
                <div class="d-flex justify-content-between">
                    <i name="addTarea" id="addtarea-${indexCat}" class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" onclick="recibirOnclick(event)"> Agregar Tarea</i>
                    <i name="deleteCat" id="deletetarea-${indexCat}" class="icon ion-md-remove px-2 py-1 rounded-1 btn-secondary" onclick="recibirOnclick(event)"> Eliminar Cat</i>
                </div>
            </div>
          </div>
        </div>`).join("")}
      </div>
    `
    }
    actualizarCategoria(indexCat){
        let element = document.getElementById(`tbody-${indexCat}`)
        element.innerHTML = this.dibujarRenglonesTareas(indexCat)
        let eSubtotal = document.getElementById(`cat-subtotal-${indexCat}`)
        eSubtotal.innerHTML = `$ ${this.categorias[indexCat].subtotal}`
        document.getElementById("valorTotal").innerHTML = `Total: $ ${this.total}`
    }
}

class Clientes{
    constructor({id, nombre, mail = "", telefono, direccion = ""}){
        this.id = parseInt(id)
        this.nombre = nombre
        this.mail = mail
        this.telefono = telefono
        this.direccion = direccion
    }
    dibujarRenglon(){
        return ` 
                <tr id="cliente-${this.id}">
                    <td>${this.id}</td>
                    <td>${this.nombre}</td>
                    <td>${this.mail}</td>
                    <td>${this.telefono}</td>
                    <td>${this.direccion}</td>
                    <td>
                        <i id="delete-${this.id}" onclick="accionCliente(event)" name="trash" class="icon ion-md-trash lead"></i>
                    </td>
                </tr>
            `
    }
}
