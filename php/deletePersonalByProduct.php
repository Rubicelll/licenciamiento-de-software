<?php
require 'fuctions.php';
$idProduct = $_POST['idProduct'];
conectar();
if (deletePersonalByProduct($idProduct)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
