//Add products
function getFormLicense(){
  //Reiniciar los input de cheque de categorias y disponibilidad
  resetCheck('categories')
  resetCheck('persons')
  //Eliminamos todos los checks existentes
  dropDataChecks()
  let template =
  `<div class="container-fluid">
    <h3 class="mt-4 mb-4">Registro de licencia de software</h3>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <form id="lincense-form">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="name">Nombre de la lincencia</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nombre de la licencia">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="quantity">Cantidad de lincencias</label>
                    <input type="number" class="form-control" id="quantity" aria-describedby="Cantidad de lincencias">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="startingValidity">Vigencia de inicio</label>
                    <input type="date" class="form-control" id="startingValidity" aria-describedby="Vigencia de inicio">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="termValidity">Vigencia de termino</label>
                    <input type="date" class="form-control" id="termValidity" aria-describedby="Vigencia de termino">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="contractNumber">No. contrato</label>
                    <input type="text" class="form-control" id="contractNumber" aria-describedby="Número de contrato">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="acquisitionPrice">Precio de adquisición</label>
                    <input type="number" class="form-control" id="acquisitionPrice" aria-describedby="Precio de adquisición" step="0.01">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="maker">Fabricante</label>
                    <input type="text" class="form-control" id="maker" aria-describedby="Fabricante">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="provider">Proveedor</label>
                    <input type="text" class="form-control" id="provider" aria-describedby="Proveedor">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="impact">Impacto</label>
                    <input type="text" class="form-control" id="impact" aria-describedby="Impacto">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="comments">Comentarios</label>
                    <input type="text" class="form-control" id="comments" aria-describedby="Comentarios">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                  <label for="acquisitionMode">Modo de adquisición</label>
                    <select class="form-control" id="acquisitionMode">
                      ${dataModes}
                    </select>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                  <label for="licenseType">Tipo de licencia</label>
                    <select class="form-control" id="licenseType">
                      ${dataTypes}
                    </select>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label>Disponibilidad</label>
                    ${dataDisponibilidad}
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label>Productos</label>
                    ${dataProducts}
                  </div>
                </div>
              </div>
              <div class="row justify-content-end">
                <button type="submit" class="btn btn-outline-success">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`
  $('#main').html(template)
  addLicense()
}
function addLicense(){
  $('#lincense-form').submit(e => {
    e.preventDefault()
    //Guardar productos
    saveDataLicense()
  })
}
function saveDataLicense(){
  const postData = {
      name : $('#name').val(),
      quantity : $('#quantity').val(),
      startingValidity : $('#startingValidity').val(),
      termValidity : $('#termValidity').val(),
      contractNumber : $('#contractNumber').val(),
      acquisitionPrice : $('#acquisitionPrice').val(),
      maker : $('#maker').val(),
      provider : $('#provider').val(),
      impact : $('#impact').val(),
      comments : $('#comments').val(),
      idType : $('#licenseType').val(),
      idAcquisition : $('#acquisitionMode').val()
  }
  const url = 'php/addLicense.php'
  $.post(url, postData, (response) => {
    console.log(response);
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
      getCheckAvailabilityLicense('persons')
      getCheckProductsLicense('products')
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
  })
}
function getCheckAvailabilityLicense(className){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveDataAvailabilityByLicense(item)
  });
}
function saveDataAvailabilityByLicense(item){
  if (item.checked) {
    const postData = {
        idPersonal : item.value
    }
    const url = 'php/addPersonalByLicense.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las personas que tienen acceso a la licencia')
      }
    })
  }
}
function getCheckProductsLicense(className){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveDataProductsByLicense(item)
  });
}
function saveDataProductsByLicense(item){
  if (item.checked) {
    const postData = {
        idProduct : item.value
    }
    const url = 'php/addProductsByLicense.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar los productos que pertenecientes a la licencia')
      }
    })
  }
}
