$(document).ready(function() {
  // Testing Jquery
  // console.log('jquery is working!')

  $('#login-form').submit(e => {
    e.preventDefault()
    const postData = {
      user: $('#user').val(),
      password: $('#password').val()
    }
    const url = 'php/auth.php'
    $.post(url, postData, (response) => {
      if(response==1){
        window.location.href = 'index.html'
      }else {
        swal("Error!", "Credenciales incorrectas!", "error")
      }
    })
  })
})
