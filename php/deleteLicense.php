<?php
require 'fuctions.php';
$id = $_POST['id'];
conectar();
if (deleteLicense($id)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
