//Add products
function getFormProduct(){
  //Reiniciar los input de cheque de categorias y disponibilidad
  resetCheck('categories')
  resetCheck('persons')
  //Eliminamos todos los checks existentes
  dropDataChecks()
  let template =
  `<div class="container-fluid">
    <h3 class="mt-4 mb-4">Registro de productos de software</h3>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <form id="product-form">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="nameProduct">Nombre del producto</label>
                    <input type="text" class="form-control" id="nameProduct" aria-describedby="nombre del producto">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="version">Versión</label>
                    <input type="text" class="form-control" id="version" aria-describedby="versión del producto">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="quantityProducts">Cantidad de productos</label>
                    <input type="text" class="form-control" id="quantityProducts" aria-describedby="Cantidad de productos de software">
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label for="installationRequirements">Requisitos de instalación</label>
                    <textarea class="form-control" id="installationRequirements" rows="3" aria-describedby="requisitos de instalación"></textarea>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label>Categorías</label>
                    ${dataCategories}
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <div class="form-group">
                    <label>Disponibilidad</label>
                    ${dataDisponibilidad}
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
  addProduct()
}
function addProduct(){
  $('#product-form').submit(e => {
    e.preventDefault()
    //Guardar productos
    saveDataProduct()
  })
}
function saveDataProduct(){
  const postData = {
      nameProduct : $('#nameProduct').val(),
      version : $('#version').val(),
      quantityProducts : $('#quantityProducts').val(),
      installationRequirements : $('#installationRequirements').val()
  }
  const url = 'php/addProduct.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
      getCheckCategories('categories')
      getCheckAvailability('persons')
      fetchProducts()
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
  })
}
function resetCheck(className){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    item.checked = false
    item.removeAttribute("checked")
  })
}
function getCheckCategories(className){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveDataCategoryByProduct(item)
  });
}
function saveDataCategoryByProduct(item){
  if (item.checked) {
    const postData = {
        idCategory : item.value
    }
    const url = 'php/addCategoryByProduct.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las categorias del producto')
      }
    })
  }
}
function getCheckAvailability(className){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveDataAvailabilityByProduct(item)
  });
}
function saveDataAvailabilityByProduct(item){
  if (item.checked) {
    const postData = {
        idPersonal : item.value
    }
    const url = 'php/addPersonalByProduct.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las personas que tienen acceso al producto')
      }
    })
  }
}
