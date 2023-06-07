/* En este Archivo escribo todo lo referido a la vista individual de cada presupuesto
tambien hay algunas cosas que estan en los metodos de la clase de presupuesto.
    Por ejemplo lo que es el armado del html lo hace desde los metodos de la clase  */

async function dibujarPresupuesto(indexPresupuesto){
    await levantarTareas(false) //levanto las tareas disponibles, las cuales utilizo para escribir cada vez que quiero agregar una tarea
    
    // Se generan las etiquetas para la insercion del titulo y valor total 
    let title = document.getElementById("modulo-title")
    let h2 = document.createElement("h2")
    let span = document.createElement("span")
    span.setAttribute("id", "valorTotal")
    title.innerHTML = ""
    h2.setAttribute("id", `${indexPresupuesto}`)
    h2.setAttribute("class", "AcaTaElIndex")
    h2.innerHTML = presupuestos[indexPresupuesto].nombre
    span.innerHTML = `Total: $ ${presupuestos[indexPresupuesto].total}`
    title.appendChild(h2)
    title.appendChild(span)

    //Dibujo el contenido del presupuesto
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

/*function escribirLocal(key,objeto){
    let objetoLocal = getLocal(key)
    !objetoLocal && setLocal(key,objeto)
}*/
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
    tarea = tareasArray?.find(item => item.id == idTarea)
    let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value)
    !isNaN(cantidad) && presupuestos[indexPresupuesto].addTarea(index, tarea, cantidad)
    presupuestos[indexPresupuesto].actualizarCategoria(index)
}
