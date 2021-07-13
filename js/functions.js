function dibujarTareas(){
    let title = document.getElementById("modulo-title")
    title.innerHTML = "<h2>Tareas</h2>"
    let content = document.getElementById("modulo-content")

    content.innerHTML =  botonAgregarTarea() +
    `    
    <div class="card mt-4 border-0">
        <div class="card-body p-0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Un</th>
                        <th scope="col">Hs</th>
                        <th scope="col">Valor Un.</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody id="tabla-tareas">
                    ${tareasArray.map(item => 
                        `<tr id="tarea-${item.id}">
                            <td>${item.id}</td>
                            <td>${item.nombre}</td>
                            <td>${item.unidad}</td>
                            <td>${item.peso}</td>
                            <td>${item.precio}</td>
                            <td>
                                <i onclick="accionTarea(event)" name="trash" class="icon ion-md-trash lead"></i>
                            </td>
                        </tr>`).join("")}
                </tbody>
            </table>            
        </div>
    </div>
    `
}
function botonAgregarTarea(){
    return `
            <div class="boton-container">
                <i name="addTarea"
                    class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" 
                    onclick="accionTarea(event)"> 
                        Agregar Tarea
                </i>
            </div>`
}
function accionTarea(evento){
    let que = evento.target.getAttribute("name")
    const  acciones = {
        "addTarea"      : () => inputTareas(),
        "newTarea"      : () => addTareaTareas(),
        "trash"      : () => deleteTareaTareas(evento)
    }[que]()

    !["addTarea"].includes(que) && dibujarTareas()
    setLocal("tareas", tareasArray)
}
function deleteTareaTareas(evento){
    let idTarea = evento.path.find(element => element.id.includes("tarea")).id.split("-")[1]
    tareasArray = tareasArray.filter( tarea => tarea.id != idTarea)
}
function addTareaTareas(){
    let arrayInput = document.querySelectorAll("td>input")
    let objetoTarea = {}
    arrayInput.forEach(input => objetoTarea[input.id] = input.value)

    tareasArray.push(new Tareas(objetoTarea))
}
function inputTareas(){
    let element = document.getElementById(`tabla-tareas`)
    let registro = document.createElement('tr')
    registro.setAttribute("id", `addTarea`)

    registro.innerHTML = `
        <td>
            <input id="id" type="number" class="form-control form-control-sm" placeholder="ID">
        </td>
        <td>
            <input id="nombre" type="text" class="form-control form-control-sm" placeholder="Nombre">
        </td>
        <td>
            <input id="unidad" type="text" class="form-control form-control-sm" placeholder="Unid.">
        </td>
        <td>
            <input id="peso" type="number" class="form-control form-control-sm" placeholder="Horas">
        </td>
        <td>
            <input id="precio" type="number" class="form-control form-control-sm" placeholder="Precio">
        </td>
        <td id="tarea">
            <i name="newTarea"class="icon ion-md-checkmark lead" onclick="accionTarea(event)"></i>        
        </td>
    `
    element.appendChild(registro)
}
function dibujarPresupuesto(indexPresupuesto){
    let title = document.getElementById("modulo-title")
    let h2 = document.createElement("h2")
    let span = document.createElement("span")
    span.setAttribute("id", "valorTotal")
    title.innerHTML = ""
    h2.setAttribute("id", `${indexPresupuesto}`)
    h2.setAttribute("class", "AcaTaElIndex")
    h2.innerHTML = presupuestos[indexPresupuesto].nombre
    span.innerHTML = `$ ${presupuestos[indexPresupuesto].total}`
    title.appendChild(h2)
    title.appendChild(span)
    document.getElementById("modulo-content").innerHTML = presupuestos[indexPresupuesto].dibujarPresupuesto()
}
function recibirOnclick(evento){
    let index = parseInt(document.getElementsByClassName("AcaTaElIndex")[0].id)
    accionPresupuesto(
        index,
        evento.target.getAttribute("name"),
        evento.path.find(element => element.id.includes("tarea"))
    )
}
function accionPresupuesto(indexPresupuesto,que, aquien){
    let catTarea = aquien.id.split("-")
    const  acciones = {
        "+1"          : (indexCat, idTarea) => presupuestos[indexPresupuesto].addTarea(indexCat, idTarea,1),
        "-1"          : (indexCat, idTarea) => presupuestos[indexPresupuesto].addTarea(indexCat, idTarea,-1),
        "trash"       : (indexCat, idTarea) => presupuestos[indexPresupuesto].deleteTarea(indexCat, idTarea),
        "addTarea"    : (indexCat) => addTareaTabla(indexPresupuesto,parseInt(indexCat)),
        "newTarea"    : (indexCat) => pushTarea(indexPresupuesto,parseInt(indexCat)),
        "addCategoria": () => addCategoria(indexPresupuesto),
        "deleteCat"   : (indexCat) => {presupuestos[indexPresupuesto].deleteCat(parseInt(indexCat)); eliminarCatTabla(indexPresupuesto)}
    }[que](catTarea[1],catTarea[2])

    !["addTarea","deleteCat","addCategoria"].includes(que) && presupuestos[indexPresupuesto].actualizarCategoria(catTarea[1])
}
function addCategoria(indexPresupuesto){
    let element = document.getElementById("accordion-cat")
    let divCat = document.createElement("div")
    divCat.setAttribute("id", "tarea-agregar-categoria")
    divCat.setAttribute("class", "d-flex border rounded-top justify-content-between")
    divCat.innerHTML = `
        <input id="push-nombre-categoria" type="text" class="form-control form-control-sm" placeholder="Nombre">
        
        <span>
            <i class="icon ion-md-checkmark lead me-3" onclick="pushCategoria(${indexPresupuesto})"></i>
            <i class="icon ion-md-close lead me-3" onclick="dibujarPresupuesto(${indexPresupuesto})"></i>
        <span>
    `
    element.prepend(divCat)
}
function pushCategoria(indexPresupuesto){

    let catNombre = document.getElementById("push-nombre-categoria").value
    presupuestos[indexPresupuesto].pushCategoria(catNombre)
    dibujarPresupuesto(indexPresupuesto)
}
function eliminarCatTabla(indexCat){
    dibujarPresupuesto(indexCat)
}
function setLocal(key, objeto){
    localStorage.setItem(key,JSON.stringify(objeto))
}
function getLocal(key){
    let item = localStorage.getItem(key)
    return item == "undefined" ? null : JSON.parse(item)
}
function escribirLocal(key,objeto){
    let objetoLocal = getLocal(key)
    !objetoLocal && setLocal(key,objeto)
}
function addTareaTabla(indexPresupuesto,index){

    let element = document.getElementById(`tbody-${index}`)

    let registro = document.createElement('tr')

    registro.setAttribute("id", `addTarea-${index}`)

    registro.innerHTML = `
        <td>#</td>
        <td>
            ${crearSelectTareas(index)}
        </td>
        <td>-</td>
        <td>-</td>
        <td class="cantidad-item">
            <input id="cantidad-${index}" type="number" class="form-control form-control-sm" placeholder="Cant.">
        </td>
        <td>-</td>
        <td id="tarea-${index}">
            <i name="newTarea"class="icon ion-md-checkmark lead" onclick="recibirOnclick(event)"></i>        
        </td>
    `
    element.appendChild(registro)
}
//Select que lista las tareas de tareasArray
function crearSelectTareas(index){
    let divpadre = document.createElement('div')
    let selecttareas = document.createElement('select')

    selecttareas.setAttribute('name', 'select-tareas')
    selecttareas.setAttribute('id', `select-tareas-${index}`)
    selecttareas.setAttribute('class', 'form-select form-select-sm')

    selecttareas.innerHTML = `
        ${tareasArray.map(item => `<option value="${item.id}">${item.id +' - '+ item.nombre +' - '+ item.unidad}  </option>`).join("")}
    `

    divpadre.appendChild(selecttareas)
    return divpadre.innerHTML
}

