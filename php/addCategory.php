<?php
require 'fuctions.php';
$nameCategory = $_POST['nameCategory'];
conectar();
if (addCategory($nameCategory)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
