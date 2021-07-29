function levantarTareas(){
    fetch(`./assets/data/tareas.json`)
        .then( response => response.json() )
        .then( response => {
            tareasArray = arrayFrom(response, Tareas, "tareas")
            dibujarTareas()
    })
}

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