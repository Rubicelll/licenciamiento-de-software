function loadFormLicenses(id){
  //Eliminamos todos los checks existentes
  dropDataChecks()
  //Buscar las categorias pertenecientes a la licencia con el id recibido
  fetchDataByLicense(id)
  //Mostrar productos, modos de adquisicion, tipos de licencia y disponibilidad en el formulario
  $('#u-LicenseProducts').html(dataProducts)
  $('#u-LicenseAcquisitionMode').html(dataModes)
  $('#u-LicenseType').html(dataTypes)
  $('#u-LicenseAvailability').html(dataDisponibilidad)
  //Mostrar el producto el el formulario con el id recibido
  licences.forEach(license => {
    if (license.id==id) {
      $('#u-idLicense').val(license.id)
      $('#u-LicenseName').val(license.name)
      $('#u-LicenseQuantity').val(license.quantity)
      $('#u-LicenseStartingValidity').val(license.startingValidity)
      $('#u-LicenseTermValidity').val(license.termValidity)
      $('#u-LicenseContractNumber').val(license.contractNumber)
      $('#u-LicenseAcquisitionPrice').val(license.acquisitionPrice)
      $('#u-LicenseMaker').val(license.maker)
      $('#u-LicenseProvider').val(license.provider)
      $('#u-LicenseImpact').val(license.impact)
      $('#u-LicenseComments').val(license.comments)
      $('#u-LicenseAcquisitionMode').val(license.idAcquisition)
      $('#u-LicenseType').val(license.idType)
    }
  })
}
function fetchDataByLicense(id){
  var personsByLicense
  const postData = {
        id: id
      }
  $.ajax({
    url: 'php/getPersonalByLicense.php',
    data: postData,
    method: "POST",
    success: function(response) {
      personsByLicense = JSON.parse(response)
      //Chequear disponibilidad pertenecientes a la licencia mostrado
      checkAvailabilityByLicense("persons",personsByLicense)
    }
  })
  $.ajax({
    url: 'php/getProductsByLicense.php',
    data: postData,
    method: "POST",
    success: function(response) {
      productsByLicense = JSON.parse(response)
      // Chequear productos pertenecientes a la licencia mostrado
      checkProductsByLicense("products",productsByLicense)
    }
  })
}
function checkAvailabilityByLicense(className, data){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    verifyAvailabilityByLicense(item,data)
  });
}
function verifyAvailabilityByLicense(item, data){
  data.forEach(person => {
    if (item.value == person.idPersonal) {
      item.setAttribute("checked", "");
    }
  });
}
function checkProductsByLicense(className, data){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    verifyProductsByLicense(item,data)
  });
}
function verifyProductsByLicense(item, data){
  data.forEach(product => {
    if (item.value == product.idProduct) {
      item.setAttribute("checked", "");
    }
  });
}
function updateLicense(){
  var id = $('#u-idLicense').val()
  const postData = {
      id : $('#u-idLicense').val(),
      name : $('#u-LicenseName').val(),
      quantity : $('#u-LicenseQuantity').val(),
      startingValidity : $('#u-LicenseStartingValidity').val(),
      termValidity : $('#u-LicenseTermValidity').val(),
      contractNumber : $('#u-LicenseContractNumber').val(),
      acquisitionPrice : $('#u-LicenseAcquisitionPrice').val(),
      maker : $('#u-LicenseMaker').val(),
      provider : $('#u-LicenseProvider').val(),
      impact : $('#u-LicenseImpact').val(),
      comments : $('#u-LicenseComments').val(),
      idType : $('#u-LicenseType').val(),
      idAcquisition : $('#u-LicenseAcquisitionMode').val()
  }
  const url = 'php/updateLicense.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a actualizo con exito!!')
      deleteDataAvailabilityByLicense(id)
      deleteDataProductsByLicense(id)
      fetchLicences()
    }else {
      alertify.error('Ocurrio un error al actualizar el registro!!')
    }
  })
}
function deleteDataAvailabilityByLicense(id){
  const postData = {
      idLicense : id
  }
  const url = 'php/deletePersonalByLicense.php'
  $.post(url, postData, (response) => {
    if (response==0) {
      alertify.error('Ocurrio un error al eliminar las personas que tienen acceso a la licencia')
    }else {
      getUpdateCheckAvailabilityByLicense('persons', id)
    }
  })
}
function getUpdateCheckAvailabilityByLicense(className, id){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveUpdateDataAvailabilityByLicense(item, id)
  });
}
function saveUpdateDataAvailabilityByLicense(item, id){
  if (item.checked) {
    const postData = {
        idLicense : id,
        idPersonal : item.value
    }
    const url = 'php/updatePersonalByLicense.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las personas que tienen acceso a la licencia')
      }
    })
  }
}
function deleteDataProductsByLicense(id){
  const postData = {
      idLicense : id
  }
  const url = 'php/deleteProductsByLicense.php'
  $.post(url, postData, (response) => {
    if (response==0) {
      alertify.error('Ocurrio un error al eliminar los productos pertenecientes a la licencia')
    }else {
      getUpdateCheckProductsByLicense('products', id)
    }
  })
}
function getUpdateCheckProductsByLicense(className, id){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveUpdateDataProductsByLicense(item, id)
  });
}
function saveUpdateDataProductsByLicense(item, id){
  if (item.checked) {
    const postData = {
        idLicense : id,
        idProduct : item.value
    }
    const url = 'php/updateProductByLicense.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar los productos que pertenecen a la licencia')
      }
    })
  }
}
function deleteLicense(){
  var id = $('#u-idLicense').val()
  const postData = {
      id : $('#u-idLicense').val()
  }
  const url = 'php/deleteLicense.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se elimino con exito!!')
      fetchLicences()
    }else {
      alertify.error('Ocurrio un error al eliminar el registro!!')
    }
  })
}
