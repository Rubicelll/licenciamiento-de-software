<?php
require 'fuctions.php';
//Obtenemos el usuario y contraseña por metodo POST para validar inicio de sesion
$usuario=$_POST['user'];
$clave=$_POST['password'];
conectar();
if (validarLogin($usuario,$clave)) {
  echo 1;
} else{
  echo 0;
}
desconectar();
?>
