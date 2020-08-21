//showSearchViewPersonal
$('#btnPersonal').click(function() {
  fetchPersonal()
})

var persons = {}
function fetchPersonal(){
  let data = ''
  $.ajax({
    url: 'php/getPersonal.php',
    type: 'GET',
    success: function(response) {
      persons = JSON.parse(response)
      persons.forEach(person => {
        data += `
        <tr class="table-row">
          <td>${person.typePersonal}</td>
          <td>
          <button type="button" class="close" aria-label="Close" onclick="deletePersonal(${person.id})">
            <span aria-hidden="true">&times;</span>
          </button>
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
      <h3 class="mt-4 mb-4">Registro de personal</h3>
        <ol class="breadcrumb mb-4">
        <form id="personal-form" class="d-flex justify-content-between align-items-center">
          <div class="form-group mb-0">
            <input type="text" class="form-control" id="typePersonal">
          </div>
          <button type="submit" class="btn btn-outline-success">Añadir nuevo</button>
        </form>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Tipo de personal</th>
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
      addPersonal()
    }
  })
}

function addPersonal(){
  $('#personal-form').submit(e => {
    e.preventDefault()
    if ($('#typePersonal').val()) {
      saveDataPersonal()
    }
  })
}
function saveDataPersonal(){
  const postData = {
    typePersonal: $('#typePersonal').val()
  }
  const url = 'php/addPersonal.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
    fetchPersonal()
  })
}
function deletePersonal(id){
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
        idPersonal: id
      }
      const url = 'php/deletePersonal.php'
      $.post(url,postData,(response)=>{
        if (response==1) {
          alertify.success('El registro se a eliminado con exito!!')
        }else {
          alertify.error('Ocurrio un error al eliminar el registro!!')
        }
        fetchPersonal()
      })
    }
  })
}
