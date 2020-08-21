<?php
require 'fuctions.php';
$acquisitionMode = $_POST['acquisitionMode'];
conectar();
if (addAcquisitionMode($acquisitionMode)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
