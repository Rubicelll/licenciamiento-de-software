<?php
require 'fuctions.php';
$idLicenseType = $_POST['idLicenseType'];
conectar();
if (deleteLicenseType($idLicenseType)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
