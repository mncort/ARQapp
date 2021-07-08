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

function dibujarPresupuestos(){

    let title = document.getElementById("modulo-title")
    title.innerText = "Presupuestos"

    let content = document.getElementById("modulo-content")

    content.innerHTML =`
            <div class="accordion" >
            ${presupuestoTest.categorias.map( (item, index) =>`
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
                                        ${dibujarCantidad(index, indexTarea, tarea.cantidad)}
                                    </td>
                                    <td>${tarea.precio}</td>
                                    <td id="acc-${index}-${indexTarea}"></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <i class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" onclick="addTareaTabla(${index})"></i>
                </div>
              </div>
            </div>`).join("")}
          </div> 
            `
}


function cantidad(index, indexTarea, cantidad = 1){

    let tarea = presupuestoTest.categorias[index].tareas[indexTarea]

    presupuestoTest.addTarea(index, tarea, cantidad)

    let element = document.getElementById('cantidad-'+ index + '-' + indexTarea)

    tarea = presupuestoTest.categorias[index].tareas[indexTarea]

    element.innerHTML = dibujarCantidad(index, indexTarea, tarea.cantidad)

    actSubtotal(index)

}

function actSubtotal(index){
    let element = document.getElementById(`cat-subtotal-${index}`)

    let subtotal = presupuestoTest.categorias[index].subtotal

    element.innerHTML = `$ ${subtotal}`

}


function dibujarCantidad(index, indexTarea, cantidad){
    return `<i class="icon ion-md-remove" onclick='cantidad(${index},${indexTarea},-1)'></i>
        ${cantidad}
    <i class="icon ion-md-add" onclick='cantidad(${index},${indexTarea})'></i>`
}

function addTareaTabla(index){

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
            <i class="icon ion-md-checkmark lead" onclick="pushTarea(${index})"></i>        
        </td>
    `
    element.appendChild(registro)
    
}

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
function pushTarea(index){
    let idTarea = document.getElementById(`select-tareas-${index}`).value

    tarea = tareasArray.find(item => item.id == idTarea)

    let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value)

    !isNaN(cantidad) && presupuestoTest.addTarea(index, tarea, cantidad)

    dibujarTablaTareas(index)
    actSubtotal(index)
}

function dibujarTablaTareas(index){
    let element = document.getElementById(`tbody-categoria-${index}`)

    element.innerHTML = `
    ${presupuestoTest.categorias[index].tareas.map( (tarea, indexTarea) => `
        <tr id="tarea-${index + `-` + indexTarea}">
            <td>${tarea.id}</td>
            <td>${tarea.nombre}</td>
            <td>${tarea.unidad}</td>
            <td>${tarea.peso}</td>
            <td id="cantidad-${index + `-` + indexTarea}" class="cantidad-item">
                ${dibujarCantidad(index, indexTarea, tarea.cantidad)}
            </td>
            <td>${tarea.precio}</td>
            <td id="acc-${index}-${indexTarea}"></td>
        </tr>`).join("")}`
}



/*
function dibujarRenglon(){
    <tr id="tarea-${indexTarea}">
        <td>${tarea.id}</td>
        <td>${tarea.nombre}</td>
        <td>${tarea.unidad}</td>
        <td>${tarea.peso}</td>
        <td pepito="PadreTareas" id="cantidad-${index+ `-` +tarea.id}">
            <i class="icon ion-md-remove" onclick='presupuestoTest.categorias[${index}].addTareaIndex(${indexTarea},-1)'></i>
            ${tarea.cantidad}
            <i class="icon ion-md-add" onclick='presupuestoTest.categorias[${index}].addTareaIndex(${indexTarea})'></i>
        </td>
        <td>${tarea.precio}</td>
    </tr>
}*/