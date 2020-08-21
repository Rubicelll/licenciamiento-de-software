<?php
require 'fuctions.php';
$idProduct = $_POST['idProduct'];
$idCategory = $_POST['idCategory'];
conectar();
if (updateCategoryByProduct($idProduct,$idCategory)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
