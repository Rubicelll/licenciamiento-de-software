<?php
  require 'php/data.php';
  $connection = mysqli_connect($SERVER,$USER,$PASSWORD,$DATABASE) or die('No se puede conectar al sistema');
  mysqli_set_charset($connection,'utf8');
  $idLicense = $_POST['id_License'];
  $year = $_POST['year'];
  $year1=$year;
  $year2=$year+1;
  $year3=$year+2;
  $valYear1="";
  $valYear2="";
  $valYear3="";

  $query = "SELECT l.idLicencia,
                   l.nombreLicencia,
                   l.cantidadLicencias,
                   l.vigenciaInicio,
                   l.vigenciaTermino,
                   l.numeroContrado,
                   l.precioAdquisicion,
                   l.fabricante,
                   l.proveedor,
                   l.impacto,
                   l.comentarios,
                   tl.tipoLicencia,
                   ma.modoAdquisicion
            FROM licencias l
            INNER JOIN modoadquisicion ma ON l.idAdquisicion = ma.idAdquisicion
            INNER JOIN tipolicencia tl on l.idTipo = tl.idTipo
            WHERE l.idLicencia = $idLicense";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  while($row = mysqli_fetch_array($result)) {
      $id = $row['idLicencia'];
      $name = $row['nombreLicencia'];
      $quantity = $row['cantidadLicencias'];
      $startingValidity = $row['vigenciaInicio'];
      $termValidity = $row['vigenciaTermino'];
      $contractNumber = $row['numeroContrado'];
      $acquisitionPrice = $row['precioAdquisicion'];
      $maker = $row['fabricante'];
      $provider = $row['proveedor'];
      $impact = $row['impacto'];
      $comments = $row['comentarios'];
      $licenseType = $row['tipoLicencia'];
      $acquisitionMode = $row['modoAdquisicion'];
  }
  $validity = $startingValidity." al ".$termValidity;
  if ($acquisitionMode == "ANUAL") {
    $valYear1="x";
    $valYear2="x";
    $valYear3="x";
  }else {
    $dateAsInteger = strtotime($termValidity);
    $termYear = date("Y", $dateAsInteger);
    switch ($termYear) {
      case $year1:
        $valYear1="x";
        break;
      case $year2:
        $valYear2="x";
        break;
      case $year3:
        $valYear3="x";
        break;
      default:
        $valYear1="";
        $valYear2="";
        $valYear3="";
        break;
    }
  }
  $comments="Contrato: ".$contractNumber."<br>"."Fabricante:".$maker."<br>"."Proveedor:".$provider."<br>"."Comentarios:".$comments;
?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Estatus de renovacion de licenciamiento de software</title>
    <link rel="shortcut icon" href="assets/img/favicon.jpg">
    <!-- CSS -->
    <link href="css/styles.css" rel="stylesheet" />
    <!--datables CSS básico-->
    <link rel="stylesheet" type="text/css" href="datatables/datatables.min.css"/>
    <!--datables estilo bootstrap 4 CSS-->
    <link rel="stylesheet"  type="text/css" href="datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">
  </head>
  <body class="text-center">
    <h3>Estatus de renovación de licenciamiento de software <?=$year?></h3>
    <table class="table table-bordered w-100">
      <thead>
        <tr>
          <th scope="col">lincencia</th>
          <th scope="col">Impacto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Modo de adquisición</th>
          <th scope="col">Periodo de vigencia</th>
          <th scope="col">Precio</th>
          <th scope="col" colspan="3">
            Proyección de renovación
            <div class="row mt-1">
              <div class="col-4"><?=$year1?></div>
              <div class="col-4"><?=$year2?></div>
              <div class="col-4"><?=$year3?></div>
            </div>
          </th>
          <th scope="col">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><?=$name?></td>
          <td><?=$impact?></td>
          <td><?=$quantity?></td>
          <td><?=$acquisitionMode?></td>
          <td><?=$validity?></td>
          <td><?=$acquisitionPrice?></td>
          <td><?=$valYear1?></td>
          <td><?=$valYear2?></td>
          <td><?=$valYear3?></td>
          <td><?=$comments?></td>
        </tr>
      </tbody>
    </table>
    <script type="text/javascript">
      window.print()
    </script>
  </body>
</html>
