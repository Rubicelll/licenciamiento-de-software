function loadFormProducts(id){
  //Eliminamos todos los checks existentes
  dropDataChecks()
  //Buscar las categorias pertenecientes al pruducto con el id recibido
  var categorias = fetchCategoriesByProduct(id)
  //Mostrar el producto el el formulario con el id recibido
  products.forEach(product => {
    if (product.id==id) {
      $('#u-idProduct').val(product.id)
      $('#u-nameProduct').val(product.nameProduct)
      $('#u-version').val(product.version)
      $('#u-installationRequirements').val(product.installationRequirements)
      $('#u-quantityProducts').val(product.quantityProducts)
    }
  })
  //Mostrar categorias y disponibilidad en el formulario
  $('#u-categories').html(dataCategories)
  $('#u-availability').html(dataDisponibilidad)
}
function fetchCategoriesByProduct(id){
  var categoriesByProduct
  const postData = {
        id: id
      }
  $.ajax({
    url: 'php/getCategoriesByProduct.php',
    data: postData,
    method: "POST",
    success: function(response) {
      categoriesByProduct = JSON.parse(response)
      //Chequear categorias pertenecientes al producto mostrado
      checkCategories("categories",categoriesByProduct)
    }
  })
  $.ajax({
    url: 'php/getPersonalByProduct.php',
    data: postData,
    method: "POST",
    success: function(response) {
      personsByProduct = JSON.parse(response)
      //Chequear disponibilidad pertenecientes al producto mostrado
      checkAvailability("persons",personsByProduct)
    }
  })
}
function checkCategories(className, data){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    verifyCategory(item,data)
  });
}
function verifyCategory(item, data){
  data.forEach(category => {
    if (item.value == category.idCategory) {
      item.setAttribute("checked", "");
    }
  });
}
function checkAvailability(className, data){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    verifyAvailability(item,data)
  });
}
function verifyAvailability(item, data){
  data.forEach(person => {
    if (item.value == person.idPersonal) {
      item.setAttribute("checked", "");
    }
  });
}
function updateProduct(){
  var id = $('#u-idProduct').val()
  const postData = {
      id : $('#u-idProduct').val(),
      nameProduct : $('#u-nameProduct').val(),
      version : $('#u-version').val(),
      quantityProducts : $('#u-quantityProducts').val(),
      installationRequirements : $('#u-installationRequirements').val()
  }
  const url = 'php/updateProduct.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a actualizo con exito!!')
      deleteDataAvailabilityByProduct(id)
      deleteDataCategoryByProduct(id)
      fetchProducts()
    }else {
      alertify.error('Ocurrio un error al guardar el registro!!')
    }
  })
}
function getUpdateCheckCategories(className, id){
  var items = document.getElementsByClassName(className)
  //iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveUpdateDataCategoryByProduct(item, id)
  });
}
function saveUpdateDataCategoryByProduct(item, id){
  if (item.checked) {
    const postData = {
        idProduct : id,
        idCategory : item.value
    }
    const url = 'php/updateCategoryByProduct.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las categorias del producto')
      }
    })
  }
}
function deleteDataCategoryByProduct(id){
  const postData = {
      idProduct : id
  }
  const url = 'php/deleteCategoryByProduct.php'
  $.post(url, postData, (response) => {
    if (response==0) {
      alertify.error('Ocurrio un error al eliminar las categorias del producto')
    }else {
      getUpdateCheckCategories('categories', id)
    }
  })
}
function getUpdateCheckAvailability(className, id){
  var items = document.getElementsByClassName(className)
  // iteramos los elementos obtenidos
  Array.prototype.filter.call(items, function(item){
    saveUpdateDataAvailabilityByProduct(item, id)
  });
}
function saveUpdateDataAvailabilityByProduct(item, id){
  if (item.checked) {
    const postData = {
        idProduct : id,
        idPersonal : item.value
    }
    const url = 'php/updatePersonalByProduct.php'
    $.post(url, postData, (response) => {
      if (response==0) {
        alertify.error('Ocurrio un error al almacenar las personas que tienen acceso al producto')
      }
    })
  }
}
function deleteDataAvailabilityByProduct(id){
  const postData = {
      idProduct : id
  }
  const url = 'php/deletePersonalByProduct.php'
  $.post(url, postData, (response) => {
    if (response==0) {
      alertify.error('Ocurrio un error al eliminar las personas que tienen acceso al producto')
    }else {
      getUpdateCheckAvailability('persons', id)
    }
  })
}
function deleteProduct(){
  const postData = {
      id : $('#u-idProduct').val()
  }
  const url = 'php/deleteProduct.php'
  $.post(url, postData, (response) => {
    if (response==1) {
      alertify.success('El registro se a elimando con exito!!')
      fetchProducts()
    }else {
      alertify.error('Ocurrio un error al eliminar el registro!!')
    }
  })
}
