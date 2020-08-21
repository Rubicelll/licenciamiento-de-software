<?php
require 'fuctions.php';
$id = $_POST['id'];
conectar();
getPersonalByProduct($id);
?>
