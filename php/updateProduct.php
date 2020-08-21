<?php
require 'fuctions.php';
$id = $_POST['id'];
$nameProduct = $_POST['nameProduct'];
$version = $_POST['version'];
$quantityProducts = $_POST['quantityProducts'];
$installationRequirements = $_POST['installationRequirements'];
conectar();
if (updateProduct($id, $nameProduct, $version, $quantityProducts, $installationRequirements)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
