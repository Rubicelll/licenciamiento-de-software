var dataCategories = ''
function getCategories(){
  dataCategories = ''
  $.ajax({
    url: 'php/getCategories.php',
    type: 'GET',
    success: function(response) {
      categories = JSON.parse(response)
      categories.forEach(category => {
        dataCategories += `
        <div class="form-check">
          <input class="form-check-input categories" type="checkbox" value="${category.id}">
          <label class="form-check-label">${category.nameCategory}</label>
        </div>
        `
      })
    }
  })
}

var dataDisponibilidad = ''
function getPersonal(){
  dataDisponibilidad = ''
  $.ajax({
    url: 'php/getPersonal.php',
    type: 'GET',
    success: function(response) {
      persons = JSON.parse(response)
      persons.forEach(person => {
        dataDisponibilidad += `
        <div class="form-check">
          <input class="form-check-input persons" type="checkbox" value="${person.id}">
          <label class="form-check-label">${person.typePersonal}</label>
        </div>
        `
      })
    }
  })
}
function dropDataChecks(){
  $('#u-categories').html('')
  $('#u-availability').html('')
  $('#u-LicenseAvailability').html('')
  $('#u-LicenseProducts').html('')
}
