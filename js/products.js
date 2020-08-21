//showSearchViewProducts
$('#btnProducts').click(function() {
  fetchProducts()
})

var products = {}
function fetchProducts(){
  let data = ''
  $.ajax({
    url: 'php/getProducts.php',
    type: 'GET',
    success: function(response) {
      products = JSON.parse(response)
      products.forEach(product => {
        data += `
        <tr class="table-row">
          <td>${product.nameProduct}</td>
          <td>${product.version}</td>
          <td>${product.installationRequirements}</td>
          <td>${product.quantityProducts}</td>
          <td class="text-right">
          <img src="assets/icons/open.svg" onclick="loadFormProducts(${product.id})" data-toggle="modal" data-target="#modalProduct">
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
        <h3 class="mt-4 mb-4">Productos de software</h3>
        <ol class="breadcrumb mb-4 d-flex justify-content-end">
        <button type="button" class="btn btn-outline-success" onclick="getFormProduct()">Añadir nuevo</button>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Nombre del producto</th>
                  <th scope="col">Versión</th>
                  <th scope="col">Requisitos de instalación</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col" class="text-right">Abrir</th>
                </tr>
              </thead>
              <tbody>
                ${data}
              </tbody>
            </table>
          </div>
        </div>
      </div>`
      $('#main').html(template)
    }
  })
  getCategories()
  getPersonal()
}
