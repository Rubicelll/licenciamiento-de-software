<?php
require 'fuctions.php';
$idPersonal = $_POST['idPersonal'];
conectar();
if (deletePersonal($idPersonal)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
