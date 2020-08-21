//showSearchViewProducts
$('#btnLincences').click(function() {
  fetchLicences()
})

var licences = {}
function fetchLicences(){
  let data = ''
  $.ajax({
    url: 'php/getLicences.php',
    type: 'GET',
    success: function(response) {
      licences = JSON.parse(response)
      licences.forEach(licence => {
        data += `
        <tr class="table-row">
          <td>${licence.id}</td>
          <td>${licence.name}</td>
          <td>${licence.quantity}</td>
          <td>${licence.startingValidity}</td>
          <td>${licence.termValidity}</td>
          <td>${licence.maker}</td>
          <td>${licence.provider}</td>
          <td>${licence.impact}</td>
          <td class="text-right">
          <img src="assets/icons/open.svg" onclick="loadFormLicenses(${licence.id})" data-toggle="modal" data-target="#modalLicense">
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
        <h3 class="mt-4 mb-4">Licencias de software</h3>
        <ol class="breadcrumb mb-4 d-flex justify-content-end">
        <button type="button" class="btn btn-outline-success" onclick="getFormLicense()">Añadir nuevo</button>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre de licencia</th>
                  <th scope="col">Cantidad de licencias</th>
                  <th scope="col">Inicio de vigencia</th>
                  <th scope="col">Termino de vigencia</th>
                  <th scope="col">Fabricante</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Impacto</th>
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
  getPersonal()
  getAcquisitionModes()
  getLicenseTypes()
  getProducts()
}
