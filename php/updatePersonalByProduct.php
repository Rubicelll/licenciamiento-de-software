<?php
require 'fuctions.php';
$idProduct = $_POST['idProduct'];
$idPersonal = $_POST['idPersonal'];
conectar();
if (updatePersonalByProduct($idProduct, $idPersonal)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
