<?php
require 'fuctions.php';
$idAcquisitionMode = $_POST['idAcquisitionMode'];
conectar();
if (deleteAcquisitionMode($idAcquisitionMode)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
