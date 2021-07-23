function dibujarClientes(){
    let title = $("#modulo-title")
    title.html("<h2>Clientes</h2>") 
    let content = $("#modulo-content")

    content.html( 
        botonAgregarCliente() +
        `    
        <div class="card mt-4 border-0">
            <div class="card-body p-0">
                <table id="tabla-clientes" class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clientesArray.map(item => item.dibujarRenglon()).join("")}
                    </tbody>
                </table>            
            </div>
        </div>
        `
    )
}

function botonAgregarCliente(){
    return `
            <div class="boton-container">
                <i name="addCliente"
                    class="icon ion-md-add px-2 py-1 rounded-1 btn-primary" 
                    onclick="accionCliente(event)"> 
                        Agregar Cliente
                </i>
            </div>`
}
function accionCliente(evento){
    let que = evento.target.getAttribute("name")
    const  acciones = {
        "addCliente"      : () => inputsCliente(),
        "trash"      : () => deleteCliente(evento),
        "newCliente"      : () => newCliente()
    }[que]()

    !["addCliente"].includes(que) && dibujarClientes()
    setLocal("clientes", clientesArray)
}

function inputsCliente(){
    $('#tabla-clientes>tbody').append(`
        <tr id="fila-inputs">
            <td>
                <input name="id" placeholder="ID" type="number" class="form-control form-control-sm">
            </td>
            <td>
                <input name="nombre" placeholder="Nombre" type="text" class="form-control form-control-sm">
            </td>
            <td>
                <input name="mail" placeholder="Mail" type="text" class="form-control form-control-sm">
            </td>
            <td>
                <input name="telefono" placeholder="Telefonono" type="text" class="form-control form-control-sm">
            </td>
            <td>
                <input name="direccion" placeholder="Direccion" type="text" class="form-control form-control-sm">
            </td>
            <td>
                <i name="newCliente"class="icon ion-md-checkmark lead" onclick="accionCliente(event)"></i>
            </td>
        </tr>
    `)
}
function newCliente(){
    let inputs = $('#fila-inputs>td>input')
    let objetoCliente = {}
    inputs.each((index, item) => objetoCliente[item.name] = item.value)
    clientesArray.push(new Clientes (objetoCliente))
}

function deleteCliente(evento){
    let id = evento.target.getAttribute("id").split("-")[1]

    console.log(id)
    clientesArray = clientesArray.filter( cliente => cliente.id != id)
}
