<?php
require 'fuctions.php';
$idLicense = $_POST['idLicense'];
$idPersonal = $_POST['idPersonal'];
conectar();
if (updatePersonalByLicense($idLicense, $idPersonal)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
