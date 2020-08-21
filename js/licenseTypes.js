//showSearchViewLicenseTypes
$('#btnLicenseTypes').click(function() {
  fetchLicenseTypes()
})

var licenseTypes = {}
function fetchLicenseTypes(){
  let data = ''
  $.ajax({
    url: 'php/getLicenseTypes.php',
    type: 'GET',
    success: function(response) {
      licenseTypes = JSON.parse(response)
      licenseTypes.forEach(licenseType => {
        data += `
        <tr class="table-row">
          <td>${licenseType.licenseType}</td>
          <td>
          <button type="button" class="close" aria-label="Close" onclick="deleteLicenseType(${licenseType.id})">
            <span aria-hidden="true">&times;</span>
          </button>
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
        <h3 class="mt-4 mb-4">Registro de tipos de licencias</h3>
        <ol class="breadcrumb mb-4">
        <form id="licenseType-form" class="d-flex justify-content-between align-items-center">
          <div class="form-group mb-0">
            <input type="text" class="form-control" id="licenseType">
          </div>
          <button type="submit" class="btn btn-outline-success">Añadir nuevo</button>
        </form>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Tipo de licencia</th>
                  <th scope="col" class="text-right">Eliminar</th>
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
      addLicenseType()
    }
  })
}

function addLicenseType(){
  $('#licenseType-form').submit(e => {
    e.preventDefault()
    if ($('#licenseType').val()) {
      saveDataLicenseType()
    }
  })
}
function saveDataLicenseType(){
  const postData = {
    licenseType: $('#licenseType').val()
  }
  const url = 'php/addLicenseType.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
    fetchLicenseTypes()
  })
}
function deleteLicenseType(id){
  swal({
    title: "Desea eliminar el elemento?",
    text: "Una vez eliminado, no podra recuperarlo!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      const postData = {
        idLicenseType: id
      }
      const url = 'php/deleteLicenseType.php'
      $.post(url,postData,(response)=>{
        if (response==1) {
          alertify.success('El registro se a eliminado con exito!!')
        }else {
          alertify.error('Ocurrio un error al eliminar el registro!!')
        }
        fetchLicenseTypes()
      })
    }
  })
}
