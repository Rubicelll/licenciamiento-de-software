//showSearchViewCategories
$('#btnCategories').click(function() {
  fetchCategories()
})

var categories = {}
function fetchCategories(){
  let data = ''
  $.ajax({
    url: 'php/getCategories.php',
    type: 'GET',
    success: function(response) {
      categories = JSON.parse(response)
      categories.forEach(category => {
        data += `
        <tr class="table-row">
          <td>${category.nameCategory}</td>
          <td>
          <button type="button" class="close" aria-label="Close" onclick="deleteCategory(${category.id})">
            <span aria-hidden="true">&times;</span>
          </button>
          </td>
        </tr>
        `
      })
      let template =
      `<div class="container-fluid">
        <h3 class="mt-4 mb-4">Registro de categorias de software</h3>
        <ol class="breadcrumb mb-4">
        <form id="category-form" class="d-flex justify-content-between align-items-center">
          <div class="form-group mb-0">
            <input type="text" class="form-control" id="nameCategory">
          </div>
          <button type="submit" class="btn btn-outline-success">Añadir nuevo</button>
        </form>
        </ol>
        <div class="card">
          <div class="card-body table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Categoria</th>
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
      addCategory()
    }
  })
}

function addCategory(){
  $('#category-form').submit(e => {
    e.preventDefault()
    if ($('#nameCategory').val()) {
      saveDataCategory()
    }
  })
}
function saveDataCategory(){
  const postData = {
    nameCategory: $('#nameCategory').val()
  }
  const url = 'php/addCategory.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a guardado con exito!!')
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
    fetchCategories()
  })
}
function deleteCategory(id){
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
        idCategory: id
      }
      const url = 'php/deleteCategory.php'
      $.post(url,postData,(response)=>{
        if (response==1) {
          alertify.success('El registro se a eliminado con exito!!')
        }else {
          alertify.error('Ocurrio un error al eliminar el registro!!')
        }
        fetchCategories()
      })
    }
  })
}
