function dibujarTareas(){
    let title = document.getElementById("modulo-title")
    title.innerText = "Tareas"

    let content = document.getElementById("modulo-content")

    content.innerHTML = 
    `
    <div class="card">
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Un</th>
                        <th scope="col">Ps</th>
                        <th scope="col">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${tareasArray.map(item => 
                        `<tr>
                            <td>${item.id}</td>
                            <td>${item.nombre}</td>
                            <td>${item.unidad}</td>
                            <td>${item.peso}</td>
                            <td>${item.precio}</td>
                        </tr>`).join("")}
                </tbody>
            </table>            
        </div>
    </div>
    `
}

function dibujarPresupuestos(indexPresupuesto){

    let title = document.getElementById("modulo-title")
    title.innerText = presupuestos[indexPresupuesto].nombre

    let content = document.getElementById("modulo-content")

    content.innerHTML =`
            <div class="accordion" >
            ${presupuestos[indexPresupuesto].categorias.map( (item, index) =>`
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne${index}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne${index}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne${index}">
                  <span class="d-flex w-100 justify-content-between pe-2">
                  <span>${item.nombre}</span>
                  <span id="cat-subtotal-${index}">$ ${item.subtotal}</span>
                  </span>
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne${index}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne${index}">
                <div class="accordion-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Un.</th>
                                <th scope="col">Hs</th>
                                <th scope="col">Cant.</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-categoria-${index}">
                            ${item.tareas.map( (tarea, indexTarea) => `
                                <tr id="tarea-${index + `-` + indexTarea}">
                                    <td>${tarea.id}</td>
                                    <td>${tarea.nombre}</td>
                                    <td>${tarea.unidad}</td>
                                    <td>${tarea.peso}</td>
                                    <td id="cantidad-${index + `-` + indexTarea}" class="cantidad-item">
                                        ${dibujarCantidad(indexPresupuesto, index, indexTarea, tarea.cantidad)}
                                    </td>
                                    <td>${tarea.precio}</td>
                                    <td id="acc-${index}-${indexTarea}">
                                        <i class="icon ion-md-trash lead" onclick=""></i>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <i class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" onclick="addTareaTabla(${indexPresupuesto},${index})"></i>
                </div>
              </div>
            </div>`).join("")}
          </div> 
            `
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

function cantidad(indexPresupuesto, index, indexTarea, cantidad = 1){

    let tarea = presupuestos[indexPresupuesto].categorias[index].tareas[indexTarea]

    presupuestos[indexPresupuesto].addTarea(index, tarea, cantidad)

    let element = document.getElementById('cantidad-'+ index + '-' + indexTarea)

    tarea = presupuestos[indexPresupuesto].categorias[index].tareas[indexTarea]

    element.innerHTML = dibujarCantidad(indexPresupuesto, index, indexTarea, tarea.cantidad)

    actSubtotal(indexPresupuesto, index)

}

function actSubtotal(indexPresupuesto, index){
    let element = document.getElementById(`cat-subtotal-${index}`)

    let subtotal = presupuestos[indexPresupuesto].categorias[index].subtotal

    element.innerHTML = `$ ${subtotal}`

}


function dibujarCantidad(indexPresupuesto, index, indexTarea, cantidad){
    return `<i class="icon ion-md-remove" onclick='cantidad(${indexPresupuesto},${index},${indexTarea},-1)'></i>
        ${cantidad}
    <i class="icon ion-md-add" onclick='cantidad(${indexPresupuesto},${index},${indexTarea})'></i>`
}

/*function addTareaTabla(indexPresupuesto,index){

    let element = document.getElementById(`tbody-categoria-${index}`)

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
        <td id="acc-${index}">
            <i class="icon ion-md-checkmark lead" onclick="pushTarea(${indexPresupuesto},${index})"></i>        
        </td>
    `
    element.appendChild(registro)
    
}*/
/*
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

}*/
function pushTarea(indexPresupuesto, index){
    let idTarea = document.getElementById(`select-tareas-${index}`).value

    tarea = tareasArray.find(item => item.id == idTarea)

    let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value)

    !isNaN(cantidad) && presupuestos[indexPresupuesto].addTarea(index, tarea, cantidad)

    dibujarTablaTareas(indexPresupuesto, index)
    actSubtotal(indexPresupuesto, index)
}

function dibujarTablaTareas(indexPresupuesto, index){
    let element = document.getElementById(`tbody-categoria-${index}`)

    element.innerHTML = `
    ${presupuestos[indexPresupuesto].categorias[index].tareas.map( (tarea, indexTarea) => `
        <tr id="tarea-${index + `-` + indexTarea}">
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td>${tarea.unidad}</td>
            <td>${tarea.peso}</td>
            <td id="cantidad-${index + `-` + indexTarea}" class="cantidad-item">
                ${dibujarCantidad(indexPresupuesto, index, indexTarea, tarea.cantidad)}
            </td>
            <td>${tarea.precio}</td>
            <td id="acc-${index}-${indexTarea}"><i class="icon ion-md-trash lead"></i></td>
        </tr>`).join("")}`
}