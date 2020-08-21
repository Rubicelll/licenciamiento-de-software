<?php
require 'fuctions.php';
$idCategory = $_POST['idCategory'];
conectar();
if (deleteCategory($idCategory)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
