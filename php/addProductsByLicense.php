<?php
require 'fuctions.php';
$idProduct = $_POST['idProduct'];
conectar();
if (addProductsByLicense($idProduct)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
