<?php
require 'fuctions.php';
$licenseType = $_POST['licenseType'];
conectar();
if (addLicenseType($licenseType)) {
  echo 1;
}else {
  echo 0;
}
desconectar();
?>
