<?php
require 'fuctions.php';
$idLicense = $_POST['idLicense'];
$idProduct = $_POST['idProduct'];
conectar();
if (updateProductByLicense($idLicense, $idProduct)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
