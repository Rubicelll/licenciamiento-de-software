//showSearchViewAcquisitionModes
$('#btnAcquisitionModes').click(function() {
  fetchAcquisitionModes()
})

var acquisitionModes = {}
function fetchAcquisitionModes(){
  let data = ''
  $.ajax({
    url: 'php/getAcquisitionModes.php',
    type: 'GET',
    success: function(response) {
      acquisitionModes = JSON.parse(response)
      acquisitionModes.forEach(acquisitionMode => {
        data += `
        <tr class="table-row">
          <td>${acquisitionMode.acquisitionMode}</td>
          <td>
          <button type="button" class="close" aria-label="Close" onclick="deleteAcquisitionMode(${acquisitionMode.id})">
            <span aria-hidden="true">&times;</span>
          </button>
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
        <h3 class="mt-4 mb-4">Registro de modos de adquisición</h3>
        <ol class="breadcrumb mb-4">
        <form id="acquisitionMode-form" class="d-flex justify-content-between align-items-center">
          <div class="form-group mb-0">
            <input type="text" class="form-control" id="acquisitionMode">
          </div>
          <button type="submit" class="btn btn-outline-success">Añadir nuevo</button>
        </form>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Modo de adquisición</th>
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
      addAcquisitionMode()
    }
  })
}

function addAcquisitionMode(){
  $('#acquisitionMode-form').submit(e => {
    e.preventDefault()
    if ($('#acquisitionMode').val()) {
      saveAcquisitionMode()
    }
  })
}
function saveAcquisitionMode(){
  const postData = {
    acquisitionMode: $('#acquisitionMode').val()
  }
  const url = 'php/addAcquisitionMode.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
    fetchAcquisitionModes()
  })
}
function deleteAcquisitionMode(id){
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
        idAcquisitionMode: id
      }
      const url = 'php/deleteAcquisitionMode.php'
      $.post(url,postData,(response)=>{
        if (response==1) {
          alertify.success('El registro se a eliminado con exito!!')
        }else {
          alertify.error('Ocurrio un error al eliminar el registro!!')
        }
        fetchAcquisitionModes()
      })
    }
  })
}
