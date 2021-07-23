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
                        <td class="d-flex justify-content-evenly">
                            <i class="icon ion-md-eye lead" onclick="dibujarPresupuesto(${index})"></i>
                            <i class="icon ion-md-trash lead" 
                               name="deletePresupuesto"
                               presupuesto="${index}"
                               data-bs-toggle="modal" 
                               data-bs-target="#exampleModal" 
                               onclick="manejoPresupuestos(event)">
                            </i>
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
    let quien = evento.target.getAttribute("presupuesto") || null
    const  acciones = {
        "nuevoPresupuesto": () => inputsPresupuestos(),
        "deletePresupuesto": (index) => deletePresupuesto(index),
        "pushPresupuesto": () => pushPresupuesto()
    }[que](quien)

    !["nuevoPresupuesto"].includes(que) && listadoPresupuestos();

    setLocal()
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

function deletePresupuesto(indexPresupuesto){
    $('.modal-title').html('Eliminar Presupuesto')

    $('.modal-body').html(`Esta Seguro que desea elminar el siguiente presupuesto:<br> ${presupuestos[indexPresupuesto].id +' - '+ presupuestos[indexPresupuesto].nombre}`)
    let botonAccion = $('.modal-footer>#accion')
    botonAccion.html('Eliminar')
    botonAccion.attr("onclick",`confirmDelete(${indexPresupuesto})`)
}
function confirmDelete(indexPresupuesto){
    presupuestos.splice(indexPresupuesto,1)
    var myModalEl = document.querySelector('#exampleModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)

    modal.toggle()
}