
$(document).ready(function(){
    //Inicializamos los calendarios
    $('.input-daterange input').each(function() {
        $(this).datepicker({
          orientation: 'bottom right',
          container: $(document.activeElement).parent(),
          language: 'es'
      });
    });

  //Realizamos una peticion a la api HeroKu para consultar el listado de peliculas
  $.ajax({
    type: 'GET',
    url: 'https://magneto-365.herokuapp.com/api/v1/reservations',
      success: function(data) {
        $.each(data, function(index, item) {
        $('<tr>'+
              '<th>'+item.film.name+'</th>'+
              '<th>'+item.user.name+'</th>'+
              '<th>'+item.user.email+'</th>'+
              '<th>'+item.user.id_document+'</th>'+
              '<th>'+item.user.phone+'</th>'+
          '</tr>'
          ).appendTo( $('#tbodyReservas') );
        });
      }
    });
});