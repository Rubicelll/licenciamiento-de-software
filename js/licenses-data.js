var dataModes = ''
function getAcquisitionModes(){
  dataModes = ''
  $.ajax({
    url: 'php/getAcquisitionModes.php',
    type: 'GET',
    success: function(response) {
      acquisitionModes = JSON.parse(response)
      acquisitionModes.forEach(acquisitionMode => {
        dataModes += `
        <option value="${acquisitionMode.id}">${acquisitionMode.acquisitionMode}</option>
        `
      })
    }
  })
}
var dataTypes = ''
function getLicenseTypes(){
  dataTypes = ''
  $.ajax({
    url: 'php/getLicenseTypes.php',
    type: 'GET',
    success: function(response) {
      licenseTypes = JSON.parse(response)
      licenseTypes.forEach(licenseType => {
        dataTypes += `
        <option value="${licenseType.id}">${licenseType.licenseType}</option>
        `
      })
    }
  })
}
var dataProducts = ''
function getProducts(){
  dataProducts = ''
  $.ajax({
    url: 'php/getProducts.php',
    type: 'GET',
    success: function(response) {
      products = JSON.parse(response)
      products.forEach(product => {
        dataProducts += `
        <div class="form-check">
          <input class="form-check-input products" type="checkbox" value="${product.id}">
          <label class="form-check-label">${product.nameProduct} versión: ${product.version}</label>
        </div>
        `
      })
    }
  })
}
