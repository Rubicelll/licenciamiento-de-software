//showLogViewIndex
function loadIndex(){
  let template =
  `<div class="container-fluid">
    <h3 class="mt-4 mb-4">Licenciamiento de software</h3>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Reportes</li>
    </ol>
    <div class="card">
      <div class="card-body table-responsive">
        <form>
          <div class="row">
            <div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
              <div class="form-group">
                <label for="typeReport">Tipo de reporte</label>
                <select class="form-control" id="typeReport" onclick="selectReportType()">
                  <option value="generalReport">Reporte General</option>
                  <option value="statusReport">Reporte de estatus de renovación</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div id="container-data">
        </div>
      </div>
    </div>
  </div>`
  $('#main').html(template)
}
$(document).ready(loadIndex)
$('#btnDashboard').click(loadIndex)

function selectReportType(){
  var option = $('#typeReport').val()
  switch (option) {
    case 'generalReport':
    getAllLicenses()
      break;
    case 'statusReport':
    getFormByReport()
      break;
    default:
    console.log("none");
  }
}
function getFormByReport(){
  let template = `
  <div class="row">
    <div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
      <form id="form-report" action="reporte.php" method="post" target="_blank">
        <div class="form-group">
          <label for="id_License">Id de licencia</label>
          <input id="id_License" type="number" class="form-control" name="id_License" required>
        </div>
        <div class="form-group">
          <label for="year">Año</label>
          <input id="year" type="number" class="form-control" name="year" required>
        </div>
        <button type="submit" class="btn btn-success w-100">Aceptar</button>
      </form>
    </div>
  </div>`
  $('#container-data').html(template)
}
var allLicences = {}
function getAllLicenses(){
  let template = ''
  let data = ''
  $.ajax({
    url: 'php/getAllLicences.php',
    type: 'GET',
    success: function(response) {
      licences = JSON.parse(response)
      licences.forEach(licence => {
        var disponibilidad = ""
        data += `
        <tr class="table-row">
          <td>${licence.id}</td>
          <td>${licence.name}</td>
          <td>PRODUCTO: ${licence.SoftName}, VERSIÓN: ${licence.SoftVersion}, REQUERIMIENTOS: ${licence.SoftRequirements}, CANTIDAD: ${licence.SoftQuantity}</td>
          <td>${licence.licenseType}</td>
          <td>${licence.acquisitionMode}</td>
          <td>${licence.quantity}</td>
          <td>${licence.typePersonal}</td>
          <td>${licence.startingValidity}</td>
          <td>${licence.termValidity}</td>
          <td>${licence.contractNumber}</td>
          <td>${licence.acquisitionPrice}</td>
          <td>${licence.maker}</td>
          <td>${licence.provider}</td>
          <td>${licence.impact}</td>
          <td>${licence.comments}</td>
        </tr>
        `
      })
      let template = `
      <table class="table table-borderless" id="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre de licencia</th>
            <th scope="col">Productos de software</th>
            <th scope="col">Tipo de licencia</th>
            <th scope="col">Modo de adquisición</th>
            <th scope="col">Cantidad de licencias</th>
            <th scope="col">Disponibilidad</th>
            <th scope="col">Inicio de vigencia</th>
            <th scope="col">Termino de vigencia</th>
            <th scope="col">Número de contrato</th>
            <th scope="col">Precio de adquisición</th>
            <th scope="col">Fabricante</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Impacto</th>
            <th scope="col">Comentarios</th>
          </tr>
        </thead>
        <tbody id="t-body">
        ${data}
        </tbody>
      </table>`
      $('#container-data').html(template)
      if ( $.fn.dataTable.isDataTable( '#table' ) == false ) {
        //solo cargar dataTable en caso de que no se aya cargado ninguna vez
        loadButtons()
      }
    }
  })
}
function loadButtons(){
      $('#table').DataTable({
          language: {
                  "lengthMenu": "Mostrar _MENU_ registros",
                  "zeroRecords": "No se encontraron resultados",
                  "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                  "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                  "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                  "sSearch": "Buscar:",
                  "oPaginate": {
                      "sFirst": "Primero",
                      "sLast":"Último",
                      "sNext":"Siguiente",
                      "sPrevious": "Anterior"
  			     },
  			     "sProcessing":"Procesando...",
              },
          //para usar los botones
          responsive: "true",
          dom: 'Bfrtilp',
          buttons:[
  			{
  				extend:    'excelHtml5',
  				text:      '<i class="fas fa-file-excel"></i> ',
  				titleAttr: 'Exportar a Excel',
  				className: 'btn btn-success'
  			},
  			{
  				extend:    'print',
  				text:      '<i class="fa fa-print"></i> ',
  				titleAttr: 'Imprimir',
  				className: 'btn btn-info'
  			},
  		]
      });
}
