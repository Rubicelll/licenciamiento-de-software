<?php
require 'data.php';
//conexion con la base de datos
function conectar()
{
  global $connection,$SERVER,$USER,$PASSWORD,$DATABASE;
  $connection=mysqli_connect($SERVER,$USER,$PASSWORD,$DATABASE) or die('No se puede conectar al sistema');
  mysqli_set_charset($connection,'utf8');
}
function desconectar()
{
  global $connection;
  mysqli_close($connection);
}
function validarLogin($usuario,$clave)
{
  global $connection;
  $consulta="SELECT * FROM usuarios WHERE usuario='".$usuario."' AND password='".$clave."'";
  $respuesta =mysqli_query($connection,$consulta);
  if($fila = mysqli_fetch_row($respuesta))
  {
    session_start();
    $_SESSION['usuario']=$usuario;
    return true;
  }
  return false;
}
function getLicenses(){
  global $connection;
  $query = "SELECT l.idLicencia, l.nombreLicencia, l.cantidadLicencias, l.vigenciaInicio, l.vigenciaTermino, l.numeroContrado, l.precioAdquisicion, l.fabricante, l.proveedor, l.impacto, l.comentarios, tl.idTipo, tl.tipoLicencia, ma.idAdquisicion, ma.modoAdquisicion FROM licencias l INNER JOIN modoadquisicion ma ON l.idAdquisicion = ma.idAdquisicion INNER JOIN tipolicencia tl on l.idTipo = tl.idTipo";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idLicencia'],
      'name' => $row['nombreLicencia'],
      'quantity' => $row['cantidadLicencias'],
      'startingValidity' => $row['vigenciaInicio'],
      'termValidity' => $row['vigenciaTermino'],
      'contractNumber' => $row['numeroContrado'],
      'acquisitionPrice' => $row['precioAdquisicion'],
      'maker' => $row['fabricante'],
      'provider' => $row['proveedor'],
      'impact' => $row['impacto'],
      'comments' => $row['comentarios'],
      'idType' => $row['idTipo'],
      'licenseType' => $row['tipoLicencia'],
      'idAcquisition' => $row['idAdquisicion'],
      'acquisitionMode' => $row['modoAdquisicion']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function getAllLicenses(){
  global $connection;
  $query = "SELECT l.idLicencia, l.nombreLicencia, ps.nombreProducto, ps.version, ps.requisitosInstalacion, ps.cantidadProductos, tl.tipoLicencia, ma.modoAdquisicion, l.cantidadLicencias, p.tipoPersonal, l.vigenciaInicio, l.vigenciaTermino, l.numeroContrado, l.precioAdquisicion, l.fabricante, l.proveedor, l.impacto, l.comentarios FROM licencias l INNER JOIN tipolicencia tl ON l.idTipo = tl.idTipo INNER JOIN modoadquisicion ma ON l.idAdquisicion = ma.idAdquisicion INNER JOIN licenciasproductos lp ON l.idLicencia = lp.idLicencia INNER JOIN productossoftware ps ON lp.idProducto = ps.idProducto INNER JOIN disponibilidadlicencia dl ON l.idLicencia = dl.idLicencia INNER JOIN personal p ON dl.idPersonal = p.idPersonal ORDER BY l.idLicencia";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idLicencia'],
      'name' => $row['nombreLicencia'],
      'SoftName' => $row['nombreProducto'],
      'SoftVersion' => $row['version'],
      'SoftRequirements' => $row['requisitosInstalacion'],
      'SoftQuantity' => $row['cantidadProductos'],
      'licenseType' => $row['tipoLicencia'],
      'acquisitionMode' => $row['modoAdquisicion'],
      'quantity' => $row['cantidadLicencias'],
      'typePersonal' => $row['tipoPersonal'],
      'startingValidity' => $row['vigenciaInicio'],
      'termValidity' => $row['vigenciaTermino'],
      'contractNumber' => $row['numeroContrado'],
      'acquisitionPrice' => $row['precioAdquisicion'],
      'maker' => $row['fabricante'],
      'provider' => $row['proveedor'],
      'impact' => $row['impacto'],
      'comments' => $row['comentarios']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function getPersonal(){
  global $connection;
  $query = "SELECT * FROM Personal";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idPersonal'],
      'typePersonal' => $row['tipoPersonal']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

function addPersonal($typePersonal){
  global $connection;
  $query = "INSERT INTO personal(tipoPersonal) VALUES ('".$typePersonal."')";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deletePersonal($idPersonal){
  global $connection;
  $query = "DELETE FROM personal WHERE idPersonal='".$idPersonal."'";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function getCategories(){
  global $connection;
  $query = "SELECT * FROM categoriassoftware";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idCategoria'],
      'nameCategory' => $row['nombreCategoria']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function addCategory($nameCategory){
  global $connection;
  $query = "INSERT INTO categoriasSoftware(nombreCategoria) VALUES ('".$nameCategory."')";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deleteCategory($idCategory){
  global $connection;
  $query = "DELETE FROM categoriasSoftware WHERE idCategoria='".$idCategory."'";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function getAcquisitionModes(){
  global $connection;
  $query = "SELECT * FROM modoAdquisicion";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idAdquisicion'],
      'acquisitionMode' => $row['modoAdquisicion']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function deleteAcquisitionMode($idAcquisitionMode){
  global $connection;
  $query = "DELETE FROM modoadquisicion WHERE idAdquisicion='".$idAcquisitionMode."'";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function addAcquisitionMode($acquisitionMode){
  global $connection;
  $query = "INSERT INTO modoAdquisicion(modoAdquisicion) VALUES ('".$acquisitionMode."')";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function getLicenseTypes(){
  global $connection;
  $query = "SELECT * FROM tipoLicencia";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idTipo'],
      'licenseType' => $row['tipoLicencia']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function deleteLicenseType($idLicenseType){
  global $connection;
  $query = "DELETE FROM tipoLicencia WHERE idTipo='".$idLicenseType."'";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function addLicenseType($licenseType){
  global $connection;
  $query = "INSERT INTO tipoLicencia(tipoLicencia) VALUES ('".$licenseType."')";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function getProducts(){
  global $connection;
  $query = "SELECT * FROM productosSoftware";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['idProducto'],
      'nameProduct' => $row['nombreProducto'],
      'version' => $row['version'],
      'installationRequirements' => $row['requisitosInstalacion'],
      'quantityProducts' => $row['cantidadProductos']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function getCategoriesByProduct($id){
  global $connection;
  $query = "SELECT * FROM productoscategorias WHERE idProducto = ".$id;
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'idProduct' => $row['idProducto'],
      'idCategory' => $row['idCategoria']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function getPersonalByProduct($id){
  global $connection;
  $query = "SELECT * FROM disponibilidadproducto WHERE idProducto = ".$id;
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'idProduct' => $row['idProducto'],
      'idPersonal' => $row['idPersonal'],
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function addProduct($nameProduct, $version, $quantityProducts, $installationRequirements){
  global $connection;
  $query = "INSERT INTO productossoftware VALUES (null,'".$nameProduct."','".$version."','".$installationRequirements."',".$quantityProducts.")";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updateProduct($id, $nameProduct, $version, $quantityProducts, $installationRequirements){
  global $connection;
  $query = "UPDATE productossoftware SET nombreProducto='".$nameProduct."', version='".$version."',requisitosInstalacion='".$installationRequirements."',cantidadProductos=$quantityProducts WHERE idProducto = $id";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deleteProduct($id){
  global $connection;
  $query = "DELETE FROM productoscategorias WHERE idProducto = $id";
  $query2 = "DELETE FROM disponibilidadproducto WHERE idProducto = $id";
  $query3 = "DELETE FROM productossoftware WHERE idProducto = $id";
  if (mysqli_query($connection,$query)) {
    if (mysqli_query($connection,$query2)) {
      if (mysqli_query($connection,$query3)) {
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }
  }else {
    return false;
  }
}
function addCategoryByProduct($idCategory){
  global $connection;
  $query = "INSERT INTO productoscategorias VALUES ((SELECT MAX(idProducto) AS id FROM productossoftware),$idCategory)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updateCategoryByProduct($idProduct,$idCategory){
  global $connection;
  $query = "INSERT INTO productoscategorias VALUES ($idProduct,$idCategory)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deleteCategoryByProduct($idProduct){
  global $connection;
  $query = "DELETE FROM productoscategorias WHERE idProducto = $idProduct";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function addPersonalByProduct($idPersonal){
  global $connection;
  $query = "INSERT INTO disponibilidadproducto VALUES ((SELECT MAX(idProducto) AS id FROM productossoftware),$idPersonal)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updatePersonalByProduct($idProduct, $idPersonal){
  global $connection;
  $query = "INSERT INTO disponibilidadproducto VALUES ($idProduct,$idPersonal)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deletePersonalByProduct($idProduct){
  global $connection;
  $query = "DELETE FROM disponibilidadproducto WHERE idProducto=$idProduct";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function addLicense($name, $quantity, $startingValidity, $termValidity, $contractNumber, $acquisitionPrice, $maker, $provider, $impact, $comments, $idType, $idAcquisition){
  global $connection;
  $query = "INSERT INTO licencias VALUES (null, '".$name."', $quantity, '".$startingValidity."', '".$termValidity."', '".$contractNumber."', $acquisitionPrice, '".$maker."', '".$provider."', '".$impact."', '".$comments."', $idType, $idAcquisition)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updateLicense($id, $name, $quantity, $startingValidity, $termValidity, $contractNumber, $acquisitionPrice, $maker, $provider, $impact, $comments, $idType, $idAcquisition){
  global $connection;
  $query = "UPDATE licencias
            SET nombreLicencia = '".$name."',
                cantidadLicencias = $quantity,
                vigenciaInicio = '".$startingValidity."',
                vigenciaTermino = '".$termValidity."',
                numeroContrado = '".$contractNumber."',
                precioAdquisicion = $acquisitionPrice,
                fabricante = '".$maker."',
                proveedor = '".$provider."',
                impacto = '".$impact."',
                comentarios = '".$comments."',
                idTipo = $idType,
                idAdquisicion = $idAcquisition
            WHERE idLicencia = $id";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function getPersonalByLicense($id){
  global $connection;
  $query = "SELECT * FROM disponibilidadLicencia WHERE idLicencia = ".$id;
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'idLicense' => $row['idLicencia'],
      'idPersonal' => $row['idPersonal'],
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

function getProductsByLicense($id){
  global $connection;
  $query = "SELECT * FROM licenciasproductos WHERE idLicencia = ".$id;
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'idLicense' => $row['idLicencia'],
      'idProduct' => $row['idProducto'],
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}
function addPersonalByLicense($idPersonal){
  global $connection;
  $query = "INSERT INTO disponibilidadlicencia VALUES ((SELECT MAX(idLicencia) AS id FROM licencias),$idPersonal)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deletePersonalByLicense($idLicense){
  global $connection;
  $query = "DELETE FROM disponibilidadlicencia WHERE idLicencia = $idLicense";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updatePersonalByLicense($idLicense, $idPersonal){
  global $connection;
  $query = "INSERT INTO disponibilidadlicencia VALUES ($idLicense,$idPersonal)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deleteProductsByLicense($idLicense){
  global $connection;
  $query = "DELETE FROM licenciasproductos WHERE idLicencia = $idLicense";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function addProductsByLicense($idProduct){
  global $connection;
  $query = "INSERT INTO licenciasproductos VALUES ((SELECT MAX(idLicencia) AS id FROM licencias),$idProduct)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function updateProductByLicense($idLicense, $idProduct){
  global $connection;
  $query = "INSERT INTO licenciasproductos VALUES ($idLicense,$idProduct)";
  if (mysqli_query($connection,$query)) {
    return true;
  }else {
    return false;
  }
}
function deleteLicense($idLicense){
  global $connection;
  $query = "DELETE FROM licenciasproductos WHERE idLicencia = $idLicense";
  $query2 = "DELETE FROM disponibilidadlicencia WHERE idLicencia = $idLicense";
  $query3 = "DELETE FROM licencias WHERE idLicencia = $idLicense";
  if (mysqli_query($connection,$query)) {
    if (mysqli_query($connection,$query2)) {
      if (mysqli_query($connection,$query3)) {
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }
  }else {
    return false;
  }
}
?>
