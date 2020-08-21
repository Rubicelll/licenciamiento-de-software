<?php
require 'fuctions.php';
$idLicense = $_POST['idLicense'];
conectar();
if (deletePersonalByLicense($idLicense)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