function pushTarea(indexPresupuesto, index){
    let idTarea = document.getElementById(`select-tareas-${index}`).value
    tarea = tareasArray.find(item => item.id == idTarea)
    let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value)
    !isNaN(cantidad) && presupuestos[indexPresupuesto].addTarea(index, tarea, cantidad)
    presupuestos[indexPresupuesto].actualizarCategoria(index)
}
function listadoPresupuestos(){
    let title = document.getElementById("modulo-title")
    title.innerHTML = "<h2>Presupuestos</h2>"
    let content = document.getElementById("modulo-content")

    content.innerHTML=`
    <div class="boton-container mb-3">
        <i name="nuevoPresupuesto"
            class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" 
            onclick="manejoPresupuestos(event)"> 
                Nuevo
        </i>
    </div>
    <div class="card">
        <table class="table table-striped mb-0">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Total</th>
                    <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody id="tabla-presupuestos">
                ${presupuestos.map((presupuesto, index) =>`
                    <tr>
                        <td>${presupuesto.id}</td>
                        <td>${presupuesto.nombre}</td>
                        <td>${presupuesto.total}</td>
                        <td>
                            <i class="icon ion-md-eye lead" onclick="dibujarPresupuesto(${index})"></i>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    </div>    
    `
}
function manejoPresupuestos(evento){
    let que = evento.target.getAttribute("name")
    const  acciones = {
        "nuevoPresupuesto": () => inputsPresupuestos(),
        "pushPresupuesto": () => pushPresupuesto()
    }[que]()

    !["nuevoPresupuesto"].includes(que) && listadoPresupuestos();
}

function inputsPresupuestos(){
    let element = document.getElementById("tabla-presupuestos")
    let tr = document.createElement("tr")
    tr.innerHTML = `
        <td>
            <input id="id" type="number" class="form-control form-control-sm" placeholder="ID">
        </td>
        <td>
            <input id="nombre" type="text" class="form-control form-control-sm" placeholder="Nombre">
        </td>
        <td>-</td>
        <td>
            <i name="pushPresupuesto"class="icon ion-md-checkmark lead" onclick="manejoPresupuestos(event)"></i>   
        </td>
    `
    element.appendChild(tr)
}
function pushPresupuesto(){
    let element = document.getElementById("tabla-presupuestos")
    let id = parseInt(element.querySelector("#id").value)
    let nombre = element.querySelector("#nombre").value

    presupuestos.push(new Presupuestos({id, nombre}))
}




