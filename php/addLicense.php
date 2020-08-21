<?php
require 'fuctions.php';
$name = $_POST['name'];
$quantity = $_POST['quantity'];
$startingValidity = $_POST['startingValidity'];
$termValidity = $_POST['termValidity'];
$contractNumber = $_POST['contractNumber'];
$acquisitionPrice = $_POST['acquisitionPrice'];
$maker = $_POST['maker'];
$provider = $_POST['provider'];
$impact = $_POST['impact'];
$comments = $_POST['comments'];
$idType = $_POST['idType'];
$idAcquisition = $_POST['idAcquisition'];
conectar();
if (addLicense($name, $quantity, $startingValidity, $termValidity, $contractNumber, $acquisitionPrice, $maker, $provider, $impact, $comments, $idType, $idAcquisition)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
