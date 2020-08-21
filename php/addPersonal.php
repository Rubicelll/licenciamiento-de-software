<?php
require 'fuctions.php';
$typePersonal = $_POST['typePersonal'];
conectar();
if (addPersonal($typePersonal)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
